"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import './admin.css';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  
  // Don't show sidebar/topbar on login page
  if (pathname === '/admin/login') {
    return children;
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch (err) {
      console.error('Logout failed:', err);
    }
    router.push('/admin/login');
  };

  return (
    <div className="admin-layout-wrapper">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h2>Aetee CMS</h2>
        </div>
        <nav className="admin-nav">
          <Link href="/admin/dashboard" className={`admin-nav-item ${pathname === '/admin/dashboard' ? 'active' : ''}`}>
            Dashboard
          </Link>
          <Link href="/admin/categories" className={`admin-nav-item ${pathname === '/admin/categories' ? 'active' : ''}`}>
            Categories
          </Link>
          <Link href="/admin/products" className={`admin-nav-item ${pathname === '/admin/products' ? 'active' : ''}`}>
            Products
          </Link>
          <Link href="/admin/filters" className={`admin-nav-item ${pathname === '/admin/filters' ? 'active' : ''}`}>
            Filters
          </Link>
          <Link href="/admin/blocked-dates" className={`admin-nav-item ${pathname === '/admin/blocked-dates' ? 'active' : ''}`}>
            Delivery Dates
          </Link>
        </nav>
      </aside>

      {/* Main Area */}
      <div className="admin-content-area">
        {/* Top Navbar */}
        <header className="admin-topbar">
          <div className="admin-topbar-title">Admin Panel</div>
          <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '6px 16px', fontSize: '0.8rem' }}>
            Logout
          </button>
        </header>

        {/* Content */}
        <main className="admin-main">
          {children}
        </main>
      </div>
    </div>
  );
}
