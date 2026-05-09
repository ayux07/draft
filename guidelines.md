# INDREV — Coding Guidelines & Conventions

## Cardinal Rules
1. **Single file only.** Everything lives in `indrev.jsx`. No splitting into components, utils, or separate CSS files unless explicitly instructed.
2. **No external UI libraries.** No MUI, Chakra, shadcn, Radix, Ant Design, etc.
3. **No Tailwind.** All styles are inline JS objects or the injected `GLOBAL_CSS` string.
4. **No React Router.** Navigation is handled by `nav(key)` → `setPage(key)`.
5. **No TypeScript.** Plain JSX only.
6. **No class components.** Functional components + hooks only.
7. **Buyer-only platform.** Never add seller onboarding, seller application forms, seller dashboards, or any seller-facing UI.
8. **All genders, all ages.** Never add gender-locking, age-gating, or gendered copy. UI copy must always be neutral.

---

## File Structure — Maintain This Order
```
1.  import statements
2.  Palette (const C)
3.  useBreakpoint hook
4.  Data (GENDERS, CATS_BY_GENDER, CONDITIONS, SELLERS, PRODUCTS)
5.  Formatters (fmt, fmtNum)
6.  TAG map
7.  GLOBAL_CSS string
8.  Shared style objects (INP, BTNP, BTNG, BTND)
9.  Micro-components (Price, VerBadge)
10. ProductCard
11. SellerCard
12. Navbar
13. Home
14. Browse
15. Product (detail page)
16. Stores
17. Store (profile page)
18. How (it works)
19. Admin (panel — owner only)
20. CartDrawer
21. LoginModal
22. Footer
23. App (default export)
```

---

## Styling Rules

### Inline Styles
- Use JS object shorthand for all inline styles
- Never use string style attributes (`style="..."`)
- Use `clamp()` for all font sizes and spacing that should scale
- Use `%`, `rem`, `vw/vh` for layout widths — never raw `px`
- Fixed `px` allowed for: border thickness (3–4px), shadow offsets, border-radius (0–4px)

### Color Usage
```
Heading text     → C.ink   (#0D0D0D)
Body text        → C.muted (#555555)
Labels/captions  → C.mutedLo (#999999)
Primary accent   → C.yellow (#FFE500)
Danger actions   → C.red (#FF3131)
Success states   → C.green (#00C853)
Prices           → C.ink (#0D0D0D) in Bangers — no glow
Card bg          → C.surface (#FFFEF9)
Page bg          → C.bg (#F5F0E8)
All borders      → C.border (#0D0D0D) — always solid, always 3px min
All shadows      → C.shadow (#0D0D0D) — hard offset, zero blur
```

### Borders — Non-Negotiable
- **Minimum `3px solid #0D0D0D`** on every card, button, input, panel
- Section dividers: `4px solid #0D0D0D`
- `borderRadius: 0` on all primary elements
- Max `4px` border-radius on small tags and badges only
- Never use `rgba` or semi-transparent border colors
- Never use `1px` borders — they disappear against the light background

### Shadows — Non-Negotiable
- **Hard offset, zero blur always:** `box-shadow: Xpx Ypx 0 #0D0D0D`
- Cards: `6px 6px 0 #0D0D0D`
- Buttons: `4px 4px 0 #0D0D0D`
- Small elements: `2px 2px 0 #0D0D0D`
- **Never use** blur, spread, rgba, inset, or glow in any shadow

### Press Interaction — Required on All Buttons & Cards
```css
/* Default */
transform: translate(0, 0);
box-shadow: 4px 4px 0 #0D0D0D;

/* Hover (hover-capable devices only) */
transform: translate(-2px, -2px);
box-shadow: 6px 6px 0 #0D0D0D;

/* Active / Click */
transform: translate(4px, 4px);
box-shadow: 0px 0px 0 #0D0D0D;
```
Implement via `.neo-btn` and `.neo-card` CSS classes in `GLOBAL_CSS`. Wrap hover states in `@media(hover:hover)`.

### Buttons
Three base style objects — always extend one, never invent ad-hoc styles:
- `BTNP` — primary: `#FFE500` bg, `3px solid #0D0D0D`, `4px 4px 0 #0D0D0D` shadow, `#0D0D0D` text
- `BTNG` — ghost: `#FFFEF9` bg, `3px solid #0D0D0D`, `4px 4px 0 #0D0D0D` shadow, `#0D0D0D` text
- `BTND` — danger: `#FF3131` bg, `3px solid #0D0D0D`, `4px 4px 0 #0D0D0D` shadow, `#fff` text

Always add `className="neo-btn"` for press transition.

### Cards
- Always apply `className="neo-card"` (products) or `className="neo-card-sm"` (sellers)
- Base: `background: #FFFEF9`, `border: 3px solid #0D0D0D`, `box-shadow: 6px 6px 0 #0D0D0D`
- `borderRadius: 0` — no exceptions
- Image wells: `border-bottom: 3px solid #0D0D0D` + halftone overlay

### Fonts — Two Only
- **Bangers**: all headings, prices, stats, hero text, section titles, admin data
- **Inter**: all body copy, labels, button text, input text, captions, navigation
- Both injected via `#indrev-fonts` guard in App `useEffect`
- Never use system fonts for headings

### Backgrounds & Decorations
- Base page bg: `#F5F0E8` — aged paper
- Alternate sections: `#FFE500` yellow bands
- Halftone dots: `radial-gradient(circle, #0D0D0D 1px, transparent 1px)` at `20px 20px`, opacity ~0.08
- Section dividers: `4px solid #0D0D0D` solid lines — no fades, no gradients
- No glassmorphism, no blur, no gradients, no glow anywhere

### Inputs
- `background: #fff`, `border: 3px solid #0D0D0D`, `borderRadius: 0`
- Focus: `box-shadow: 4px 4px 0 #FFE500` (yellow hard shadow)
- Never use `outline: none` without replacing it with the focus shadow

---

## Responsive Rules
- **Mobile-first:** base styles target mobile, scale up with `@media(min-width:...)`
- All grid layouts defined as utility classes in `GLOBAL_CSS` — never write ad-hoc grid in inline styles
- Use `100svh` not `100vh` for full-height containers
- All interactive elements: `minHeight: 44, minWidth: 44` (touch targets)
- Spacing and font sizes: always use `clamp()` for values that need to scale

---

## Copy & Language Rules
- All UI copy must be **gender-neutral** at all times
- Forbidden words in UI: "menswear", "womenswear", "for him", "for her", "ladies", "gentlemen"
- Use instead: "curated pieces", "the edit", "collection", "new arrivals", "for everyone"
- Category labels (Menswear / Womenswear / Kidswear) are acceptable **only** as filter labels in Browse sidebar — not in hero copy, headings, or marketing text

---

## Component Conventions

### Props Naming
```
nav          → navigation function
setSel       → set selected product
setSelSeller → set selected seller
addCart      → add item to cart
onClick      → card click handler
onCart       → add-to-cart within card
```

### Hover State
- Local `const [hov, setHov] = useState(false)` per interactive component
- Apply via `onMouseEnter` / `onMouseLeave`
- Hover-only visual changes must also live in `@media(hover:hover)` in GLOBAL_CSS

### Add-to-Cart Button Visibility
- Mobile / touch: always visible via `.atc-always`
- Desktop with hover: visible on hover only via `.atc-hover.on`
- Never remove this dual-class pattern

---

## Data Rules
- Never change the shape of SELLERS or PRODUCTS without updating every consuming component
- `price` is always an INR integer
- `gender` must be one of: `'Men'` `'Women'` `'Kids'` `'Unisex'`
- `cat` must match a valid category for its gender group (see gemini.md)
- Always render prices via `<Price n={amount} />` — never call `fmt()` inline
- `seller.verified` is always `true` — never add unverified sellers
- `seller.speciality` must always be set
- Never gender-lock browsing — all products and categories always visible to all users
- `color` field on products and sellers is a flat CSS hex (e.g. `'#1a1a2e'`) — no gradients

---

## Navigation Rules
- `nav(key)` handles scroll-to-top — never add `window.scrollTo` anywhere else
- Page transitions use `key={page}` on the page wrapper div — triggers `fadeIn` animation
- Never use `<a href>` for internal navigation — always use `nav()`

---

## CSS Class Additions
When adding new global styles, append to the `GLOBAL_CSS` string — never inject a separate `<style>` tag. The injection guard checks for `#indrev-css` id.

---

## Performance Rules
- `useCallback` on `nav` and `addCart` in App — always keep memoized
- Font and CSS injection guarded by `document.querySelector('#indrev-fonts')` and `#indrev-css` — removing guards causes duplicate injections
- Viewport meta injected once in App `useEffect` — do not add manually to HTML

---

## Admin Panel Rules
- `page = 'admin'` is **never linked** from public navbar, footer, or any buyer-facing UI
- Access guarded by `adminAuthed` boolean in App — wrong password never renders the panel
- `adminTab` state lives inside `<Admin>` component — not in App global state
- All 6 sections (Dashboard / Products / Sellers / Orders / Users / Content) render as tabs inside the single `<Admin>` component — no separate page components
- Same Comic Neobrutalism design system applies — same palette, cards, buttons
- Destructive actions (delete product, ban user, revoke seller) require a confirmation step before executing
- Data mutations update in-memory arrays directly until Supabase is connected
- Products section must support filtering by gender and category

---

## When Adding a New Page
1. Create the component function in the correct file order position
2. Add its `key` to the `renderPage()` switch in App
3. Add to `LINKS` in Navbar if it needs a public nav entry
4. Add to mobile bottom tab bar if it's a primary destination
5. Add to footer columns if applicable
6. Update the pages table in `gemini.md`

---

## When Adding New Products
- Follow the exact shape in `gemini.md`
- Assign unique `id`, set `gender`, set valid `cat` for that gender
- Link to existing seller via `sid`
- Use a flat dark CSS hex for `color` — no gradients, no light colors (must contrast on paper bg)
- Spread products across all 4 gender groups — never only add to one gender

---

## When Adding New Sellers
- Follow the exact shape in `gemini.md`
- Assign unique `id`, always `verified: true`
- Set `speciality` — prefer `'Multi-category'` for sellers with products across gender groups
- Use a flat dark CSS hex for `color`

---

## Anti-Patterns — Never Do These
```
❌ import { BrowserRouter } from 'react-router-dom'
❌ import styles from './Component.module.css'
❌ className="bg-yellow-400 text-black"  (Tailwind)
❌ <Component style="color: red">  (string styles)
❌ Any seller onboarding / dashboard / application UI
❌ localStorage for cart or auth
❌ Multiple JSX files
❌ TypeScript types / interfaces
❌ Class components / this.setState
❌ window.scrollTo() outside nav()
❌ Hardcoded pixel widths on layout containers
❌ box-shadow with blur  (e.g. '0 4px 24px rgba(0,0,0,0.2)')
❌ borderRadius > 4px on cards, buttons, or panels
❌ rgba or semi-transparent border colors
❌ Gradients on backgrounds, cards, or buttons
❌ Glassmorphism / backdrop-filter blur
❌ Glow or neon text-shadow effects
❌ border: 1px — minimum is 3px solid #0D0D0D
❌ Gendered copy in hero, headings, or marketing text
❌ Gender-locked category browsing
```

---

## Commit Message Convention
```
feat: add wishlist / saved items
fix: cart drawer scroll on iOS
style: tighten product card spacing on mobile
refactor: extract Price component
data: expand womenswear product seed
chore: update seller speciality fields
```