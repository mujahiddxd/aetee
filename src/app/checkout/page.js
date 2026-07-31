"use client";

import { useState, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import Image from 'next/image';

import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { getISTHour, getISTDateString } from '@/lib/ist-time';
import DateStrip from '../components/DateStrip';
import './checkout.css';

export default function Checkout() {
  const router = useRouter();
  const { cartItems, isLoaded, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [turnstileReady, setTurnstileReady] = useState(
    typeof window !== 'undefined' && !!window.turnstile
  );
  const turnstileWidgetId = useRef(null);
  const turnstileContainerRef = useRef(null);

  const renderTurnstile = useCallback(() => {
    if (!window.turnstile || !turnstileContainerRef.current) return;
    // Remove any previously rendered widget before re-rendering
    if (turnstileWidgetId.current !== null) {
      try { window.turnstile.remove(turnstileWidgetId.current); } catch (_) { }
      turnstileWidgetId.current = null;
    }
    turnstileContainerRef.current.innerHTML = '';
    turnstileWidgetId.current = window.turnstile.render(turnstileContainerRef.current, {
      sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
      action: 'turnstile-spin-v2',
    });
  }, []);

  const resetTurnstile = useCallback(() => {
    if (window.turnstile && turnstileWidgetId.current !== null) {
      window.turnstile.reset(turnstileWidgetId.current);
    } else {
      renderTurnstile();
    }
  }, [renderTurnstile]);

  // 1. Calculate Minimum Date for the Date Picker
  const getMinDeliveryDateIST = () => {
    const now = new Date();
    const istHour = getISTHour(now);

    // If it's 12 PM IST or later, add 24 hours to enforce tomorrow as the minimum
    const targetDate = istHour >= 12 
      ? new Date(now.getTime() + 24 * 60 * 60 * 1000) 
      : now;

    return getISTDateString(targetDate);
  };
  const minDeliveryDate = getMinDeliveryDateIST();

  const [formData, setFormData] = useState({
    date: minDeliveryDate,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    houseNo: '',
    landmark: '',
    additionalInfo: '',
    pincode: ''
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState({ isOpen: false, type: '', message: '' });
  const [distance, setDistance] = useState(0);

  // Render Turnstile when it's ready and the container is available
  useEffect(() => {
    if (turnstileReady) {
      renderTurnstile();
    }
  }, [turnstileReady, renderTurnstile]);

  useEffect(() => {
    const savedLocation = sessionStorage.getItem('deliveryLocation');
    if (savedLocation) {
      try {
        const info = JSON.parse(savedLocation);
        let extractedPincode = '';
        const pinMatch = info.address.match(/\b(\d{6})\b/);
        if (pinMatch) {
          extractedPincode = pinMatch[1];
        }
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFormData(prev => ({
          ...prev,
          address: info.address || '',
          pincode: extractedPincode
        }));
        if (info.distance) {
          setDistance(info.distance);
        }
      } catch (e) {
        console.error("Could not parse delivery location from session", e);
      }
    }
  }, []);

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

    if (!formData.date) {
      newErrors.date = "Delivery date is required.";
    } else if (formData.date < minDeliveryDate) {
      const now = new Date();
      const todayIST = getISTDateString(now);
      const hourIST = getISTHour(now);
      
      // Specific error if they try to bypass the 12 PM rule for today
      if (formData.date === todayIST && hourIST >= 12) {
        newErrors.date = "Same-day delivery is only available before 12 PM. Please select tomorrow or later.";
      } else {
        // General error for yesterday or earlier
        newErrors.date = "Delivery date cannot be in the past.";
      }
    }
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

    const trimmedPincode = formData.pincode.trim();
    // Pincode is optional since it's locked and auto-fetched. 
    // If fetched, we accept whatever was extracted as long as it's a 6-digit number.
    if (trimmedPincode && !/^\d{6}$/.test(trimmedPincode)) {
      newErrors.pincode = "Invalid pincode format.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Get Turnstile token from the explicitly rendered widget
      let turnstileToken = null;
      if (turnstileWidgetId.current !== null && window.turnstile) {
        turnstileToken = window.turnstile.getResponse(turnstileWidgetId.current);
      }
      // Fallback: check hidden input in case of auto-render
      if (!turnstileToken) {
        const turnstileInput = document.querySelector('[name="cf-turnstile-response"]');
        turnstileToken = turnstileInput?.value || null;
      }
      if (!turnstileToken) {
        setShowModal({ isOpen: true, type: 'error', message: 'Please complete the bot verification challenge before placing your order.' });
        return;
      }

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
            postalCode: trimmedPincode,
            distance: distance,
            totalAmount: grandTotal,
            deliveryDate: formData.date,
            additionalInfo: formData.additionalInfo || null,
            'cf-turnstile-response': turnstileToken,
            items: cartItems.map(item => {
              const eggPrefLabel = item.eggPreference === 'eggless' ? 'Eggless' : item.eggPreference === 'egg' ? 'Egg' : null;
              const addonParts = [];
              if (eggPrefLabel) addonParts.push(eggPrefLabel);
              if (item.selectedAddons && item.selectedAddons.length > 0) addonParts.push(...item.selectedAddons);
              return {
                productId: item.product.id,
                quantity: item.quantity,
                price: item.price,
                size: item.selectedSize || null,
                addons: addonParts.length > 0 ? addonParts.join(', ') : null
              };
            })
          })
        });

        const data = await response.json();

        // This is the magic line that fixes your bug:
        resetTurnstile();
        if (data.success) {
          // Create a specific description of the items being purchased
          const orderDescription = cartItems.map(item => {
            let desc = `${item.quantity}x ${item.product.name}`;
            if (item.selectedSize) desc += ` [${item.selectedSize}]`;
            if (item.eggPreference) desc += ` (${item.eggPreference === 'eggless' ? 'Eggless' : 'Egg'})`;
            if (item.selectedAddons && item.selectedAddons.length > 0) desc += ` + ${item.selectedAddons.join(', ')}`;
            return desc;
          }).join(' | ');

          // 2. Initialize Razorpay popup
          let notesObj = {
            delivery_date: formData.date
          };
          if (formData.additionalInfo && typeof formData.additionalInfo === 'string' && formData.additionalInfo.trim() !== '') {
            notesObj.special_instructions = formData.additionalInfo.substring(0, 255);
          }

          const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Ensure you add NEXT_PUBLIC_RAZORPAY_KEY_ID to .env
            amount: data.amount,
            currency: data.currency,
            name: "Aetee's Bakehouse",
            description: orderDescription.length > 255 ? orderDescription.substring(0, 252) + '...' : orderDescription,
            order_id: data.orderId,
            notes: notesObj,
            handler: async function (response) {
              // 3. Verify Payment
              const verifyRes = await fetch('/api/payment/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  delivery_date: formData.date
                })
              });

              const verifyData = await verifyRes.json();
              if (verifyData.success) {
                clearCart();
                router.push('/success');
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
                resetTurnstile();
                // Mark the abandoned order as CANCELLED in the database.
                // Uses the dedicated /cancel endpoint (no admin auth required).
                // The razorpayOrderId proves this user owns the order.
                fetch(`/api/orders/${data.dbOrderId}/cancel`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ razorpayOrderId: data.orderId })
                }).catch(e => console.error('Failed to cancel order in DB', e));
              }
            }
          };

          const paymentObject = new window.Razorpay(options);
          paymentObject.on('payment.failed', function (response) {
            setShowModal({ isOpen: true, type: 'error', message: 'Payment failed: ' + response.error.description });
            resetTurnstile();
          });
          paymentObject.open();
        } else {
          setShowModal({ isOpen: true, type: 'error', message: data.error || 'Failed to initiate payment.' });
        }
      } catch (error) {
        console.error("Payment error:", error);
        setShowModal({ isOpen: true, type: 'error', message: 'An error occurred while processing payment.' });
        resetTurnstile();
      }
    } else {
      setShowModal({ isOpen: true, type: 'error', message: 'Invalid input! Please check all highlighted fields.' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const itemTotal = parseFloat(cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2));
  const BASE_DELIVERY_FEE = 50;
  const COST_PER_KM = 10;
  const deliveryCharges = itemTotal > 0 && distance > 0 ? BASE_DELIVERY_FEE + Math.ceil(distance * COST_PER_KM) : 0;
  const grandTotal = parseFloat((itemTotal + deliveryCharges).toFixed(2));

  return (
    <div className="checkout-container">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        async
        defer
        onLoad={() => {
          setTurnstileReady(true);
          renderTurnstile();
        }}
      />

      {!turnstileReady ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', width: '100%' }}>
          <div style={{ width: '40px', height: '40px', border: '4px solid #f3f3f3', borderTop: '4px solid #5A3424', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          <p style={{ marginTop: '16px', color: '#888', fontSize: '0.95rem' }}>Loading checkout...</p>
          <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        </div>
      ) : (
        <>

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
                <div style={{ flex: 1, minWidth: 0 }} className="input-group">
                  <DateStrip 
                    selectedDate={formData.date}
                    onDateChange={(newDate) => {
                      setFormData((prev) => ({ ...prev, date: newDate }));
                      if (errors.date) {
                        setErrors((prev) => ({ ...prev, date: '' }));
                      }
                    }}
                  />
                  {errors.date && <div className="error-message" style={{ marginTop: '12px' }}>{errors.date}</div>}
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
                    autoComplete="given-name"
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
                    autoComplete="family-name"
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
                  autoComplete="email"
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
                    autoComplete="tel-national"
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
                  autoComplete="street-address"
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
                  autoComplete="address-line2"
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
                    autoComplete="address-level3"
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
                    autoComplete="postal-code"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className={`form-input ${errors.pincode ? 'error' : ''}`}
                    placeholder="Pincode (Auto-fetched)"
                    maxLength="6"
                    readOnly
                    style={{ backgroundColor: '#F0F0F0', cursor: 'not-allowed', color: '#555' }}
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
            <div style={{ marginBottom: '16px' }}>
              <div ref={turnstileContainerRef}></div>
            </div>
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
                      <Image src={item.product.image} alt={item.product.name} fill sizes="64px" style={{ objectFit: 'cover', borderRadius: '8px', border: '1px solid #E5E5E5' }} />
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
                    {item.eggPreference && <p style={{ margin: 0, fontSize: '0.75rem', color: '#666' }}>{item.eggPreference === 'eggless' ? '🟢 Eggless' : '🟤 Egg'}</p>}
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

        </>
      )}

    </div>
  );
}
