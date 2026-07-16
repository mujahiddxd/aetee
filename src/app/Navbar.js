"use client";

import Link from 'next/link';

export default function Navbar() {
  return (
    <>
      {/* --- TOP HEADER --- */}

      {/* Desktop Top Header */}
      <header className="desktop-nav" style={{ borderBottom: '1px solid var(--color-border)', backgroundColor: '#FFFFFF' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 32px', width: '100%' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '24px', textDecoration: 'none', color: 'inherit' }}>
            <div style={{ width: '64px', height: '64px', backgroundColor: 'var(--color-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontWeight: 'bold', fontSize: '12px', textAlign: 'center', lineHeight: '1.2' }}>
              AETEES
            </div>
            <h1 style={{ fontSize: '1.75rem', margin: 0, letterSpacing: '0.05em', textTransform: 'uppercase' }}>AETEES BAKEHOUSE</h1>
          </Link>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '32px', fontSize: '1.25rem', color: 'var(--color-text-muted)', fontWeight: '500' }}>
            <Link href="/menu" style={{ color: 'inherit', textDecoration: 'none' }}>Menu</Link>

            <Link href="/cart" style={{ background: 'none', border: 'none', color: 'var(--color-text-main)', cursor: 'pointer', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5h.008v.008H8.625v-.008zm5.625 0h.008v.008h-.008v-.008z"></path>
              </svg>
            </Link>
          </nav>
        </div>
      </header>

      {/* Mobile Top Header */}
      <header className="mobile-nav">
        <div style={{ backgroundColor: 'var(--color-primary)', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Hamburger Menu Icon */}
          <button style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer', padding: 0 }}>
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          
          {/* Cart Icon */}
          <Link href="/cart" style={{ color: '#FFF', textDecoration: 'none' }}>
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </Link>
        </div>
      </header>

    </>
  );
}
