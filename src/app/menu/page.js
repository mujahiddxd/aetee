"use client";

import '../globals.css';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

const categories = [
  { name: "Best Sellers", icon: "https://placehold.co/100x100/FDF8F5/F5B041?text=BS" },
  { name: "Cakes", icon: "https://placehold.co/100x100/FDF8F5/F5B041?text=CK" },
  { name: "Pastries", icon: "https://placehold.co/100x100/FDF8F5/F5B041?text=PS" },
  { name: "Beverages", icon: "https://placehold.co/100x100/FDF8F5/F5B041?text=BV" }
];

const mockProducts = [
  // CATEGORY: Cakes
  { id: 1, name: "Choco Chip Butter Cake", description: "Soft, rich, and loaded with gooey chocolate chips.", price: 900, isVeg: true, category: "Cakes", image: "/choco-chip.png", customisable: true, sizes: [{ name: "1/2 kg", price: 0, image: "/choco-chip.png" }, { name: "1kg", price: 700, image: "/choco-chip.png" }], addons: [{ name: "Gift Box", price: 300 }] },
  { id: 2, name: "Red Velvet Cake", description: "Rich cocoa cake with red hue, topped with cream cheese.", price: 1100, isVeg: false, category: "Cakes", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Red+Velvet", customisable: true, sizes: [{ name: "1/2 kg", price: 0, image: "https://placehold.co/100x100?text=0.5" }], addons: [] },
  { id: 3, name: "Pineapple Fresh Cream", description: "Light sponge cake with fresh cream and pineapple chunks.", price: 750, isVeg: true, category: "Cakes", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Pineapple+Cake", customisable: false },
  { id: 4, name: "Black Forest Gateau", description: "Classic German chocolate cake with cherries and cream.", price: 850, isVeg: true, category: "Cakes", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Black+Forest", customisable: false },
  { id: 5, name: "Truffle Chocolate Cake", description: "Dense chocolate sponge with rich dark chocolate ganache.", price: 1200, isVeg: true, category: "Cakes", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Truffle+Cake", customisable: false },
  { id: 6, name: "Mango Cheesecake", description: "Creamy baked cheesecake with a tropical mango glaze.", price: 1350, isVeg: false, category: "Cakes", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Mango+Cheese", customisable: false },
  { id: 7, name: "Vanilla Buttercream Cake", description: "Simple, elegant vanilla cake with creamy butter frosting.", price: 650, isVeg: true, category: "Cakes", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Vanilla+Cake", customisable: false },
  { id: 8, name: "Coffee Walnut Cake", description: "A delightful pairing of robust coffee and crunchy walnuts.", price: 950, isVeg: true, category: "Cakes", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Coffee+Cake", customisable: false },
  { id: 9, name: "Blueberry Lemon Cake", description: "Zesty lemon cake bursting with fresh blueberries.", price: 1050, isVeg: true, category: "Cakes", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Blueberry+Cake", customisable: false },

  // CATEGORY: Best Sellers
  { id: 10, name: "Dulce de Leche Besito", description: "A sweet kiss of caramel in a butter cookie.", price: 450, isVeg: true, category: "Best Sellers", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Besito", customisable: true, sizes: [{ name: "Box of 6", price: 0, image: "https://placehold.co/100x100?text=6" }, { name: "Box of 12", price: 400, image: "https://placehold.co/100x100?text=12" }], addons: [] },
  { id: 11, name: "Almond Biscotti", description: "Twice-baked almond cookies for dipping in coffee.", price: 350, isVeg: true, category: "Best Sellers", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Biscotti", customisable: false },
  { id: 12, name: "Chocolate Hazelnut Tart", description: "Crisp tart shell filled with gooey hazelnut praline.", price: 280, isVeg: false, category: "Best Sellers", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Hazelnut+Tart", customisable: false },
  { id: 13, name: "Signature Fudge Brownie", description: "Fudgy, dense, and packed with chocolate chunks.", price: 150, isVeg: true, category: "Best Sellers", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Fudge+Brownie", customisable: false },
  { id: 14, name: "Pistachio Macarons", description: "Delicate French almond cookies filled with pistachio ganache.", price: 400, isVeg: false, category: "Best Sellers", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Macarons", customisable: true, sizes: [{ name: "Box of 4", price: 0, image: "https://placehold.co/100x100?text=4" }], addons: [] },
  { id: 15, name: "Caramel Sea Salt Cookie", description: "Large chewy cookie with caramel bits and sea salt flakes.", price: 120, isVeg: true, category: "Best Sellers", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Caramel+Cookie", customisable: false },
  { id: 16, name: "Classic Apple Pie", description: "Traditional pie with cinnamon-spiced apples.", price: 550, isVeg: true, category: "Best Sellers", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Apple+Pie", customisable: false },
  { id: 17, name: "Strawberry Shortcake", description: "Light sponge layered with fresh strawberries and cream.", price: 300, isVeg: true, category: "Best Sellers", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Shortcake", customisable: false },
  { id: 18, name: "Chocolate Eclair", description: "Choux pastry filled with vanilla cream and chocolate glaze.", price: 180, isVeg: false, category: "Best Sellers", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Eclair", customisable: false },

  // CATEGORY: Pastries
  { id: 19, name: "Classic Butter Croissant", description: "Flaky, buttery, and baked fresh daily. A Parisian classic.", price: 180, isVeg: true, category: "Pastries", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Croissant", customisable: false },
  { id: 20, name: "Chicken Tikka Puff", description: "Spiced chicken tikka filling in a buttery puff pastry.", price: 150, isVeg: false, category: "Pastries", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Tikka+Puff", customisable: false },
  { id: 21, name: "Lemon Tart", description: "Zesty lemon curd in a crisp sweet pastry shell.", price: 220, isVeg: false, category: "Pastries", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Lemon+Tart", customisable: false },
  { id: 22, name: "Pain au Chocolat", description: "Croissant dough wrapped around rich dark chocolate batons.", price: 200, isVeg: true, category: "Pastries", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Pain+Chocolat", customisable: false },
  { id: 23, name: "Mushroom & Cheese Quiche", description: "Savory pastry filled with earthy mushrooms and Gruyère.", price: 250, isVeg: false, category: "Pastries", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Mushroom+Quiche", customisable: false },
  { id: 24, name: "Almond Croissant", description: "Twice-baked croissant with almond frangipane and flaked almonds.", price: 220, isVeg: true, category: "Pastries", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Almond+Croissant", customisable: false },
  { id: 25, name: "Spinach Feta Turnover", description: "Crisp puff pastry filled with creamy spinach and feta cheese.", price: 160, isVeg: true, category: "Pastries", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Spinach+Turnover", customisable: false },
  { id: 26, name: "Pecan Danish", description: "Sweet Danish pastry topped with caramelized pecans.", price: 190, isVeg: true, category: "Pastries", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Pecan+Danish", customisable: false },
  { id: 27, name: "Sausage Roll", description: "Seasoned meat wrapped in golden flaky pastry.", price: 180, isVeg: false, category: "Pastries", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Sausage+Roll", customisable: false },

  // CATEGORY: Beverages
  { id: 28, name: "Cold Brew Coffee", description: "Slow-steeped for 18 hours for a smooth coffee experience.", price: 250, isVeg: true, category: "Beverages", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Cold+Brew", customisable: true, sizes: [{ name: "Regular", price: 0, image: "https://placehold.co/100x100?text=Reg" }], addons: [{ name: "Oat Milk", price: 50 }] },
  { id: 29, name: "Matcha Latte", description: "Premium Japanese matcha green tea blended with steamed milk.", price: 280, isVeg: true, category: "Beverages", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Matcha", customisable: true, sizes: [{ name: "Regular", price: 0, image: "https://placehold.co/100x100?text=Reg" }], addons: [{ name: "Extra Shot", price: 60 }] },
  { id: 30, name: "Iced Caramel Macchiato", description: "Espresso combined with vanilla, milk, and caramel drizzle.", price: 260, isVeg: true, category: "Beverages", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Caramel+Macchiato", customisable: false },
  { id: 31, name: "Hot Chocolate", description: "Rich, creamy hot chocolate topped with marshmallows.", price: 200, isVeg: true, category: "Beverages", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Hot+Chocolate", customisable: false },
  { id: 32, name: "Fresh Orange Juice", description: "Freshly squeezed Valencia oranges. Pure and natural.", price: 180, isVeg: true, category: "Beverages", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Orange+Juice", customisable: false },
  { id: 33, name: "Peach Iced Tea", description: "Refreshing black tea infused with sweet peach notes.", price: 160, isVeg: true, category: "Beverages", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Peach+Tea", customisable: false },
  { id: 34, name: "Cappuccino", description: "Equal parts espresso, steamed milk, and milk foam.", price: 180, isVeg: true, category: "Beverages", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Cappuccino", customisable: false },
  { id: 35, name: "Strawberry Milkshake", description: "Thick and creamy shake made with real strawberries.", price: 240, isVeg: true, category: "Beverages", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Strawberry+Shake", customisable: false },
  { id: 36, name: "Kombucha (Berry)", description: "Probiotic fermented tea with mixed berry flavors.", price: 220, isVeg: true, category: "Beverages", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Kombucha", customisable: false }
];

function ProductModal({ product, onClose }) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedAddons, setSelectedAddons] = useState(new Set());

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleAddonToggle = (index) => {
    const newAddons = new Set(selectedAddons);
    if (newAddons.has(index)) {
      newAddons.delete(index);
    } else {
      newAddons.add(index);
    }
    setSelectedAddons(newAddons);
  };

  const totalPrice = product.price +
    (product.sizes?.[selectedSize]?.price || 0) +
    Array.from(selectedAddons).reduce((sum, idx) => sum + (product.addons?.[idx]?.price || 0), 0);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <div className="product-image-container" style={{ height: '220px', background: '#FAFAF8' }}>
          <img src={product.image} alt={product.name} className="product-image" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
        </div>

        <div className="product-content" style={{ padding: '20px' }}>
          <div className="product-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div className="product-title-row" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {product.isVeg ? (
                <span className="veg-icon"><span className="veg-dot"></span></span>
              ) : (
                <span className="veg-icon non-veg-icon"><span className="veg-dot non-veg-dot"></span></span>
              )}
              <h2 className="product-title" style={{ margin: 0, fontSize: '1.25rem' }}>{product.name}</h2>
            </div>
            <div className="product-price" style={{ fontSize: '1.25rem', fontWeight: 700 }}>{totalPrice.toFixed(2)}</div>
          </div>

          <p className="product-description" style={{ marginBottom: '24px' }}>{product.description}</p>

          {product.sizes && product.sizes.length > 0 && (
            <div className="product-section" style={{ borderTop: '1px solid #EBEBEB', paddingTop: '20px', marginBottom: '24px' }}>
              <h3 className="section-title">Select Size <span className="req">(0/1)*</span></h3>
              <div className="options-list">
                {product.sizes.map((size, idx) => (
                  <label key={idx} className="option-row" style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer', marginBottom: '16px' }}>
                    <div className="option-left" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <input
                        type="radio"
                        name={`size-${product.id}`}
                        checked={selectedSize === idx}
                        onChange={() => setSelectedSize(idx)}
                        className="custom-radio"
                      />
                      <img src={size.image} alt={size.name} className="option-image" style={{ width: 40, height: 40, borderRadius: 4, objectFit: 'cover', border: '1px solid #ebebeb' }} />
                      <span className="option-name">{size.name}</span>
                    </div>
                    <span className="option-price">+{size.price.toFixed(2)}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {product.addons && product.addons.length > 0 && (
            <div className="product-section" style={{ borderTop: '1px solid #EBEBEB', paddingTop: '20px' }}>
              <h3 className="section-title">Add-ons</h3>
              <div className="options-list">
                {product.addons.map((addon, idx) => (
                  <label key={idx} className="option-row" style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer', marginBottom: '16px' }}>
                    <div className="option-left" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <input
                        type="checkbox"
                        checked={selectedAddons.has(idx)}
                        onChange={() => handleAddonToggle(idx)}
                        className="custom-checkbox"
                      />
                      <span className="option-name">{addon.name}</span>
                    </div>
                    <span className="option-price">+ {addon.price.toFixed(2)}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="product-footer" style={{ padding: '16px 20px', background: '#FAFAF8', borderTop: '1px solid #EBEBEB' }}>
          <button className="add-to-cart-btn" style={{ width: '100%' }} onClick={() => {
            addToCart({
              product,
              selectedSize: product.sizes ? product.sizes[selectedSize].name : null,
              selectedAddons: Array.from(selectedAddons).map(idx => product.addons[idx].name),
              totalPrice
            });
            onClose();
          }}>
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, onSelect }) {
  return (
    <div className="product-card">
      <div className="product-card-veg-icon">
        {product.isVeg ? (
          <span className="veg-icon"><span className="veg-dot"></span></span>
        ) : (
          <span className="veg-icon non-veg-icon"><span className="veg-dot non-veg-dot"></span></span>
        )}
      </div>

      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>

      <div className="product-content">
        <h2 className="product-title">{product.name}</h2>
        <p className="product-description">{product.description}</p>
        <div className="product-price">{product.price.toFixed(2)}</div>

        <div style={{ marginTop: 'auto' }}>
          <button
            className="add-to-cart-btn"
            onClick={() => onSelect(product)}
          >
            Add +
          </button>
          {product.customisable && (
            <div className="customisable-text">Customisable</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Storefront() {
  const { cartItems, updateQuantity } = useCart();
  const [activeCategory, setActiveCategory] = useState("Best Sellers");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = mockProducts.filter(p => activeCategory === "All" || p.category === activeCategory);

  return (
    <div style={{ backgroundColor: 'var(--color-bg-grey)', minHeight: '100vh', paddingBottom: '60px' }}>

      {/* Top Header Area */}
      <div style={{ backgroundColor: 'var(--color-bg-grey)', padding: '24px 0 16px 0' }}>
        <div style={{ width: '100%', boxSizing: 'border-box', margin: '0', padding: '0 32px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h1 style={{ margin: 0, fontSize: '2rem', fontFamily: "'Inter', sans-serif", fontWeight: 800, textTransform: 'none', letterSpacing: 'normal', color: 'var(--color-text-main)' }}>Our Menu</h1>


          </div>

          <div style={{ flex: '1 1 300px', maxWidth: '400px' }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search here"
                style={{ width: '100%', padding: '12px 16px', paddingRight: '40px', borderRadius: '8px', border: '1px solid var(--color-border)', background: '#FFF', fontSize: '0.95rem', outline: 'none' }}
              />
              <svg width="18" height="18" fill="none" stroke="var(--color-gold)" strokeWidth="2" viewBox="0 0 24 24" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>

        </div>
      </div>

      <div style={{ borderBottom: '1px solid var(--color-border)', marginBottom: '32px' }}></div>

      <main style={{ width: '100%', boxSizing: 'border-box', margin: '0', padding: '0 32px' }}>
        <div className="menu-layout">

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
                <button style={{ padding: '6px 16px', borderRadius: '24px', background: 'var(--color-highlight)', border: 'none', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  Veg
                </button>
                <button style={{ padding: '6px 16px', borderRadius: '24px', background: 'var(--color-highlight)', border: 'none', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  Non-Veg
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

          {/* Cart Sidebar */}
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
