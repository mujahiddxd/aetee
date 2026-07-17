import React from 'react';

export function ProductCard({ product, onSelect }) {
  // Add some mock tags based on product name to match the screenshot
  const tag = product.name.includes("Choco") ? "MUST TRY" : product.name.includes("Mango") ? "NEW!" : null;

  return (
    <div className="product-card">
      <div className="product-image-container" onClick={() => onSelect(product)} style={{ cursor: 'pointer' }}>
        <img src={product.image} alt={product.name} className="product-image" />
      </div>

      <div className="product-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
          {tag ? (
            <span style={{ backgroundColor: '#e53935', color: 'white', fontSize: '0.65rem', fontWeight: 600, padding: '2px 6px', letterSpacing: '0.05em' }}>{tag}</span>
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

          <button
            onClick={() => onSelect(product)}
            style={{ padding: '0', background: 'transparent', border: 'none', color: 'var(--color-primary)', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            ADD+
          </button>
        </div>
      </div>
    </div>
  );
}
