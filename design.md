# UI/UX Design Specification: Porto's Bake at Home

## 1. Global Visual Language

### A. Exact Color Palette
* **Primary Action & Text (`#5a3424`):** Deep Chocolate Brown. Used for primary buttons ("Order Now", "See the Menu"), admin sidebar background, bold headings, and primary text. 
* **Hero/Highlight Background (`#f8ecc2`):** Soft Buttercream Yellow. Used heavily as a prominent background color (e.g., the left side of the split hero).
* **Base Background (`#f4f1eb`):** Light Warm Grey. Used as the main application background to make white card containers pop.
* **Containers (`#FFFFFF`):** Clean White. Used for content cards, top navbars, and floating feature boxes.
* **Secondary Text (`#826356`):** Lighter, muted brown for descriptions and subtitles.
* **Borders (`#e6dfd7`):** Soft beige/grey for subtle dividers and input outlines.
* **Status Flags:**
  * **Featured/Gold (`#eab308`)**
  * **Best Seller/Orange (`#f97316`)**
  * **Sold Out/Grey (`#9ca3af`)**
  * **Success/Green (`#22c55e`)**
  * **Danger/Red (`#ef4444`)**

### B. Typography
* **Headings (Oswald):** Bold, uppercase, condensed sans-serif. Used for main section titles, hero text (e.g., "WELCOME TO PORTO'S NATIONWIDE SHIPPING"). Recommended letter-spacing: `0.02em` to `0.05em`.
* **Body & UI Text (Inter):** Clean, modern sans-serif for product descriptions, inputs, and standard text.
* **Button Text:** Uppercase, Bold (`font-weight: 700`), wide tracking (`letter-spacing: 0.1em`).

### C. Component Styling
* **Buttons & Badges:** Must use fully rounded pill-shaped corners (`border-radius: 9999px`).
* **Cards & Containers:** Soft rounded corners (`border-radius: 12px` or `8px`) with subtle, warm drop shadows (`box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1)`). Hover states should elevate the card with a deeper shadow.
* **Toggles (Switch UI):** Pill-shaped toggle switches with smooth sliding animations for admin status flags.

---

## 2. Customer Storefront UI (Home Page View)

### A. Global Navbar
* **Left:** Circular logo icon + "PORTO'S BAKE AT HOME" in uppercase Deep Chocolate Brown.
* **Right:** Navigation links ("Menu", "Shop", "Rewards", "Help", "Corporate Gifts") + Shopping Bag icon. Links should be grey/brown. Background is solid white with a bottom border.

### B. Split Hero Section
A 50/50 split viewport layout (min-height ~550px):
* **Left Pane (Buttercream Yellow Background):**
  * Large, bold heading (Oswald, Chocolate Brown): "WELCOME TO PORTO'S NATIONWIDE SHIPPING".
  * Subtitle text explaining the value proposition.
  * Prominent CTA Button: "SEE THE MENU ↓" (Chocolate Brown pill).
* **Right Pane (Image Background):**
  * Background image covering the pane.
  * Centered floating White Box container featuring a specific product (e.g., "DULCE DE LECHE BESITO® ICE CREAM CAKE").
  * Inside box: Title, short description, and "ORDER NOW" CTA Button.

### C. Bottom Action Bar
* **Background:** Light Warm Grey (`#f4f1eb`).
* **Elements:** A right-aligned flex container holding a "FILTER BY: [Dropdown]" and a "Search [Input]". Inputs have Chocolate Brown borders and text.

### D. Floating Widgets
* A floating button fixed to the bottom-left corner (e.g., "× CLAIM $10 OFF"). Pill-shaped, Deep Chocolate Brown, with a prominent drop shadow.

---

## 3. Admin Dashboard UI (CMS)

### A. Global Admin Layout
* **Sidebar (Left):** Fixed vertical navigation menu. Background is Deep Chocolate Brown (`#5a3424`) with white text. Active tabs highlight with a semi-transparent white overlay. Links: Dashboard, Categories, Products.
* **Top Navbar:** Simple white bar. "Admin Panel" title (Oswald) on the left, and a "Logout" outline button on the right.
* **Main Content Area:** Light Warm Grey background (`#f4f1eb`) containing white, rounded card components.

### B. Categories UI (`/admin/categories`)
* **Header:** "Manage Categories" with a total count.
* **Add Category Section:** Flex row containing a Text Input `[ Enter new category name ]` next to a solid primary `[ + Add Category ]` button.
* **Category List:** Data table where each row has the category name and product count on the left, and a red trash can icon button on the right.

### C. Products UI (`/admin/products`)
* **Top Bar:** "Manage Products" title with a prominent `[ + Add New Product ]` button.
* **Product Data Table:**
  * **Columns:** Image (thumbnail), Name, Price, Status Flags, Actions.
  * **Status Flags Column:** Pill badges indicating 'Featured' (Gold), 'Best Seller' (Orange), or 'Sold Out' (Grey).
  * **Actions Column:** `[ Edit ]` (pencil icon) and `[ Delete ]` (red trash icon) buttons.
* **Add/Update Product Form (Modal/Card):**
  * **Media:** Drag-and-drop zone mockup for image upload.
  * **Text Inputs:** Product Name, Description (textarea), Price (number input).
  * **Add-ons:** A dynamic list where users click `[ + Add Option ]` to generate inline inputs for Option Name & Extra Price.
  * **Toggles (Switch UI):** Three distinct toggle switches for marking as Featured, Best Selling, and Sold Out.
  * **Footer:** Cancel and Save buttons aligned to the right.