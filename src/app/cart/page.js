"use client";

import Link from 'next/link';

export default function Cart() {
  return (
    <>
      {/* Order Info */}
      <div style={{ backgroundColor: '#F9F8F6', padding: '24px 32px', borderBottom: '1px solid #EBEBEB' }}>
        <h1 style={{ color: '#5A3424', fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '8px', letterSpacing: '0.05em' }}>Your Order</h1>
        <p style={{ color: '#888', fontSize: '0.9rem' }}>from Nanz Bakehouse, Delhi NCR Delivery</p>
      </div>

      {/* Empty State */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '64px 32px', minHeight: '50vh' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#000', marginBottom: '24px' }}>Your cart is empty!</h2>
        <Link href="/menu" style={{ textDecoration: 'none' }}>
          <button style={{ backgroundColor: '#000', color: '#FFF', border: 'none', padding: '12px 24px', borderRadius: '24px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}>
            Back to menu
          </button>
        </Link>
      </div>
    </>
  );
}
