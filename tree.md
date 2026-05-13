# INDREV Project Structure

```text
/
├── .env                # Environment variables (Admin Password)
├── gemini.md           # Project rules, context, and design system
├── index.html          # HTML entry point
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
├── TREE.md             # This file
├── FEATURES.md         # Detailed UI/UX feature map
└── src/
    ├── main.jsx        # App entry point
    ├── App.jsx         # Root component & state management
    ├── components/     # Reusable UI components
    │   ├── common/     # Core neobrutalist elements
    │   │   ├── Price.jsx
    │   │   ├── VerBadge.jsx
    │   │   └── ModalWrapper.jsx
    │   ├── Auth/       # Login and Signup logic
    │   │   ├── AuthModal.jsx
    │   │   ├── Login.jsx
    │   │   └── Signup.jsx
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   ├── ProductCard.jsx
    │   └── CartDrawer.jsx
    ├── pages/          # Full page layouts
    │   ├── Home.jsx
    │   ├── Browse.jsx
    │   ├── CategoryList.jsx
    │   ├── CategoryDetail.jsx
    │   ├── ProductDetail.jsx
    │   ├── Wishlist.jsx
    │   ├── SearchResults.jsx
    │   ├── How.jsx
    │   ├── OrderSummary.jsx
    │   └── Admin.jsx
    ├── data/           # Business logic data
    │   ├── theme.js    # Design tokens & global CSS
    │   └── mockData.js # Products, Sellers, Categories
    ├── utils/          # Global utilities
    │   └── formatters.js
    └── styles/         # Standalone stylesheets
        └── auth.css    # Neobrutalist Auth styles
```

---

## Technical Overview
- **Framework**: React (Vite)
- **Architecture**: Modular Component-Page architecture
- **Styling**: Vanilla CSS + Inline Styles (Neobrutalism)
- **Persistence**: LocalStorage for Cart, Wishlist, Orders, and Auth
- **Routing**: Custom State-based Routing