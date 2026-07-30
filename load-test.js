import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  // Key configurations for load testing
  stages: [
    { duration: '15s', target: 1500 },  // Ramp up to 200 users over 15 seconds
    { duration: '30s', target: 1500 },  // Stay at 200 concurrent users for 30 seconds
    { duration: '15s', target: 0 },   // Ramp down to 0 users over 15 seconds
  ],
};

export default function () {
  // Target the live production website
  const url = 'https://www.aeteesbakehouse.com/checkout';

  // Make a GET request to the homepage
  const res = http.get(url);

  // Validate the response
  check(res, {
    'status is 200': (r) => r.status === 200,
    // Since you just added a queue system, we can check if the response redirected to the queue
    'redirected to queue': (r) => r.url.includes('/queue'),
  });

  // Wait for 1 second between iterations per virtual user
  sleep(1);
}
