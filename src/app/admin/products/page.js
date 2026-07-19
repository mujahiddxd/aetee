"use client";

import { useState, useEffect } from "react";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const uploadImage = async (file) => {
    try {
      setIsUploading(true);
      const dataForm = new FormData();
      dataForm.append('file', file);
      
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: dataForm
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      return data.url;
    } catch (err) {
      alert(err.message);
      return null;
    } finally {
      setIsUploading(false);
    }
  };
  const [filterCategoryId, setFilterCategoryId] = useState("all");
  const [selectedProductIds, setSelectedProductIds] = useState(new Set());
  const [draggedItemId, setDraggedItemId] = useState(null);
  const [isReordering, setIsReordering] = useState(false);

  const [formData, setFormData] = useState({
    name: "", description: "", price: "", categoryId: "", sizes: [], addons: [], filterIds: [],
    isSoldOut: false, isBestSelling: false, isFeatured: false, isVeg: true, image: ""
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [prodRes, catRes, filterRes] = await Promise.all([
        fetch("/api/products", { cache: 'no-store' }),
        fetch("/api/categories", { cache: 'no-store' }),
        fetch("/api/filters", { cache: 'no-store' })
      ]);
      
      if (!prodRes.ok || !catRes.ok || !filterRes.ok) throw new Error("Failed to fetch data");
      
      const prods = await prodRes.json();
      const cats = await catRes.json();
      const filts = await filterRes.json();
      
      setProducts(prods);
      setCategories(cats);
      setFilters(filts);
      setError("");
    } catch (err) {
      setError("Failed to load data. Please refresh.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);



  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleAddSize = () => {
    setFormData({
      ...formData,
      sizes: [...formData.sizes, { name: "", price: 0, image: "" }]
    });
  };

  const handleSizeChange = (index, field, value) => {
    const newSizes = [...formData.sizes];
    newSizes[index][field] = value;
    setFormData({ ...formData, sizes: newSizes });
  };
  
  const handleRemoveSize = (index) => {
    const newSizes = [...formData.sizes];
    newSizes.splice(index, 1);
    setFormData({ ...formData, sizes: newSizes });
  };

  const handleAddOption = () => {
    setFormData({
      ...formData,
      addons: [...formData.addons, { name: "", price: 0, image: "" }]
    });
  };

  const handleAddonChange = (index, field, value) => {
    const newAddons = [...formData.addons];
    newAddons[index][field] = value;
    setFormData({ ...formData, addons: newAddons });
  };
  
  const handleRemoveOption = (index) => {
    const newAddons = [...formData.addons];
    newAddons.splice(index, 1);
    setFormData({ ...formData, addons: newAddons });
  };

  const flatCats = [];
  categories.forEach(cat => {
    flatCats.push(cat);
    if (cat.children && cat.children.length > 0) {
      cat.children.forEach(child => {
        flatCats.push({ ...child, name: `${cat.name} > ${child.name}` });
      });
    }
  });

  const openAddForm = () => {
    setIsEditing(false);
    setFormData({
      name: "", description: "", price: "", categoryId: flatCats.length > 0 ? flatCats[0].id : "", sizes: [], addons: [], filterIds: [],
      isSoldOut: false, isBestSelling: false, isFeatured: false, isVeg: true, image: ""
    });
    setCurrentProduct({ isNew: true });
  };

  const openEditForm = (prod) => {
    setIsEditing(true);
    setFormData({ 
      ...prod,
      categoryId: prod.categoryId || (flatCats.length > 0 ? flatCats[0].id : ""),
      filterIds: prod.filters || []
    });
    setCurrentProduct(prod);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.categoryId) {
      alert("Please select a category first. If you don't have any categories, create one in the Categories page.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const url = isEditing ? `/api/products/${currentProduct.id}` : "/api/products";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save product");
      }

      const savedProduct = await res.json();

      if (isEditing) {
        setProducts(products.map(p => p.id === currentProduct.id ? savedProduct : p));
      } else {
        setProducts([...products, savedProduct]);
      }
      setCurrentProduct(null);
    } catch (err) {
      setError(err.message);
      window.scrollTo(0, 0);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;

    try {
      setError("");
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete product");
      
      setProducts(products.filter(p => p.id !== id));
      
      const newSelected = new Set(selectedProductIds);
      newSelected.delete(id);
      setSelectedProductIds(newSelected);
    } catch (err) {
      setError(err.message);
    }
  };

  // --- Multi-Select & Bulk Actions Logic ---
  const handleSelectProduct = (id) => {
    const newSelected = new Set(selectedProductIds);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);
    setSelectedProductIds(newSelected);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = filteredProducts.map(p => p.id);
      setSelectedProductIds(new Set(allIds));
    } else {
      setSelectedProductIds(new Set());
    }
  };

  const handleBulkDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${selectedProductIds.size} products?`)) return;
    
    try {
      setLoading(true);
      const res = await fetch('/api/products/bulk', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: Array.from(selectedProductIds) })
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to delete products");
      }
      
      setProducts(products.filter(p => !selectedProductIds.has(p.id)));
      setSelectedProductIds(new Set());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- Drag and Drop Logic ---
  const filteredProducts = filterCategoryId === "all" 
    ? products 
    : products.filter(p => p.categoryId === filterCategoryId);

  const handleDragStart = (e, id) => {
    setDraggedItemId(id);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", id);
    // Visual effect
    setTimeout(() => {
      if (e.target) e.target.style.opacity = '0.4';
    }, 0);
  };

  const handleDragEnd = (e) => {
    if (e.target) e.target.style.opacity = '1';
    setDraggedItemId(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = async (e, targetId) => {
    e.preventDefault();
    if (!draggedItemId || draggedItemId === targetId) {
      setDraggedItemId(null);
      return;
    }

    const newProducts = [...products];
    const draggedIndex = newProducts.findIndex(p => p.id === draggedItemId);
    const targetIndex = newProducts.findIndex(p => p.id === targetId);
    
    const [draggedItem] = newProducts.splice(draggedIndex, 1);
    newProducts.splice(targetIndex, 0, draggedItem);
    
    setProducts(newProducts);
    setDraggedItemId(null);
    setIsReordering(true);

    const itemsInCategory = newProducts.filter(p => p.categoryId === filterCategoryId);
    const payload = itemsInCategory.map((prod, index) => ({
      id: prod.id,
      sortOrder: index
    }));

    try {
      const res = await fetch('/api/products/reorder', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: payload })
      });
      if (!res.ok) throw new Error("Failed to save new order");
    } catch (err) {
      setError("Failed to save order. Please refresh.");
      console.error(err);
    } finally {
      setIsReordering(false);
    }
  };


  return (
    <div>
      <div className="page-header" style={{ flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h1>Manage Products</h1>
          {isReordering && <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Saving order...</span>}
        </div>
        
        {!currentProduct && (
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
            <select 
              className="input" 
              style={{ marginBottom: 0, minWidth: '200px' }}
              value={filterCategoryId}
              onChange={(e) => {
                setFilterCategoryId(e.target.value);
                setSelectedProductIds(new Set());
              }}
            >
              <option value="all">All Categories</option>
              {flatCats.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            
            <button className="btn btn-primary" onClick={openAddForm}>
              + Add New Product
            </button>
          </div>
        )}
      </div>

      {filterCategoryId === "all" && !currentProduct && (
        <div style={{ padding: '12px', background: 'rgba(245,166,35,0.1)', color: '#b97700', borderRadius: '8px', marginBottom: '16px', fontSize: '0.9rem' }}>
          💡 <strong>Tip:</strong> Select a specific category from the dropdown above to enable drag-and-drop reordering.
        </div>
      )}

      {selectedProductIds.size > 0 && !currentProduct && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--color-bg-grey)', borderRadius: '8px', marginBottom: '16px', border: '1px solid var(--color-border)' }}>
          <span style={{ fontWeight: 600 }}>{selectedProductIds.size} product{selectedProductIds.size > 1 ? 's' : ''} selected</span>
          <button className="btn btn-secondary" onClick={handleBulkDelete} style={{ color: '#ff3b30', borderColor: '#ff3b30', background: 'rgba(255,59,48,0.1)' }}>
            Delete Selected
          </button>
        </div>
      )}

      {error && (
        <div style={{ background: 'rgba(255,59,48,0.1)', color: '#ff3b30', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem' }}>
          {error}
        </div>
      )}

      {currentProduct ? (
        <div className="card mb-lg" style={{ maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '24px' }}>{isEditing ? "Edit Product" : "Add New Product"}</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', gap: '24px', marginBottom: '24px' }}>
              <div style={{ width: '200px', height: '200px', backgroundColor: '#f3f4f6', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px dashed var(--color-border)', color: 'var(--color-text-muted)', overflow: 'hidden', position: 'relative' }}>
                {formData.image ? (
                  <img src={formData.image} alt="Product preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ fontSize: '0.875rem' }}>No Image</span>
                )}
                <label style={{ position: 'absolute', bottom: '8px', background: 'rgba(0,0,0,0.7)', color: 'white', padding: '4px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>
                  {isUploading ? "..." : "Upload Image"}
                  <input type="file" accept="image/*" style={{ display: 'none' }} disabled={isUploading || submitting} onChange={async (e) => {
                    if (e.target.files && e.target.files[0]) {
                      const url = await uploadImage(e.target.files[0]);
                      if (url) setFormData({ ...formData, image: url });
                    }
                  }} />
                </label>
              </div>
              <div style={{ flex: 1 }}>
                <div className="input-group">
                  <label>Product Name</label>
                  <input type="text" className="input" name="name" value={formData.name} onChange={handleInputChange} required minLength={2} disabled={submitting} />
                </div>
                <div className="input-group">
                  <label>Description</label>
                  <textarea className="input" name="description" value={formData.description} onChange={handleInputChange} rows={3} disabled={submitting} />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
              <div className="input-group" style={{ flex: 1, marginBottom: 0 }}>
                <label>Price ($)</label>
                <input type="number" step="0.01" className="input" name="price" value={formData.price} onChange={handleInputChange} required min="0" disabled={submitting} />
              </div>
              <div className="input-group" style={{ flex: 1, marginBottom: 0 }}>
                <label>Category</label>
                <select className="input" name="categoryId" value={formData.categoryId} onChange={handleInputChange} required disabled={submitting}>
                  {flatCats.length === 0 ? (
                    <option value="">No categories available</option>
                  ) : (
                    flatCats.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))
                  )}
                </select>
              </div>
            </div>

            <div className="input-group">
              <label>Sizes</label>
              {formData.sizes.map((size, index) => (
                <div key={index} style={{ display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
                  <input type="text" className="input" placeholder="Size Name (e.g. Large)" value={size.name} onChange={(e) => handleSizeChange(index, 'name', e.target.value)} style={{ flex: 2 }} required minLength={1} disabled={submitting} />
                  <input type="number" step="0.01" className="input" placeholder="Price Offset" value={size.price} onChange={(e) => handleSizeChange(index, 'price', e.target.value)} style={{ flex: 1 }} required min="0" disabled={submitting} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                    <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: 'var(--color-text-main)', border: '1px solid var(--color-border)', padding: '6px 12px', borderRadius: '6px', background: '#FFF' }}>
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                      Image
                      <input type="file" accept="image/*" style={{ display: 'none' }} disabled={isUploading || submitting} onChange={async (e) => {
                        if (e.target.files && e.target.files[0]) {
                          const url = await uploadImage(e.target.files[0]);
                          if (url) handleSizeChange(index, 'image', url);
                        }
                      }} />
                    </label>
                    {size.image && <img src={size.image} alt="preview" style={{ width: '28px', height: '28px', borderRadius: '4px', objectFit: 'cover' }} />}
                  </div>
                  <button type="button" className="btn-icon danger" onClick={() => handleRemoveSize(index)} disabled={submitting}>
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>
                </div>
              ))}
              <button type="button" className="btn btn-secondary" onClick={handleAddSize} style={{ alignSelf: 'flex-start', marginTop: '8px' }} disabled={submitting}>
                + Add Size
              </button>
            </div>

            <div className="input-group">
              <label>Add-ons</label>
              {formData.addons.map((addon, index) => (
                <div key={index} style={{ display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
                  <input type="text" className="input" placeholder="Option Name" value={addon.name} onChange={(e) => handleAddonChange(index, 'name', e.target.value)} style={{ flex: 2 }} required minLength={1} disabled={submitting} />
                  <input type="number" step="0.01" className="input" placeholder="Extra Price" value={addon.price} onChange={(e) => handleAddonChange(index, 'price', e.target.value)} style={{ flex: 1 }} required min="0" disabled={submitting} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                    <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: 'var(--color-text-main)', border: '1px solid var(--color-border)', padding: '6px 12px', borderRadius: '6px', background: '#FFF' }}>
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                      Image
                      <input type="file" accept="image/*" style={{ display: 'none' }} disabled={isUploading || submitting} onChange={async (e) => {
                        if (e.target.files && e.target.files[0]) {
                          const url = await uploadImage(e.target.files[0]);
                          if (url) handleAddonChange(index, 'image', url);
                        }
                      }} />
                    </label>
                    {addon.image && <img src={addon.image} alt="preview" style={{ width: '28px', height: '28px', borderRadius: '4px', objectFit: 'cover' }} />}
                  </div>
                  <button type="button" className="btn-icon danger" onClick={() => handleRemoveOption(index)} disabled={submitting}>
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>
                </div>
              ))}
              <button type="button" className="btn btn-secondary" onClick={handleAddOption} style={{ alignSelf: 'flex-start', marginTop: '8px' }} disabled={submitting}>
                + Add Option
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', margin: '32px 0', padding: '24px', backgroundColor: 'var(--color-bg-grey)', borderRadius: '12px' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '8px' }}>Filters & Tags</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {filters.length === 0 ? (
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>No filters created yet. Create them in the Filters page.</span>
                ) : filters.map(f => (
                  <label key={f.id} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      disabled={submitting}
                      checked={formData.filterIds.includes(f.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({ ...formData, filterIds: [...formData.filterIds, f.id] });
                        } else {
                          setFormData({ ...formData, filterIds: formData.filterIds.filter(id => id !== f.id) });
                        }
                      }}
                    />
                    {f.name}
                  </label>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', margin: '32px 0', padding: '24px', backgroundColor: 'var(--color-bg-grey)', borderRadius: '12px' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '8px' }}>Status Flags</h3>
              <label className="toggle-label">
                <input type="checkbox" className="sr-only" name="isFeatured" checked={formData.isFeatured} onChange={handleInputChange} disabled={submitting} />
                <div className="toggle-switch"></div>
                Mark as Featured
              </label>
              <label className="toggle-label">
                <input type="checkbox" className="sr-only" name="isBestSelling" checked={formData.isBestSelling} onChange={handleInputChange} disabled={submitting} />
                <div className="toggle-switch"></div>
                Mark as Best Selling
              </label>
              <label className="toggle-label">
                <input type="checkbox" className="sr-only" name="isSoldOut" checked={formData.isSoldOut} onChange={handleInputChange} disabled={submitting} />
                <div className="toggle-switch"></div>
                Mark as Sold Out
              </label>
              <label className="toggle-label">
                <input type="checkbox" className="sr-only" name="isVeg" checked={formData.isVeg} onChange={handleInputChange} disabled={submitting} />
                <div className="toggle-switch"></div>
                Is Eggless (Vegetarian)
              </label>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', paddingTop: '16px', borderTop: '1px solid var(--color-border)' }}>
              <button type="button" className="btn btn-secondary" onClick={() => setCurrentProduct(null)} disabled={submitting}>Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={submitting}>{submitting ? "Saving..." : "Save Product"}</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th width="40">
                  <input 
                    type="checkbox" 
                    onChange={handleSelectAll}
                    checked={filteredProducts.length > 0 && selectedProductIds.size === filteredProducts.length}
                  />
                </th>
                <th width="80">Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Status Flags</th>
                <th width="120">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="6" style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading products...</td></tr>
              ) : filteredProducts.length === 0 ? (
                <tr><td colSpan="6" style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>No products found in this category.</td></tr>
              ) : (
                filteredProducts.map(prod => (
                  <tr 
                    key={prod.id}
                    draggable={filterCategoryId !== "all"}
                    onDragStart={(e) => handleDragStart(e, prod.id)}
                    onDragEnd={handleDragEnd}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, prod.id)}
                    style={{ 
                      cursor: filterCategoryId !== "all" ? 'grab' : 'default',
                      backgroundColor: draggedItemId === prod.id ? 'var(--color-bg-grey)' : 'inherit'
                    }}
                  >
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {filterCategoryId !== "all" && (
                          <div style={{ color: 'var(--color-text-muted)', cursor: 'grab' }}>
                            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16"></path>
                            </svg>
                          </div>
                        )}
                        <input 
                          type="checkbox" 
                          checked={selectedProductIds.has(prod.id)}
                          onChange={() => handleSelectProduct(prod.id)}
                        />
                      </div>
                    </td>
                    <td>
                      {prod.image ? (
                        <img src={prod.image} alt={prod.name} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px' }} />
                      ) : (
                        <div style={{ width: '48px', height: '48px', backgroundColor: '#eaeaea', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: '#888' }}>No Img</div>
                      )}
                    </td>
                    <td>
                      <strong>{prod.name}</strong>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                        {categories.find(c => c.id === prod.categoryId)?.name || prod.categoryId}
                      </div>
                    </td>
                    <td style={{ fontWeight: 600 }}>${Number(prod.price).toFixed(2)}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {prod.isFeatured && <span className="badge badge-featured">Featured</span>}
                        {prod.isBestSelling && <span className="badge badge-best-seller">Best Seller!</span>}
                        {prod.isSoldOut && <span className="badge badge-sold-out">Sold Out</span>}
                        {prod.isVeg ? <span style={{ background: '#dcfce7', color: '#166534', fontSize: '0.7rem', padding: '4px 8px', borderRadius: '4px', fontWeight: 600 }}>Eggless</span> : <span style={{ background: '#fee2e2', color: '#991b1b', fontSize: '0.7rem', padding: '4px 8px', borderRadius: '4px', fontWeight: 600 }}>Contains Egg</span>}
                        {prod.filterTags && prod.filterTags.map(ft => (
                          <span key={ft.id} style={{ background: '#e2e8f0', color: '#475569', fontSize: '0.7rem', padding: '4px 8px', borderRadius: '4px', fontWeight: 600 }}>
                            {ft.name}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div className="flex gap-sm">
                        <button onClick={() => openEditForm(prod)} className="btn-icon" title="Edit">
                          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                        </button>
                        <button onClick={() => handleDelete(prod.id)} className="btn-icon danger" title="Delete">
                          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
