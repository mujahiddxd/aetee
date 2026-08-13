"use client";

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const isPickup = searchParams.get('type') === 'pickup';

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fdfbf7',
      padding: '20px'
    }}>
      <style>{`
        .success-btn {
          display: inline-block;
          background-color: #5A3424;
          color: #FFF;
          text-decoration: none;
          padding: 16px 32px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 1.1rem;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 4px 12px rgba(90, 52, 36, 0.2);
        }
        .success-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(90, 52, 36, 0.3);
        }
      `}</style>
      <div style={{
        backgroundColor: '#fff',
        padding: '48px 32px',
        borderRadius: '24px',
        maxWidth: '500px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: '#F0F8F1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px auto'
        }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        
        <h1 style={{ color: '#5A3424', fontSize: '2.5rem', fontWeight: '800', marginBottom: '16px' }}>
          Thank You!
        </h1>
        
        <p style={{ color: '#666', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: isPickup ? '16px' : '32px' }}>
          Your payment is successful and your order has been placed.<br/>
          Thank you for choosing <strong>Aetee&apos;s Bakehouse!</strong>
          {isPickup
            ? " Your order will be ready for pickup."
            : " We're getting your treats ready."}
        </p>

        {isPickup && (
          <div style={{
            backgroundColor: '#FDF9F7',
            border: '1px solid #E8D8CE',
            borderRadius: '14px',
            padding: '16px 20px',
            marginBottom: '32px',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px'
          }}>
            <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>📍</span>
            <div>
              <p style={{ fontWeight: '700', color: '#5A3424', margin: '0 0 4px 0', fontSize: '0.95rem' }}>Pickup Location</p>
              <p style={{ color: '#666', margin: 0, fontSize: '0.9rem', lineHeight: '1.5' }}>
                Drushti Sai Pradnya, Tilak Nagar, Mumbai 400089
              </p>
            </div>
          </div>
        )}
        
        <Link href="/" className="success-btn">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
        <div style={{ width: '40px', height: '40px', border: '4px solid #f3f3f3', borderTop: '4px solid #5A3424', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
