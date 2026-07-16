"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    "https://placehold.co/1200x500/F0E6D2/5a3424?text=Slide+1",
    "https://placehold.co/1200x500/E7F4FF/5a3424?text=Slide+2"
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <>
      {/* Hero Section */}
      <section style={{ display: 'flex', minHeight: '550px' }}>
        {/* Left Side (Yellow) */}
        <div style={{ flex: 1, backgroundColor: 'var(--color-highlight)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px' }}>
          <div style={{ maxWidth: '480px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '3.5rem', lineHeight: '1.1', marginBottom: '24px' }}>WELCOME TO AETEES BAKEHOUSE NATIONWIDE SHIPPING</h2>
            <p style={{ color: 'var(--color-text-main)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '32px' }}>
              Turn any occasion into a celebration with our easy-to-bake pastries or award-winning cakes - LA's best bakery delivered to you, perfect for gifting near or far!
            </p>
            <button className="btn btn-primary" style={{ padding: '16px 32px' }}>SEE THE MENU ↓</button>
          </div>
        </div>

        {/* Right Side (Image + Box) */}
        <div style={{ flex: 1, position: 'relative', backgroundImage: 'url("https://placehold.co/800x600/87CEEB/5a3424?text=Ice+Cream+Cake+Image")', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: '#FFFFFF', padding: '40px', width: '80%', maxWidth: '400px', textAlign: 'center', boxShadow: 'var(--shadow-card)' }}>
            <h2 style={{ fontSize: '2.5rem', lineHeight: '1.1', marginBottom: '16px' }}>DULCE DE LECHE BESITO® ICE CREAM CAKE</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '24px' }}>
              Layers of Cuban cake, premium dulce de leche ice cream, Besito® cookie crumbs, and rich dulce de leche in every bite. Available for a limited time.
            </p>
            <button className="btn btn-primary" style={{ padding: '14px 28px' }}>ORDER NOW</button>
          </div>
        </div>
      </section>

      {/* Slider Section */}
      <section style={{ position: 'relative', width: '100%', maxWidth: '1200px', margin: '48px auto', overflow: 'hidden', borderRadius: '12px', boxShadow: 'var(--shadow-card)' }}>
        <div style={{ display: 'flex', transition: 'transform 0.5s ease-in-out', transform: `translateX(-${currentSlide * 100}%)` }}>
          {slides.map((slide, index) => (
            <img key={index} src={slide} alt={`Slide ${index + 1}`} style={{ width: '100%', flexShrink: 0, objectFit: 'cover' }} />
          ))}
        </div>
        
        {/* Left Arrow */}
        <button onClick={prevSlide} style={{ position: 'absolute', top: '50%', left: '16px', transform: 'translateY(-50%)', backgroundColor: 'rgba(255, 255, 255, 0.8)', border: 'none', borderRadius: '50%', width: '48px', height: '48px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-card)', zIndex: 10 }}>
          <svg width="24" height="24" fill="none" stroke="var(--color-primary)" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right Arrow */}
        <button onClick={nextSlide} style={{ position: 'absolute', top: '50%', right: '16px', transform: 'translateY(-50%)', backgroundColor: 'rgba(255, 255, 255, 0.8)', border: 'none', borderRadius: '50%', width: '48px', height: '48px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-card)', zIndex: 10 }}>
          <svg width="24" height="24" fill="none" stroke="var(--color-primary)" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </section>

      {/* Info Section (Image Left, Text Right) */}
      <section style={{ display: 'flex', minHeight: '450px' }}>
        {/* Left Side (Image) */}
        <div style={{ flex: 1, backgroundImage: 'url("https://placehold.co/800x600/e6d5b8/5a3424?text=Pastries")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        </div>

        {/* Right Side (Text) */}
        <div style={{ flex: 1, backgroundColor: '#FFF7E6', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '64px' }}>
          <div style={{ maxWidth: '480px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '3.5rem', color: '#5A3424', textTransform: 'uppercase', marginBottom: '24px', lineHeight: '1' }}>WE MAKE IT, YOU BAKE IT!</h2>
            <p style={{ color: '#5A3424', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '40px' }}>
              Our pastry chefs work hard to ensure your baking process is smooth and fun. Get baking in as little as 3 steps.
            </p>
            <button className="btn btn-primary" style={{ backgroundColor: '#5A3424', color: '#FFFFFF', padding: '16px 32px', border: 'none', borderRadius: '24px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', letterSpacing: '0.05em' }}>SEE THE MENU</button>
          </div>
        </div>
      </section>
    </>
  );
}
