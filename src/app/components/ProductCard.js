"use client";
import React from 'react';
import { useCart } from '../context/CartContext';

export function ProductCard({ product, onSelect }) {
  const { cartItems, addToCart, updateQuantity } = useCart();

  // Data-driven tag based on actual product flags from the admin panel
  const tag = product.isSoldOut ? "SOLD OUT" : product.isBestSelling ? "BEST SELLER" : product.isFeatured ? "FEATURED" : null;
  const tagColor = product.isSoldOut ? '#888' : product.isBestSelling ? '#e53935' : '#F5A623';

  return (
    <div className="product-card" style={{ opacity: product.isSoldOut ? 0.6 : 1 }}>
      <div className="product-image-container" onClick={() => onSelect(product)} style={{ cursor: 'pointer' }}>
        <img src={product.image} alt={product.name} className="product-image" />
      </div>

      <div className="product-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
          {tag ? (
            <span style={{ backgroundColor: tagColor, color: 'white', fontSize: '0.65rem', fontWeight: 600, padding: '2px 6px', letterSpacing: '0.05em' }}>{tag}</span>
          ) : <div></div>}

          <div className="product-card-veg-icon">
            {product.isVeg ? (
              <span className="veg-icon"><span className="veg-dot"></span></span>
            ) : (
              <span className="veg-icon non-veg-icon"><span className="veg-dot non-veg-dot"></span></span>
            )}
          </div>
        </div>

        <h2 className="product-title" onClick={() => onSelect(product)} style={{ cursor: 'pointer', fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-primary)', margin: '0 0 6px 0', lineHeight: '1.2' }}>{product.name}</h2>
        <p className="product-description" style={{ fontSize: '0.75rem', color: '#8d7b68', margin: '0 0 12px 0', lineHeight: '1.3', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{product.description}</p>

        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div className="product-price" style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-primary)' }}>
            {product.price.toLocaleString('en-IN')}
          </div>

          {product.isSoldOut ? (
            <button
              disabled
              style={{ padding: '0', background: 'transparent', border: 'none', color: '#ccc', fontSize: '0.9rem', fontWeight: 600, cursor: 'not-allowed', display: 'flex', alignItems: 'center' }}
            >
              SOLD OUT
            </button>
          ) : (() => {
            // Find how many of this product are in the cart
            const matchingItems = cartItems.filter(item => item.product.id === product.id);
            const cartQuantity = matchingItems.reduce((sum, item) => sum + item.quantity, 0);

            if (cartQuantity > 0) {
              return (
                <div style={{ display: 'flex', alignItems: 'center', background: '#fff', border: '1px solid var(--color-primary)', borderRadius: '6px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(74,44,29,0.1)' }}>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      // If multiple variations exist, remove from the last one
                      const lastItem = matchingItems[matchingItems.length - 1];
                      updateQuantity(lastItem.cartItemId, -1);
                    }} 
                    style={{ padding: '4px 12px', background: 'transparent', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold' }}
                  >
                    -
                  </button>
                  <span style={{ padding: '0 4px', fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-primary)', minWidth: '16px', textAlign: 'center' }}>
                    {cartQuantity}
                  </span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (product.customisable || (product.sizes && product.sizes.length > 0)) {
                        onSelect(product); // Open modal for customisation
                      } else {
                        // Simply increment
                        updateQuantity(matchingItems[0].cartItemId, 1);
                      }
                    }} 
                    style={{ padding: '4px 12px', background: 'transparent', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', fontSize: '1.1rem', fontWeight: 'bold' }}
                  >
                    +
                  </button>
                </div>
              );
            }

            return (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (product.customisable || (product.sizes && product.sizes.length > 0)) {
                    onSelect(product);
                  } else {
                    addToCart({
                      product,
                      selectedSize: null,
                      selectedAddons: [],
                      totalPrice: product.price
                    });
                  }
                }}
                style={{ padding: '0', background: 'transparent', border: 'none', color: 'var(--color-primary)', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              >
                {product.customisable || (product.sizes && product.sizes.length > 0) ? 'ADD+' : 'ADD'}
              </button>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
