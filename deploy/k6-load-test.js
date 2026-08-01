/**
 * Aetees Bakehouse — Realistic k6 Load Test
 *
 * Tests a realistic user journey:
 *   1. Homepage → 2. Menu page → 3. Products API → 4. Categories API
 *
 * Install k6:
 *   Ubuntu:  sudo snap install k6
 *   Fedora:  sudo dnf install https://dl.k6.io/rpm/repo.rpm && sudo dnf install k6
 *   macOS:   brew install k6
 *
 * Usage:
 *   k6 run deploy/k6-load-test.js                          # default stages
 *   k6 run --vus 500 --duration 60s deploy/k6-load-test.js  # quick test
 *
 * Stages (default):
 *   Ramp to 500 VUs (30s) → Hold (60s) → Ramp to 1500 (30s) → Hold (60s) → Ramp down (30s)
 */
import http from 'k6/http';
import { sleep, check, group } from 'k6';
import { Rate, Trend } from 'k6/metrics';

// ── Custom Metrics ──────────────────────────────────────────────
const errorRate = new Rate('errors');
const apiDuration = new Trend('api_duration');

// ── Test Configuration ──────────────────────────────────────────
export const options = {
  stages: [
    { duration: '30s', target: 500 },   // Ramp up to 500 users
    { duration: '60s', target: 500 },   // Hold at 500
    { duration: '30s', target: 1500 },  // Ramp up to 1500
    { duration: '60s', target: 1500 },  // Hold at 1500
    { duration: '30s', target: 0 },     // Ramp down
  ],

  thresholds: {
    http_req_duration: ['p(95)<500', 'p(99)<2000'],  // 95th percentile < 500ms
    errors: ['rate<0.05'],                             // Error rate < 5%
    http_req_failed: ['rate<0.05'],                    // HTTP failure rate < 5%
  },

  // Don't follow redirects (lets us test the actual response)
  noVUConnectionReuse: false,
};

const BASE_URL = 'https://www.aeteesbakehouse.com';

// ── Main Test Scenario ──────────────────────────────────────────
export default function () {

  // 1. Visit Homepage
  group('Homepage', () => {
    const res = http.get(BASE_URL, {
      tags: { page: 'home' },
      timeout: '10s',
    });
    check(res, {
      'homepage status 200': (r) => r.status === 200,
    });
    errorRate.add(res.status !== 200);
    sleep(1);
  });

  // 2. Visit Menu page
  group('Menu Page', () => {
    const res = http.get(`${BASE_URL}/menu`, {
      tags: { page: 'menu' },
      timeout: '10s',
    });
    check(res, {
      'menu status 200': (r) => r.status === 200,
    });
    errorRate.add(res.status !== 200);
    sleep(0.5);
  });

  // 3. Fetch Products API (the hot path — should be cached by Redis)
  group('Products API', () => {
    const res = http.get(`${BASE_URL}/api/products`, {
      tags: { page: 'api_products' },
      timeout: '10s',
    });
    check(res, {
      'products status 200': (r) => r.status === 200,
      'products is JSON array': (r) => {
        try {
          return Array.isArray(JSON.parse(r.body));
        } catch {
          return false;
        }
      },
    });
    apiDuration.add(res.timings.duration);
    errorRate.add(res.status !== 200);
    sleep(0.5);
  });

  // 4. Fetch Categories API
  group('Categories API', () => {
    const res = http.get(`${BASE_URL}/api/categories`, {
      tags: { page: 'api_categories' },
      timeout: '10s',
    });
    check(res, {
      'categories status 200': (r) => r.status === 200,
    });
    apiDuration.add(res.timings.duration);
    errorRate.add(res.status !== 200);
    sleep(0.5);
  });

  // 5. Fetch Filters API
  group('Filters API', () => {
    const res = http.get(`${BASE_URL}/api/filters`, {
      tags: { page: 'api_filters' },
      timeout: '10s',
    });
    check(res, {
      'filters status 200': (r) => r.status === 200,
    });
    apiDuration.add(res.timings.duration);
    errorRate.add(res.status !== 200);
    sleep(0.5);
  });

  // Simulate user think time (1–3 seconds)
  sleep(Math.random() * 2 + 1);
}

// ── Results Summary ─────────────────────────────────────────────
export function handleSummary(data) {
  const now = new Date().toISOString().slice(0, 19).replace(/[:.]/g, '-');

  // Print a clean summary to stdout
  const lines = [];
  lines.push('');
  lines.push('╔═══════════════════════════════════════════════╗');
  lines.push('║   AETEES BAKEHOUSE — LOAD TEST RESULTS        ║');
  lines.push('╚═══════════════════════════════════════════════╝');
  lines.push('');

  const m = data.metrics || {};

  // HTTP request duration
  if (m.http_req_duration && m.http_req_duration.values) {
    const v = m.http_req_duration.values;
    lines.push('  HTTP Request Duration:');
    lines.push(`    avg   = ${v.avg?.toFixed(1)}ms`);
    lines.push(`    min   = ${v.min?.toFixed(1)}ms`);
    lines.push(`    max   = ${v.max?.toFixed(1)}ms`);
    lines.push(`    p(95) = ${v['p(95)']?.toFixed(1)}ms`);
    lines.push(`    p(99) = ${v['p(99)']?.toFixed(1)}ms`);
    lines.push('');
  }

  // API duration (custom metric)
  if (m.api_duration && m.api_duration.values) {
    const v = m.api_duration.values;
    lines.push('  API Duration (products + categories + filters):');
    lines.push(`    avg   = ${v.avg?.toFixed(1)}ms`);
    lines.push(`    p(95) = ${v['p(95)']?.toFixed(1)}ms`);
    lines.push(`    p(99) = ${v['p(99)']?.toFixed(1)}ms`);
    lines.push('');
  }

  // Error rate
  if (m.errors && m.errors.values) {
    const rate = (m.errors.values.rate * 100).toFixed(2);
    lines.push(`  Error Rate: ${rate}%`);
  }

  // HTTP failures
  if (m.http_req_failed && m.http_req_failed.values) {
    const rate = (m.http_req_failed.values.rate * 100).toFixed(2);
    lines.push(`  HTTP Failure Rate: ${rate}%`);
  }

  // Request count
  if (m.http_reqs && m.http_reqs.values) {
    lines.push(`  Total Requests: ${m.http_reqs.values.count}`);
    lines.push(`  Requests/sec: ${m.http_reqs.values.rate?.toFixed(1)}`);
  }

  // VUs
  if (m.vus_max && m.vus_max.values) {
    lines.push(`  Peak VUs: ${m.vus_max.values.max}`);
  }

  lines.push('');
  lines.push(`  Full results saved to: deploy/k6-results-${now}.json`);
  lines.push('');

  return {
    [`deploy/k6-results-${now}.json`]: JSON.stringify(data, null, 2),
    stdout: lines.join('\n'),
  };
}
