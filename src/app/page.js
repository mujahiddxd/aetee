"use client";

import Link from 'next/link';
import './globals.css';

export default function Home() {
  return (
    <div style={{ backgroundColor: 'var(--color-bg-white)', minHeight: '100vh', position: 'relative' }}>
      
      {/* Navbar */}
      <header style={{ borderBottom: '1px solid var(--color-border)', backgroundColor: '#FFFFFF' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', backgroundColor: 'var(--color-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontWeight: 'bold', fontSize: '10px', textAlign: 'center', lineHeight: '1.2' }}>
              PORTO'S
            </div>
            <h1 style={{ fontSize: '1.25rem', margin: 0, letterSpacing: '0.05em' }}>PORTO'S BAKE AT HOME</h1>
          </div>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
            <Link href="/menu" style={{ color: 'inherit' }}>Menu</Link>
            <Link href="/shop" style={{ color: 'inherit', display: 'flex', alignItems: 'center', gap: '4px' }}>Shop <span style={{ fontSize: '0.7em' }}>▼</span></Link>
            <Link href="/rewards" style={{ color: 'inherit' }}>Rewards</Link>
            <Link href="/help" style={{ color: 'inherit', display: 'flex', alignItems: 'center', gap: '4px' }}>Help <span style={{ fontSize: '0.7em' }}>▼</span></Link>
            <Link href="/corporate" style={{ color: 'inherit' }}>Corporate Gifts</Link>
            <button style={{ background: 'none', border: 'none', color: 'var(--color-text-main)', cursor: 'pointer' }}>
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5h.008v.008H8.625v-.008zm5.625 0h.008v.008h-.008v-.008z"></path>
              </svg>
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ display: 'flex', minHeight: '550px' }}>
        {/* Left Side (Yellow) */}
        <div style={{ flex: 1, backgroundColor: 'var(--color-highlight)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px' }}>
          <div style={{ maxWidth: '480px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '3.5rem', lineHeight: '1.1', marginBottom: '24px' }}>WELCOME TO PORTO'S NATIONWIDE SHIPPING</h2>
            <p style={{ color: 'var(--color-text-main)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '32px' }}>
              Turn any occasion into a celebration with our easy-to-bake pastries or award-winning cakes - LA's best bakery delivered to you, perfect for gifting near or far!
            </p>
            <button className="btn btn-primary" style={{ padding: '16px 32px' }}>SEE THE MENU ↓</button>
          </div>
        </div>

        {/* Right Side (Image + Box) */}
        <div style={{ flex: 1, position: 'relative', backgroundImage: 'url("https://placehold.co/800x600/87CEEB/5a3424?text=Ice+Cream+Cake+Image")', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: '#FFFFFF', padding: '40px', width: '80%', maxWidth: '400px', textAlign: 'center', boxShadow: 'var(--shadow-card)' }}>
            <h2 style={{ fontSize: '2.5rem', lineHeight: '1.1', marginBottom: '16px' }}>DULCE DE LECHE BESITO® ICE CREAM CAKE</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '24px' }}>
              Layers of Cuban cake, premium dulce de leche ice cream, Besito® cookie crumbs, and rich dulce de leche in every bite. Available for a limited time.
            </p>
            <button className="btn btn-primary" style={{ padding: '14px 28px' }}>ORDER NOW</button>
          </div>
        </div>
      </section>

      {/* Filter / Search Bar area (Light grey background) */}
      <div style={{ backgroundColor: 'var(--color-bg-grey)', padding: '24px 0', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 'bold', fontSize: '1rem', color: 'var(--color-primary)' }}>FILTER BY:</span>
            <select style={{ padding: '10px 16px', borderRadius: '4px', border: '1px solid var(--color-primary)', backgroundColor: 'transparent', color: 'var(--color-primary)', fontWeight: 'bold', outline: 'none', width: '150px' }}>
              <option>ALL</option>
            </select>
          </div>
          <div style={{ position: 'relative' }}>
            <svg style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input type="text" placeholder="Search" style={{ padding: '10px 16px 10px 36px', borderRadius: '4px', border: '1px solid var(--color-primary)', backgroundColor: 'transparent', color: 'var(--color-text-main)', outline: 'none', width: '250px' }} />
          </div>
        </div>
      </div>

      {/* Floating $10 Off Button */}
      <button className="btn btn-primary" style={{ position: 'fixed', bottom: '32px', left: '32px', zIndex: 1000, boxShadow: 'var(--shadow-hover)', padding: '14px 24px' }}>
        <span style={{ marginRight: '8px' }}>×</span> CLAIM $10 OFF
      </button>

    </div>
  );
}
