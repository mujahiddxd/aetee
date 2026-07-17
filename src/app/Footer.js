"use client";

import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#F9F8F6', padding: '64px 32px 32px', color: '#5A3424', borderTop: '1px solid #EBEBEB' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '48px' }}>
        
        {/* Left Side (Logo + Links) */}
        <div style={{ display: 'flex', gap: '64px', flexWrap: 'wrap' }}>
          {/* Logo Column */}
          <div style={{ width: '120px' }}>
            <div style={{ width: '100px', height: '60px', backgroundColor: '#FAD889', borderRadius: '50px', border: '4px solid #8D6E63', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', position: 'relative' }}>
               <div style={{ backgroundColor: '#5A3424', color: '#FFF', fontSize: '14px', padding: '4px 8px', position: 'absolute', bottom: '-20px', whiteSpace: 'nowrap' }}>Bake at Home</div>
            </div>
          </div>

          {/* Links Columns */}
          <div style={{ display: 'flex', gap: '64px' }}>
            <div>
              <h4 style={{ fontWeight: 'bold', marginBottom: '16px', fontSize: '1.2rem', textTransform: 'uppercase' }}>SHOP</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li><Link href="/menu" style={{ color: '#888', textDecoration: 'none', fontSize: '1.1rem' }}>Menu</Link></li>
                <li><Link href="/cart" style={{ color: '#888', textDecoration: 'none', fontSize: '1.1rem' }}>Cart</Link></li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontWeight: 'bold', marginBottom: '16px', fontSize: '1.2rem', textTransform: 'uppercase' }}>CONTACT</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li><Link href="/contact" style={{ color: '#888', textDecoration: 'none', fontSize: '1.1rem' }}>Contact us</Link></li>
                <li><Link href="/email" style={{ color: '#888', textDecoration: 'none', fontSize: '1.1rem' }}>Email us</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Side (Newsletter Column) */}
        <div style={{ maxWidth: '350px' }}>
          <h4 style={{ fontWeight: 'bold', marginBottom: '12px', fontSize: '1.2rem', textTransform: 'uppercase' }}>AETEES IN YOUR INBOX</h4>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '24px', color: '#888' }}>For special offers, new goodies, and the latest news join our mailing list.</p>
          <div style={{ display: 'flex', borderRadius: '24px', overflow: 'hidden', border: '1px solid #CCC', backgroundColor: '#FFF' }}>
            <input type="email" placeholder="Enter your email address" style={{ flex: 1, minWidth: 0, padding: '16px 20px', border: 'none', outline: 'none', fontSize: '1.1rem' }} />
            <button style={{ flexShrink: 0, backgroundColor: '#5A3424', color: '#FFF', border: 'none', padding: '0 32px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.1rem', whiteSpace: 'nowrap' }}>SIGN UP</button>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div style={{ maxWidth: '1000px', margin: '64px auto 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', fontSize: '1rem', color: '#888' }}>
        <div>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', color: '#666' }}>
            {/* Social Icons Placeholders */}
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 00-2.122 2.136C0 8.08 0 12 0 12s0 3.92.502 5.814a3.016 3.016 0 002.122 2.136C4.495 20.5 12 20.5 12 20.5s7.505 0 9.377-.55a3.016 3.016 0 002.122-2.136C24 15.92 24 12 24 12s0-3.92-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <p style={{ margin: '0 0 4px 0' }}><strong>GST:</strong> 06AAWFN7960J1ZF</p>
            <p style={{ margin: 0, display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="14" width="10" viewBox="0 0 384 512" style={{ marginTop: '4px' }}><path d="M172.3 501.7C27 291 0 269.4 0 192 0 86 86 0 192 0s192 86 192 192c0 77.4-27 99-172.3 309.7-9.5 13.8-29.9 13.8-39.5 0zM192 272c44.2 0 80-35.8 80-80s-35.8-80-80-80-80 35.8-80 80 35.8 80 80 80z"/></svg>
              <span>Upper Ground Floor, A 223, Supermart-1, DLF Phase IV,<br />Gurugram, Haryana 122009, India</span>
            </p>
          </div>
          <div>
            * <Link href="/terms" style={{ color: 'inherit', textDecoration: 'none' }}>TERMS</Link> | <Link href="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>PRIVACY</Link> | <Link href="/policy" style={{ color: 'inherit', textDecoration: 'none' }}>PURCHASER POLICY</Link>
          </div>
        </div>
        <div style={{ letterSpacing: '0.05em', paddingBottom: '2px', textAlign: 'right' }}>
          © Copyright AirMenus 2026<br />
          AETEES BAKE HOUSE
        </div>
      </div>
    </footer>
  );
}
