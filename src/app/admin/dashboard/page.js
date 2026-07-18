"use client";

import { useState, useEffect } from "react";

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
                  <img src={item.imageUrl || 'https://placehold.co/100'} alt={item.name} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px' }} />
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
                  <img src={item.imageUrl || 'https://placehold.co/100'} alt={item.name} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px' }} />
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
