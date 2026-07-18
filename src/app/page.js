"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
      <section className="home-split-section">
        {/* Left Side (Yellow) */}
        <div className="home-split-left" style={{ backgroundColor: 'var(--color-highlight)' }}>
          <div style={{ maxWidth: '480px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '3.5rem', lineHeight: '1.1', marginBottom: '24px' }}>WELCOME TO AETEES BAKEHOUSE MUMBAI</h2>
            <p style={{ color: 'var(--color-text-main)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '32px' }}>
              Turn any occasion into a celebration with our easy-to-bake pastries or award-winning cakes - Mumbai&apos;s finest bakery delivered to you, perfect for gifting near or far!
            </p>
            <Link href="/menu"><button className="btn btn-primary" style={{ padding: '16px 32px' }}>SEE THE MENU ↓</button></Link>
          </div>
        </div>

        {/* Right Side (Image + Box) */}
        <div className="home-split-right" style={{ position: 'relative', backgroundImage: 'url("https://placehold.co/800x600/87CEEB/5a3424?text=Ice+Cream+Cake+Image")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div style={{ backgroundColor: '#FFFFFF', padding: '40px', width: '90%', maxWidth: '400px', textAlign: 'center', boxShadow: 'var(--shadow-card)' }}>
            <h2 style={{ fontSize: '2.5rem', lineHeight: '1.1', marginBottom: '16px' }}>ALPHONSO MANGO FRESH CREAM CAKE</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '24px' }}>
              Layers of classic Bombay mawa cake, premium Alphonso mango cream, and rich mango glaze in every bite. Available for a limited time.
            </p>
            <Link href="/menu"><button className="btn btn-primary" style={{ padding: '14px 28px' }}>ORDER NOW</button></Link>
          </div>
        </div>
      </section>

      {/* Slider Section */}
      <section style={{ position: 'relative', width: '100%', maxWidth: '1200px', margin: '48px auto', overflow: 'hidden', borderRadius: '12px', boxShadow: 'var(--shadow-card)' }}>
        <div style={{ display: 'flex', transition: 'transform 0.5s ease-in-out', transform: `translateX(-${currentSlide * 100}%)` }}>
          {slides.map((slide, index) => (
            <div key={index} style={{ width: '100%', position: 'relative', aspectRatio: '1200/500', flexShrink: 0 }}>
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
        <div className="home-split-left" style={{ backgroundImage: 'url("https://placehold.co/800x600/e6d5b8/5a3424?text=Pastries")', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '350px' }}>
        </div>

        {/* Right Side (Text) */}
        <div className="home-split-right" style={{ backgroundColor: '#FFF7E6' }}>
          <div style={{ maxWidth: '480px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '3.5rem', color: '#5A3424', textTransform: 'uppercase', marginBottom: '24px', lineHeight: '1' }}>FRESH FROM THE OVEN TO YOUR DOOR</h2>
            <p style={{ color: '#5A3424', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '40px' }}>
              Experience the magic of Aetees Bakehouse. Award-winning cakes and signature pastries, delivered fresh.
            </p>
            <Link href="/menu"><button className="btn btn-primary" style={{ backgroundColor: '#5A3424', color: '#FFFFFF', padding: '16px 32px', border: 'none', borderRadius: '24px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', letterSpacing: '0.05em' }}>SEE THE MENU</button></Link>
          </div>
        </div>
      </section>
    </>
  );
}
