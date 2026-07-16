"use client";

import '../globals.css';
import Link from 'next/link';

const mockProducts = [
  {
    id: 1,
    name: "Cheese Roll®",
    description: "Our signature flaky pastry filled with sweet cream cheese, baked to golden perfection.",
    price: 24.99,
    addons: ["Gift Wrap", "Extra Icing"],
    isSoldOut: false,
    image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Cheese+Roll"
  },
  {
    id: 2,
    name: "Dulce de Leche Besito",
    description: "A sweet kiss of caramel in a butter cookie, dusted with powdered sugar.",
    price: 15.50,
    addons: ["Gift Wrap"],
    isSoldOut: true,
    image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Besito"
  },
  {
    id: 3,
    name: "Guava & Cheese Pastry",
    description: "Flaky puff pastry filled with tropical guava jam and cream cheese.",
    price: 22.00,
    addons: [],
    isSoldOut: false,
    image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Guava+Pastry"
  }
];

export default function Storefront() {
  return (
    <div style={{ backgroundColor: 'var(--color-bg-primary)', minHeight: '100vh' }}>
      {/* --- SUB-HEADER (Menu Page Only) --- */}
      <div style={{ backgroundColor: '#F9F8F6', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container" style={{ width: '100%', padding: '16px 24px', display: 'flex', alignItems: 'center', position: 'relative' }}>
          
          {/* Menu Pill Left Aligned */}
          <div>
            <div style={{ backgroundColor: 'var(--color-primary)', color: '#FFF', padding: '8px 24px', borderRadius: '24px', fontWeight: 'bold', fontSize: '1rem', display: 'flex', alignItems: 'center' }}>
              Menu
            </div>
          </div>

          {/* Search & Filter Icons Right Aligned */}
          <div style={{ display: 'flex', gap: '12px', marginLeft: 'auto' }}>
            {/* Search */}
            <button style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#FFF', border: '1px solid #EBEBEB', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--color-text-main)' }}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
            {/* Filter */}
            <button style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#FFF', border: '1px solid #EBEBEB', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--color-text-main)' }}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <main className="container" style={{ padding: 'var(--space-xl) var(--space-md)' }}>
        {/* Menu content will go here */}
      </main>
    </div>
  );
}
