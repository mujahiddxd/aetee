"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    "/slide1.jpg",
    "/slide2.jpg",
    "/slide3.jpg"
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="home-split-section">
        {/* Left Side (Yellow) */}
        <div className="home-split-left" style={{ backgroundColor: 'var(--color-highlight)' }}>
          <div style={{ maxWidth: '480px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '3.5rem', lineHeight: '1.1', marginBottom: '24px' }}>YOUR "I DESERVE A
              TREAT
              MOMENT"</h2>
            <p style={{ color: 'var(--color-text-main)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '32px' }}>
              Freshly baked. Freshly layered.

              Every cheesecake and tiramisu is handcrafted only after you order, so every bite arrives as fresh
              as it should be.
            </p>
            <Link href="/menu"><button className="btn btn-primary" style={{ padding: '16px 32px' }}>SEE THE MENU ↓</button></Link>
          </div>
        </div>

        {/* Right Side (Image + Box) */}
        <div className="home-split-right" style={{ position: 'relative', backgroundImage: 'url("/hero-cakes.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div style={{ backgroundColor: '#FFFFFF', padding: '40px', width: '90%', maxWidth: '400px', textAlign: 'center', boxShadow: 'var(--shadow-card)' }}>
            <h2 style={{ fontSize: '2.5rem', lineHeight: '1.1', marginBottom: '16px' }}>CHEESECAKES.
              TIRAMISUS.
              MADE JUST
              FOR YOU.</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '24px' }}>
              No frozen stock. No shortcuts.<br />

              Just creamy cheesecakes, dreamy tiramisus, and handcrafted desserts—because indulgence should never be rushed.
            </p>
            <Link href="/menu"><button className="btn btn-primary" style={{ padding: '14px 28px' }}>ORDER NOW</button></Link>
          </div>
        </div>
      </section>

      {/* Slider Section */}
      <section style={{ position: 'relative', width: '100%', maxWidth: '1200px', margin: '48px auto', overflow: 'hidden', borderRadius: '12px', boxShadow: 'var(--shadow-card)' }}>
        <div style={{ display: 'flex', transition: 'transform 0.5s ease-in-out', transform: `translateX(-${currentSlide * 100}%)` }}>
          {slides.map((slide, index) => (
            <div key={index} style={{ width: '100%', position: 'relative', aspectRatio: '16/9', flexShrink: 0, overflow: 'hidden' }}>
              <Image src={slide} alt={`Slide ${index + 1}`} fill sizes="100vw" style={{ objectFit: 'cover' }} priority={index === 0} />
            </div>
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
      <section className="home-split-section">
        {/* Left Side (Image) */}
        <div className="home-split-left" style={{ backgroundImage: 'url("/pastries.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '350px' }}>
        </div>

        {/* Right Side (Text) */}
        <div className="home-split-right" style={{ backgroundColor: '#FFF7E6' }}>
          <div style={{ maxWidth: '480px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '3.5rem', color: '#5A3424', textTransform: 'uppercase', marginBottom: '24px', lineHeight: '1' }}>ONE SPOON. FIVE OBSESSIONS.</h2>
            <p style={{ color: '#5A3424', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '40px' }}>
              From the timeless Classic, to our bold Filter Coffee, indulgent Nutella, caramelised Lotus Biscoff, and luxurious Pistachio—every tiramisu is layered with premium ingredients for the perfect balance of creamy, coffee-soaked, melt-in-your-mouth goodness.
            </p>
            <Link href="/menu"><button className="btn btn-primary" style={{ backgroundColor: '#5A3424', color: '#FFFFFF', padding: '16px 32px', border: 'none', borderRadius: '24px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', letterSpacing: '0.05em' }}>SEE THE MENU</button></Link>
          </div>
        </div>
      </section>
    </>
  );
}
