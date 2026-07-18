"use client";

import { useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';

import { useCart } from '../context/CartContext';
import './checkout.css';

export default function Checkout() {
  const { cartItems, isLoaded } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    houseNo: '',
    landmark: '',
    additionalInfo: '',
    pincode: '400001'
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState({ isOpen: false, type: '', message: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePaymentSelect = (method) => {
    setPaymentMethod(method);
    if (errors.paymentMethod) {
      setErrors(prev => ({ ...prev, paymentMethod: '' }));
    }
  };

  const handlePlaceOrder = async () => {
    const newErrors = {};

    if (!formData.date) newErrors.date = "Delivery date is required.";
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required.";

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Mobile number is required.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Mobile number must be exactly 10 digits.";
    }

    if (!formData.address.trim()) newErrors.address = "Delivery address is required.";
    if (!formData.houseNo.trim()) newErrors.houseNo = "House number or apartment is required.";

    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required.";
    } else if (!/^400\d{3}$/.test(formData.pincode)) {
      newErrors.pincode = "Sorry, we currently only deliver to Mumbai (400xxx) pincodes.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        // 1. Create order on backend
        const response = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            addressLine1: `${formData.houseNo}, ${formData.address}`,
            addressLine2: formData.landmark || null,
            city: 'Mumbai',
            postalCode: formData.pincode,
            totalAmount: grandTotal,
            items: cartItems.map(item => ({
              productId: item.product.id,
              quantity: item.quantity,
              price: item.price,
              size: item.selectedSize || null,
              addons: item.selectedAddons && item.selectedAddons.length > 0 ? item.selectedAddons.join(', ') : null
            }))
          })
        });

        const data = await response.json();

        if (data.success) {
          // Create a specific description of the items being purchased
          const orderDescription = cartItems.map(item => {
            let desc = `${item.quantity}x ${item.product.name}`;
            if (item.selectedSize) desc += ` [${item.selectedSize}]`;
            if (item.selectedAddons && item.selectedAddons.length > 0) desc += ` + ${item.selectedAddons.join(', ')}`;
            return desc;
          }).join(' | ');

          // 2. Initialize Razorpay popup
          const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Ensure you add NEXT_PUBLIC_RAZORPAY_KEY_ID to .env
            amount: data.amount,
            currency: data.currency,
            name: "Aetee's Bakehouse",
            description: orderDescription.length > 255 ? orderDescription.substring(0, 252) + '...' : orderDescription,
            order_id: data.orderId,
            handler: async function (response) {
              // 3. Verify Payment
              const verifyRes = await fetch('/api/payment/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature
                })
              });

              const verifyData = await verifyRes.json();
              if (verifyData.success) {
                setShowModal({ isOpen: true, type: 'success', message: 'Payment successful and order placed!' });
              } else {
                setShowModal({ isOpen: true, type: 'error', message: 'Payment verification failed!' });
              }
            },
            prefill: {
              name: `${formData.firstName} ${formData.lastName}`,
              email: formData.email,
              contact: formData.phone
            },
            theme: {
              color: "#5A3424"
            },
            modal: {
              ondismiss: function () {
                setShowModal({ isOpen: true, type: 'error', message: 'Payment was cancelled by the user.' });
              }
            }
          };

          const paymentObject = new window.Razorpay(options);
          paymentObject.on('payment.failed', function (response) {
            setShowModal({ isOpen: true, type: 'error', message: 'Payment failed: ' + response.error.description });
          });
          paymentObject.open();
        } else {
          setShowModal({ isOpen: true, type: 'error', message: data.error || 'Failed to initiate payment.' });
        }
      } catch (error) {
        console.error("Payment error:", error);
        setShowModal({ isOpen: true, type: 'error', message: 'An error occurred while processing payment.' });
      }
    } else {
      setShowModal({ isOpen: true, type: 'error', message: 'Invalid input! Please check all highlighted fields.' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const itemTotal = parseFloat(cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2));
  const deliveryCharges = 1;
  const grandTotal = parseFloat((itemTotal + deliveryCharges).toFixed(2));

  return (
    <div className="checkout-container">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />


      {/* LEFT COLUMN - FORM */}
      <div className="checkout-left">
        {/* 1. Checkout Header */}
        <div style={{ padding: '0 0 32px 0', textAlign: 'left' }}>
          <h1 style={{ color: '#5A3424', fontSize: '2rem', fontWeight: '800', marginBottom: '8px' }}>Checkout</h1>
          <p style={{ color: '#888', fontSize: '1rem' }}>Complete your order details</p>
        </div>

        {/* 2. Delivery Date Section */}
        <div className="section-card">
          <h2 className="section-title">Delivery Date</h2>
          <div className="row-flex">
            <div style={{ flex: 1 }} className="input-group">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className={`form-input ${errors.date ? 'error' : ''}`}
                required
              />
              {errors.date && <div className="error-message">{errors.date}</div>}
            </div>
          </div>
        </div>

        {/* 3. Customer Information */}
        <div className="section-card">
          <h2 className="section-title">Customer Information</h2>

          <div className="row-flex">
            <div style={{ flex: 1 }} className="input-group">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`form-input ${errors.firstName ? 'error' : ''}`}
                placeholder="First Name"
                required
                minLength={2}
              />
              {errors.firstName && <div className="error-message">{errors.firstName}</div>}
            </div>
            <div style={{ flex: 1 }} className="input-group">
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`form-input ${errors.lastName ? 'error' : ''}`}
                placeholder="Last Name"
                required
                minLength={2}
              />
              {errors.lastName && <div className="error-message">{errors.lastName}</div>}
            </div>
          </div>

          <div className="input-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`form-input ${errors.email ? 'error' : ''}`}
              placeholder="Email Address"
              required
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>

          <div className="input-group" style={{ marginBottom: 0 }}>
            <label className="input-label">Mobile Number for Order Notifications</label>
            <div style={{ display: 'flex' }}>
              <div style={{
                padding: '16px',
                backgroundColor: errors.phone ? '#FEF6F6' : '#F0F0F0',
                borderWidth: '1px 0px 1px 1px',
                borderStyle: 'solid',
                borderColor: errors.phone ? '#D32F2F' : '#E5E5E5',
                borderRadius: '12px 0 0 12px',
                fontWeight: '600',
                color: '#555',
                display: 'flex',
                alignItems: 'center',
                transition: 'all 0.2s ease'
              }}>
                +91
              </div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`form-input ${errors.phone ? 'error' : ''}`}
                placeholder="Phone Number"
                style={{ borderRadius: '0 12px 12px 0' }}
                required
                pattern="[0-9]{10}"
                maxLength={10}
                minLength={10}
              />
            </div>
            {errors.phone && <div className="error-message">{errors.phone}</div>}
          </div>
        </div>

        {/* 4. Delivery Address */}
        <div className="section-card">
          <h2 className="section-title">Delivering To</h2>

          <div className="input-group">
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className={`form-input ${errors.address ? 'error' : ''}`}
              placeholder="Delivery Address"
              rows="3"
              style={{ resize: 'vertical' }}
              required
            ></textarea>
            {errors.address && <div className="error-message">{errors.address}</div>}
          </div>

          <div className="input-group">
            <input
              type="text"
              name="houseNo"
              value={formData.houseNo}
              onChange={handleInputChange}
              className={`form-input ${errors.houseNo ? 'error' : ''}`}
              placeholder="House No / Apartment"
              required
            />
            {errors.houseNo && <div className="error-message">{errors.houseNo}</div>}
          </div>

          <div className="row-flex" style={{ marginBottom: 0 }}>
            <div style={{ flex: 1 }} className="input-group">
              <input
                type="text"
                name="landmark"
                value={formData.landmark}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Nearest Landmark (Optional)"
              />
            </div>
            <div style={{ flex: 1 }} className="input-group">
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                className={`form-input ${errors.pincode ? 'error' : ''}`}
                placeholder="Pincode (Mumbai Only)"
                maxLength="6"
                required
                pattern="^400[0-9]{3}$"
              />
              {errors.pincode && <div className="error-message">{errors.pincode}</div>}
            </div>
          </div>
        </div>

        {/* 5. Additional Information */}
        <div className="section-card">
          <h2 className="section-title">Additional Information</h2>
          <div className="input-group" style={{ marginBottom: 0 }}>
            <textarea
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Any special instructions for your order? (Optional)"
              rows="3"
              style={{ resize: 'vertical' }}
            ></textarea>
          </div>
        </div>

        {/* Place Order Button - Desktop/Mobile */}
        <div className="mobile-sticky-bottom">
          <button className="place-order-btn" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>
      </div>

      {/* RIGHT COLUMN - ORDER SUMMARY */}
      <div className="checkout-right">
        {/* Order Items */}
        <div style={{ marginBottom: '32px' }}>
          {cartItems.map(item => (
            <div key={item.cartItemId} style={{ display: 'flex', alignItems: 'center', marginBottom: '16px', gap: '16px' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ width: 64, height: 64, position: 'relative' }}>
                  <img src={item.product.image} alt={item.product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px', border: '1px solid #E5E5E5' }} />
                </div>
                <div style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  backgroundColor: '#777',
                  color: '#FFF',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 'bold'
                }}>
                  {item.quantity}
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: '600', color: '#333', margin: '0 0 4px 0' }}>{item.product.name}</h3>
                {item.selectedSize && <p style={{ margin: 0, fontSize: '0.75rem', color: '#666' }}>Size: {item.selectedSize}</p>}
                {item.selectedAddons && item.selectedAddons.length > 0 && <p style={{ margin: 0, fontSize: '0.75rem', color: '#666' }}>Addons: {item.selectedAddons.join(', ')}</p>}
              </div>
              <div style={{ fontWeight: '600', color: '#333' }}>
                ₹{(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid #E5E5E5', marginBottom: '16px' }}></div>

        {/* Totals */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: '#555' }}>
          <span>Subtotal</span>
          <span style={{ fontWeight: '500' }}>₹{itemTotal.toFixed(2)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', color: '#555' }}>
          <span>Shipping</span>
          <span style={{ fontWeight: '500' }}>₹{deliveryCharges.toFixed(2)}</span>
        </div>
        <div style={{ borderTop: '1px solid #E5E5E5', margin: '16px 0' }}></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#333' }}>Total</span>
          <span style={{ fontWeight: '800', fontSize: '1.4rem', color: '#000' }}>
            <span style={{ fontSize: '0.85rem', color: '#888', fontWeight: 'normal', marginRight: '8px' }}>INR</span>
            ₹{grandTotal.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Custom Alert Modal */}
      {showModal.isOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(4px)',
          animation: 'fadeIn 0.2s ease'
        }}>
          <div style={{
            backgroundColor: '#FFF',
            padding: '40px 32px',
            borderRadius: '24px',
            maxWidth: '420px',
            width: '90%',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            transform: 'translateY(-20px)',
            animation: 'slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards'
          }}>
            <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center' }}>
              {showModal.type === 'error' ? (
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#FFF0F0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D32F2F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                </div>
              ) : (
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#F0F8F1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </div>
              )}
            </div>

            <h3 style={{ margin: '0 0 12px 0', color: '#333', fontSize: '1.5rem', fontWeight: '800' }}>
              {showModal.type === 'error' ? 'Notice' : 'Success!'}
            </h3>
            <p style={{ color: '#666', marginBottom: '32px', fontSize: '1.05rem', lineHeight: '1.6' }}>
              {showModal.message}
            </p>
            <button
              onClick={() => setShowModal({ isOpen: false, type: '', message: '' })}
              style={{
                backgroundColor: 'var(--color-primary, #5A3424)',
                color: '#FFF',
                border: 'none',
                padding: '16px 32px',
                borderRadius: '12px',
                fontWeight: '700',
                cursor: 'pointer',
                width: '100%',
                fontSize: '1.1rem',
                letterSpacing: '0.5px',
                boxShadow: '0 4px 12px rgba(90, 52, 36, 0.2)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
              onMouseOver={(e) => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 6px 16px rgba(90, 52, 36, 0.3)'; }}
              onMouseOut={(e) => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 4px 12px rgba(90, 52, 36, 0.2)'; }}
            >
              {showModal.type === 'error' ? 'Got it' : 'Continue'}
            </button>
          </div>
          <style>{`
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes slideDown { from { transform: translateY(-40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
          `}</style>
        </div>
      )}

    </div>
  );
}
