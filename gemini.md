# INDREV — Project Context for Antigravity

## What Is INDREV?

INDREV is a luxury fashion e-commerce marketplace built as a **modular React JSX SPA** (Vite + React). It serves **all genders and all ages** — menswear, womenswear, kidswear, unisex, and accessories. It is a **buyer-only** platform — there is no seller onboarding, no seller dashboard, and no seller application flow. Curators are pre-seeded data.

---

## Tech Stack

| Layer     | Choice                                                                   |
| --------- | ------------------------------------------------------------------------ |
| Framework | React (JSX, functional components, hooks only)                           |
| Bundler   | Vite                                                                     |
| Styling   | Inline styles + injected global CSS string + `auth.css`                  |
| State     | useState, useCallback, useEffect (with LocalStorage persistence)         |
| Fonts     | **Bangers** + **Inter** (Google Fonts, injected via JS)                  |
| Routing   | Custom `nav(key)` function + `page` state — no React Router              |
| Data      | In-memory arrays (SYNCED TO LOCALSTORAGE)                                |
| Auth      | Mock modal (Neobrutalist) — no Supabase yet                              |
| Payments  | Mock checkout — no Razorpay yet                                          |
| Config    | Environment variables via `.env`                                         |

---

## Directory Structure

```
src/
├── components/      → Reusable UI pieces
│   ├── Auth/        → Login/Signup components & AuthModal
│   ├── common/      → Price, VerBadge, ModalWrapper
│   ├── ProductCard.jsx
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── CartDrawer.jsx
├── pages/           → Full page views (Home, Browse, Admin, etc.)
├── data/            → Static data, theme constants, mockData
├── utils/           → Helper functions (formatters, uuid)
├── styles/          → Global CSS (auth.css)
└── App.jsx          → Root entry & State Management
```

---

## Design System — Comic Neobrutalism

### Philosophy

INDREV's aesthetic merges luxury fashion editorial with comic-book neobrutalism. Hard shadows, thick borders, and bold flat colors are mandatory. No blurs, no glows, no gradients.

### Palette

```js
const C = {
  bg: "#F5F0E8",      // Warm off-white / aged paper
  surface: "#FFFEF9", // Card surface
  dark: "#0D0D0D",    // Near-black
  yellow: "#FFE500",  // Bold yellow accent
  yellowDk: "#E5CE00",
  red: "#FF3131",     // Alerts
  blue: "#1A1AFF",    // Links
  green: "#00C853",   // Success
  ink: "#0D0D0D",     // Primary text
  muted: "#555555",
  mutedLo: "#999999",
  border: "#0D0D0D",  // 3px minimum
  shadow: "#0D0D0D",  // Hard offset, zero blur
};
```

### Core Visual Rules

- **Borders**: Always `3px solid #0D0D0D` minimum. `borderRadius: 0` (max 4px for badges).
- **Shadows**: Hard offset, zero blur. Buttons: `4px 4px 0 #0D0D0D`. Cards: `6px 6px 0 #0D0D0D`.
- **Press Interaction**: `translate(-2px,-2px)` + larger shadow on hover; `translate(4px,4px)` + no shadow on active.
- **Typography**: Display/Prices: `Bangers` (Uppercase). Body/UI: `Inter`.

---

## Features & Persistence

- **LocalStorage**: Cart, Wishlist, Orders, and Auth state are persisted across refreshes.
- **Admin CRUD**: Full Add/Edit/Delete/Hide functionality for products in the Admin panel.
- **Search**: Real-time filtering by name and brand.
- **Category Browsing**: Dedicated views for specific fashion categories.

---

## Data Shape

### Product

```js
{
  id: Number,
  name: String,
  price: Number,
  gender: String,       // 'Men' | 'Women' | 'Kids' | 'Unisex'
  cat: String,
  sid: Number,          // references a seller id
  cond: String,         // 'New' | 'Like New' | 'Excellent' | 'Good'
  size: String,
  brand: String,
  tag: String | null,   // 'New' | 'Rare' | 'Featured' | null
  color: String,        // Card background hex
  hidden: Boolean,      // Toggle visibility
}
```

---

## What Does NOT Exist (do not add unless asked)

- Seller onboarding / application / dashboard
- Backend / Supabase integration (coming soon)
- Real payments (Razorpay)
- Order history page (per-user)
- Blog / editorial section
- React Router / Tailwind / CSS Modules
