"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    featured: 0,
    bestSellers: 0,
    soldOut: 0,
    flaggedBestSellers: [],
    realBestSellers: []
  });
  const [loading, setLoading] = useState(true);

  // ── Queue State ──────────────────────────────────────────────
  const [queueStats, setQueueStats] = useState({
    enabled: false,
    activeCount: 0,
    waitingCount: 0,
    maxConcurrent: 100,
    tokenTTLSeconds: 600,
  });
  const [queueLoading, setQueueLoading] = useState(true);
  const [queueConfigOpen, setQueueConfigOpen] = useState(false);
  const [queueConfig, setQueueConfig] = useState({ maxConcurrent: 100, tokenTTL: 600 });
  const queuePollRef = useRef(null);

  // Fetch queue stats
  const fetchQueueStats = async () => {
    try {
      const res = await fetch('/api/queue/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'stats' }),
      });
      if (res.ok) {
        const data = await res.json();
        setQueueStats(data);
        setQueueConfig({ maxConcurrent: data.maxConcurrent, tokenTTL: data.tokenTTLSeconds });
      }
    } catch (err) {
      console.error('Failed to fetch queue stats:', err);
    } finally {
      setQueueLoading(false);
    }
  };

  const toggleQueue = async () => {
    const action = queueStats.enabled ? 'disable' : 'enable';
    try {
      const res = await fetch('/api/queue/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });
      if (res.ok) {
        const data = await res.json();
        setQueueStats(data);
      }
    } catch (err) {
      console.error('Failed to toggle queue:', err);
    }
  };

  const saveQueueConfig = async () => {
    try {
      const res = await fetch('/api/queue/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'configure',
          maxConcurrent: Number(queueConfig.maxConcurrent),
          tokenTTL: Number(queueConfig.tokenTTL),
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setQueueStats(data);
        setQueueConfigOpen(false);
      }
    } catch (err) {
      console.error('Failed to save queue config:', err);
    }
  };

  // Auto-refresh queue stats every 5 seconds when queue is enabled
  useEffect(() => {
    fetchQueueStats();
  }, []);

  useEffect(() => {
    if (queueStats.enabled) {
      queuePollRef.current = setInterval(fetchQueueStats, 5000);
    } else {
      if (queuePollRef.current) clearInterval(queuePollRef.current);
    }
    return () => { if (queuePollRef.current) clearInterval(queuePollRef.current); };
  }, [queueStats.enabled]);
  // ────────────────────────────────────────────────────────────

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/admin/dashboard', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Failed to load dashboard stats", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchStats();
  }, []);

  return (
    <div>
      <div className="page-header">
        <h1>📊 Dashboard</h1>
      </div>

      {/* ── Queue Control Panel ─────────────────────────────────── */}
      <div className="card" style={{ marginBottom: '24px', border: queueStats.enabled ? '2px solid #22c55e' : '1px solid var(--color-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: queueStats.enabled ? '20px' : '0', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '1.4rem' }}>🚦</span>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.15rem' }}>Queue System</h2>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                {queueStats.enabled
                  ? 'Active — visitors are being queued'
                  : 'Inactive — all visitors have direct access'}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {!queueLoading && (
              <button
                onClick={() => setQueueConfigOpen(!queueConfigOpen)}
                style={{
                  background: 'none',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  padding: '6px 12px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  color: 'var(--color-text-muted)',
                }}
              >
                ⚙️ Settings
              </button>
            )}

            {/* Toggle Switch */}
            <label style={{ position: 'relative', display: 'inline-block', width: '52px', height: '28px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={queueStats.enabled}
                onChange={toggleQueue}
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span style={{
                position: 'absolute', inset: 0,
                backgroundColor: queueStats.enabled ? '#22c55e' : '#ccc',
                borderRadius: '999px',
                transition: 'background-color 0.3s',
              }}>
                <span style={{
                  position: 'absolute',
                  top: '3px',
                  left: queueStats.enabled ? '26px' : '3px',
                  width: '22px',
                  height: '22px',
                  backgroundColor: '#fff',
                  borderRadius: '50%',
                  transition: 'left 0.3s',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                }} />
              </span>
            </label>
          </div>
        </div>

        {/* Live Stats — only when enabled */}
        {queueStats.enabled && (
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{
              flex: '1 1 120px', background: 'var(--color-bg-grey)', borderRadius: '12px',
              padding: '16px', textAlign: 'center',
            }}>
              <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)', marginBottom: '4px' }}>Active Users</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '700', color: '#22c55e' }}>{queueStats.activeCount}</div>
            </div>
            <div style={{
              flex: '1 1 120px', background: 'var(--color-bg-grey)', borderRadius: '12px',
              padding: '16px', textAlign: 'center',
            }}>
              <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)', marginBottom: '4px' }}>In Queue</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '700', color: queueStats.waitingCount > 0 ? '#f97316' : 'var(--color-primary)' }}>{queueStats.waitingCount}</div>
            </div>
            <div style={{
              flex: '1 1 120px', background: 'var(--color-bg-grey)', borderRadius: '12px',
              padding: '16px', textAlign: 'center',
            }}>
              <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)', marginBottom: '4px' }}>Max Concurrent</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--color-primary)' }}>{queueStats.maxConcurrent}</div>
            </div>
            <div style={{
              flex: '1 1 120px', background: 'var(--color-bg-grey)', borderRadius: '12px',
              padding: '16px', textAlign: 'center',
            }}>
              <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)', marginBottom: '4px' }}>Session TTL</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--color-primary)' }}>{queueStats.tokenTTLSeconds / 60}m</div>
            </div>
          </div>
        )}

        {/* Config Panel */}
        {queueConfigOpen && (
          <div style={{
            marginTop: '16px', padding: '16px', background: 'var(--color-bg-grey)',
            borderRadius: '12px', display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'flex-end',
          }}>
            <div style={{ flex: '1 1 180px' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', marginBottom: '4px', color: 'var(--color-text-muted)' }}>
                Max Concurrent Users
              </label>
              <input
                type="number"
                value={queueConfig.maxConcurrent}
                onChange={(e) => setQueueConfig(prev => ({ ...prev, maxConcurrent: e.target.value }))}
                min={1}
                max={10000}
                style={{
                  width: '100%', padding: '8px 12px', border: '1px solid var(--color-border)',
                  borderRadius: '8px', fontSize: '0.9rem',
                }}
              />
            </div>
            <div style={{ flex: '1 1 180px' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', marginBottom: '4px', color: 'var(--color-text-muted)' }}>
                Session TTL (seconds)
              </label>
              <input
                type="number"
                value={queueConfig.tokenTTL}
                onChange={(e) => setQueueConfig(prev => ({ ...prev, tokenTTL: e.target.value }))}
                min={60}
                max={3600}
                style={{
                  width: '100%', padding: '8px 12px', border: '1px solid var(--color-border)',
                  borderRadius: '8px', fontSize: '0.9rem',
                }}
              />
            </div>
            <button
              onClick={saveQueueConfig}
              className="btn btn-primary"
              style={{ padding: '8px 20px', fontSize: '0.85rem', height: 'fit-content' }}
            >
              Save
            </button>
          </div>
        )}
      </div>
      {/* ────────────────────────────────────────────────────────── */}
      
      <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
        <div className="card" style={{ flex: '1 1 200px', textAlign: 'center' }}>
          <h3 style={{ color: 'var(--color-text-muted)' }}>Total Products</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>
            {loading ? "..." : stats.totalProducts}
          </p>
        </div>
        <div className="card" style={{ flex: '1 1 200px', textAlign: 'center' }}>
          <h3 style={{ color: 'var(--color-text-muted)' }}>Featured</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>
            {loading ? "..." : stats.featured}
          </p>
        </div>
        <div className="card" style={{ flex: '1 1 200px', textAlign: 'center' }}>
          <h3 style={{ color: 'var(--color-text-muted)' }}>Best Sellers</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>
            {loading ? "..." : stats.bestSellers}
          </p>
        </div>
        <div className="card" style={{ flex: '1 1 200px', textAlign: 'center' }}>
          <h3 style={{ color: 'var(--color-text-muted)' }}>Sold Out</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-danger)' }}>
            {loading ? "..." : stats.soldOut}
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        <div className="card" style={{ flex: '1 1 400px' }}>
          <h2 style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '12px', marginBottom: '16px', fontSize: '1.25rem' }}>
            🏆 Top Selling Items (By Actual Sales)
          </h2>
          {loading ? (
            <p style={{ color: 'var(--color-text-muted)' }}>Loading...</p>
          ) : stats.realBestSellers && stats.realBestSellers.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {stats.realBestSellers.map((item, index) => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px', background: 'var(--color-bg-grey)', borderRadius: '8px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--color-primary)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.9rem' }}>
                    {index + 1}
                  </div>
                  <div style={{ width: '48px', height: '48px', position: 'relative', flexShrink: 0 }}><Image src={item.imageUrl || 'https://placehold.co/100'} alt={item.name} fill sizes="48px" style={{ objectFit: 'cover', borderRadius: '8px' }} /></div>
                  <div style={{ flex: 1 }}>
                    <strong style={{ display: 'block' }}>{item.name}</strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{item.category}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <strong style={{ color: 'var(--color-primary)' }}>{item.totalSold} Sold</strong>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>No sales data available yet.</p>
          )}
        </div>

        <div className="card" style={{ flex: '1 1 400px' }}>
          <h2 style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '12px', marginBottom: '16px', fontSize: '1.25rem' }}>
            ⭐ Admin Flagged Best Sellers
          </h2>
          {loading ? (
            <p style={{ color: 'var(--color-text-muted)' }}>Loading...</p>
          ) : stats.flaggedBestSellers && stats.flaggedBestSellers.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {stats.flaggedBestSellers.map(item => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
                  <div style={{ width: '48px', height: '48px', position: 'relative', flexShrink: 0 }}><Image src={item.imageUrl || 'https://placehold.co/100'} alt={item.name} fill sizes="48px" style={{ objectFit: 'cover', borderRadius: '8px' }} /></div>
                  <div style={{ flex: 1 }}>
                    <strong style={{ display: 'block' }}>{item.name}</strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{item.category}</span>
                  </div>
                  <div>
                    <strong>${Number(item.price).toFixed(2)}</strong>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>No products flagged as Best Sellers.</p>
          )}
        </div>
      </div>
    </div>
  );
}

