"use client";

import { useState } from "react";

export default function AdminCategories() {
  const [categories, setCategories] = useState([
    { id: 1, name: "Cakes", products: 12 },
    { id: 2, name: "Pastries", products: 8 },
    { id: 3, name: "Breads", products: 4 },
  ]);
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    
    const newId = categories.length ? Math.max(...categories.map(c => c.id)) + 1 : 1;
    setCategories([...categories, { id: newId, name: newCategory, products: 0 }]);
    setNewCategory("");
  };

  const handleRemoveCategory = (id) => {
    if (confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Manage Categories</h1>
        <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>Total: {categories.length}</div>
      </div>

      <div className="card mb-lg">
        <form onSubmit={handleAddCategory} className="flex gap-sm items-center">
          <input 
            type="text" 
            className="input" 
            style={{ flex: 1, margin: 0 }}
            placeholder="Enter new category name" 
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            + Add Category
          </button>
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
            {categories.map((cat) => (
              <tr key={cat.id}>
                <td>
                  <strong style={{ fontSize: '1.1rem' }}>{cat.name}</strong>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{cat.products} Products</div>
                </td>
                <td>
                  <button onClick={() => handleRemoveCategory(cat.id)} className="btn-icon danger" title="Remove">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan="2" style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>No categories found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
