"use client";

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useCart } from './context/CartContext';
import Image from 'next/image';

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems, isLoaded } = useCart();

  // Don't render navbar on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      {/* --- TOP HEADER --- */}

      {/* Desktop Top Header */}
      <header className="desktop-nav" style={{ borderBottom: 'none', backgroundColor: 'var(--color-primary)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 32px', width: '100%' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
            <Image src="/logo-white.png" alt="Aetee's Bakehouse" width={200} height={70} style={{ height: 'auto', width: 'auto', objectFit: 'contain', maxHeight: '70px' }} priority />
          </Link>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '32px', fontSize: '1.25rem', color: '#FFFFFF', fontWeight: '500' }}>
            <Link href="/menu" style={{ color: 'inherit', textDecoration: 'none' }}>Menu</Link>

            <Link href="/cart" style={{ background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer', display: 'flex', alignItems: 'center', textDecoration: 'none', position: 'relative' }}>
              <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5h.008v.008H8.625v-.008zm5.625 0h.008v.008h-.008v-.008z"></path>
              </svg>
              {isLoaded && cartItemCount > 0 && (
                <div style={{ position: 'absolute', top: '-4px', right: '-8px', backgroundColor: '#FFFFFF', color: 'var(--color-primary)', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold' }}>
                  {cartItemCount}
                </div>
              )}
            </Link>
          </nav>
        </div>
      </header>

      {/* Mobile Top Header */}
      <header className="mobile-nav">
        <div style={{ backgroundColor: 'var(--color-primary)', padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1100 }}>
          {/* Hamburger Menu Icon */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu" style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
            {isMenuOpen ? (
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            )}
          </button>

          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <Image src="/logo-white.png" alt="Aetee's Bakehouse" width={140} height={45} style={{ height: 'auto', width: 'auto', maxHeight: '38px', objectFit: 'contain' }} priority />
          </Link>

          {/* Cart Icon */}
          <Link href="/cart" aria-label="Cart" style={{ color: '#FFF', textDecoration: 'none', position: 'relative', display: 'flex', alignItems: 'center' }}>
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5h.008v.008H8.625v-.008zm5.625 0h.008v.008h-.008v-.008z"></path>
            </svg>
            {isLoaded && cartItemCount > 0 && (
              <div style={{ position: 'absolute', top: '-4px', right: '-8px', backgroundColor: '#FFF', color: 'var(--color-primary)', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold' }}>
                {cartItemCount}
              </div>
            )}
          </Link>
        </div>
      </header>

      {/* Mobile Side Drawer */}
      <div style={{ 
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
        zIndex: 1050, display: 'flex',
        pointerEvents: isMenuOpen ? 'auto' : 'none',
        visibility: isMenuOpen ? 'visible' : 'hidden',
        transition: 'visibility 0.3s'
      }}>
        {/* Backdrop */}
        <div onClick={() => setIsMenuOpen(false)} style={{ 
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
          backgroundColor: 'rgba(0,0,0,0.5)',
          opacity: isMenuOpen ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out'
        }}></div>

        {/* Drawer Content */}
        <div style={{ 
          position: 'relative', width: '250px', height: '100%', 
          backgroundColor: 'var(--color-bg-white)', padding: '80px 24px 24px', 
          display: 'flex', flexDirection: 'column', gap: '24px', 
          boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
          transform: isMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease-in-out'
        }}>
          <Link href="/" onClick={() => setIsMenuOpen(false)} style={{ textDecoration: 'none', color: 'var(--color-text-main)', fontSize: '1.25rem', fontWeight: 600, fontFamily: "'Oswald', sans-serif", textTransform: 'uppercase' }}>Home</Link>
          <Link href="/menu" onClick={() => setIsMenuOpen(false)} style={{ textDecoration: 'none', color: 'var(--color-text-main)', fontSize: '1.25rem', fontWeight: 600, fontFamily: "'Oswald', sans-serif", textTransform: 'uppercase' }}>Menu</Link>
          <Link href="/cart" onClick={() => setIsMenuOpen(false)} style={{ textDecoration: 'none', color: 'var(--color-text-main)', fontSize: '1.25rem', fontWeight: 600, fontFamily: "'Oswald', sans-serif", textTransform: 'uppercase' }}>Cart</Link>
        </div>
      </div>
    </>
  );
}
