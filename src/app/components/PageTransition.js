"use client";

import { useEffect, useState, useRef, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Image from 'next/image';

const BAKERY_MESSAGES = [
  "Baking fresh treats...",
  "Warming up the oven...",
  "Preparing your goodies...",
  "Handcrafting sweetness...",
];

const MIN_DURATION_MS = 2000; // Keep animation for at least 2 seconds

function PageTransitionContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isNavigating, setIsNavigating] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);
  const currentPathRef = useRef(pathname + (searchParams ? searchParams.toString() : ''));
  const navStartTimeRef = useRef(0);

  // Helper to start navigation animation
  const triggerStart = () => {
    navStartTimeRef.current = Date.now();
    setMsgIndex((prev) => (prev + 1) % BAKERY_MESSAGES.length);
    setIsNavigating(true);
  };

  // Listen to pathname / searchParam changes to complete transition after at least 2s
  useEffect(() => {
    const newPath = pathname + (searchParams ? searchParams.toString() : '');
    if (newPath !== currentPathRef.current) {
      currentPathRef.current = newPath;

      const elapsed = Date.now() - navStartTimeRef.current;
      const remaining = Math.max(0, MIN_DURATION_MS - elapsed);

      const timer = setTimeout(() => {
        setIsNavigating(false);
      }, remaining);

      return () => clearTimeout(timer);
    }
  }, [pathname, searchParams]);

  // Intercept click on internal links to trigger transition immediately
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href) return;

      // Ignore external, hash-only, mailto, tel, or target="_blank" links
      if (
        target.target === '_blank' ||
        href.startsWith('http') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('#')
      ) {
        return;
      }

      try {
        const targetUrl = new URL(href, window.location.origin);
        const currentUrl = new URL(window.location.href);

        if (
          targetUrl.pathname !== currentUrl.pathname ||
          targetUrl.search !== currentUrl.search
        ) {
          triggerStart();

          // Safety fallback timeout
          setTimeout(() => {
            setIsNavigating(false);
          }, 4000);
        }
      } catch (err) {
        if (href !== pathname) {
          triggerStart();

          setTimeout(() => {
            setIsNavigating(false);
          }, 4000);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick, true);
    return () => {
      document.removeEventListener('click', handleAnchorClick, true);
    };
  }, [pathname]);

  return (
    <div className={`page-transition-overlay ${isNavigating ? 'active' : ''}`} aria-hidden={!isNavigating}>
      <div className="bakery-loader-content">
        
        {/* Bakery Icon & Steam Animation */}
        <div className="bakery-icon-wrapper">
          {/* Steam SVG */}
          <svg className="bakery-steam-svg" viewBox="0 0 50 30" fill="none">
            <path className="steam-line steam-line-1" d="M12 28 C 10 18, 16 12, 12 2" stroke="#5A3424" strokeWidth="2.5" strokeLinecap="round" />
            <path className="steam-line steam-line-2" d="M25 28 C 23 18, 29 12, 25 2" stroke="#5A3424" strokeWidth="2.5" strokeLinecap="round" />
            <path className="steam-line steam-line-3" d="M38 28 C 36 18, 42 12, 38 2" stroke="#5A3424" strokeWidth="2.5" strokeLinecap="round" />
          </svg>

          {/* Sparkles */}
          <span className="bakery-sparkle sparkle-1">✨</span>
          <span className="bakery-sparkle sparkle-2">✦</span>
          <span className="bakery-sparkle sparkle-3">✨</span>

          {/* Central Round Cheesecake SVG (without cherry) */}
          <svg className="bakery-center-icon" width="68" height="68" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Soft Shadow */}
            <ellipse cx="32" cy="56" rx="24" ry="5" fill="#5A3424" fillOpacity="0.12" />
            {/* Crust Rim Base */}
            <path d="M8 40 C8 40 8 50 32 50 C56 50 56 40 56 40 L56 43 C56 53 32 53 8 43 Z" fill="#C2410C" stroke="#5A3424" strokeWidth="1.5" />
            {/* Round Cheesecake Body Side */}
            <path d="M8 28 C8 38 32 38 56 28 L56 40 C56 50 32 50 8 40 Z" fill="#FDE68A" stroke="#5A3424" strokeWidth="1.5" strokeLinejoin="round" />
            {/* Round Top Surface */}
            <ellipse cx="32" cy="28" rx="24" ry="10" fill="#FFFBEB" stroke="#5A3424" strokeWidth="1.5" />
            {/* Strawberry Glaze Top Circle */}
            <ellipse cx="32" cy="28" rx="20" ry="8" fill="#EF4444" fillOpacity="0.9" stroke="#5A3424" strokeWidth="1" />
            {/* Drips along side */}
            <path d="M12 29 C12 33 14 34 14 34 C14 34 16 33 16 29" fill="#EF4444" stroke="#5A3424" strokeWidth="1" />
            <path d="M26 33 C26 38 28 39 28 39 C28 39 30 37 30 32" fill="#EF4444" stroke="#5A3424" strokeWidth="1" />
            <path d="M42 32 C42 37 44 38 44 38 C44 38 46 36 46 30" fill="#EF4444" stroke="#5A3424" strokeWidth="1" />
            {/* Whipped Cream Swirls */}
            <circle cx="20" cy="24" r="3" fill="#FFFFFF" stroke="#5A3424" strokeWidth="1" />
            <circle cx="32" cy="22" r="3.5" fill="#FFFFFF" stroke="#5A3424" strokeWidth="1" />
            <circle cx="44" cy="24" r="3" fill="#FFFFFF" stroke="#5A3424" strokeWidth="1" />
            <circle cx="26" cy="29" r="2.5" fill="#FFFFFF" stroke="#5A3424" strokeWidth="1" />
            <circle cx="38" cy="29" r="2.5" fill="#FFFFFF" stroke="#5A3424" strokeWidth="1" />
          </svg>
        </div>

        {/* Logo */}
        <Image
          src="/logo.png"
          alt="Aetee's Bakehouse"
          width={180}
          height={60}
          className="bakery-loader-logo"
          style={{ width: 'auto', height: 'auto', maxHeight: '52px', objectFit: 'contain', mixBlendMode: 'multiply' }}
          priority
        />

        {/* Message */}
        <div className="bakery-loader-text" key={msgIndex}>
          {BAKERY_MESSAGES[msgIndex]}
        </div>

        {/* Shimmer Progress Track */}
        <div className="bakery-progress-track">
          <div className="bakery-progress-bar"></div>
        </div>

      </div>
    </div>
  );
}

export default function PageTransition() {
  return (
    <Suspense fallback={null}>
      <PageTransitionContent />
    </Suspense>
  );
}
