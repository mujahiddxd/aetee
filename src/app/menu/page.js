"use client";

import '../globals.css';
import { useState, useMemo, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { ChevronDown, ChevronUp } from '../components/Icons';
import { ProductModal } from '../components/ProductModal';
import { ProductCard } from '../components/ProductCard';
export default function Storefront() {
  const { cartItems, updateQuantity } = useCart();
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [dietaryFilter, setDietaryFilter] = useState("all");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [catsRes, prodsRes] = await Promise.all([
          fetch('/api/categories'),
          fetch('/api/products')
        ]);
        
        if (catsRes.ok && prodsRes.ok) {
          const catsData = await catsRes.json();
          const prodsData = await prodsRes.json();
          
          const formattedCats = catsData.map(c => ({
            ...c,
            icon: "https://placehold.co/100x100/FDF8F5/F5B041?text=" + c.name.substring(0, 2).toUpperCase()
          }));
          
          formattedCats.unshift({ name: "All", icon: "https://placehold.co/100x100/FDF8F5/F5B041?text=ALL" });
          
          const formattedProds = prodsData.map(p => ({
            ...p,
            isVeg: true,
            customisable: p.addons && p.addons.length > 0
          }));

          setCategories(formattedCats);
          setProducts(formattedProds);
          setExpandedCategories(formattedCats.reduce((acc, cat) => ({ ...acc, [cat.name]: true }), {}));
        }
      } catch (error) {
        console.error("Failed to fetch menu data", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const toggleCategory = (categoryName) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  const filteredProducts = useMemo(() => products.filter(p => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesDietary = dietaryFilter === "all" || (dietaryFilter === "eggless" ? p.isVeg : !p.isVeg);
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesDietary && matchesSearch;
  }), [activeCategory, dietaryFilter, searchQuery, products]);

  return (
    <div style={{ backgroundColor: 'var(--color-bg-grey)', minHeight: '100vh', paddingBottom: '60px' }}>

      {/* Top Header Area (Desktop Only) */}
      <div className="desktop-only" style={{ backgroundColor: 'var(--color-bg-grey)', padding: '24px 0 16px 0' }}>
        <div style={{ width: '100%', boxSizing: 'border-box', margin: '0', padding: '0 32px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h1 style={{ margin: 0, fontSize: '2rem', fontFamily: "'Inter', sans-serif", fontWeight: 800, textTransform: 'none', letterSpacing: 'normal', color: 'var(--color-text-main)' }}>Our Menu</h1>
          </div>

          <div style={{ flex: '1 1 300px', maxWidth: '400px' }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search here"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', paddingRight: '40px', borderRadius: '8px', border: '1px solid var(--color-border)', background: '#FFF', fontSize: '0.95rem', outline: 'none' }}
              />
              <svg width="18" height="18" fill="none" stroke="var(--color-gold)" strokeWidth="2" viewBox="0 0 24 24" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>

        </div>
      </div>

      <div className="desktop-only" style={{ borderBottom: '1px solid var(--color-border)', marginBottom: '32px' }}></div>

      <main style={{ width: '100%', boxSizing: 'border-box', margin: '0', padding: '0 32px' }} className="menu-main-container">
        {/* Desktop Layout */}
        <div className="menu-layout desktop-only">

          {/* Sidebar Navigation */}
          <div className="menu-sidebar">
            <div className="category-list">
              {categories.map(cat => (
                <div
                  key={cat.name}
                  className={`category-item ${activeCategory === cat.name ? "active" : ""}`}
                  onClick={() => setActiveCategory(cat.name)}
                >
                  <img src={cat.icon} alt={cat.name} className="category-icon" />
                  <span>{cat.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Main Grid */}
          <div className="menu-main">

            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.5rem', fontFamily: "'Inter', sans-serif", fontWeight: 700, margin: '0 0 16px 0', textTransform: 'none', letterSpacing: 'normal', color: 'var(--color-text-main)' }}>
                {activeCategory}
              </h2>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => setDietaryFilter(dietaryFilter === 'eggless' ? 'all' : 'eggless')} style={{ padding: '6px 16px', borderRadius: '24px', background: dietaryFilter === 'eggless' ? 'var(--color-primary)' : 'var(--color-highlight)', border: 'none', fontSize: '0.85rem', fontWeight: 600, color: dietaryFilter === 'eggless' ? '#FFF' : 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  Eggless
                </button>
                <button onClick={() => setDietaryFilter(dietaryFilter === 'egg' ? 'all' : 'egg')} style={{ padding: '6px 16px', borderRadius: '24px', background: dietaryFilter === 'egg' ? 'var(--color-primary)' : 'var(--color-highlight)', border: 'none', fontSize: '0.85rem', fontWeight: 600, color: dietaryFilter === 'egg' ? '#FFF' : 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  Egg
                </button>
              </div>
            </div>

            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={setSelectedProduct}
                />
              ))}
            </div>
          </div>

          {/* Cart Sidebar for Desktop */}
          <div className="menu-cart-sidebar-wrapper">
            <div className="menu-cart-sidebar">
              <h3 style={{ fontSize: '1.1rem', fontFamily: "'Inter', sans-serif", fontWeight: 700, margin: '0 0 16px 0', textTransform: 'none', color: 'var(--color-text-main)' }}>Your Cart</h3>
              {cartItems.length === 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 0', textAlign: 'center' }}>
                  <div style={{ width: '120px', height: '120px', marginBottom: '16px', backgroundColor: 'var(--color-bg-grey)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="48" height="48" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                    </svg>
                  </div>
                  <p style={{ fontWeight: 700, color: 'var(--color-text-main)', fontSize: '0.95rem', margin: '0 0 4px 0' }}>Oops! Your cart is empty.</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 0 }}>You haven't placed any order yet.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ maxHeight: '400px', overflowY: 'auto', paddingRight: '8px' }}>
                    {cartItems.map(item => (
                      <div key={item.cartItemId} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                        <img src={item.product.image} alt={item.product.name} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px' }} />
                        <div style={{ flex: 1 }}>
                          <p style={{ margin: 0, fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '120px' }}>{item.product.name}</p>
                          <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>₹{item.price}</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <button onClick={() => updateQuantity(item.cartItemId, -1)} style={{ width: '24px', height: '24px', borderRadius: '50%', border: '1px solid var(--color-border)', background: '#FFF', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>-</button>
                          <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.cartItemId, 1)} style={{ width: '24px', height: '24px', borderRadius: '50%', border: '1px solid var(--color-border)', background: '#FFF', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>Total:</span>
                    <span style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-primary)' }}>
                      ₹{cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)}
                    </span>
                  </div>
                  <a href="/cart" style={{ textDecoration: 'none' }}>
                    <button className="add-to-cart-btn" style={{ width: '100%', marginTop: '8px' }}>View Cart</button>
                  </a>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Mobile Layout */}
        <div className="mobile-accordion-layout mobile-only" style={{ paddingTop: '16px' }}>
          {/* Mobile Search/Filter Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', borderBottom: '1px solid var(--color-border)', paddingBottom: '16px', margin: '0 -32px 16px', padding: '0 32px 16px' }}>
            <button style={{ padding: '8px 24px', borderRadius: '24px', background: 'var(--color-primary)', border: 'none', fontSize: '1rem', fontWeight: 600, color: '#FFF' }}>
              Menu
            </button>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)} style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-main)', cursor: 'pointer', background: isMobileSearchOpen ? 'var(--color-highlight)' : '#FFF' }}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
              <button onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)} style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--color-border)', background: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-main)', cursor: 'pointer' }}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Search Field */}
          {isMobileSearchOpen && (
            <div style={{ marginBottom: '16px' }}>
              <input
                type="text"
                placeholder="Search menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--color-border)', background: '#FFF', fontSize: '1rem', outline: 'none' }}
              />
            </div>
          )}

          {/* Mobile Filter Options */}
          {isMobileFiltersOpen && (
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', padding: '12px', background: '#FFF', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
              <button onClick={() => setDietaryFilter('all')} style={{ flex: 1, padding: '8px', borderRadius: '24px', background: dietaryFilter === 'all' ? 'var(--color-primary)' : 'var(--color-highlight)', border: 'none', fontSize: '0.85rem', fontWeight: 600, color: dietaryFilter === 'all' ? '#FFF' : 'var(--color-primary)', cursor: 'pointer' }}>All</button>
              <button onClick={() => setDietaryFilter('eggless')} style={{ flex: 1, padding: '8px', borderRadius: '24px', background: dietaryFilter === 'eggless' ? 'var(--color-primary)' : 'var(--color-highlight)', border: 'none', fontSize: '0.85rem', fontWeight: 600, color: dietaryFilter === 'eggless' ? '#FFF' : 'var(--color-primary)', cursor: 'pointer' }}>Eggless</button>
              <button onClick={() => setDietaryFilter('egg')} style={{ flex: 1, padding: '8px', borderRadius: '24px', background: dietaryFilter === 'egg' ? 'var(--color-primary)' : 'var(--color-highlight)', border: 'none', fontSize: '0.85rem', fontWeight: 600, color: dietaryFilter === 'egg' ? '#FFF' : 'var(--color-primary)', cursor: 'pointer' }}>Egg</button>
            </div>
          )}

          {categories.map(cat => (
            <div key={cat.name} className="mobile-category-section">
              <div
                className="mobile-category-header"
                onClick={() => toggleCategory(cat.name)}
              >
                <h3>{cat.name}</h3>
                <span className="category-toggle-icon">
                  {expandedCategories[cat.name] ? <ChevronUp /> : <ChevronDown />}
                </span>
              </div>

              {expandedCategories[cat.name] && (
                <div className="product-grid mobile-product-grid">
                  {products
                    .filter(p => p.category === cat.name && (dietaryFilter === 'all' || (dietaryFilter === 'eggless' ? p.isVeg : !p.isVeg)) && p.name.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onSelect={setSelectedProduct}
                      />
                    ))}
                </div>
              )}
            </div>
          ))}
        </div>


      </main>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
