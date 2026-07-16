"use client";

import '../globals.css';
import Link from 'next/link';

const mockProducts = [
  {
    id: 1,
    name: "Cheese Roll®",
    description: "Our signature flaky pastry filled with sweet cream cheese, baked to golden perfection.",
    price: 24.99,
    addons: ["Gift Wrap", "Extra Icing"],
    isSoldOut: false,
    image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Cheese+Roll"
  },
  {
    id: 2,
    name: "Dulce de Leche Besito",
    description: "A sweet kiss of caramel in a butter cookie, dusted with powdered sugar.",
    price: 15.50,
    addons: ["Gift Wrap"],
    isSoldOut: true,
    image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Besito"
  },
  {
    id: 3,
    name: "Guava & Cheese Pastry",
    description: "Flaky puff pastry filled with tropical guava jam and cream cheese.",
    price: 22.00,
    addons: [],
    isSoldOut: false,
    image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Guava+Pastry"
  }
];

export default function Storefront() {
  return (
    <div style={{ backgroundColor: 'var(--color-bg-primary)', minHeight: '100vh' }}>
      <header style={{ borderBottom: '1px solid var(--color-border)', padding: 'var(--space-md) 0' }}>
        <div className="container flex items-center justify-between">
          <h1 style={{ color: 'var(--color-primary)', margin: 0 }}>Aetee Bakery</h1>
          <nav style={{ display: 'flex', gap: 'var(--space-md)' }}>
            <Link href="/admin/login" style={{ fontWeight: '600', color: 'var(--color-text-main)' }}>Admin Login</Link>
          </nav>
        </div>
      </header>

      <main className="container" style={{ padding: 'var(--space-xl) var(--space-md)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: 'var(--space-sm)' }}>Porto's Favorites, Fresh From Your Oven</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>Turn any occasion into a celebration.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--space-lg)' }}>
          {mockProducts.map(product => (
            <div key={product.id} className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative' }}>
                <img src={product.image} alt={product.name} style={{ width: '100%', height: '220px', objectFit: 'cover', filter: product.isSoldOut ? 'grayscale(100%) opacity(0.8)' : 'none' }} />
                {product.isSoldOut && (
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'var(--color-danger)', color: 'white', padding: 'var(--space-xs) var(--space-md)', fontWeight: 'bold', border: '2px solid white', boxShadow: 'var(--shadow-card)' }}>
                    SOLD OUT
                  </div>
                )}
              </div>
              
              <div style={{ padding: 'var(--space-md)', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-xs)' }}>{product.name}</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', flex: 1 }}>{product.description}</p>
                
                {product.addons.length > 0 && (
                  <div style={{ margin: 'var(--space-sm) 0', display: 'flex', gap: 'var(--space-xs)', flexWrap: 'wrap' }}>
                    {product.addons.map((addon, i) => (
                      <span key={i} className="badge" style={{ backgroundColor: 'var(--color-bg-alt)', color: 'var(--color-text-main)', border: '1px solid var(--color-border)' }}>
                        {addon}
                      </span>
                    ))}
                  </div>
                )}
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'var(--space-md)' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>${product.price.toFixed(2)}</span>
                  <button className="btn btn-primary" disabled={product.isSoldOut} style={{ opacity: product.isSoldOut ? 0.5 : 1, cursor: product.isSoldOut ? 'not-allowed' : 'pointer' }}>
                    {product.isSoldOut ? '❌ Sold Out' : '[+] ADD'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
