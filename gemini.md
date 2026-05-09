# INDREV — Project Context for Antigravity

## What Is INDREV?

INDREV is a luxury fashion e-commerce marketplace built as a single-file React JSX SPA (Vite + React). It serves **all genders and all ages** — menswear, womenswear, kidswear, unisex, and accessories. It is a **buyer-only** platform — there is no seller onboarding, no seller dashboard, and no seller application flow. Curators are pre-seeded data.

---

## Tech Stack

| Layer     | Choice                                                                   |
| --------- | ------------------------------------------------------------------------ |
| Framework | React (JSX, functional components, hooks only)                           |
| Bundler   | Vite                                                                     |
| Styling   | Inline styles + injected global CSS string (no Tailwind, no CSS modules) |
| State     | useState, useCallback, useEffect — no Redux, no Zustand                  |
| Fonts     | **Bangers** + **Inter** (Google Fonts, injected via JS)                  |
| Routing   | Custom `nav(key)` function + `page` state — no React Router              |
| Data      | In-memory arrays (SELLERS, PRODUCTS) — no backend yet                    |
| Auth      | Mock modal only — no Supabase yet                                        |
| Payments  | Mock checkout — no Razorpay yet                                          |

---

## Design System — Comic Neobrutalism

### Philosophy

INDREV's aesthetic merges luxury fashion editorial with comic-book neobrutalism. The tension between high-fashion subject matter and raw, graphic UI is the brand identity. Think: Vogue spread drawn by a comic artist. The platform serves everyone — men, women, kids, non-binary — so the tone is bold and inclusive, never gendered.

### Palette

```js
const C = {
  // Backgrounds
  bg: "#F5F0E8", // Warm off-white / aged paper — base page bg
  surface: "#FFFEF9", // Card surface
  dark: "#0D0D0D", // Near-black — borders, shadows, primary text

  // Primary accent
  yellow: "#FFE500", // Bold yellow — main CTA, active states, section bands
  yellowDk: "#E5CE00", // Darker yellow — hover state on yellow elements

  // Secondary accents
  red: "#FF3131", // Tags, alerts, destructive actions
  blue: "#1A1AFF", // Links, secondary CTA
  green: "#00C853", // Success states

  // Text
  ink: "#0D0D0D", // Primary text — full black
  muted: "#555555", // Secondary text
  mutedLo: "#999999", // Labels, captions

  // Borders & shadows
  border: "#0D0D0D", // Always thick solid black — 3px minimum
  shadow: "#0D0D0D", // Hard offset shadow — zero blur, always
};
```

### Core Visual Rules

**Borders**

- Every card, button, input, panel: `3px solid #0D0D0D` minimum
- Section dividers and hero panels: `4px solid #0D0D0D`
- `borderRadius: 0` on all primary elements — max `4px` only on small tags/badges
- Never use `rgba` or semi-transparent borders — always hard solid black

**Shadows**

- Hard offset, zero blur only — never use `blur` or `spread`
- Buttons: `4px 4px 0 #0D0D0D`
- Cards: `6px 6px 0 #0D0D0D`
- Small elements (badges, tags): `2px 2px 0 #0D0D0D`
- No glow, no neon, no rgba shadows

**Press Interaction (buttons & cards)**

```
Default:  transform: translate(0,0);     box-shadow: 4px 4px 0 #0D0D0D
Hover:    transform: translate(-2px,-2px); box-shadow: 6px 6px 0 #0D0D0D
Active:   transform: translate(4px,4px);  box-shadow: 0px 0px 0 #0D0D0D
```

This simulates a physical press — the element shifts into its own shadow.

**Color Fills**

- Flat solid fills only — no gradients anywhere
- No glassmorphism, no backdrop-filter blur on content
- Section alternation: `#F5F0E8` (paper) → `#FFE500` (yellow band) → `#F5F0E8`

**Typography**

- Display / headings / prices: `Bangers` — uppercase, wide letter-spacing, comic weight
- Body / UI / buttons / inputs: `Inter` — clean contrast to Bangers
- Never use system fonts for headings

**Buttons**

- Primary (`BTNP`): `#FFE500` fill, `3px solid #0D0D0D`, `4px 4px 0 #0D0D0D` shadow, `#0D0D0D` text
- Ghost (`BTNG`): `#FFFEF9` fill, `3px solid #0D0D0D`, `4px 4px 0 #0D0D0D` shadow, `#0D0D0D` text
- Danger (`BTND`): `#FF3131` fill, `3px solid #0D0D0D`, `4px 4px 0 #0D0D0D` shadow, `#fff` text
- All buttons use `.neo-btn` class for the press transition
- No glow, no neon, no rounded corners

**Cards**

- `background: #FFFEF9`, `border: 3px solid #0D0D0D`, `box-shadow: 6px 6px 0 #0D0D0D`
- On hover: `translate(-2px,-2px)`, shadow grows to `8px 8px 0 #0D0D0D`
- `borderRadius: 0` — sharp corners everywhere
- Image wells: `border-bottom: 3px solid #0D0D0D`, halftone dot overlay

**Comic Decorations**

- Halftone dot grid: `radial-gradient(circle, #0D0D0D 1px, transparent 1px)` at `20px 20px`, ~8% opacity
- Starburst / "POW" shape accents on New / Rare / Featured tags
- Thick black underlines as section dividers (no `<hr>` gradients)
- Bold diagonal stripe pattern on hero background
- Speech bubble callouts for promotional banners

**Inputs**

- `background: #fff`, `border: 3px solid #0D0D0D`, `borderRadius: 0`
- Focus: `box-shadow: 4px 4px 0 #FFE500` (yellow hard shadow)
- No `outline: none` without replacing with focus shadow

---

## Currency

- Format: `Rs.` prefix + `n.toLocaleString('en-IN')`
- Always rendered via `<Price n={amount} />` component — never inline `fmt()`
- Font: `Bangers`, large size, `color: #0D0D0D`
- `Rs.` rendered as a smaller `Inter` bold span alongside the Bangers numeral
- No glow, no neon — pure ink on paper

---

## Pages & Routing

Navigation is handled by a single `nav(key)` function that sets `page` state and scrolls to top.

| Key         | Component   | Description                                                |
| ----------- | ----------- | ---------------------------------------------------------- |
| `'home'`    | `<Home>`    | Landing page                                               |
| `'browse'`  | `<Browse>`  | Product listing with all filters                           |
| `'product'` | `<Product>` | Product detail (requires `selProduct` state)               |
| `'stores'`  | `<Stores>`  | All curators grid                                          |
| `'store'`   | `<Store>`   | Single curator profile (requires `selSeller` state)        |
| `'how'`     | `<How>`     | How It Works — buyer-only                                  |
| `'admin'`   | `<Admin>`   | Admin panel — protected, owner-only, never publicly linked |

---

## Data Shape

### Product

```js
{
  id: Number,
  name: String,
  price: Number,        // in INR, always integer
  gender: String,       // 'Men' | 'Women' | 'Kids' | 'Unisex'
  cat: String,          // must match a valid cat for the gender group (see below)
  sid: Number,          // references a seller id
  cond: String,         // 'New' | 'Like New' | 'Excellent' | 'Good'
  size: String,
  brand: String,
  tag: String | null,   // 'New' | 'Rare' | 'Featured' | null
  color: String,        // flat CSS hex — used as image well background
}
```

### Product Categories (full list)

```
Men:     Suits | Blazers | Shirts | Trousers | Outerwear | Footwear | Accessories
Women:   Dresses | Tops | Skirts | Trousers | Outerwear | Footwear | Accessories | Bags
Kids:    Tops | Bottoms | Outerwear | Footwear | Accessories
Unisex:  Streetwear | Outerwear | Footwear | Accessories
```

Browse sidebar filter array (top-level gender tabs):

```js
const GENDERS = ["All", "Men", "Women", "Kids", "Unisex"];
```

Category list updates dynamically based on selected gender tab.

### Seller

```js
{
  id: Number,
  name: String,
  icon: String,           // single symbol character
  rating: Number,         // e.g. 4.9
  items: Number,          // total listings
  city: String,
  verified: Boolean,      // always true
  bio: String,
  color: String,          // flat CSS hex for avatar background
  speciality: String,     // 'Multi-category' | 'Womenswear' | 'Menswear' | 'Kidswear' | 'Unisex'
}
```

---

## Global CSS Classes (injected via `GLOBAL_CSS` string)

| Class            | Purpose                                                     |
| ---------------- | ----------------------------------------------------------- |
| `.ctr`           | Fluid container, max 1280px, responsive padding             |
| `.sec`           | Section vertical padding (3rem mobile → 5rem desktop)       |
| `.g-prod`        | Product grid: 1→2→3→4 cols                                  |
| `.g-3`           | 3-col grid: 1→2→3 cols                                      |
| `.g-2`           | 2-col grid: 1→2 cols                                        |
| `.g-cat`         | Category grid: 2→3→5 cols                                   |
| `.g-browse`      | Browse layout: 1 col → sidebar + grid                       |
| `.g-detail`      | Product detail: 1 col → 2 col                               |
| `.g-steps`       | Steps grid: 1→3 cols                                        |
| `.g-foot`        | Footer grid: 1→2→4 cols                                     |
| `.neo-card`      | Product/seller card: hard shadow + press lift on hover      |
| `.neo-card-sm`   | Smaller card variant (seller cards)                         |
| `.neo-btn`       | All buttons: press transition (translate + shadow collapse) |
| `.halftone`      | Halftone dot background overlay                             |
| `.th`            | Fluid hero heading — Bangers                                |
| `.ts`            | Fluid section heading — Bangers                             |
| `.tp`            | Fluid page heading — Bangers                                |
| `.tc`            | Fluid card heading — Bangers                                |
| `.td`            | Fluid detail heading — Bangers                              |
| `.tb`            | Fluid body text — Inter                                     |
| `.tsm`           | Fluid small text — Inter                                    |
| `.pri-h`         | Large price display — Bangers                               |
| `.pri-c`         | Card price display — Bangers                                |
| `.label-sm`      | Uppercase micro-label — Inter                               |
| `.nav-desktop`   | Hidden on mobile, flex on ≥768px                            |
| `.nav-mobile`    | Visible on mobile, hidden on ≥768px                         |
| `.tab-bar`       | Bottom tab bar — visible mobile only                        |
| `.filter-sticky` | Sticky sidebar — desktop only                               |

---

## Breakpoints

| px     | Label                      |
| ------ | -------------------------- |
| 480px  | Phablet                    |
| 600px  | Small tablet               |
| 768px  | Tablet — nav switches here |
| 1024px | Desktop                    |
| 1200px | Wide                       |

---

## Global State (App level)

```js
page; // current route key
selProduct; // currently viewed product object | null
selSeller; // currently viewed seller object | null
cart; // array of product objects (duplicates = qty)
cartOpen; // boolean
loginOpen; // boolean
```

---

## Admin Panel

The admin panel (`page = 'admin'`) is a protected owner-only interface. It is **never linked** from the public navbar or footer. Access is via a hardcoded password check (until Supabase auth roles are connected).

### Admin Sections

| Section   | Purpose                                                          |
| --------- | ---------------------------------------------------------------- |
| Dashboard | Revenue overview, top products, top sellers, recent orders       |
| Products  | Add / edit / delete / toggle visibility (all genders/categories) |
| Sellers   | View all, toggle verified badge, edit info, revoke               |
| Orders    | View all orders, update status, flag refunds                     |
| Users     | View all buyers, ban / suspend accounts                          |
| Content   | Control homepage featured items + curators preview slots         |

### Admin State Shape

```js
adminAuthed; // boolean — gates entire admin UI, lives in App
adminTab; // 'dashboard' | 'products' | 'sellers' | 'orders' | 'users' | 'content'
// lives inside <Admin> component, not in App
```

---

## What Does NOT Exist (do not add unless asked)

- Seller onboarding / application / dashboard
- Backend / Supabase integration
- Real payments (Razorpay)
- Wishlist / saved items
- Order history page
- Blog / editorial section
- Gender-locked or age-locked browsing — all categories always visible to all users
- React Router
- Tailwind CSS
- CSS Modules
- Any external UI library (MUI, Chakra, Radix, etc.)
