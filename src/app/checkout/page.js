"use client";

import { useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { cartItems, isLoaded } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    time: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    houseNo: '',
    landmark: ''
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
    if (!formData.time) newErrors.time = "Delivery time slot is required.";
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

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        // 1. Create order on backend
        const response = await fetch('/api/payment/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: 'dummy-user-id', // Replace with real logged-in user ID
            totalAmount: grandTotal,
            items: cartItems.map(item => ({
              productId: item.productId || 'dummy-product-id', // Ensure productId is passed
              quantity: item.quantity,
              price: item.price
            }))
          })
        });

        const data = await response.json();

        if (data.success) {
          // 2. Initialize Razorpay popup
          const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Ensure you add NEXT_PUBLIC_RAZORPAY_KEY_ID to .env
            amount: data.amount,
            currency: data.currency,
            name: "Porto's Bake at Home",
            description: "Order Payment",
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
            }
          };

          const paymentObject = new window.Razorpay(options);
          paymentObject.open();
        } else {
          setShowModal({ isOpen: true, type: 'error', message: 'Failed to initiate payment.' });
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

  const itemTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCharges = 60;
  const grandTotal = itemTotal + deliveryCharges;

  return (
    <div className="checkout-container">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <style>{`
        .checkout-container {
          display: flex;
          flex-direction: column;
          max-width: 1200px;
          margin: 0 auto;
          min-height: 100vh;
        }
        @media (min-width: 900px) {
          .checkout-container {
            flex-direction: row;
          }
        }
        .checkout-left {
          flex: 1.2;
          padding: 48px 24px;
        }
        .checkout-right {
          flex: 0.8;
          padding: 48px 24px;
          background-color: #FAFAFA;
        }
        @media (min-width: 900px) {
          .checkout-right {
            border-left: 1px solid #E5E5E5;
            padding-left: 48px;
          }
          .checkout-left {
            padding-right: 48px;
          }
        }
        .section-card {
          margin-bottom: 32px;
        }
        .section-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: #333;
          margin-bottom: 20px;
          border-bottom: 1px solid #E5E5E5;
          padding-bottom: 12px;
        }
        .form-input {
          width: 100%;
          padding: 16px;
          border-radius: 12px;
          border: 1px solid #E5E5E5;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.2s ease;
          background-color: #FAFAFA;
        }
        .form-input:focus {
          border-color: #5A3424;
          background-color: #FFF;
        }
        .form-input.error {
          border-color: #D32F2F;
          background-color: #FEF6F6;
        }
        .input-group {
          margin-bottom: 16px;
        }
        .input-label {
          display: block;
          font-size: 0.9rem;
          font-weight: 600;
          color: #555;
          margin-bottom: 8px;
        }
        .error-message {
          color: #D32F2F;
          font-size: 0.85rem;
          margin-top: 6px;
          font-weight: 500;
        }
        .row-flex {
          display: flex;
          gap: 16px;
        }
        @media (max-width: 600px) {
          .row-flex {
            flex-direction: column;
          }
        }
        .payment-card {
          border: 2px solid #E5E5E5;
          border-radius: 12px;
          padding: 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
          transition: all 0.2s ease;
        }
        .payment-card.active {
          border-color: #5A3424;
          background-color: #FDF9F7;
        }
        .radio-btn {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid #DDD;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .payment-card.active .radio-btn {
          border-color: #5A3424;
        }
        .radio-btn::after {
          content: "";
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #5A3424;
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        .payment-card.active .radio-btn::after {
          opacity: 1;
        }
        .place-order-btn {
          width: 100%;
          background-color: #5A3424;
          color: #FFF;
          padding: 18px;
          border-radius: 16px;
          font-size: 1.15rem;
          font-weight: bold;
          border: none;
          cursor: pointer;
          transition: background-color 0.2s ease, transform 0.2s ease;
          box-shadow: 0 8px 20px rgba(90, 52, 36, 0.25);
        }
        .place-order-btn:hover {
          background-color: #4a2b1d;
          transform: translateY(-2px);
        }
        .mobile-sticky-bottom {
          margin-top: 32px;
        }
        @media (max-width: 768px) {
          .mobile-sticky-bottom {
            position: sticky;
            bottom: 24px;
            z-index: 100;
            padding: 0;
            margin-top: 32px;
          }
        }
      `}</style>

      {/* LEFT COLUMN - FORM */}
      <div className="checkout-left">
        {/* 1. Checkout Header */}
        <div style={{ padding: '0 0 32px 0', textAlign: 'left' }}>
          <h1 style={{ color: '#5A3424', fontSize: '2rem', fontWeight: '800', marginBottom: '8px' }}>Checkout</h1>
          <p style={{ color: '#888', fontSize: '1rem' }}>Complete your order details</p>
        </div>

        {/* 2. Delivery Slot Section */}
        <div className="section-card">
          <h2 className="section-title">Delivery Slot</h2>
          <div className="row-flex">
            <div style={{ flex: 1 }} className="input-group">
              <label className="input-label">Delivery Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className={`form-input ${errors.date ? 'error' : ''}`}
              />
              {errors.date && <div className="error-message">{errors.date}</div>}
            </div>
            <div style={{ flex: 1 }} className="input-group">
              <label className="input-label">Delivery Time</label>
              <select 
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className={`form-input ${errors.time ? 'error' : ''}`}
              >
                <option value="" disabled>Select Time </option>
                <option value="9-11">9:00 AM – 11:00 AM</option>
                <option value="11-1">11:00 AM – 1:00 PM</option>
                <option value="1-3">1:00 PM – 3:00 PM</option>
                <option value="3-5">3:00 PM – 5:00 PM</option>
                <option value="5-7">5:00 PM – 7:00 PM</option>
              </select>
              {errors.time && <div className="error-message">{errors.time}</div>}
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
              />
            </div>
            {errors.phone && <div className="error-message">{errors.phone}</div>}
          </div>
        </div>

        {/* 4. Delivery Address */}
        <div className="section-card">
          <h2 className="section-title">Delivering To</h2>

          <button 
            type="button"
            onClick={(e) => { e.preventDefault(); alert("Location access requested! (Implementation placeholder)"); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#F5F8FF',
              border: '1px solid #4285F4',
              color: '#4285F4',
              padding: '10px 16px',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '0.9rem',
              cursor: 'pointer',
              marginBottom: '20px',
              width: 'fit-content'
            }}>
            📍 Use Current Location
          </button>

          <div className="input-group">
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className={`form-input ${errors.address ? 'error' : ''}`}
              placeholder="Delivery Address"
              rows="3"
              style={{ resize: 'vertical' }}
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
            />
            {errors.houseNo && <div className="error-message">{errors.houseNo}</div>}
          </div>

          <div className="input-group" style={{ marginBottom: 0 }}>
            <input 
              type="text" 
              name="landmark"
              value={formData.landmark}
              onChange={handleInputChange}
              className="form-input" 
              placeholder="Nearest Landmark (Optional)" 
            />
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
                <img src={item.product.image} alt={item.product.name} style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #E5E5E5' }} />
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
                ₹{item.price * item.quantity}
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
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          animation: 'fadeIn 0.2s ease'
        }}>
          <div style={{
            backgroundColor: '#FFF',
            padding: '32px',
            borderRadius: '16px',
            maxWidth: '400px',
            width: '90%',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
            transform: 'translateY(-20px)',
            animation: 'slideDown 0.3s ease forwards'
          }}>
            <h3 style={{ margin: '0 0 16px 0', color: showModal.type === 'error' ? '#D32F2F' : '#5A3424', fontSize: '1.3rem' }}>
              {showModal.type === 'error' ? 'Validation Error' : 'Success!'}
            </h3>
            <p style={{ color: '#555', marginBottom: '24px', fontSize: '1rem', lineHeight: '1.5' }}>
              {showModal.message}
            </p>
            <button 
              onClick={() => setShowModal({ isOpen: false, type: '', message: '' })}
              style={{
                backgroundColor: showModal.type === 'error' ? '#D32F2F' : '#5A3424',
                color: '#FFF',
                border: 'none',
                padding: '14px 24px',
                borderRadius: '12px',
                fontWeight: 'bold',
                cursor: 'pointer',
                width: '100%',
                fontSize: '1rem',
                transition: 'background-color 0.2s ease'
              }}
            >
              OK
            </button>
          </div>
          <style>{`
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes slideDown { from { transform: translateY(-30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
          `}</style>
        </div>
      )}

    </div>
  );
}
