INDREV — Luxury Fashion for Everyone
Comic Neobrutalism · All Genders · All Ages
│
├── 🏠 HOME
│   ├── Hero
│   │   ├── Halftone dot bg + diagonal stripe accent
│   │   ├── Bangers headline — bold, uppercase, ink black
│   │   ├── Yellow accent band behind title
│   │   ├── "Shop Collection" → primary yellow neo-btn
│   │   └── "View Curators" → ghost neo-btn
│   ├── Stats bar — yellow bg band
│   │   ├── 6+ Verified Curators
│   │   ├── 120+ Curated Pieces
│   │   └── 100% Authenticated
│   ├── Category grid (2→3→5 cols, responsive)
│   │   ├── Men · Women · Kids · Unisex · Accessories
│   │   └── Sharp cards, hard shadows, press on hover
│   ├── New Arrivals — 8 products across all genders
│   ├── Trusted Curators preview — 3 seller neo-cards
│   └── INDREV Standard — 3 trust pillars
│       ├── Verified Sellers
│       ├── Authenticated Pieces
│       └── Protected Payments
│
├── 🔍 BROWSE
│   ├── Live text search (name / brand)
│   ├── Filter sidebar
│   │   ├── Gender tabs — All / Men / Women / Kids / Unisex
│   │   ├── Category — updates dynamically per gender tab
│   │   ├── Condition — New / Like New / Excellent / Good
│   │   └── Max price slider (Rs. en-IN)
│   ├── Mobile collapsible filter panel
│   ├── Product grid — 1→2→3→4 cols, neo-cards
│   └── Empty state (no results)
│
├── 👔 PRODUCT DETAIL
│   ├── Image well
│   │   ├── Flat color bg + halftone overlay
│   │   ├── Thick black border bottom
│   │   ├── Starburst tag badge (New / Rare / Featured)
│   │   └── Condition flat badge
│   ├── Gender + Category label (Bangers)
│   ├── Product name (Bangers, large)
│   ├── Brand (Inter, muted)
│   ├── Price — Bangers ink black, Rs. in Inter
│   ├── Meta grid — Condition / Size / Category / Brand
│   │   └── Sharp cells, 3px borders
│   ├── Verified seller panel (click → Stores)
│   ├── Qty selector — neo-brutalist stepper
│   ├── Add to Cart — yellow neo-btn, press effect, ✓ state
│   └── Related products (same gender + category)
│
├── 🏪 STORES
│   ├── Intro header — Bangers title
│   ├── Speciality filter (All / Menswear / Womenswear / Kidswear / Multi)
│   └── Full seller grid — neo-card-sm, hard shadows
│
├── 🏪 STORE PROFILE
│   ├── Store hero panel — 4px border, thick ruled
│   │   ├── Flat color avatar + symbol icon
│   │   ├── Store name (Bangers) + VERIFIED stamp
│   │   ├── Speciality tag
│   │   ├── Bio (Inter)
│   │   └── Stats — Bangers numbers (Rating / Listings / City)
│   └── Seller's product grid — all genders they stock
│
├── ❓ HOW IT WORKS
│   ├── For Buyers — 3 step panels
│   │   ├── 01 Browse & Discover
│   │   ├── 02 Buy with Confidence
│   │   └── 03 Receive & Enjoy
│   └── Our Guarantees — 3 panels
│       ├── 100% Authentication
│       ├── Escrow Protection
│       └── 7-Day Returns
│
├── 🛒 CART DRAWER (global)
│   ├── Slide-in from right, white panel, 3px left border
│   ├── Item rows — product color swatch / name / brand / size / price
│   ├── Remove individual items (×)
│   ├── Item count + Rs. total (Bangers)
│   ├── Checkout neo-btn — yellow, press effect
│   ├── Processing state → Order Confirmed (Bangers ✓)
│   └── Continue Shopping ghost neo-btn
│
├── 🔐 LOGIN MODAL (global)
│   ├── Sharp modal — 3px border, 6px hard shadow
│   ├── Sign In / Sign Up toggle
│   ├── Inputs — 3px border, yellow focus shadow
│   ├── Submit — yellow neo-btn, validation gated
│   └── Welcome success state (Bangers)
│
├── 🔒 ADMIN PANEL (hidden — owner only)
│   ├── Password gate — never publicly linked
│   ├── Dashboard tab
│   │   ├── Revenue (daily / weekly / monthly) — Bangers stats
│   │   ├── Top selling products
│   │   ├── Top performing sellers
│   │   └── Recent orders feed
│   ├── Products tab
│   │   ├── Filter by gender + category
│   │   ├── Add product — full form (gender field required)
│   │   ├── Edit (price / condition / tag / visibility)
│   │   └── Delete — confirmation step → BTND danger
│   ├── Sellers tab
│   │   ├── View all + speciality badge
│   │   ├── Toggle verified — yellow neo-btn
│   │   ├── Edit seller info
│   │   └── Revoke — confirmation step → BTND
│   ├── Orders tab
│   │   ├── View all orders
│   │   ├── Update status (Pending → Shipped → Delivered)
│   │   └── Flag refund
│   ├── Users tab
│   │   ├── View all buyers
│   │   └── Ban / suspend — confirmation step → BTND
│   └── Content tab
│       ├── Featured products on homepage (any gender)
│       └── Trusted Curators preview slots
│
└── 📐 SHELL
    ├── NAVBAR
    │   ├── Desktop: sticky bar, 3px bottom border, white bg
    │   │   ├── Bangers logo
    │   │   ├── Browse / Stores / How It Works links
    │   │   ├── Active: 4px yellow underline
    │   │   └── Login + Cart — ghost + yellow neo-btns
    │   ├── Mobile: hamburger → fullscreen ink overlay menu
    │   │   └── Bangers nav links, staggered fade-in
    │   └── Mobile: bottom tab bar
    │       └── Home / Browse / Stores (3 tabs, 3px top border)
    ├── FOOTER
    │   ├── Yellow top border band (4px)
    │   ├── Bangers logo + tagline
    │   ├── Shop / Company / Support link columns
    │   └── Copyright bar
    └── DATA LAYER (in-memory)
        ├── Products across Men / Women / Kids / Unisex
        ├── Sellers with speciality field
        └── Cart state (add / remove / total / checkout)