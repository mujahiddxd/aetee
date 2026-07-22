"use client";

import { useState, useEffect } from "react";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState(new Set());


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

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCategories();
  }, []);

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
          name: newCategory
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditingId(null);
    setNewCategory("");
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

  const handleSelectCategory = (id) => {
    const newSelected = new Set(selectedCategoryIds);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);
    setSelectedCategoryIds(newSelected);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = flattenedCategories.map(c => c.id);
      setSelectedCategoryIds(new Set(allIds));
    } else {
      setSelectedCategoryIds(new Set());
    }
  };

  const handleBulkDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${selectedCategoryIds.size} categories? Products in these categories will not be deleted, but will lose their category assignment.`)) return;
    
    try {
      setLoading(true);
      const res = await fetch('/api/categories/bulk', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: Array.from(selectedCategoryIds) })
      });
      
      if (!res.ok) throw new Error("Failed to delete categories");
      
      await fetchCategories();
      setSelectedCategoryIds(new Set());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const saveOrder = async (orderedIds) => {
    try {
      await fetch('/api/categories/reorder', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderedIds })
      });
    } catch (err) {
      console.error('Failed to save order:', err);
      setError('Failed to save order.');
    }
  };

  const handleMoveUp = async (index) => {
    if (index === 0) return;
    const newCategories = [...categories];
    const temp = newCategories[index];
    newCategories[index] = newCategories[index - 1];
    newCategories[index - 1] = temp;
    setCategories(newCategories);
    await saveOrder(newCategories.map(c => c.id));
  };

  const handleMoveDown = async (index) => {
    if (index === categories.length - 1) return;
    const newCategories = [...categories];
    const temp = newCategories[index];
    newCategories[index] = newCategories[index + 1];
    newCategories[index + 1] = temp;
    setCategories(newCategories);
    await saveOrder(newCategories.map(c => c.id));
  };

  const flattenedCategories = categories.map(cat => ({ ...cat, isChild: false }));

  return (
    <div>
      <div className="page-header">
        <h1>Manage Categories</h1>
        <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>
          Total Main: {categories.length}
        </div>
      </div>

      {selectedCategoryIds.size > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--color-bg-grey)', borderRadius: '8px', marginBottom: '16px', border: '1px solid var(--color-border)' }}>
          <span style={{ fontWeight: 600 }}>{selectedCategoryIds.size} categor{selectedCategoryIds.size > 1 ? 'ies' : 'y'} selected</span>
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
              <th width="40">
                <input 
                  type="checkbox" 
                  onChange={handleSelectAll}
                  checked={flattenedCategories.length > 0 && selectedCategoryIds.size === flattenedCategories.length}
                />
              </th>
              <th>Category Name</th>
              <th width="80" style={{ textAlign: 'center' }}>Order</th>
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
                  <td>
                    <input 
                      type="checkbox" 
                      checked={selectedCategoryIds.has(cat.id)}
                      onChange={() => handleSelectCategory(cat.id)}
                    />
                  </td>
                  <td style={{ paddingLeft: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div>
                        <strong style={{ fontSize: '1.1rem', color: 'var(--color-text-main)' }}>
                          {cat.name}
                        </strong>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-sm" style={{ justifyContent: 'center' }}>
                      <button onClick={() => handleMoveUp(flattenedCategories.indexOf(cat))} disabled={flattenedCategories.indexOf(cat) === 0} className="btn-icon" title="Move Up" style={{ opacity: flattenedCategories.indexOf(cat) === 0 ? 0.3 : 1 }}>
                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7"></path></svg>
                      </button>
                      <button onClick={() => handleMoveDown(flattenedCategories.indexOf(cat))} disabled={flattenedCategories.indexOf(cat) === flattenedCategories.length - 1} className="btn-icon" title="Move Down" style={{ opacity: flattenedCategories.indexOf(cat) === flattenedCategories.length - 1 ? 0.3 : 1 }}>
                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path></svg>
                      </button>
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
