"use client";

import { useState } from 'react';

export default function ContactPage() {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus('');
    const formData = new FormData(e.target);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message'),
        }),
      });
      if (res.ok) {
        setStatus('success');
        e.target.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container" style={{ paddingTop: '64px', paddingBottom: '64px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '16px' }}>Contact Us</h1>
        <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '1.1rem', marginBottom: '48px', maxWidth: '600px', margin: '0 auto 48px' }}>
          We'd love to hear from you! Whether you have a question about our menu, an order inquiry, or just want to say hello.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
          {/* Contact Details Card */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Delivery Info</h3>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6', fontWeight: '500' }}>
                If you order before 12 PM, we provide same-day delivery!
              </p>
            </div>
            
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Call Us</h3>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                <a href="tel:+919769000175" style={{ color: 'inherit', textDecoration: 'none' }}>+91 97690 00175</a>
              </p>
            </div>
            
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Email Us</h3>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                <a href="mailto:aeteesbakehouse@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>aeteesbakehouse@gmail.com</a>
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Hours</h3>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                Daily: 11:00 AM - 6:00 PM
              </p>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="card">
            <h2 style={{ fontSize: '1.5rem', marginBottom: '24px', textTransform: 'uppercase' }}>Send a Message</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="input-group" style={{ marginBottom: 0 }}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" className="input" placeholder="Your Name" required />
              </div>
              
              <div className="input-group" style={{ marginBottom: 0 }}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" className="input" placeholder="Your Email" required />
              </div>
              
              <div className="input-group" style={{ marginBottom: 0 }}>
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" className="input" rows="5" placeholder="How can we help you?" required style={{ resize: 'vertical' }}></textarea>
              </div>
              
              {status === 'success' && <p style={{ color: 'green', margin: 0 }}>✅ Message sent successfully!</p>}
              {status === 'error' && <p style={{ color: 'red', margin: 0 }}>Failed to send. Please try again.</p>}
              
              <button type="submit" className="btn btn-primary" style={{ marginTop: '8px', padding: '14px', opacity: loading ? 0.6 : 1 }} disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
