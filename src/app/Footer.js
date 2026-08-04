"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  // Don't render footer on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer style={{ backgroundColor: '#F9F8F6', padding: '40px 32px 32px', color: '#5A3424', borderTop: '1px solid #EBEBEB' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Logo Section */}
        <div style={{ marginBottom: '20px' }}>
          <Image src="/logo.png" alt="Aetee's Bakehouse" width={180} height={100} style={{ width: '180px', height: 'auto', objectFit: 'contain', mixBlendMode: 'multiply' }} />
        </div>

        {/* Navigation & Info Columns */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '32px 48px' }}>

          {/* Shop Column */}
          <div>
            <h4 style={{ fontWeight: 'bold', marginBottom: '16px', fontSize: '1.2rem', textTransform: 'uppercase' }}>SHOP</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><Link href="/menu" style={{ color: '#888', textDecoration: 'none', fontSize: '1.1rem' }}>Menu</Link></li>
              <li><Link href="/cart" style={{ color: '#888', textDecoration: 'none', fontSize: '1.1rem' }}>Cart</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 style={{ fontWeight: 'bold', marginBottom: '16px', fontSize: '1.2rem', textTransform: 'uppercase' }}>CONTACT</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><Link href="/contact" style={{ color: '#888', textDecoration: 'none', fontSize: '1.1rem' }}>Contact us</Link></li>
              <li><Link href="/contact" style={{ color: '#888', textDecoration: 'none', fontSize: '1.1rem' }}>Email us</Link></li>
              <li><a href="https://wa.me/919769000175" target="_blank" rel="noopener noreferrer" style={{ color: '#888', textDecoration: 'none', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a5.816 5.816 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                +91 97690 00175
              </a></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div style={{ maxWidth: '350px' }}>
            <h4 style={{ fontWeight: 'bold', marginBottom: '12px', fontSize: '1.2rem', textTransform: 'uppercase' }}>AETEES IN YOUR INBOX</h4>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '24px', color: '#888' }}>For special offers, new goodies, and the latest news join our mailing list.</p>
            <div style={{ display: 'flex', borderRadius: '24px', overflow: 'hidden', border: '1px solid #CCC', backgroundColor: '#FFF' }}>
              <input type="email" placeholder="Enter your email address" style={{ flex: 1, minWidth: 0, padding: '16px 20px', border: 'none', outline: 'none', fontSize: '1.1rem' }} />
              <button style={{ flexShrink: 0, backgroundColor: '#5A3424', color: '#FFF', border: 'none', padding: '0 32px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.1rem', whiteSpace: 'nowrap' }}>SIGN UP</button>
            </div>
          </div>

        </div>
      </div>

      {/* Footer Bottom */}
      <div style={{ maxWidth: '1200px', margin: '64px auto 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', fontSize: '1rem', color: '#888' }}>
        <div>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', color: '#666' }}>
            <a href="https://www.facebook.com/profile.php?id=61591983307438" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
            </a>
            <a href="https://www.instagram.com/aetees_bakehouse?igsh=MWVkMXBoaHNncmg4ZQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
            </a>
          </div>

          <div>
            * <Link href="/terms" style={{ color: 'inherit', textDecoration: 'none' }}>TERMS</Link> | <Link href="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>PRIVACY POLICY</Link> | <Link href="/policy" style={{ color: 'inherit', textDecoration: 'none' }}>PURCHASER POLICY</Link>
          </div>
        </div>

        <div style={{ textAlign: 'right', fontSize: '1.05rem', color: '#888', lineHeight: '1.5' }}>
          © 2026 Euphatics. All Rights Reserved.<br />
          <a href="https://www.euphatics.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
            Designed, Developed & Maintained by Euphatics
          </a>
        </div>
      </div>
    </footer>
  );
}
