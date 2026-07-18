"use client";

import { useState, useEffect } from "react";

export default function AdminFilters() {
  const [filters, setFilters] = useState([]);
  const [newFilter, setNewFilter] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [selectedFilterIds, setSelectedFilterIds] = useState(new Set());

  useEffect(() => {
    fetchFilters();
  }, []);

  const fetchFilters = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/filters", { cache: 'no-store' });
      if (!res.ok) throw new Error("Failed to fetch filters");
      const data = await res.json();
      setFilters(data);
      setError("");
    } catch (err) {
      setError("Failed to load filters. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newFilter.trim()) return;

    try {
      setSubmitting(true);
      setError("");
      
      const url = isEditing ? `/api/filters/${editingId}` : "/api/filters";
      const method = isEditing ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name: newFilter
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || `Failed to ${isEditing ? "update" : "add"} filter`);
      }

      await fetchFilters();
      resetForm();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const openEditForm = (filter) => {
    setIsEditing(true);
    setEditingId(filter.id);
    setNewFilter(filter.name);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditingId(null);
    setNewFilter("");
  };

  const handleRemoveFilter = async (id) => {
    if (!confirm("Are you sure you want to delete this filter?")) return;

    try {
      setError("");
      const res = await fetch(`/api/filters/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete filter");
      }
      await fetchFilters();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSelectFilter = (id) => {
    const newSelected = new Set(selectedFilterIds);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);
    setSelectedFilterIds(newSelected);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = filters.map(c => c.id);
      setSelectedFilterIds(new Set(allIds));
    } else {
      setSelectedFilterIds(new Set());
    }
  };

  const handleBulkDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${selectedFilterIds.size} filters?`)) return;
    
    try {
      setLoading(true);
      const res = await fetch('/api/filters/bulk', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: Array.from(selectedFilterIds) })
      });
      
      if (!res.ok) throw new Error("Failed to delete filters");
      
      await fetchFilters();
      setSelectedFilterIds(new Set());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Manage Filters</h1>
        <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>
          Total Filters: {filters.length}
        </div>
      </div>

      {selectedFilterIds.size > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--color-bg-grey)', borderRadius: '8px', marginBottom: '16px', border: '1px solid var(--color-border)' }}>
          <span style={{ fontWeight: 600 }}>{selectedFilterIds.size} filter{selectedFilterIds.size > 1 ? 's' : ''} selected</span>
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
        <h2 style={{ marginBottom: '16px', fontSize: '1.2rem' }}>{isEditing ? "Edit Filter" : "Add New Filter"}</h2>
        <form onSubmit={handleSubmit} className="flex gap-sm items-end" style={{ flexWrap: 'wrap' }}>
          <div className="input-group" style={{ flex: 1, minWidth: '200px', margin: 0 }}>
            <label>Filter Name</label>
            <input 
              type="text" 
              className="input" 
              placeholder="e.g. Vegetarian, Must Try!" 
              value={newFilter}
              onChange={(e) => setNewFilter(e.target.value)}
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
                  checked={filters.length > 0 && selectedFilterIds.size === filters.length}
                />
              </th>
              <th>Filter Name</th>
              <th width="120">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading filters...</td>
              </tr>
            ) : filters.length === 0 ? (
              <tr>
                <td colSpan="3" style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>No filters found.</td>
              </tr>
            ) : (
              filters.map((filter) => (
                <tr key={filter.id}>
                  <td>
                    <input 
                      type="checkbox" 
                      checked={selectedFilterIds.has(filter.id)}
                      onChange={() => handleSelectFilter(filter.id)}
                    />
                  </td>
                  <td style={{ paddingLeft: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div>
                        <strong style={{ fontSize: '1.1rem', color: 'var(--color-text-main)' }}>
                          {filter.name}
                        </strong>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-sm">
                      <button onClick={() => openEditForm(filter)} className="btn-icon" title="Edit">
                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                      </button>
                      <button onClick={() => handleRemoveFilter(filter.id)} className="btn-icon danger" title="Remove">
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
