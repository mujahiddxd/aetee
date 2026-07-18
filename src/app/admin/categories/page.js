"use client";

import { useState, useEffect } from "react";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [parentId, setParentId] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/categories", { cache: 'no-store' });
      if (!res.ok) throw new Error("Failed to fetch categories");
      const data = await res.json();
      setCategories(data);
      setError("");
    } catch (err) {
      setError("Failed to load categories. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;

    try {
      setSubmitting(true);
      setError("");
      
      const url = isEditing ? `/api/categories/${editingId}` : "/api/categories";
      const method = isEditing ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name: newCategory,
          parentId: parentId || null
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || `Failed to ${isEditing ? "update" : "add"} category`);
      }

      await fetchCategories();
      resetForm();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const openEditForm = (cat) => {
    setIsEditing(true);
    setEditingId(cat.id);
    setNewCategory(cat.name);
    setParentId(cat.parentId || "");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditingId(null);
    setNewCategory("");
    setParentId("");
  };

  const handleRemoveCategory = async (id) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      setError("");
      const res = await fetch(`/api/categories/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete category");
      }
      await fetchCategories();
    } catch (err) {
      setError(err.message);
    }
  };

  // Flatten categories for table rendering to easily show parent and children sequentially
  const flattenedCategories = [];
  categories.forEach(cat => {
    flattenedCategories.push({ ...cat, isChild: false });
    if (cat.children && cat.children.length > 0) {
      cat.children.forEach(child => {
        flattenedCategories.push({ ...child, isChild: true });
      });
    }
  });

  return (
    <div>
      <div className="page-header">
        <h1>Manage Categories</h1>
        <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>
          Total Main: {categories.length}
        </div>
      </div>

      {error && (
        <div style={{ background: 'rgba(255,59,48,0.1)', color: '#ff3b30', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem' }}>
          {error}
        </div>
      )}

      <div className="card mb-lg">
        <h2 style={{ marginBottom: '16px', fontSize: '1.2rem' }}>{isEditing ? "Edit Category" : "Add New Category"}</h2>
        <form onSubmit={handleSubmit} className="flex gap-sm items-end" style={{ flexWrap: 'wrap' }}>
          <div className="input-group" style={{ flex: 1, minWidth: '200px', margin: 0 }}>
            <label>Category Name</label>
            <input 
              type="text" 
              className="input" 
              placeholder="e.g. Cakes, Eggless" 
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              disabled={submitting}
              required
              minLength={2}
            />
          </div>
          <div className="input-group" style={{ flex: 1, minWidth: '200px', margin: 0 }}>
            <label>Parent Category (Optional)</label>
            <select 
              className="input" 
              value={parentId}
              onChange={(e) => setParentId(e.target.value)}
              disabled={submitting}
            >
              <option value="">-- None (Top Level) --</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id} disabled={isEditing && (cat.id === editingId)}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {isEditing && (
              <button type="button" className="btn btn-secondary" onClick={resetForm} disabled={submitting} style={{ height: '42px' }}>
                Cancel
              </button>
            )}
            <button type="submit" className="btn btn-primary" disabled={submitting} style={{ height: '42px' }}>
              {submitting ? "Saving..." : (isEditing ? "Save Changes" : "+ Add")}
            </button>
          </div>
        </form>
      </div>

      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Category Name</th>
              <th width="120">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="2" style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading categories...</td>
              </tr>
            ) : flattenedCategories.length === 0 ? (
              <tr>
                <td colSpan="2" style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>No categories found.</td>
              </tr>
            ) : (
              flattenedCategories.map((cat) => (
                <tr key={cat.id} style={{ backgroundColor: cat.isChild ? '#fdfdfd' : 'transparent' }}>
                  <td style={{ paddingLeft: cat.isChild ? '40px' : '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {cat.isChild && (
                        <svg width="16" height="16" fill="none" stroke="var(--color-border)" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path>
                        </svg>
                      )}
                      <div>
                        <strong style={{ fontSize: cat.isChild ? '1rem' : '1.1rem', color: cat.isChild ? 'var(--color-text-muted)' : 'var(--color-text-main)' }}>
                          {cat.name}
                        </strong>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                          {cat.products} Products {cat.children?.length > 0 && `· ${cat.children.length} Subcategories`}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-sm">
                      <button onClick={() => openEditForm(cat)} className="btn-icon" title="Edit">
                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                      </button>
                      <button onClick={() => handleRemoveCategory(cat.id)} className="btn-icon danger" title="Remove">
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
    </div>
  );
}
