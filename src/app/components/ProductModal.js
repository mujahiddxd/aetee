import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import Link from 'next/link';
import Image from 'next/image';


export function ProductModal({ product, onClose, onRepeatSelect }) {
  const { cartItems, addToCart, updateQuantity, isLoaded } = useCart();
  const cartItemCount = cartItems?.reduce((total, item) => total + item.quantity, 0) || 0;
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedAddons, setSelectedAddons] = useState(new Set());

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleAddonToggle = (index) => {
    const newAddons = new Set(selectedAddons);
    if (newAddons.has(index)) {
      newAddons.delete(index);
    } else {
      newAddons.add(index);
    }
    setSelectedAddons(newAddons);
  };

  const totalPrice = Number((product.price +
    (product.sizes?.[selectedSize]?.price || 0) +
    Array.from(selectedAddons).reduce((sum, idx) => sum + (product.addons?.[idx]?.price || 0), 0)).toFixed(2));

  return (
    <div className="product-modal-overlay" onClick={onClose}>
      <div className="product-modal-container" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="product-modal-header" style={{ justifyContent: 'space-between' }}>
          <button onClick={onClose} className="product-modal-close-btn">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
          </button>

          <Link href="/cart" style={{ color: 'var(--color-primary)', textDecoration: 'none', position: 'relative', display: 'flex', alignItems: 'center' }}>
            <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5h.008v.008H8.625v-.008zm5.625 0h.008v.008h-.008v-.008z"></path>
            </svg>
            {isLoaded && cartItemCount > 0 && (
              <div style={{ position: 'absolute', top: '-4px', right: '-8px', backgroundColor: 'var(--color-primary)', color: '#FFF', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold' }}>
                {cartItemCount}
              </div>
            )}
          </Link>
        </div>

        <div className="product-modal-body">
          {/* Image */}
          <div style={{ width: '100%', position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
            <Image src={product.image} alt={product.name} fill sizes="(max-width: 768px) 100vw, 600px" style={{ objectFit: 'cover' }} />
          </div>

          {/* Content */}
          <div style={{ padding: '20px' }}>

            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', flex: 1 }}>
                <div className="product-card-veg-icon" style={{ marginTop: '4px', display: 'flex', alignItems: 'center' }}>
                  {product.isVeg ? (
                    <span className="veg-icon" title="Eggless"><span className="veg-dot"></span></span>
                  ) : (
                    <span className="veg-icon non-veg-icon" title="Contains Egg"><span className="veg-dot non-veg-dot"></span></span>
                  )}
                </div>
                <h2 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--color-primary)', fontWeight: 700, lineHeight: 1.3 }}>{product.name}</h2>
              </div>
              <div style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: '1.1rem', marginLeft: '16px', whiteSpace: 'nowrap' }}>
                {product.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </div>
            </div>

            <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '20px' }}>{product.description}</p>

            <div style={{ height: '1px', backgroundColor: 'var(--color-border)', margin: '20px 0' }}></div>

            {product.sizes && product.sizes.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--color-primary)', marginBottom: '16px' }}>
                  Select Size <span style={{ color: '#888', fontSize: '0.9rem', fontWeight: 400 }}>(0/1)</span><span style={{ color: '#e53935', marginLeft: '4px' }}>*</span>
                </h3>
                <div>
                  {product.sizes.map((size, idx) => (
                    <label key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', cursor: 'pointer', borderBottom: '1px solid var(--color-border)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <input
                          type="radio"
                          name={`size-${product.id}`}
                          checked={selectedSize === idx}
                          onChange={() => setSelectedSize(idx)}
                          style={{ width: '20px', height: '20px', accentColor: 'var(--color-primary)' }}
                        />
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          {size.image && <div style={{ width: 48, height: 48, flexShrink: 0, position: 'relative' }}><Image src={size.image} alt={size.name} fill sizes="48px" style={{ borderRadius: 4, objectFit: 'cover', border: '1px solid var(--color-border)' }} /></div>}
                          <span style={{ fontSize: '1rem', color: 'var(--color-primary)' }}>{size.name}</span>
                        </div>
                      </div>
                      <span style={{ fontSize: '0.95rem', color: '#666' }}>+ {size.price.toFixed(2)}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {product.sizes && product.sizes.length > 0 && product.addons && product.addons.length > 0 && (
              <div style={{ height: '8px', backgroundColor: '#F1F1F6', margin: '0 -20px 24px -20px' }}></div>
            )}

            {product.addons && product.addons.length > 0 && (
              <div>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--color-primary)', marginBottom: '16px' }}>Add-ons</h3>
                <div>
                  {product.addons.map((addon, idx) => (
                    <label key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', cursor: 'pointer', borderBottom: '1px solid var(--color-border)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <input
                          type="checkbox"
                          checked={selectedAddons.has(idx)}
                          onChange={() => handleAddonToggle(idx)}
                          style={{ width: '20px', height: '20px', accentColor: 'var(--color-primary)' }}
                        />
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          {addon.image && <div style={{ width: 48, height: 48, flexShrink: 0, position: 'relative' }}><Image src={addon.image} alt={addon.name} fill sizes="48px" style={{ borderRadius: 4, objectFit: 'cover', border: '1px solid #EBEBEB' }} /></div>}
                          <span style={{ fontSize: '1rem', color: 'var(--color-primary)' }}>{addon.name}</span>
                        </div>
                      </div>
                      <span style={{ fontSize: '0.95rem', color: '#666' }}>+ {addon.price.toFixed(2)}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Fixed Bar */}
        <div className="product-modal-footer">
          {(() => {
            const currentSelectedSizeName = product.sizes && product.sizes.length > 0 ? product.sizes[selectedSize]?.name : null;
            const currentSelectedAddonNames = product.addons && product.addons.length > 0 ? Array.from(selectedAddons).map(idx => product.addons[idx]?.name).filter(Boolean) : [];
            const addonsStr = currentSelectedAddonNames.length > 0 ? currentSelectedAddonNames.sort().join('_') : '';
            const currentCartItemId = `${product.id}-${currentSelectedSizeName || 'default'}-${addonsStr}`;

            const cartItem = cartItems.find(item => item.cartItemId === currentCartItemId);
            const currentQuantity = cartItem ? cartItem.quantity : 0;

            if (currentQuantity > 0) {
              return (
                <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid var(--color-primary)', borderRadius: '4px', padding: '4px 8px', background: '#fff' }}>
                    <button
                      onClick={() => updateQuantity(currentCartItemId, -1)}
                      style={{ padding: '8px', background: 'transparent', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                    </button>
                    <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                      {currentQuantity}
                    </span>
                    <button
                      disabled={product.isSoldOut}
                      onClick={() => {
                        if (product.isSoldOut) return;
                        if (product.customisable || (product.sizes && product.sizes.length > 0)) {
                          if (onRepeatSelect) onRepeatSelect(product);
                        } else {
                          updateQuantity(currentCartItemId, 1);
                        }
                      }}
                      style={{ padding: '8px', background: 'transparent', border: 'none', color: product.isSoldOut ? '#ccc' : 'var(--color-primary)', cursor: product.isSoldOut ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                    </button>
                  </div>
                  <Link
                    href="/cart"
                    style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: 'var(--color-primary)', color: '#FFF', border: 'none', borderRadius: '4px', padding: '14px', textDecoration: 'none', fontWeight: 700, letterSpacing: '0.5px' }}
                  >
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63-.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                    GO TO CART
                  </Link>
                </div>
              );
            }

            if (product.isSoldOut) {
              return (
                <button
                  disabled
                  style={{ width: '100%', backgroundColor: '#ccc', color: '#888', border: 'none', borderRadius: '4px', padding: '14px', fontSize: '1rem', fontWeight: 700, cursor: 'not-allowed', letterSpacing: '0.5px' }}
                >
                  SOLD OUT
                </button>
              );
            }

            return (
              <button
                style={{ width: '100%', backgroundColor: 'var(--color-primary)', color: '#FFF', border: 'none', borderRadius: '4px', padding: '14px', fontSize: '1rem', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.5px' }}
                onClick={() => {
                  addToCart({
                    product,
                    selectedSize: currentSelectedSizeName,
                    selectedAddons: currentSelectedAddonNames,
                    totalPrice
                  });
                }}>
                ADD TO CART
              </button>
            );
          })()}
        </div>

      </div>
    </div>
  );
}
