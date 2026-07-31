"use client";

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';
import dynamic from 'next/dynamic';
const AddressModal = dynamic(() => import('../components/AddressModal'), { ssr: false });

export default function Cart() {
  const router = useRouter();
  const { cartItems, updateQuantity, removeFromCart, isLoaded } = useCart();
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);

  // Bug 2: Validate cart items against the server on mount
  useEffect(() => {
    if (!isLoaded || cartItems.length === 0) return;

    async function validateCart() {
      try {
        const res = await fetch('/api/products', { cache: 'no-store' });
        if (!res.ok) return;
        const serverProducts = await res.json();
        const serverProductMap = {};
        for (const p of serverProducts) {
          serverProductMap[p.id] = p;
        }

        // Remove cart items whose product no longer exists on the server
        for (const item of cartItems) {
          if (!serverProductMap[item.product.id]) {
            removeFromCart(item.cartItemId);
          }
        }
      } catch (e) {
        console.error('Failed to validate cart against server', e);
      }
    }

    validateCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  const confirmRemove = () => {
    if (itemToDelete) {
      removeFromCart(itemToDelete);
      setItemToDelete(null);
    }
  };

  const cancelRemove = () => {
    setItemToDelete(null);
  };

  const subtotal = parseFloat(cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2));
  const total = subtotal;

  if (cartItems.length === 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '64px 32px', minHeight: '50vh' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#000', marginBottom: '24px' }}>Your cart is empty!</h2>
        <Link href="/menu" style={{ textDecoration: 'none' }}>
          <button style={{ backgroundColor: '#000', color: '#FFF', border: 'none', padding: '12px 24px', borderRadius: '24px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}>
            Back to menu
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '48px' }}>
      <style>{`
        .qty-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid #EBEBEB;
          background-color: #FFF;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 1.2rem;
          color: #555;
          transition: all 0.2s ease;
        }
        .qty-btn:hover {
          background-color: #F0F0F0;
          transform: scale(1.05);
        }
        .checkout-btn {
          width: 100%;
          background-color: #5A3424;
          color: #FFF;
          padding: 16px;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: bold;
          border: none;
          cursor: pointer;
          transition: background-color 0.2s ease, transform 0.2s ease;
          box-shadow: 0 4px 12px rgba(90, 52, 36, 0.2);
        }
        .checkout-btn:hover {
          background-color: #4a2b1d;
          transform: translateY(-2px);
        }
        .delete-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6px;
          border-radius: 6px;
          transition: all 0.2s ease;
        }
        .delete-btn:hover {
          background-color: #FEE;
          color: #D32F2F;
        }
      `}</style>

      {/* 1. Your Order Header */}
      <div style={{ padding: '32px 24px 24px 24px', borderBottom: '1px solid #EBEBEB' }}>
        <h1 style={{ color: '#5A3424', fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '8px', letterSpacing: '0.05em' }}>Your Cart</h1>
      </div>

      {/* 2. Cart Items */}
      <div style={{ padding: '24px' }}>
        {cartItems.map(item => (
          <div key={item.cartItemId} style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '16px',
            padding: '16px',
            backgroundColor: '#FFF',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ width: 80, height: 80, position: 'relative', flexShrink: 0 }}>
                <Image src={item.product.image} alt={item.product.name} fill sizes="80px" style={{ objectFit: 'cover', borderRadius: '8px' }} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', margin: 0, color: '#333' }}>{item.product.name}</h3>
                {item.selectedSize && <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#666' }}>Size: {item.selectedSize}</p>}
                {item.selectedAddons && item.selectedAddons.length > 0 && <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#666' }}>Addons: {item.selectedAddons.join(', ')}</p>}
                <p style={{ color: '#000', fontWeight: '700', fontSize: '1.1rem', margin: '8px 0 0 0' }}>₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #F0F0F0', paddingTop: '12px' }}>
              <button
                className="delete-btn"
                onClick={() => setItemToDelete(item.cartItemId)}
                title="Remove item"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                </svg>
                <span style={{ fontSize: '0.85rem', marginLeft: '6px', fontWeight: '600' }}>Remove</span>
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button onClick={() => updateQuantity(item.cartItemId, -1)} className="qty-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                </button>
                <span style={{ fontWeight: '600', width: '20px', textAlign: 'center' }}>{item.quantity}</span>
                <button 
                  disabled={item.product.isSoldOut}
                  onClick={() => { if (!item.product.isSoldOut) updateQuantity(item.cartItemId, 1) }} 
                  className="qty-btn"
                  style={{ cursor: item.product.isSoldOut ? 'not-allowed' : 'pointer', opacity: item.product.isSoldOut ? 0.5 : 1 }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>



      {/* 4. Payment Summary */}
      <div style={{
        margin: '0 24px 32px 24px', padding: '24px', backgroundColor: '#F9F8F6', borderRadius: '12px'
      }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '16px', color: '#333' }}>Payment Summary</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: '#555' }}>
          <span>Item Total</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', color: '#555' }}>
          <span>Shipping</span>
          <span style={{ fontWeight: '500', color: '#888', fontSize: '0.9rem' }}>Calculated at checkout</span>
        </div>
        <div style={{ borderTop: '1px solid #E5E5E5', margin: '16px 0' }}></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#333' }}>Total</span>
          <span style={{ fontWeight: '800', fontSize: '1.4rem', color: '#000' }}>
            <span style={{ fontSize: '0.85rem', color: '#888', fontWeight: 'normal', marginRight: '8px' }}>INR</span>
            ₹{total.toFixed(2)}
          </span>
        </div>
      </div>

      {/* 5. Proceed to Checkout Button */}
      <div style={{ padding: '0 24px' }}>
        <button 
          className="checkout-btn"
          onClick={() => setShowAddressModal(true)}
        >
          Proceed to Checkout
        </button>
      </div>

      {/* Custom Delete Confirmation Modal */}
      {itemToDelete && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '24px'
        }}>
          <div style={{
            backgroundColor: '#FFF',
            padding: '32px 24px',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '360px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            textAlign: 'center'
          }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#333', marginBottom: '12px' }}>Remove Item</h3>
            <p style={{ color: '#666', marginBottom: '24px', fontSize: '0.95rem' }}>
              Are you sure you want to remove <strong>{cartItems.find(i => i.cartItemId === itemToDelete)?.product?.name || 'this item'}</strong> from your cart?
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={cancelRemove}
                style={{
                  flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid #DDD',
                  backgroundColor: '#FFF', color: '#333', fontWeight: 'bold', cursor: 'pointer'
                }}
              >Cancel</button>
              <button
                onClick={confirmRemove}
                style={{
                  flex: 1, padding: '12px', borderRadius: '12px', border: 'none',
                  backgroundColor: '#5A3424', color: '#FFF', fontWeight: 'bold', cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(90, 52, 36, 0.2)'
                }}
              >Yes, Remove</button>
            </div>
          </div>
        </div>
      )}

      {showAddressModal && (
        <AddressModal 
          isOpen={true}
          onClose={() => setShowAddressModal(false)}
          onSuccess={(deliveryInfo) => {
            setShowAddressModal(false);
            router.push('/checkout');
          }}
        />
      )}
    </div>
  );
}
