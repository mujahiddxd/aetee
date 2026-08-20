# 🎨 Design System — Aetee's Bakehouse

> Design documentation for the Aetee's Bakehouse e-commerce platform.
> Last updated: August 2026

---

## 1. Brand Identity

**Aetee's Bakehouse** is a premium, artisan bakery brand based in Mumbai, India. The visual language reflects warmth, handcrafted quality, and indulgence — evoking the feeling of freshly baked treats, rich chocolate, and creamy desserts.

### Brand Personality
- **Warm** — Earthy, inviting tones inspired by baked goods
- **Premium** — Clean layouts, generous whitespace, high-quality imagery
- **Artisanal** — Handcrafted feel with attention to detail
- **Approachable** — Friendly, non-intimidating browsing experience

---

## 2. Color Palette

### Primary Colors

| Token | Hex | Usage |
|---|---|---|
| `--color-primary` | `#5A3424` | Deep Chocolate Brown — buttons, headings, navbar, brand identity |
| `--color-primary-hover` | `#48291C` | Darker brown — hover/active states |
| `--color-highlight` | `#F8ECC2` | Soft Buttercream Yellow — hero section, feature highlights |

### Background Colors

| Token | Hex | Usage |
|---|---|---|
| `--color-bg-white` | `#FFFFFF` | Main content background |
| `--color-bg-grey` | `#F4F1EB` | Light warm grey — page-level background |

### Text Colors

| Token | Hex | Usage |
|---|---|---|
| `--color-text-main` | `#5A3424` | Primary body text (same as brand brown) |
| `--color-text-muted` | `#826356` | Secondary text, descriptions, metadata |
| `--color-border` | `#E6DFD7` | Soft warm borders, dividers |

### Accent & Status Colors

| Token | Hex | Usage |
|---|---|---|
| `--color-danger` | `#EF4444` | Error states, destructive actions |
| `--color-success` | `#22C55E` | Success confirmations |
| `--color-gold` | `#EAB308` | Ratings, premium badges |
| `--color-orange` | `#F97316` | Warnings, attention-drawing elements |
| `--color-grey-badge` | `#9CA3AF` | Neutral badges, disabled states |

### Footer Bottom (Espresso Accent)

| Element | Hex | Usage |
|---|---|---|
| Background | `#3E2723` | Deep espresso brown — footer bottom bar |
| Text | `#F5F5DC` | Warm beige — footer bottom text & icons |

---

## 3. Typography

### Font Stack

| Font | Weight | Usage |
|---|---|---|
| **Oswald** (Google Fonts) | 500, 600, 700 | Headings (h1–h6), buttons, uppercase labels |
| **Inter** (Google Fonts) | 400, 500, 600, 700 | Body text, paragraphs, form inputs, UI elements |

### Typographic Rules
- All headings use `text-transform: uppercase` and `letter-spacing: 0.02em`
- Heading color defaults to `--color-primary`
- Body `line-height: 1.5`
- Links default to `--color-primary` with no underline

---

## 4. Spacing & Layout

### Spacing Scale (CSS Custom Properties)

| Token | Value |
|---|---|
| `--space-xs` | 4px |
| `--space-sm` | 8px |
| `--space-md` | 16px |
| `--space-lg` | 24px |
| `--space-xl` | 32px |
| `--space-2xl` | 48px |

### Border Radius

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | 4px | Buttons, small elements |
| `--radius-md` | 8px | Cards, inputs |
| `--radius-lg` | 12px | Modals, image containers |
| `--radius-full` | 9999px | Badges, pills, avatar circles |

### Shadows

| Token | Value | Usage |
|---|---|---|
| `--shadow-sm` | `0 1px 2px rgb(0 0 0 / 0.05)` | Subtle surface elevation |
| `--shadow-card` | `0 4px 6px -1px rgb(0 0 0 / 0.1)` | Product cards, panels |
| `--shadow-hover` | `0 10px 15px -3px rgb(0 0 0 / 0.1)` | Hover lift effect on cards |

---

## 5. Component Design

### 5.1 Navbar
- **Desktop**: Fixed top header with `--color-primary` background, white logo + nav links. Clean horizontal layout with `Menu` link and shopping cart icon with badge counter.
- **Mobile**: Hamburger menu (3-bar icon) toggling a full-screen slide-down panel with menu links, cart link, and social media icons.
- Border-bottom removed for clean edge-to-edge look.

### 5.2 Product Cards (`ProductCard.js`)
- Aspect ratio `4:3` image container with `overflow: hidden`
- Product description clamped to 3 lines (`-webkit-line-clamp: 3`)
- "Sold Out" badge overlay when `isSoldOut` is true
- Egg/Eggless toggle badges
- Quantity stepper with +/– buttons inside a bordered pill
- Hover shadow lift via `--shadow-hover`

### 5.3 Product Modal (`ProductModal.js`)
- Full-screen overlay on mobile, centered modal on desktop
- `16:9` aspect ratio hero image
- Size selection pills, addon checkboxes
- Egg preference toggle (Eggless/With Egg)
- Sticky footer with total price + "Add to Cart" CTA button
- Smooth slide-up entry animation

### 5.4 Page Transition (`PageTransition.js`)
- Full-viewport overlay with radial gradient (`#FFFFFF → #F9F8F6`)
- Centered bakery logo with animated progress bar
- Rotating bakery-themed messages ("Baking fresh treats...", "Warming up the oven...", etc.)
- Minimum display duration: **1.5 seconds**
- z-index: `99999` to cover all content

### 5.5 Footer
- **Main Section**: Light background with logo, navigation columns (Shop, Contact), and newsletter signup
- **Bottom Bar**: Deep espresso (`#3E2723`) background with beige (`#F5F5DC`) text — social icons, legal links, copyright

### 5.6 WhatsApp Button
- Fixed floating button in bottom-right corner
- Green WhatsApp brand color with pulse animation
- Links to the bakery's WhatsApp number

### 5.7 Address Modal (`AddressModal.js`)
- Multi-step address entry with Google Maps autocomplete
- Delivery/Pickup toggle
- Date selection via horizontal scrollable DateStrip component
- Delivery fee calculator based on distance

---

## 6. Responsive Breakpoints

| Breakpoint | Target |
|---|---|
| `≤ 768px` | Mobile — single-column layouts, hamburger nav, full-width modals |
| `> 768px` | Desktop — multi-column grids, horizontal nav, centered modals |

### Key Responsive Behaviors
- **Navbar**: Switches between `desktop-nav` (hidden on mobile) and `mobile-nav` (hidden on desktop) via CSS `display` rules
- **Product Grid**: Adapts column count based on viewport width
- **Footer**: Columns stack vertically on mobile; copyright text centered
- **Product Modal**: Full-height on mobile, constrained width on desktop

---

## 7. Animation & Micro-Interactions

| Animation | Duration | Effect |
|---|---|---|
| Page transition overlay | 400ms fade-in / 300ms fade-out | Smooth screen transitions |
| Bakery message appearance | 400ms slide-up + fade | Loading screen text |
| Progress bar shimmer | 1.5s infinite linear | Glowing bar during page load |
| Card hover lift | ~200ms ease | Shadow deepens on hover |
| Mobile menu slide | CSS transition | Menu panel slides down from top |
| Infinite product slider | CSS translateX animation | Continuous left-scroll of featured products on homepage |

---

## 8. Image Guidelines

| Context | Aspect Ratio | Object Fit | Notes |
|---|---|---|---|
| Hero slider | 16:9 | `cover` | Full-bleed, auto-advances every 5s |
| Product card | 4:3 | `cover` | Rounded corners via parent `overflow: hidden` |
| Product modal hero | 16:9 | `cover` | Larger detail view |
| Logo (desktop) | Auto | `contain` | Max height 70px, white version on dark navbar |
| Logo (footer) | Auto | `contain` | Dark version with `mix-blend-mode: multiply` |
| Admin uploads | Via Sharp | WebP output | Auto-resized to max 1200px, quality 80 |