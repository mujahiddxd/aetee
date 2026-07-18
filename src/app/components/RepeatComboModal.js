import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export function RepeatComboModal({ product, onClose, onSelectNew }) {
  const { cartItems, updateQuantity } = useCart();
  
  // Find all items in the cart that match this product
  const existingItems = cartItems.filter(item => item.product.id === product.id);
  
  // State for which combination is selected to repeat. Defaults to the first one.
  const [selectedCartItemId, setSelectedCartItemId] = useState(existingItems.length > 0 ? existingItems[0].cartItemId : null);

  const handleRepeat = () => {
    if (selectedCartItemId) {
      updateQuantity(selectedCartItemId, 1);
      onClose();
    }
  };

  return (
    <div className="repeat-combo-modal-container" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 10000, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }} onClick={onClose}>
      <div className="repeat-combo-modal-content" style={{ backgroundColor: '#FFF', width: '100%', maxWidth: '500px', borderTopLeftRadius: '16px', borderTopRightRadius: '16px', padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
        
        <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#000', fontWeight: 700, textTransform: 'uppercase' }}>Add another {product.name}</h3>
        
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <div style={{ color: 'var(--color-text-main)', backgroundColor: '#EEF8F3', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid #D4EADD' }}>
            <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1 4 1 10 7 10"></polyline>
              <path d="M3.51 15a9 9 0 1 0 .49-3.51"></path>
            </svg>
          </div>
          <p style={{ margin: '2px 0 0 0', fontSize: '0.9rem', color: '#666', lineHeight: 1.4 }}>Choose from your previous combinations or create a new one.</p>
        </div>

        <div style={{ height: '1px', backgroundColor: '#EEE', margin: '4px 0' }}></div>

        <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#000' }}>Your previous combinations</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {existingItems.map(item => (
            <div 
              key={item.cartItemId} 
              onClick={() => setSelectedCartItemId(item.cartItemId)}
              style={{ 
                border: `1px solid ${selectedCartItemId === item.cartItemId ? 'var(--color-primary)' : '#DDD'}`, 
                borderRadius: '8px', 
                padding: '16px', 
                display: 'flex', 
                justifyContent: 'space-between', 
                cursor: 'pointer',
                backgroundColor: selectedCartItemId === item.cartItemId ? '#F6FBFA' : '#FFF'
              }}
            >
              <div>
                {item.selectedSize && <p style={{ margin: '0 0 4px 0', fontSize: '0.95rem', color: '#000', fontWeight: 500 }}>{item.selectedSize}</p>}
                {item.selectedAddons && item.selectedAddons.length > 0 && (
                  <div style={{ marginBottom: '8px' }}>
                    {item.selectedAddons.map((addon, idx) => (
                      <p key={idx} style={{ margin: '4px 0', fontSize: '0.95rem', color: '#000', fontWeight: 500 }}>+ {addon}</p>
                    ))}
                  </div>
                )}
                {!item.selectedSize && (!item.selectedAddons || item.selectedAddons.length === 0) && (
                  <p style={{ margin: '0 0 4px 0', fontSize: '0.95rem', color: '#000', fontWeight: 500 }}>Standard</p>
                )}
                <p style={{ margin: '8px 0 0 0', fontSize: '0.85rem', color: '#888' }}>Qty: {item.quantity}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {selectedCartItemId === item.cartItemId ? (
                  <div style={{ width: '20px', height: '20px', backgroundColor: 'var(--color-primary)', borderRadius: '50%' }}></div>
                ) : (
                  <div style={{ width: '20px', height: '20px', border: '2px solid #DDD', borderRadius: '50%' }}></div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div 
          onClick={() => {
            onClose();
            onSelectNew(product);
          }}
          style={{ 
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
            padding: '16px', border: '1px dashed #CCC', borderRadius: '8px', 
            cursor: 'pointer', marginTop: '4px' 
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ color: 'var(--color-primary)', backgroundColor: '#EEF8F3', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </div>
            <div>
              <p style={{ margin: '0 0 4px 0', fontSize: '0.95rem', fontWeight: 700, color: '#000' }}>Create a new combination</p>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#888' }}>Choose your own flavours and quantity</p>
            </div>
          </div>
          <div style={{ color: '#888' }}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path>
            </svg>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
          <button onClick={onClose} style={{ flex: 1, padding: '14px', backgroundColor: '#FFF', border: '1px solid #CCC', borderRadius: '6px', fontSize: '0.95rem', fontWeight: 700, color: '#444', cursor: 'pointer' }}>
            CANCEL
          </button>
          <button 
            disabled={product.isSoldOut}
            onClick={handleRepeat} 
            style={{ flex: 1, padding: '14px', backgroundColor: product.isSoldOut ? '#ccc' : 'var(--color-primary)', border: 'none', borderRadius: '6px', fontSize: '0.95rem', fontWeight: 700, color: product.isSoldOut ? '#888' : '#FFF', cursor: product.isSoldOut ? 'not-allowed' : 'pointer' }}
          >
            {product.isSoldOut ? 'SOLD OUT' : 'REPEAT COMBINATION'}
          </button>
        </div>

      </div>
      
      <style>{`
        @media (min-width: 768px) {
          .repeat-combo-modal-container {
            align-items: center !important;
          }
          .repeat-combo-modal-content {
            border-bottom-left-radius: 16px !important;
            border-bottom-right-radius: 16px !important;
          }
        }
      `}</style>
      
    </div>
  );
}
