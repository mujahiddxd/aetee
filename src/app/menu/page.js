"use client";

import '../globals.css';
import { useState, useMemo, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { ChevronDown, ChevronUp } from '../components/Icons';
import { ProductModal } from '../components/ProductModal';
import { ProductCard } from '../components/ProductCard';
import { RepeatComboModal } from '../components/RepeatComboModal';
import Image from 'next/image';

export default function Storefront() {
  const { cartItems, updateQuantity } = useCart();
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedRepeatProduct, setSelectedRepeatProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState(new Set());
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      try {
        const [catsRes, prodsRes, filtersRes] = await Promise.all([
          fetch('/api/categories', { cache: 'no-store' }),
          fetch('/api/products', { cache: 'no-store' }),
          fetch('/api/filters', { cache: 'no-store' })
        ]);
        if (catsRes.ok && prodsRes.ok && filtersRes.ok) {
          const catsData = await catsRes.json();
          const prodsData = await prodsRes.json();
          const filtersData = await filtersRes.json();
          
          if (!isMounted) return;

          const formattedCats = catsData.map(c => ({
            ...c,
            icon: "https://placehold.co/100x100/FDF8F5/F5B041?text=" + c.name.substring(0, 2).toUpperCase()
          }));
          
          formattedCats.unshift({ name: "All", icon: "https://placehold.co/100x100/FDF8F5/F5B041?text=ALL" });
          
          const formattedProds = prodsData.map(p => ({
            ...p,
            customisable: p.addons && p.addons.length > 0
          }));

          setCategories(formattedCats);
          setProducts(formattedProds);
          setFilters(filtersData);
          
          setExpandedCategories(prev => {
            if (Object.keys(prev).length === 0) {
              return formattedCats.reduce((acc, cat) => ({ ...acc, [cat.name]: true }), {});
            }
            return prev;
          });
        }
      } catch (error) {
        console.error("Failed to fetch menu data", error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    fetchData();
    
    return () => {
      isMounted = false;
    };
  }, []);

  const toggleCategory = (categoryName) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName);
  };

  const toggleFilter = (filterId) => {
    const newFilters = new Set(selectedFilters);
    if (newFilters.has(filterId)) newFilters.delete(filterId);
    else newFilters.add(filterId);
    setSelectedFilters(newFilters);
  };

  const filteredProducts = useMemo(() => products.filter(p => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // AND logic for filters (must have all selected filters)
    let matchesFilters = true;
    if (selectedFilters.size > 0) {
      if (!p.filters || p.filters.length === 0) {
        matchesFilters = false;
      } else {
        for (const fid of selectedFilters) {
          if (!p.filters.includes(fid)) {
            matchesFilters = false;
            break;
          }
        }
      }
    }
    
    return matchesCategory && matchesSearch && matchesFilters;
  }), [activeCategory, searchQuery, products, selectedFilters]);

  // Dynamically filter categories to only show those that have matching products
  const filteredCategories = useMemo(() => {
    if (selectedFilters.size === 0 && !searchQuery) return categories;
    
    return categories.filter(cat => {
      if (cat.name === "All") return true;
      
      // Does this category have at least one product that matches the search AND the selected filters?
      const hasMatchingProduct = products.some(p => {
        if (p.category !== cat.name) return false;
        
        if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        
        if (selectedFilters.size > 0) {
          if (!p.filters || p.filters.length === 0) return false;
          for (const fid of selectedFilters) {
            if (!p.filters.includes(fid)) return false;
          }
        }
        
        return true;
      });
      
      return hasMatchingProduct;
    });
  }, [categories, products, selectedFilters, searchQuery]);

  // If the active category gets hidden by a filter, switch back to 'All'
  useEffect(() => {
    if (activeCategory !== "All" && !filteredCategories.some(c => c.name === activeCategory)) {
      setActiveCategory("All");
    }
  }, [filteredCategories, activeCategory]);

  const currentCatData = categories.find(c => c.name === activeCategory);

  return (
    <div style={{ backgroundColor: 'var(--color-bg-grey)', minHeight: '100vh', paddingBottom: '60px' }}>

      {/* Top Header Area (Desktop Only) */}
      <div className="desktop-only" style={{ backgroundColor: 'var(--color-bg-grey)', padding: '24px 0 16px 0' }}>
        <div style={{ width: '100%', boxSizing: 'border-box', margin: '0', padding: '0 32px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h1 style={{ margin: 0, fontSize: '2rem', fontFamily: "'Inter', sans-serif", fontWeight: 800, textTransform: 'none', letterSpacing: 'normal', color: 'var(--color-text-main)' }}>Our Menu</h1>
          </div>

          <div style={{ flex: '1 1 300px', maxWidth: '400px', display: 'flex', gap: '12px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
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
            
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                style={{ width: '46px', height: '46px', borderRadius: '8px', border: '1px solid var(--color-border)', background: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--color-text-main)', position: 'relative' }}
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                </svg>
                {selectedFilters.size > 0 && (
                  <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '18px', height: '18px', background: 'var(--color-primary)', color: '#FFF', fontSize: '0.7rem', fontWeight: 'bold', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {selectedFilters.size}
                  </span>
                )}
              </button>
              
              {isFilterDropdownOpen && (
                <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '8px', width: '220px', background: '#FFF', border: '1px solid var(--color-border)', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', zIndex: 100, padding: '12px' }}>
                  <h4 style={{ margin: '0 0 12px 0', fontSize: '0.95rem' }}>Filters</h4>
                  {filters.length === 0 ? (
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>No filters available</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {filters.map(f => (
                        <label key={f.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem' }}>
                          <input 
                            type="checkbox" 
                            checked={selectedFilters.has(f.id)}
                            onChange={() => toggleFilter(f.id)}
                            style={{ accentColor: 'var(--color-primary)', width: '16px', height: '16px' }}
                          />
                          {f.name}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              )}
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
              {filteredCategories.map(cat => (
                <div key={cat.name}>
                  <div
                    className={`category-item ${activeCategory === cat.name ? "active" : ""}`}
                    onClick={() => handleCategoryClick(cat.name)}
                    style={{ marginBottom: '4px' }}
                  >
                    <div style={{ width: 32, height: 32, position: 'relative', flexShrink: 0 }}>
                      <Image src={cat.icon} alt={cat.name} className="category-icon" fill sizes="32px" style={{ borderRadius: '50%', objectFit: 'cover' }} />
                    </div>
                    <span>{cat.name}</span>
                  </div>
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
            </div>

            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={setSelectedProduct}
                  onRepeatSelect={setSelectedRepeatProduct}
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
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 0 }}>You haven&apos;t placed any order yet.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ maxHeight: '400px', overflowY: 'auto', paddingRight: '8px' }}>
                    {cartItems.map(item => (
                      <div key={item.cartItemId} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                        <div style={{ width: 48, height: 48, position: 'relative', flexShrink: 0 }}>
                          <Image src={item.product.image} alt={item.product.name} fill sizes="48px" style={{ objectFit: 'cover', borderRadius: '8px' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{ margin: 0, fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '120px' }}>{item.product.name}</p>
                          <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>₹{Number(item.price).toFixed(2)}</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <button onClick={() => updateQuantity(item.cartItemId, -1)} style={{ width: '24px', height: '24px', borderRadius: '50%', border: '1px solid var(--color-border)', background: '#FFF', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>-</button>
                          <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{item.quantity}</span>
                          <button 
                            disabled={item.product.isSoldOut}
                            onClick={() => { if (!item.product.isSoldOut) updateQuantity(item.cartItemId, 1) }} 
                            style={{ width: '24px', height: '24px', borderRadius: '50%', border: '1px solid var(--color-border)', background: '#FFF', cursor: item.product.isSoldOut ? 'not-allowed' : 'pointer', opacity: item.product.isSoldOut ? 0.5 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>Total:</span>
                    <span style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-primary)' }}>
                      ₹{cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
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
              <div style={{ position: 'relative' }}>
                <button onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)} style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--color-border)', background: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-main)', cursor: 'pointer', position: 'relative' }}>
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                  </svg>
                  {selectedFilters.size > 0 && (
                    <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '16px', height: '16px', background: 'var(--color-primary)', color: '#FFF', fontSize: '0.65rem', fontWeight: 'bold', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {selectedFilters.size}
                    </span>
                  )}
                </button>
                
                {isMobileFiltersOpen && (
                  <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '8px', width: '220px', background: '#FFF', border: '1px solid var(--color-border)', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', zIndex: 100, padding: '16px' }}>
                    {filters.length === 0 ? (
                      <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>No filters available</p>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        {filters.map(f => (
                          <label key={f.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-main)' }}>
                            <input 
                              type="checkbox" 
                              checked={selectedFilters.has(f.id)}
                              onChange={() => toggleFilter(f.id)}
                              style={{ accentColor: 'var(--color-primary)', width: '18px', height: '18px', margin: 0 }}
                            />
                            {f.name}
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
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


          {filteredCategories.map(cat => (
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
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div className="product-grid mobile-product-grid">
                    {filteredProducts
                      .filter(p => p.category === cat.name)
                      .map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onSelect={setSelectedProduct}
                          onRepeatSelect={setSelectedRepeatProduct}
                        />
                      ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {cartItems.length > 0 && (
          <div className="order-count-footer">
            <div className="left">
              <div className="item-count-price">
                <div className="cart-count">
                  <div>
                    <span className="icon-cart"></span>
                    <div className="order-item-count">{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</div>
                  </div>
                  <p className="total">INR {cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString('en-IN')}</p>
                </div>
              </div>
              <p className="info">Extra charges may apply</p>
            </div>
            <div className="right">
              <a href="/cart" style={{ textDecoration: 'none' }}>
                <button className="btn btn-sm my-order" tabIndex="0">
                  <span className="mr-2">MY ORDER</span><span className="icon-caret-right"></span>
                </button>
              </a>
            </div>
          </div>
        )}

      </main>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onRepeatSelect={setSelectedRepeatProduct}
        />
      )}

      {selectedRepeatProduct && (
        <RepeatComboModal
          product={selectedRepeatProduct}
          onClose={() => setSelectedRepeatProduct(null)}
          onSelectNew={(p) => setSelectedProduct(p)}
        />
      )}
    </div>
  );
}
