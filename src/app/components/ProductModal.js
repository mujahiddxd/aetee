import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

export function ProductModal({ product, onClose }) {
  const { addToCart } = useCart();
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

  const totalPrice = product.price +
    (product.sizes?.[selectedSize]?.price || 0) +
    Array.from(selectedAddons).reduce((sum, idx) => sum + (product.addons?.[idx]?.price || 0), 0);

  return (
    <div className="product-modal-overlay" onClick={onClose}>
      <div className="product-modal-container" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="product-modal-header">
          <button onClick={onClose} className="product-modal-close-btn">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
          </button>
        </div>

        <div className="product-modal-body">
          {/* Image */}
          <div style={{ width: '100%' }}>
            <img src={product.image} alt={product.name} style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '400px', objectFit: 'cover' }} />
          </div>

          {/* Content */}
          <div style={{ padding: '20px' }}>
            
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', flex: 1 }}>
                <div className="product-card-veg-icon" style={{ marginTop: '4px' }}>
                  {product.isVeg ? (
                    <span className="veg-icon"><span className="veg-dot"></span></span>
                  ) : (
                    <span className="veg-icon non-veg-icon"><span className="veg-dot non-veg-dot"></span></span>
                  )}
                </div>
                <h2 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--color-primary)', fontWeight: 700, lineHeight: 1.3 }}>{product.name}</h2>
              </div>
              <div style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: '1.1rem', marginLeft: '16px', whiteSpace: 'nowrap' }}>
                {product.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </div>
            </div>

            <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '20px' }}>{product.description}</p>
            
            <div style={{ height: '1px', backgroundColor: '#EBEBEB', margin: '20px 0' }}></div>

            {product.sizes && product.sizes.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--color-primary)', marginBottom: '16px' }}>
                  Select Size <span style={{ color: '#888', fontSize: '0.9rem', fontWeight: 400 }}>(0/1)</span><span style={{ color: '#e53935', marginLeft: '4px' }}>*</span>
                </h3>
                <div>
                  {product.sizes.map((size, idx) => (
                    <label key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', cursor: 'pointer', borderBottom: '1px solid #F5F5F5' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <input
                          type="radio"
                          name={`size-${product.id}`}
                          checked={selectedSize === idx}
                          onChange={() => setSelectedSize(idx)}
                          style={{ width: '20px', height: '20px', accentColor: 'var(--color-primary)' }}
                        />
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          {size.image && <img src={size.image} alt={size.name} style={{ width: 48, height: 48, borderRadius: 4, objectFit: 'cover', border: '1px solid #EBEBEB' }} />}
                          <span style={{ fontSize: '1rem', color: 'var(--color-primary)' }}>{size.name}</span>
                        </div>
                      </div>
                      <span style={{ fontSize: '0.95rem', color: '#666' }}>+ {size.price.toFixed(2)}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {product.addons && product.addons.length > 0 && (
              <div>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--color-primary)', marginBottom: '16px' }}>Add-ons</h3>
                <div>
                  {product.addons.map((addon, idx) => (
                    <label key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', cursor: 'pointer', borderBottom: '1px solid #F5F5F5' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <input
                          type="checkbox"
                          checked={selectedAddons.has(idx)}
                          onChange={() => handleAddonToggle(idx)}
                          style={{ width: '20px', height: '20px', accentColor: 'var(--color-primary)' }}
                        />
                        <span style={{ fontSize: '1rem', color: 'var(--color-primary)' }}>{addon.name}</span>
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
          <button 
            style={{ width: '100%', backgroundColor: 'var(--color-primary)', color: '#FFF', border: 'none', borderRadius: '4px', padding: '14px', fontSize: '1rem', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.5px' }}
            onClick={() => {
              addToCart({
                product,
                selectedSize: product.sizes && product.sizes.length > 0 ? product.sizes[selectedSize]?.name : null,
                selectedAddons: product.addons && product.addons.length > 0 ? Array.from(selectedAddons).map(idx => product.addons[idx]?.name).filter(Boolean) : [],
                totalPrice
              });
              alert(`${product.name} added to cart!`);
              onClose();
            }}>
            ADD TO CART
          </button>
        </div>

      </div>
    </div>
  );
}
