"use client";

export default function AdminDashboard() {
  return (
    <div>
      <div className="page-header">
        <h1>📊 Dashboard</h1>
      </div>
      
      <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
        <div className="card" style={{ flex: 1, textAlign: 'center' }}>
          <h3 style={{ color: 'var(--color-text-muted)' }}>Total Products</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>24</p>
        </div>
        <div className="card" style={{ flex: 1, textAlign: 'center' }}>
          <h3 style={{ color: 'var(--color-text-muted)' }}>Featured</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>5</p>
        </div>
        <div className="card" style={{ flex: 1, textAlign: 'center' }}>
          <h3 style={{ color: 'var(--color-text-muted)' }}>Best Sellers</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>8</p>
        </div>
        <div className="card" style={{ flex: 1, textAlign: 'center' }}>
          <h3 style={{ color: 'var(--color-text-muted)' }}>Sold Out</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-danger)' }}>3</p>
        </div>
      </div>

      <div className="card">
        <h2>Welcome to Aetee Admin</h2>
        <p style={{ color: 'var(--color-text-muted)', marginTop: '8px' }}>
          Use the sidebar to manage your bakery's categories and products.
        </p>
      </div>
    </div>
  );
}
