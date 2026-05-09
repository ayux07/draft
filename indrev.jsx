import React, { useState, useEffect, useCallback, useMemo } from 'react';

// 2. Palette (const C)
const C = {
  bg: "#F5F0E8", 
  surface: "#FFFEF9", 
  dark: "#0D0D0D",
  yellow: "#FFE500", 
  yellowDk: "#E5CE00", 
  red: "#FF3131", 
  blue: "#1A1AFF", 
  green: "#00C853", 
  ink: "#0D0D0D", 
  muted: "#555555", 
  mutedLo: "#999999", 
  border: "#0D0D0D", 
  shadow: "#0D0D0D", 
};

// 3. (useBreakpoint removed — dead code, all responsive handled by CSS) // UX FIX 5 DONE

// 4. Data
const GENDERS = ["All", "Men", "Women", "Kids", "Unisex"];
const CATS_BY_GENDER = {
  Men: ["Suits", "Blazers", "Shirts", "Trousers", "Outerwear", "Footwear", "Accessories"],
  Women: ["Dresses", "Tops", "Skirts", "Trousers", "Outerwear", "Footwear", "Accessories", "Bags"],
  Kids: ["Tops", "Bottoms", "Outerwear", "Footwear", "Accessories"],
  Unisex: ["Streetwear", "Outerwear", "Footwear", "Accessories", "Sportswear", "Official Merch", "Anime", "Motorsports"]
};
const CONDITIONS = ["New", "Like New", "Excellent", "Good"];

const CATEGORY_DIRECTORY = [
  { id: 'cat1',  name: "Sportswear",    icon: "⚽",  bio: "Performance and athleisure gear.",                    color: "#1A1A2E" },
  { id: 'cat2',  name: "Official Merch",icon: "🎸",  bio: "Tour merch and official artist drops.",               color: "#2E1A1A" },
  { id: 'cat3',  name: "Anime",         icon: "🎌",  bio: "Exclusive anime collaborations and prints.",          color: "#1A2E1A" },
  { id: 'cat4',  name: "Motorsports",   icon: "🏎️", bio: "Racing jackets and motorsport inspired fashion.",     color: "#3B1A2E" },
  { id: 'cat5',  name: "Accessories",   icon: "💍",  bio: "Jewelry, bags, and rare collectibles.",               color: "#1A2E3B" },
  { id: 'cat6',  name: "Suits",         icon: "🤵",  bio: "Tailored luxury suiting for every occasion.",         color: "#1A1A2E" },
  { id: 'cat7',  name: "Blazers",       icon: "🧥",  bio: "Sharp structured blazers from top houses.",           color: "#2E1A1A" },
  { id: 'cat8',  name: "Shirts",        icon: "👔",  bio: "Dress shirts and casual tops, curated.",              color: "#1A2E1A" },
  { id: 'cat9',  name: "Trousers",      icon: "👖",  bio: "Tailored and relaxed trousers for all.",              color: "#2E2E1A" },
  { id: 'cat10', name: "Outerwear",     icon: "🧣",  bio: "Coats, parkas, and statement outerwear.",             color: "#1A1A3B" },
  { id: 'cat11', name: "Footwear",      icon: "👟",  bio: "Rare sneakers, boots, and statement shoes.",          color: "#3B1A1A" },
  { id: 'cat12', name: "Dresses",       icon: "👗",  bio: "Evening, midi, and archival dresses.",                color: "#2E1A3B" },
  { id: 'cat13', name: "Tops",          icon: "👕",  bio: "Blouses, tees, and structured tops.",                 color: "#1A3B2E" },
  { id: 'cat14', name: "Skirts",        icon: "🩱",  bio: "Mini, midi, and statement skirts.",                   color: "#3B2E1A" },
  { id: 'cat15', name: "Bags",          icon: "👜",  bio: "Rare handbags, totes, and clutches.",                 color: "#1A2E3B" },
  { id: 'cat16', name: "Bottoms",       icon: "🩲",  bio: "Shorts, joggers and casual bottoms.",                 color: "#2E3B1A" }
];
// UX FIX 3 DONE

const INITIAL_PRODUCTS = [
  // SELLER 1 (ARCHIVE BLVD) - 5 items
  { id: 101, name: "Deconstructed Wool Blazer", price: 85000, gender: "Men", cat: "Blazers", sid: 1, cond: "Excellent", size: "M", brand: "Maison Margiela", tag: "Rare", color: "#2A2A2A" },
  { id: 102, name: "Asymmetric Silk Dress", price: 120000, gender: "Women", cat: "Dresses", sid: 1, cond: "New", size: "S", brand: "Rick Owens", tag: "Featured", color: "#111111" },
  { id: 103, name: "Oversized Canvas Parka", price: 65000, gender: "Unisex", cat: "Outerwear", sid: 1, cond: "Like New", size: "L", brand: "Yohji Yamamoto", tag: null, color: "#303830" },
  { id: 104, name: "Tabi Leather Boots", price: 75000, gender: "Women", cat: "Footwear", sid: 1, cond: "Good", size: "38", brand: "Maison Margiela", tag: "Rare", color: "#4A0000" },
  { id: 105, name: "Cropped Structured Top", price: 45000, gender: "Women", cat: "Tops", sid: 1, cond: "Excellent", size: "XS", brand: "Comme des Garçons", tag: null, color: "#1A1A1A" },

  // SELLER 2 (NVSN STUDIOS) - 5 items
  { id: 201, name: "Distressed Denim Jacket", price: 55000, gender: "Unisex", cat: "Motorsports", sid: 2, cond: "New", size: "M", brand: "Balenciaga", tag: "New", color: "#2B3A4F" },
  { id: 202, name: "Chunky Sole Sneakers", price: 82000, gender: "Unisex", cat: "Sportswear", sid: 2, cond: "Like New", size: "42", brand: "Rick Owens", tag: "Featured", color: "#1E1E1E" },
  { id: 203, name: "Graphic Print Hoodie", price: 38000, gender: "Unisex", cat: "Anime", sid: 2, cond: "Excellent", size: "XL", brand: "Vetements", tag: null, color: "#400000" },
  { id: 204, name: "Nylon Cargo Pants", price: 42000, gender: "Men", cat: "Trousers", sid: 2, cond: "Good", size: "L", brand: "Prada", tag: null, color: "#1A1F1A" },
  { id: 205, name: "Logo Beanie", price: 15000, gender: "Unisex", cat: "Accessories", sid: 2, cond: "New", size: "OS", brand: "Acne Studios", tag: null, color: "#202020" },

  // SELLER 3 (LUXE THREADS) - 5 items
  { id: 301, name: "Classic Tuxedo Suit", price: 150000, gender: "Men", cat: "Suits", sid: 3, cond: "Like New", size: "40R", brand: "Tom Ford", tag: "Featured", color: "#0A0A0A" },
  { id: 302, name: "Cashmere Turtleneck", price: 65000, gender: "Men", cat: "Shirts", sid: 3, cond: "New", size: "M", brand: "Loro Piana", tag: "New", color: "#3B332B" },
  { id: 303, name: "Leather Chelsea Boots", price: 78000, gender: "Men", cat: "Footwear", sid: 3, cond: "Excellent", size: "43", brand: "Saint Laurent", tag: null, color: "#110D0A" },
  { id: 304, name: "Tailored Wool Trousers", price: 48000, gender: "Men", cat: "Trousers", sid: 3, cond: "Like New", size: "32", brand: "Gucci", tag: null, color: "#222222" },
  { id: 305, name: "Silk Pocket Square", price: 12000, gender: "Men", cat: "Accessories", sid: 3, cond: "New", size: "OS", brand: "Hermès", tag: null, color: "#001A33" },

  // SELLER 4 (FEMME FATALE) - 5 items
  { id: 401, name: "Pleated Midi Skirt", price: 58000, gender: "Women", cat: "Skirts", sid: 4, cond: "Excellent", size: "S", brand: "Dior", tag: "Classic", color: "#1A2530" },
  { id: 402, name: "Quilted Leather Bag", price: 210000, gender: "Women", cat: "Bags", sid: 4, cond: "Like New", size: "OS", brand: "Chanel", tag: "Rare", color: "#0A050A" },
  { id: 403, name: "Silk Chiffon Blouse", price: 45000, gender: "Women", cat: "Tops", sid: 4, cond: "New", size: "M", brand: "Valentino", tag: null, color: "#3B1015" },
  { id: 404, name: "Pointed Toe Pumps", price: 68000, gender: "Women", cat: "Footwear", sid: 4, cond: "Good", size: "37", brand: "Christian Louboutin", tag: null, color: "#121212" },
  { id: 405, name: "Trench Coat", price: 145000, gender: "Women", cat: "Outerwear", sid: 4, cond: "Excellent", size: "L", brand: "Burberry", tag: "Featured", color: "#3A3022" },

  // SELLER 5 (MINI HAUTE) - 5 items
  { id: 501, name: "Logo Print T-Shirt", price: 18000, gender: "Kids", cat: "Tops", sid: 5, cond: "New", size: "6Y", brand: "Gucci Kids", tag: "New", color: "#1C2833" },
  { id: 502, name: "Denim Overalls", price: 25000, gender: "Kids", cat: "Bottoms", sid: 5, cond: "Excellent", size: "4Y", brand: "Stella McCartney", tag: null, color: "#212F3D" },
  { id: 503, name: "Puffer Jacket", price: 42000, gender: "Kids", cat: "Outerwear", sid: 5, cond: "Like New", size: "8Y", brand: "Moncler Enfant", tag: "Featured", color: "#1A0000" },
  { id: 504, name: "Velcro Sneakers", price: 22000, gender: "Kids", cat: "Footwear", sid: 5, cond: "Good", size: "28", brand: "Givenchy", tag: null, color: "#17202A" },
  { id: 505, name: "Knit Beanie", price: 8000, gender: "Kids", cat: "Accessories", sid: 5, cond: "New", size: "OS", brand: "Burberry", tag: null, color: "#332211" },

  // SELLER 6 (THE VAULT) - 5 items
  { id: 601, name: "Vintage Monogram Trunk", price: 450000, gender: "Unisex", cat: "Official Merch", sid: 6, cond: "Good", size: "OS", brand: "Louis Vuitton", tag: "Rare", color: "#2B1A0A" },
  { id: 602, name: "Oversized Shield Sunglasses", price: 32000, gender: "Unisex", cat: "Accessories", sid: 6, cond: "Excellent", size: "OS", brand: "Balenciaga", tag: null, color: "#0A0A0A" },
  { id: 603, name: "Chain Link Necklace", price: 85000, gender: "Men", cat: "Accessories", sid: 6, cond: "Like New", size: "OS", brand: "Dior Homme", tag: "Featured", color: "#1A1F24" },
  { id: 604, name: "Leather Tote Bag", price: 175000, gender: "Women", cat: "Bags", sid: 6, cond: "Excellent", size: "OS", brand: "Bottega Veneta", tag: null, color: "#112211" },
  { id: 605, name: "Silk Patterned Scarf", price: 28000, gender: "Women", cat: "Accessories", sid: 6, cond: "New", size: "OS", brand: "Hermès", tag: "New", color: "#3A0000" }
];

const REVIEWS = [
  { id: 1, user: "Aarav K.", rating: 5, date: "10 Apr 2026", text: "Condition was pristine, exactly as pictured. Shipping was incredibly fast." },
  { id: 2, user: "Ria S.", rating: 4, date: "02 Apr 2026", text: "Love the piece! Minor delay in dispatch but the seller was very communicative." },
  { id: 3, user: "Kabir M.", rating: 5, date: "28 Mar 2026", text: "Grail piece acquired. Authentication tags were all intact." },
  { id: 4, user: "Meera D.", rating: 5, date: "15 Mar 2026", text: "Fits perfectly according to the size guide. Very happy." }
];

const INITIAL_USERS = [
  { id: 1001, name: "Karan D.", banned: false },
  { id: 1002, name: "Aarav K.", banned: false },
  { id: 1003, name: "Ria S.", banned: false },
  { id: 1004, name: "Meera D.", banned: false }
];

// 5. Formatters
const fmt = (n) => n.toLocaleString('en-IN');
const fmtNum = (n) => n >= 1000 ? (n/1000).toFixed(1) + 'k' : n;

// 6. TAG map
const TAG_COLORS = {
  New: C.green,
  Rare: C.blue,
  Featured: C.yellow,
  Classic: C.red
};

// 7. GLOBAL_CSS
const GLOBAL_CSS = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background-color: ${C.bg};
    color: ${C.ink};
    font-family: 'Inter', sans-serif;
    overflow-x: hidden;
  }
  h1, h2, h3, h4, h5, h6, .bangers {
    font-family: 'Bangers', cursive;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
  
  /* Utilities */
  .ctr { container-type: inline-size; width: 100%; max-width: 1280px; margin: 0 auto; padding: 0 clamp(1rem, 3vw, 2rem); }
  
  .sec { padding: clamp(3rem, 6vw, 5rem) 0; }
  
  .halftone {
    background-image: radial-gradient(circle, ${C.ink} 1px, transparent 1px);
    background-size: 20px 20px;
    background-position: 0 0;
  }

  /* Interaction variants */
  .neo-btn, .neo-card, .neo-card-sm {
    transition: transform 0.15s ease, box-shadow 0.15s ease;
    cursor: pointer;
    border: 3px solid ${C.border};
  }
  
  @media(hover: hover) {
    .neo-btn:hover {
      transform: translate(-2px, -2px);
      box-shadow: 6px 6px 0 ${C.shadow};
    }
    .neo-card:hover, .neo-card-sm:hover {
      transform: translate(-2px, -2px);
      box-shadow: 8px 8px 0 ${C.shadow};
    }
  }
  
  .neo-btn:active, .neo-card:active, .neo-card-sm:active {
    transform: translate(4px, 4px) !important;
    box-shadow: 0 0 0 ${C.shadow} !important;
  }

  /* Grids - using Container Queries */
  .g-prod { display: grid; gap: clamp(1.5rem, 3cqi, 2rem); grid-template-columns: repeat(1, 1fr); }
  @container (min-width: 600px) { .g-prod { grid-template-columns: repeat(2, 1fr); } }
  @container (min-width: 900px) { .g-prod { grid-template-columns: repeat(3, 1fr); } }
  @container (min-width: 1200px) { .g-prod { grid-template-columns: repeat(4, 1fr); } }
  
  .g-3 { display: grid; gap: clamp(1.5rem, 3cqi, 2rem); grid-template-columns: 1fr; }
  @container (min-width: 600px) { .g-3 { grid-template-columns: repeat(2, 1fr); } }
  @container (min-width: 900px) { .g-3 { grid-template-columns: repeat(3, 1fr); } }
  
  .g-cat { display: grid; gap: clamp(1rem, 2cqi, 1.5rem); grid-template-columns: repeat(2, 1fr); }
  @container (min-width: 600px) { .g-cat { grid-template-columns: repeat(3, 1fr); } }
  @container (min-width: 1024px) { .g-cat { grid-template-columns: repeat(5, 1fr); } }

  .accordion-content { display: none; }
  .accordion-content.open { display: block; animation: fadeIn 0.2s ease; }
  .chevron { transition: transform 0.2s ease; display: inline-block; }
  .chevron.open { transform: rotate(180deg); }

  .g-detail { display: grid; gap: clamp(2rem, 4cqi, 3rem); grid-template-columns: 1fr; }
  @container (min-width: 768px) {
    .g-detail { grid-template-columns: 1fr 1fr; align-items: start; }
  }

  /* Typography - Fluid Clamp */
  .th { font-size: clamp(1.5rem, 5vw + 1rem, 4rem); line-height: 1; margin: 0; }
  .ts { font-size: clamp(1.5rem, 4vw + 0.5rem, 3.5rem); line-height: 1.1; margin: 0; }
  .tp { font-size: clamp(2rem, 5vw + 0.5rem, 4rem); line-height: 1; margin: 0; }
  .tc { font-size: clamp(1.25rem, 2vw + 0.5rem, 1.75rem); line-height: 1.1; margin: 0; }
  .td { font-size: clamp(1.5rem, 3vw + 0.5rem, 3rem); line-height: 1.1; margin: 0; }
  .tb { font-size: clamp(1rem, 1vw + 0.5rem, 1.125rem); line-height: 1.5; margin: 0; }
  .tsm { font-size: clamp(0.75rem, 0.5vw + 0.5rem, 0.875rem); margin: 0; }
  .label-sm { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; }
  
  /* ATC visibility */
  @media (hover: none) {
    .atc-btn { opacity: 1 !important; }
  }
  /* FIX 6 CSS DONE */

  /* Gender strip */
  .gender-strip { scroll-behavior: smooth; }
  .gender-strip::-webkit-scrollbar { display: none; }

  /* Misc */
  .nav-desktop { display: none; }
  .nav-mobile { display: block; }
  .tab-bar { display: flex; position: fixed; bottom: 0; left: 0; right: 0; background: ${C.surface}; border-top: 3px solid ${C.border}; z-index: 100; height: 60px; justify-content: space-around; align-items: center; }
  .tab-bar-spacer { height: 60px; }
  @media(min-width: 768px) {
    .nav-desktop { display: flex; }
    .nav-mobile, .tab-bar, .tab-bar-spacer { display: none; }
  }
  
  .stripe-bg {
    background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(13,13,13,0.1) 10px, rgba(13,13,13,0.1) 12px);
  }
  input:focus {
    box-shadow: 4px 4px 0 ${C.yellow} !important;
  }
  @keyframes slideInRight {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
  /* FIX 5 DONE */
`;

// 8. Shared style objects
const BTNP = { background: C.yellow, color: C.ink, border: `3px solid ${C.border}`, boxShadow: `4px 4px 0 ${C.shadow}`, borderRadius: 0, padding: '0.75rem 1.5rem', fontWeight: 600, fontSize: '1rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' };
const BTNG = { background: C.surface, color: C.ink, border: `3px solid ${C.border}`, boxShadow: `4px 4px 0 ${C.shadow}`, borderRadius: 0, padding: '0.75rem 1.5rem', fontWeight: 600, fontSize: '1rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' };
const BTND = { background: C.red, color: "#fff", border: `3px solid ${C.border}`, boxShadow: `4px 4px 0 ${C.shadow}`, borderRadius: 0, padding: '0.75rem 1.5rem', fontWeight: 600, fontSize: '1rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' };
const INP = { background: "#fff", color: C.ink, border: `3px solid ${C.border}`, borderRadius: 0, padding: '0.75rem', width: '100%', outline: 'none' };

// Step 3: Size Guide Data
const SIZES = {
  Men: { Suits: "36-46", Shirts: "XS-XXL", Trousers: "28-40", Footwear: "39-46", Blazers: "36-46", Outerwear: "XS-XXL", Accessories: "OS" },
  Women: { Dresses: "XXS-XXL", Tops: "XXS-XXL", Skirts: "XXS-XXL", Trousers: "24-34", Outerwear: "XXS-XXL", Footwear: "35-42", Bags: "OS", Accessories: "OS" },
  Kids: { Tops: "2Y-12Y", Bottoms: "2Y-12Y", Outerwear: "2Y-12Y", Footwear: "24-34", Accessories: "OS" },
  Unisex: { Streetwear: "XS-XXL", Outerwear: "XS-XXL", Footwear: "35-46", Accessories: "OS" }
};

// 9. Micro-components
const Price = ({ n, style = {} }) => (
  <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: '0.25rem', color: C.ink, fontFamily: 'Bangers, cursive', ...style }}>
    <span style={{ fontSize: '0.7em', fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>Rs.</span>
    <span>{fmt(n)}</span>
  </span>
);

const VerBadge = () => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', background: C.yellow, color: C.ink, border: `2px solid ${C.border}`, boxShadow: `2px 2px 0 ${C.shadow}`, borderRadius: 0, padding: '0 0.25rem', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.05em', lineHeight: 1.2 }}>
    <span style={{ fontSize: '0.8rem', lineHeight: 1 }}>✓</span> VERIFIED
  </span>
);

// ModalWrapper
const ModalWrapper = ({ close, title, children }) => (
  <div style={{ position: 'fixed', inset: 0, background: 'rgba(245, 240, 232, 0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }} onClick={close}>
    <div className="neo-card" onClick={e => e.stopPropagation()} style={{ background: C.surface, width: '100%', maxWidth: '500px', border: `3px solid ${C.border}`, boxShadow: `6px 6px 0 ${C.shadow}`, display: 'flex', flexDirection: 'column', maxHeight: '90vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `3px solid ${C.border}`, padding: '1rem 1.5rem', background: C.yellow }}>
        <h3 className="tc" style={{ margin: 0 }}>{title}</h3>
        <button onClick={close} style={{ background: 'none', border: 'none', fontSize: '1.5rem', fontWeight: 'bold', cursor: 'pointer', color: C.ink }}>×</button>
      </div>
      <div style={{ padding: '1.5rem', overflowY: 'auto' }}>
        {children}
      </div>
    </div>
  </div>
);

// 10. ProductCard
const ProductCard = ({ p, nav, setSelProduct, addCart, wishlist = [], toggleWishlist }) => {
  const [hov, setHov] = useState(false);
  
  return (
    <div 
      className="neo-card" 
      style={{ display: 'flex', flexDirection: 'column', background: C.surface, position: 'relative', border: `3px solid ${C.border}` }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => { if(setSelProduct) setSelProduct(p); nav('product'); }}
    >
      <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', background: p.color, borderBottom: `3px solid ${C.border}`, overflow: 'hidden' }}>
        <div className="halftone" style={{ position: 'absolute', inset: 0, opacity: 0.5 }}></div>
        {/* Placeholder label simulating real product image */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: 'Bangers', color: 'rgba(255,255,255,0.2)', fontSize: '4rem', transform: 'rotate(-45deg)' }}>{p.brand}</span>
        </div>

        {toggleWishlist && (
          <button
            className="neo-btn"
            style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', zIndex: 10, background: C.surface, border: `3px solid ${C.border}`, boxShadow: `2px 2px 0 ${C.shadow}`, borderRadius: 0, padding: '0.25rem 0.5rem', fontSize: '1.1rem', cursor: 'pointer', color: wishlist.includes(p.id) ? C.red : C.ink }}
            onClick={(e) => { e.stopPropagation(); toggleWishlist(p.id); }}
          >
            {wishlist.includes(p.id) ? '♥' : '♡'}
          </button>
        )}
        
        {p.tag && (
          <div style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', zIndex: 10 }}>
            <span style={{ background: TAG_COLORS[p.tag] || C.yellow, color: C.ink, border: `2px solid ${C.border}`, padding: '0.2rem 0.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', boxShadow: `2px 2px 0 ${C.shadow}` }}>
              {p.tag}
            </span>
          </div>
        )}
        
        <div 
          className="atc-btn"
          style={{ position: 'absolute', bottom: '0.5rem', right: '0.5rem', zIndex: 10, opacity: hov ? 1 : 0, transition: 'opacity 0.2s ease' }}
          onClick={(e) => { e.stopPropagation(); addCart(p); }}
        >
          {/* FIX 6 DONE */}
          <div className="neo-btn" style={{ background: C.yellow, border: `3px solid ${C.border}`, padding: '0.25rem 0.75rem', boxShadow: `4px 4px 0 ${C.shadow}`, color: C.ink, fontWeight: 700, fontSize: '0.85rem' }}>
            + CART
          </div>
        </div>
      </div>
      
      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flex: 1, gap: '0.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <span className="label-sm" style={{ color: C.muted }}>{p.brand}</span>
          <span className="label-sm" style={{ background: C.bg, border: `2px solid ${C.border}`, padding: '0.1rem 0.3rem' }}>{p.size} • {p.cond}</span>
        </div>
        <h3 className="tc" style={{ fontSize: '1.25rem', flex: 1 }}>{p.name}</h3>
        <div style={{ marginTop: '0.5rem' }}>
          <Price n={p.price} style={{ fontSize: '1.5rem' }} />
        </div>
      </div>
    </div>
  );
};

// 12. Navbar
const Navbar = ({ nav, page, cartCount, openLogin, openCart, userAuthed, onSearch }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const links = [
    { k: 'browse', l: 'Browse' },
    { k: 'categories', l: 'Categories' },
    { k: 'how', l: 'How It Works' }
  ];

  return (
    <>
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: C.surface, borderBottom: `3px solid ${C.border}` }}>
        <div className="ctr" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button className="nav-mobile" onClick={() => setMenuOpen(true)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: C.ink }}>☰</button>
            <div onClick={() => nav('home')} style={{ cursor: 'pointer' }}>
              <h1 className="ts" style={{ margin: 0, cursor: 'pointer' }}>INDREV</h1>
            </div>
          </div>
          
          <div className="nav-desktop" style={{ gap: '2rem', alignItems: 'center' }}>
            {links.map(x => (
              <div 
                key={x.k} 
                onClick={() => nav(x.k)} 
                style={{ cursor: 'pointer', fontWeight: 600, position: 'relative' }}>
                {x.l}
                {page === x.k && <div style={{ position: 'absolute', bottom: '-4px', left: 0, right: 0, height: '4px', background: C.yellow }}></div>}
              </div>
            ))}
          </div>

          <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery} 
              onChange={e => setSearchQuery(e.target.value)} 
              onKeyDown={e => e.key === 'Enter' && onSearch(searchQuery)}
              style={{...INP, width: '280px'}} 
            />
            <button className="neo-btn" style={{...BTNG, padding: '0.5rem'}} onClick={() => onSearch(searchQuery)}>
              🔍
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button className="neo-btn nav-desktop" style={{...BTNG, padding: '0.5rem 1rem'}} onClick={() => nav('wishlist')}>♥ SAVED</button>
            <button className="neo-btn nav-desktop" style={{...BTNG, padding: '0.5rem 1rem'}} onClick={openLogin}>{userAuthed ? 'ACCOUNT' : 'LOGIN'}</button>
            <button className="neo-btn" style={{...BTNP, padding: '0.5rem 1rem'}} onClick={openCart}>
              CART {cartCount > 0 && `(${cartCount})`}
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div style={{ position: 'fixed', inset: 0, background: C.surface, zIndex: 100, display: 'flex', flexDirection: 'column' }}>
          <div className="ctr" style={{ display: 'flex', justifyContent: 'flex-end', height: '70px', alignItems: 'center' }}>
            <button onClick={() => setMenuOpen(false)} style={{ background: 'none', border: 'none', fontSize: '2rem', cursor: 'pointer', color: C.ink }}>×</button>
          </div>
          <div className="ctr" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '2rem 1rem' }}>
            <div onClick={() => { nav('home'); setMenuOpen(false); }} className="th" style={{ cursor: 'pointer' }}>HOME</div>
            {links.map(x => (
              <div key={x.k} onClick={() => { nav(x.k); setMenuOpen(false); }} className="th" style={{ cursor: 'pointer' }}>
                {x.l}
              </div>
            ))}
            <button className="neo-btn" style={{...BTNG, width: 'max-content', marginTop: '2rem'}} onClick={() => { openLogin(); setMenuOpen(false); }}>{userAuthed ? 'ACCOUNT' : 'LOGIN / SIGN UP'}</button>
          </div>
        </div>
      )}

      {/* Mobile Tab Bar */}
      <div className="tab-bar">
        {[
          { k: 'home', l: 'HOME', icon: '🏠' },
          { k: 'browse', l: 'SHOP', icon: '🛍️' },
          { k: 'search', l: 'SEARCH', icon: '🔍' },
          { k: 'categories', l: 'CATEGORIES', icon: '📁' },
          { k: 'wishlist', l: 'SAVED', icon: '♥' }
        ].map(x => (
          <div key={x.k} onClick={() => nav(x.k)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', color: page === x.k ? C.ink : C.muted }}>
            <span style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>{x.icon}</span>
            <span className="label-sm" style={{ color: page === x.k ? C.ink : C.muted }}>{x.l}</span>
          </div>
        ))}
      </div>
      <div className="tab-bar-spacer"></div>
    </>
  );
};

// 13. Home
const Home = ({ nav, dbProducts, featured, setSelProduct, addCart, wishlist, toggleWishlist }) => {
  const featProducts = (() => {
    const pinned = dbProducts.filter(p => featured.includes(p.id));
    if (pinned.length > 0) return pinned;
    const tagged = dbProducts.filter(p => p.tag === 'Featured');
    if (tagged.length > 0) return tagged.slice(0, 4);
    return dbProducts.slice(0, 8);
  })();
  // UX FIX 2 DONE
  return (
    <div key="home" style={{ animation: 'fadeIn 0.3s ease' }}>
      {/* Hero Section */}
      <section style={{ borderBottom: `4px solid ${C.border}`, position: 'relative', overflow: 'hidden' }}>
        <img 
          src="https://images.unsplash.com/photo-1558769132-cb1fac08f04b?auto=format&fit=crop&w=1200&q=80" 
          srcSet="https://images.unsplash.com/photo-1558769132-cb1fac08f04b?auto=format&fit=crop&w=600&q=80 600w,
                  https://images.unsplash.com/photo-1558769132-cb1fac08f04b?auto=format&fit=crop&w=1200&q=80 1200w,
                  https://images.unsplash.com/photo-1558769132-cb1fac08f04b?auto=format&fit=crop&w=2000&q=80 2000w"
          sizes="100vw"
          alt="Curated Fashion"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0, opacity: 0.15 }}
        />
        <div className="halftone" style={{ position: 'absolute', inset: 0, zIndex: 0 }}></div>
        <div className="stripe-bg" style={{ position: 'absolute', top: '-10%', right: '-10%', width: '60%', height: '120%', zIndex: 0, transform: 'rotate(15deg)' }}></div>
        
        <div className="ctr sec" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '800px' }}>
            <div style={{ background: C.yellow, display: 'inline-block', padding: '0.5rem 1rem', border: `3px solid ${C.border}`, marginBottom: '1.5rem', boxShadow: `4px 4px 0 ${C.shadow}` }}>
              <span className="label-sm" style={{ color: C.ink }}>THE NEW STANDARD IN LUXURY</span>
            </div>
            <h1 className="th" style={{ marginBottom: '2rem', textShadow: `4px 4px 0 ${C.surface}, -1px -1px 0 ${C.surface}, 1px -1px 0 ${C.surface}, -1px 1px 0 ${C.surface}, 1px 1px 0 ${C.surface}` }}>
              CURATED FASHION <br/>FOR EVERYONE.
            </h1>
            <p className="tb" style={{ marginBottom: '2.5rem', maxWidth: '600px', fontSize: '1.2rem', background: C.surface, padding: '1rem', border: `3px solid ${C.border}`, boxShadow: `4px 4px 0 ${C.shadow}` }}>
              Shop authenticated luxury pieces from top verified curators. 
              Menswear, womenswear, and rare archival streetwear.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button className="neo-btn" style={{...BTNP, fontSize: '1.2rem', padding: '1rem 2rem'}} onClick={() => nav('browse')}>SHOP COLLECTION</button>
              <button className="neo-btn" style={{...BTNG, fontSize: '1.2rem', padding: '1rem 2rem'}} onClick={() => nav('categories')}>VIEW CATEGORIES</button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Band */}
      <div style={{ background: C.yellow, borderBottom: `4px solid ${C.border}`, padding: '1.5rem 0' }}>
        <div className="ctr" style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '1.5rem' }}>
          {[
            { l: 'THEMATIC CATEGORIES', n: '5+' },
            { l: 'CURATED PIECES', n: '120+' },
            { l: 'AUTHENTICATED', n: '100%' }
          ].map((x, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
              <span className="td" style={{ margin: 0, color: C.ink }}>{x.n}</span>
              <span className="label-sm" style={{ color: C.ink }}>{x.l}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Featured Section */}
      <div className="ctr sec">
        <h2 className="ts" style={{ textAlign: 'center', marginBottom: '3rem' }}>NEW ARRIVALS</h2>
        <div className="g-prod" style={{ justifyContent: 'center' }}>
          {featProducts.map(p => <ProductCard key={p.id} p={p} nav={nav} setSelProduct={setSelProduct} addCart={addCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />)}
        </div>
      </div>
    </div>
  );
};

const Browse = ({ nav, setSelProduct, addCart, recent, dbProducts, wishlist, toggleWishlist }) => {
  const [filterModal, setFilterModal] = useState(false);
  const [expanded, setExpanded] = useState({ dep: true, cat: false, cond: false, price: false });
  const [tab, setTab] = useState('All');
  const [cats, setCats] = useState([]);
  const [conds, setConds] = useState([]);
  const [maxP, setMaxP] = useState(500000);
  const [sort, setSort] = useState('newest');
  const [search, setSearch] = useState('');
  const [saleActive, setSaleActive] = useState(false); // FIX 3 DONE

  const toggleExp = (k) => setExpanded(p => ({ ...p, [k]: !p[k] }));

  const toggleCat = (c) => setCats(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  const toggleCond = (c) => setConds(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);

  const filtered = useMemo(() => {
    let res = dbProducts.filter(p => !p.hidden);
    if (tab !== 'All') res = res.filter(p => p.gender === tab);
    if (cats.length > 0) res = res.filter(p => cats.includes(p.cat));
    if (conds.length > 0) res = res.filter(p => conds.includes(p.cond));
    res = res.filter(p => p.price <= maxP);
    if (saleActive) res = res.filter(p => p.tag === 'New'); // FIX 3 DONE
    
    if (search.trim()) {
      const q = search.toLowerCase();
      res = res.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
    }
    
    let sorted = [...res];
    if (sort === 'low') sorted.sort((a,b) => a.price - b.price);
    else if (sort === 'high') sorted.sort((a,b) => b.price - a.price);
    else sorted.sort((a,b) => a.id - b.id); // 'newest' proxy
    
    return sorted;
  }, [tab, cats, conds, maxP, sort, search]);

  const activeCats = tab === 'All' ? Object.values(CATS_BY_GENDER).flat().filter((v,i,a) => a.indexOf(v)===i) : CATS_BY_GENDER[tab] || [];

  return (
    <div key="browse" style={{ animation: 'fadeIn 0.3s ease', background: C.bg, flex: 1 }}>
      <div className="ctr sec">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
          <h1 className="tp" style={{ margin: 0 }}>THE EDIT</h1>
        </div>

        {/* Gender Tab Strip — UX FIX 1 DONE */}
        <div className="gender-strip" style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.75rem', borderBottom: `4px solid ${C.border}`, marginBottom: '1.5rem' }}>
          {GENDERS.map(g => (
            <button
              key={g}
              className="neo-btn"
              style={tab === g
                ? { ...BTNG, background: C.ink, color: '#fff', boxShadow: `4px 4px 0 ${C.shadow}`, whiteSpace: 'nowrap' }
                : { ...BTNG, whiteSpace: 'nowrap' }
              }
              onClick={() => { setTab(g); setCats([]); }}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem', borderTop: `4px solid ${C.border}`, borderBottom: `4px solid ${C.border}`, padding: '1rem 0', alignItems: 'center' }}>
          <button className="neo-btn" style={{...(saleActive ? { ...BTNG, background: C.yellow } : BTNG), padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}} onClick={() => setSaleActive(!saleActive)}>
            <span style={{ fontSize: '1rem', transform: 'rotate(45deg)' }}>🏷</span> {saleActive ? 'SALE ON' : 'SALE'}
          </button>
          <button className="neo-btn" style={{...BTNG, padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}} onClick={() => setFilterModal(true)}>
            <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>☷</span> FILTERS
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: 'auto' }}>
            <span className="label-sm nav-desktop">SORT BY:</span>
            <select style={{ ...INP, width: 'auto', padding: '0.5rem', fontWeight: 600, cursor: 'pointer', boxShadow: `4px 4px 0 ${C.shadow}` }} value={sort} onChange={e => setSort(e.target.value)}>
              <option value="newest">NEWEST</option>
              <option value="low">PRICE: LOW - HIGH</option>
              <option value="high">PRICE: HIGH - LOW</option>
            </select>
          </div>
        </div>

        <div>
          <div className="label-sm" style={{ marginBottom: '1.5rem', color: C.muted }}>SHOWING {filtered.length} CURATED PIECES</div>
          {filtered.length > 0 ? (
            <div className="g-prod">
              {filtered.map(p => <ProductCard key={p.id} p={p} nav={nav} setSelProduct={setSelProduct} addCart={addCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />)}
            </div>
          ) : (
            <div style={{ background: C.surface, border: `3px solid ${C.border}`, padding: '4rem 2rem', textAlign: 'center', boxShadow: `6px 6px 0 ${C.shadow}` }}>
              <h3 className="tc" style={{ marginBottom: '1rem' }}>NOTHING FOUND!</h3>
              <p className="tb" style={{ color: C.muted }}>Try adjusting your filters or search criteria.</p>
              <button className="neo-btn" style={{...BTNG, marginTop: '2rem'}} onClick={() => { setTab('All'); setCats([]); setConds([]); setMaxP(500000); setSearch(''); }}>CLEAR FILTERS</button>
            </div>
          )}
        </div>

        {/* Filter Modal */}
        {filterModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(245, 240, 232, 0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }} onClick={() => setFilterModal(false)}>
            <div className="neo-card" onClick={e => e.stopPropagation()} style={{ background: C.surface, width: '100%', maxWidth: '500px', border: `3px solid ${C.border}`, boxShadow: `6px 6px 0 ${C.shadow}`, display: 'flex', flexDirection: 'column', maxHeight: '90vh' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `3px solid ${C.border}`, padding: '1rem 1.5rem', background: C.surface }}>
                <h3 className="tc" style={{ margin: 0, fontSize: '1.5rem' }}>FILTERS</h3>
                <button onClick={() => setFilterModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', fontWeight: 'bold', cursor: 'pointer', color: C.ink }}>×</button>
              </div>
              
              <div style={{ overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Search */}
                <div style={{ padding: '1.5rem', borderBottom: `3px solid ${C.border}` }}>
                  <input type="text" placeholder="Search Name or Brand..." style={{...INP, padding: '0.75rem'}} value={search} onChange={e => setSearch(e.target.value)} />
                </div>

                {/* Department accordion removed — gender tabs now on Browse page directly */}

                {/* Category Accordion */}
                <div style={{ borderBottom: `3px solid ${C.border}` }}>
                  <div style={{ padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => toggleExp('cat')}>
                    <span className="tb" style={{ fontWeight: 700, fontSize: '0.9rem' }}>CATEGORY</span>
                    <span className={`chevron ${expanded.cat ? 'open' : ''}`}>▼</span>
                  </div>
                  <div className={`accordion-content ${expanded.cat ? 'open' : 'closed'}`}>
                    <div style={{ padding: '0 1.5rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {activeCats.map(c => (
                        <label key={c} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                          <input type="checkbox" checked={cats.includes(c)} onChange={() => toggleCat(c)} style={{ cursor: 'pointer', accentColor: C.ink, width: '1.25rem', height: '1.25rem' }} />
                          <span className="tb" style={{ fontSize: '0.9rem' }}>{c}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Condition Accordion */}
                <div style={{ borderBottom: `3px solid ${C.border}` }}>
                  <div style={{ padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => toggleExp('cond')}>
                    <span className="tb" style={{ fontWeight: 700, fontSize: '0.9rem' }}>CONDITION</span>
                    <span className={`chevron ${expanded.cond ? 'open' : ''}`}>▼</span>
                  </div>
                  <div className={`accordion-content ${expanded.cond ? 'open' : 'closed'}`}>
                    <div style={{ padding: '0 1.5rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {CONDITIONS.map(c => (
                        <label key={c} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                          <input type="checkbox" checked={conds.includes(c)} onChange={() => toggleCond(c)} style={{ cursor: 'pointer', accentColor: C.ink, width: '1.25rem', height: '1.25rem' }} />
                          <span className="tb" style={{ fontSize: '0.9rem' }}>{c}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Price Max Accordion */}
                <div>
                  <div style={{ padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => toggleExp('price')}>
                    <span className="tb" style={{ fontWeight: 700, fontSize: '0.9rem' }}>PRICE RANGE</span>
                    <span className={`chevron ${expanded.price ? 'open' : ''}`}>▼</span>
                  </div>
                  <div className={`accordion-content ${expanded.price ? 'open' : 'closed'}`}>
                    <div style={{ padding: '0 1.5rem 1.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1rem' }}>
                        <h4 className="label-sm" style={{ margin: 0 }}>MAX PRICE</h4>
                        <span className="tb" style={{ fontWeight: 'bold' }}>Rs. {fmt(maxP)}</span>
                      </div>
                      <input type="range" min="5000" max="500000" step="5000" value={maxP} onChange={e => setMaxP(Number(e.target.value))} style={{ width: '100%', cursor: 'pointer', accentColor: C.yellow }} />
                    </div>
                  </div>
                </div>
              </div>
              
              <div style={{ padding: '1.5rem', borderTop: `4px solid ${C.border}`, background: C.bg }}>
                <button className="neo-btn" style={{...BTNP, width: '100%', padding: '1rem', background: C.ink, color: '#fff'}} onClick={() => setFilterModal(false)}>
                  SHOW RESULTS
                </button>
                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', color: C.muted, fontWeight: 600 }} onClick={() => { setTab('All'); setCats([]); setConds([]); setMaxP(500000); setSearch(''); }}>
                    CLEAR FILTERS
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Overlapping Step 10: Recently Viewed */}
        {recent && recent.length > 0 && (
          <div style={{ marginTop: '5rem', paddingTop: '3rem', borderTop: `4px solid ${C.border}` }}>
            <h2 className="ts" style={{ marginBottom: '2rem' }}>RECENTLY VIEWED</h2>
            <div className="g-prod">
              {recent.map(p => <ProductCard key={`rec-${p.id}`} p={p} nav={nav} setSelProduct={setSelProduct} addCart={addCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />)}
            </div>
            {/* FEATURE 10 DONE */}
          </div>
        )}
      </div>
    </div>
  );
};

const Wishlist = ({ nav, dbProducts, wishlist, toggleWishlist, setSelProduct, addCart }) => {
  const savedItems = dbProducts.filter(p => wishlist.includes(p.id));
  return (
    <div className="ctr sec" style={{ animation: 'fadeIn 0.3s ease', flex: 1 }}>
      <h1 className="tp" style={{ marginBottom: '2rem' }}>SAVED ITEMS</h1>
      {savedItems.length === 0 ? (
        <div style={{ background: C.surface, border: `3px solid ${C.border}`, padding: '4rem 2rem', textAlign: 'center', boxShadow: `6px 6px 0 ${C.shadow}` }}>
          <h3 className="tc" style={{ marginBottom: '1rem' }}>YOUR SAVED LIST IS EMPTY</h3>
          <button className="neo-btn" style={{...BTNG, marginTop: '2rem'}} onClick={() => nav('browse')}>DISCOVER CURATED PIECES</button>
        </div>
      ) : (
        <div className="g-prod">
          {savedItems.map(p => <ProductCard key={p.id} p={p} nav={nav} setSelProduct={setSelProduct} addCart={addCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />)}
        </div>
      )}
      {/* FEATURE 4 DONE */}
    </div>
  );
};

const SearchResults = ({ query, setQuery, dbProducts, nav, setSelProduct, addCart, wishlist, toggleWishlist }) => {
  const filtered = useMemo(() => {
    if (!query || !query.trim()) return [];
    const q = query.toLowerCase();
    return dbProducts.filter(p => !p.hidden && (
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.cat.toLowerCase().includes(q) ||
      p.gender.toLowerCase().includes(q)
    ));
  }, [query, dbProducts]);

  return (
    <div className="ctr sec" style={{ animation: 'fadeIn 0.3s ease', flex: 1 }}>
      <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <input 
          type="text" 
          placeholder="Search..." 
          value={query} 
          onChange={e => setQuery(e.target.value)} 
          style={{...INP, flex: 1, fontSize: '1.2rem', padding: '1rem'}} 
        />
        {query && (
          <button className="neo-btn" style={{...BTNG, padding: '1rem 1.5rem', fontSize: '1.2rem'}} onClick={() => { setQuery(''); nav('browse'); }}>
            ×
          </button>
        )}
      </div>

      {query.trim() ? (
        filtered.length > 0 ? (
          <>
            <h2 className="ts" style={{ marginBottom: '2rem' }}>SHOWING {filtered.length} RESULTS FOR "{query}"</h2>
            <div className="g-prod">
              {filtered.map(p => <ProductCard key={p.id} p={p} nav={nav} setSelProduct={setSelProduct} addCart={addCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />)}
            </div>
          </>
        ) : (
          <div style={{ background: C.surface, border: `3px solid ${C.border}`, padding: '4rem 2rem', textAlign: 'center', boxShadow: `6px 6px 0 ${C.shadow}` }}>
            <h3 className="tc" style={{ marginBottom: '1rem' }}>NO RESULTS FOR "{query}"</h3>
            <button className="neo-btn" style={{...BTNG, marginTop: '2rem'}} onClick={() => { setQuery(''); nav('browse'); }}>CLEAR SEARCH</button>
          </div>
        )
      ) : (
        <div style={{ background: C.surface, border: `3px solid ${C.border}`, padding: '4rem 2rem', textAlign: 'center', boxShadow: `6px 6px 0 ${C.shadow}` }}>
          <h3 className="tc" style={{ marginBottom: '1rem' }}>ENTER A SEARCH TERM</h3>
        </div>
      )}
      {/* FEATURE 8 DONE */}
    </div>
  );
};

// 15. Product Detail
const Product = ({ p, nav, addCart, checkout }) => {
  const [authModal, setAuthModal] = useState(false);
  const [szModal, setSzModal] = useState(false);

  if (!p) return <div className="ctr sec"><div className="neo-card" style={{padding:'3rem', textAlign:'center'}}><h2 className="th">NO PRODUCT SELECTED</h2><button className="neo-btn" style={{...BTNG, marginTop: '2rem'}} onClick={() => nav('browse')}>BACK TO SHOP</button></div></div>;

  return (
    <div key="product" style={{ animation: 'fadeIn 0.3s ease', background: C.bg, flex: 1, paddingBottom: '5rem' }}>
      <div className="ctr sec" style={{ paddingBottom: '2rem' }}>
        <button className="neo-btn" style={{...BTNG, padding: '0.5rem 1rem', marginBottom: '2rem', fontSize: '0.9rem'}} onClick={() => nav('browse')}>← BACK TO MARKET</button>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '3rem' }}>
          <div className="g-detail">
            {/* Image well */}
            <div style={{ border: `3px solid ${C.border}`, background: p.color, width: '100%', aspectRatio: '4/5', position: 'relative', overflow: 'hidden', boxShadow: `6px 6px 0 ${C.shadow}` }}>
              <div className="halftone" style={{ position: 'absolute', inset: 0, opacity: 0.5 }}></div>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'Bangers', color: 'rgba(255,255,255,0.2)', fontSize: '6vw', transform: 'rotate(-45deg)' }}>{p.brand}</span>
              </div>
              {p.tag && (
                <div style={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 10 }}>
                  <span style={{ background: TAG_COLORS[p.tag] || C.yellow, color: C.ink, border: `2px solid ${C.border}`, padding: '0.4rem 0.8rem', fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase', boxShadow: `2px 2px 0 ${C.shadow}` }}>
                    {p.tag}
                  </span>
                </div>
              )}
            </div>

            {/* Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <span className="label-sm" style={{ color: C.muted, display: 'block', marginBottom: '0.5rem' }}>{p.gender} • {p.cat}</span>
                <h1 className="tp" style={{ marginBottom: '0.75rem' }}>{p.name}</h1>
                {/* UX FIX 4 DONE */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <span className="label-sm" style={{ color: C.ink }}>{p.brand}</span>
                  <VerBadge />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Price n={p.price} style={{ fontSize: '2.5rem' }} />
                  <div style={{ textAlign: 'right' }}>
                     <span className="label-sm" style={{ background: C.bg, border: `2px solid ${C.border}`, boxShadow: `2px 2px 0 ${C.shadow}`, padding: '0.3rem 0.6rem', display: 'inline-block' }}>{p.cond} CONDITION</span>
                  </div>
                </div>
              </div>

              <div style={{ borderTop: `4px solid ${C.border}`, borderBottom: `4px solid ${C.border}`, padding: '1.5rem 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <div className="label-sm" style={{ color: C.muted, marginBottom: '0.25rem' }}>BRAND</div>
                  <div className="tb" style={{ fontWeight: 600 }}>{p.brand}</div>
                </div>
                <div>
                  <div className="label-sm" style={{ color: C.muted, marginBottom: '0.25rem' }}>SIZE</div>
                  <div className="tb" style={{ fontWeight: 600 }}>{p.size}</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <button className="neo-btn" style={{...BTNP, width: '100%', fontSize: '1.25rem', padding: '1rem'}} onClick={() => checkout(p)}>BUY NOW</button>
                <button className="neo-btn" style={{...BTNG, width: '100%', fontSize: '1.25rem', padding: '1rem'}} onClick={() => addCart(p)}>ADD TO CART</button>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <button className="neo-btn" style={{...BTNG, width: '100%'}} onClick={() => setAuthModal(true)}>AUTHENTICITY ✓</button>
                  <button className="neo-btn" style={{...BTNG, width: '100%'}} onClick={() => setSzModal(true)}>SIZE GUIDE 📏</button>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '3rem', paddingTop: '3rem', borderTop: `4px solid ${C.border}` }}>
            <h2 className="ts" style={{ marginBottom: '2rem' }}>REVIEWS ({REVIEWS.length})</h2>
            <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
              {REVIEWS.map(r => (
                <div key={r.id} className="neo-card" style={{ background: C.surface, padding: '1.5rem', display: 'flex', flexDirection: 'column', border: `3px solid ${C.border}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span className="tb" style={{ fontWeight: 700 }}>{r.user}</span>
                    <span style={{ color: C.yellowDk, fontFamily: 'Bangers', fontSize: '1.2rem', textShadow: `1px 1px 0 ${C.shadow}` }}>
                      {'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}
                    </span>
                  </div>
                  <span className="label-sm" style={{ color: C.muted, marginBottom: '1rem' }}>{r.date}</span>
                  <p className="tb" style={{ fontSize: '0.95rem', flex: 1 }}>"{r.text}"</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {authModal && (
        <ModalWrapper close={() => setAuthModal(false)} title="AUTHENTICITY GUARANTEE">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ display: 'inline-block', border: `4px solid ${C.ink}`, color: C.ink, fontFamily: 'Bangers', fontSize: '2.5rem', padding: '1rem 2rem', transform: 'rotate(-5deg)', boxShadow: `4px 4px 0 ${C.yellow}` }}>
              VERIFIED BY INDREV
            </div>
            <p className="tb" style={{ marginTop: '1.5rem', fontWeight: 600 }}>Every piece is hand-checked by our experts before it reaches your door.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { t: 'Verified Sellers', d: 'Only curated, vetted sellers are allowed on our platform.' },
              { t: 'Authenticated Pieces', d: 'Zero fakes. Strict multi-point inspection for authenticity.' },
              { t: 'Protected Payments', d: 'Money is held securely until you receive and verify the item.' }
            ].map((p, i) => (
              <div key={i} style={{ border: `3px solid ${C.border}`, padding: '1rem', background: C.bg }}>
                <h4 className="tc" style={{ color: C.blue, marginBottom: '0.25rem' }}>✔️ {p.t}</h4>
                <p className="tb" style={{ fontSize: '0.9rem' }}>{p.d}</p>
              </div>
            ))}
          </div>
        </ModalWrapper>
      )}

      {szModal && (
        <ModalWrapper close={() => setSzModal(false)} title="SIZE GUIDE">
          <p className="tb" style={{ marginBottom: '1.5rem' }}>
            Size configurations for <span style={{ fontWeight: 700 }}>{p.gender} {p.cat}</span>.
          </p>
          <div style={{ border: `3px solid ${C.border}`, background: C.surface }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: `3px solid ${C.border}`, background: C.yellow }}>
              <div style={{ padding: '0.75rem 1rem', fontWeight: 700, borderRight: `3px solid ${C.border}` }}>Category</div>
              <div style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>Available Ranges</div>
            </div>
            {Object.entries(SIZES[p.gender] || {}).map(([cat, range], i, arr) => (
              <div key={cat} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: i < arr.length - 1 ? `3px solid ${C.border}` : 'none' }}>
                <div style={{ padding: '0.75rem 1rem', borderRight: `3px solid ${C.border}`, fontWeight: cat === p.cat ? 700 : 400 }}>{cat}</div>
                <div style={{ padding: '0.75rem 1rem', fontWeight: cat === p.cat ? 700 : 400 }}>{range}</div>
              </div>
            ))}
          </div>
        </ModalWrapper>
      )}
    </div>
  );
};

// 16. Categories
const CategoryList = ({ nav, setSelCategory }) => (
  <div className="ctr sec" style={{ animation: 'fadeIn 0.3s ease', flex: 1 }}>
    <div style={{ borderBottom: `4px solid ${C.border}`, paddingBottom: '1rem', marginBottom: '2rem' }}>
      <h1 className="tp" style={{ margin: 0 }}>CATEGORIES</h1>
    </div>
    <div className="g-cat">
      {CATEGORY_DIRECTORY.map(c => (
        <div 
          key={c.id} 
          className="neo-card" 
          onClick={() => { setSelCategory(c); nav('category'); }}
          style={{ background: C.surface, padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', border: `3px solid ${C.border}` }}
        >
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', border: `3px solid ${C.border}`, marginBottom: '1rem', boxShadow: `4px 4px 0 ${C.shadow}` }}>
            {c.icon}
          </div>
          <h3 className="tc" style={{ marginBottom: '0.25rem' }}>{c.name}</h3>
          <span className="label-sm" style={{ color: C.muted }}>{c.bio}</span>
        </div>
      ))}
    </div>
  </div>
);

// 17. CategoryDetail
const CategoryDetail = ({ c, nav, dbProducts, setSelProduct, addCart, wishlist, toggleWishlist }) => {
  if (!c) return <div className="ctr sec"><div className="neo-card" style={{padding:'3rem', textAlign:'center'}}><h2 className="th">NO CATEGORY SELECTED</h2><button className="neo-btn" style={{...BTNG, marginTop: '2rem'}} onClick={() => nav('categories')}>BACK TO CATEGORIES</button></div></div>;
  
  const catProducts = dbProducts.filter(p => p.cat === c.name);
  
  return (
    <div className="ctr sec" style={{ animation: 'fadeIn 0.3s ease', flex: 1 }}>
      <button className="neo-btn" style={{...BTNG, padding: '0.5rem 1rem', marginBottom: '2rem', fontSize: '0.9rem'}} onClick={() => nav('categories')}>← ALL CATEGORIES</button>
      
      <div style={{ background: c.color, border: `4px solid ${C.border}`, padding: '3rem 2rem', position: 'relative', overflow: 'hidden', boxShadow: `6px 6px 0 ${C.shadow}`, marginBottom: '3rem' }}>
        <div className="halftone" style={{ position: 'absolute', inset: 0, opacity: 0.2 }}></div>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '2rem' }}>
          <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: C.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', border: `4px solid ${C.border}`, boxShadow: `4px 4px 0 ${C.shadow}` }}>
            {c.icon}
          </div>
          <div style={{ color: C.surface, flex: 1, minWidth: '250px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
              <h1 className="tp" style={{ margin: 0, textShadow: `2px 2px 0 ${C.ink}` }}>{c.name}</h1>
            </div>
            <p className="tb" style={{ fontSize: '1.2rem', marginBottom: '1rem', textShadow: `1px 1px 0 ${C.ink}` }}>{c.bio}</p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <span className="label-sm" style={{ background: C.surface, color: C.ink, padding: '0.3rem 0.6rem', border: `2px solid ${C.border}` }}>{catProducts.length} ITEMS</span>
            </div>
          </div>
        </div>
      </div>
      
      <h2 className="ts" style={{ marginBottom: '2rem' }}>COLLECTION</h2>
      {catProducts.length > 0 ? (
        <div className="g-prod">
          {catProducts.map(p => <ProductCard key={p.id} p={p} nav={nav} setSelProduct={setSelProduct} addCart={addCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />)}
        </div>
      ) : (
        <div className="neo-card" style={{ padding: '3rem', textAlign: 'center', background: C.surface }}>
          <h3 className="tc">NO ITEMS AVAILABLE</h3>
        </div>
      )}
    </div>
  );
};

// 18. How It Works
const How = ({ nav }) => (
  <div className="ctr sec" style={{ animation: 'fadeIn 0.3s ease', flex: 1, maxWidth: '800px' }}>
    <h1 className="tp" style={{ marginBottom: '1rem', textAlign: 'center' }}>HOW INDREV WORKS</h1>
    <p className="tb" style={{ textAlign: 'center', marginBottom: '3rem', color: C.muted }}>A buyer-only platform for authenticated luxury and rare streetwear.</p>
    
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {[
        { step: '01', title: 'CURATED SELLERS ONLY', desc: 'There is no open application to sell on INDREV. We hand-pick and invite only the most reputable archive collectors, boutiques, and curators. This is a buyer-focused platform.' },
        { step: '02', title: 'MULTI-POINT AUTHENTICATION', desc: 'Every single piece is shipped to an INDREV authentication center before it reaches you. Our experts verify tags, materials, stitching, and provenance. If it is fake, you get an immediate refund.' },
        { step: '03', title: 'SECURE ESCROW', desc: 'Your payment is held in a secure escrow account. The curator does not get paid until the item is authenticated and delivered to your doorstep in the promised condition.' }
      ].map((s, i) => (
        <div key={i} className="neo-card" style={{ background: C.surface, display: 'flex', border: `4px solid ${C.border}`, boxShadow: `6px 6px 0 ${C.shadow}`, overflow: 'hidden' }}>
          <div style={{ background: C.yellow, padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: `4px solid ${C.border}` }}>
            <span style={{ fontFamily: 'Bangers', fontSize: '4rem', color: C.ink }}>{s.step}</span>
          </div>
          <div style={{ padding: '2rem', flex: 1 }}>
            <h2 className="tc" style={{ marginBottom: '1rem' }}>{s.title}</h2>
            <p className="tb">{s.desc}</p>
          </div>
        </div>
      ))}
    </div>
    
    <div style={{ marginTop: '4rem', textAlign: 'center' }}>
      <button className="neo-btn" style={{...BTNP, fontSize: '1.2rem', padding: '1rem 2rem'}} onClick={() => nav('browse')}>START SHOPPING</button>
    </div>
  </div>
);

// 19. Login Modal
const LoginModal = ({ close, setUserAuthed, setMessageModal }) => (
  <ModalWrapper close={close} title="ENTER INDREV">
    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
      <h2 className="ts">WELCOME BACK</h2>
      <p className="tb" style={{ color: C.muted }}>Sign in to track orders and save preferences.</p>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <input type="email" placeholder="Email Address" style={INP} />
      <input type="password" placeholder="Password" style={INP} />
      <button className="neo-btn" style={{...BTNP, width: '100%', marginTop: '1rem'}} onClick={() => { 
        setUserAuthed(true); 
        close(); 
        setMessageModal({ title: 'WELCOME BACK', text: 'Mock Login Successful. You are now signed in.' });
      }}>SIGN IN</button>
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <span className="label-sm" style={{ color: C.muted }}>OR</span>
      </div>
      <button className="neo-btn" style={{...BTNG, width: '100%'}} onClick={() => { 
        setUserAuthed(true); 
        close(); 
        setMessageModal({ title: 'WELCOME BACK', text: 'Mock Social Login Successful.' });
      }}>CONTINUE WITH GOOGLE</button>
    </div>
  </ModalWrapper>
);

// 20. Cart Drawer
const CartDrawer = ({ close, cart, checkoutCart, setCart }) => {
  const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(13,13,13,0.5)', zIndex: 1000, display: 'flex', justifyContent: 'flex-end' }} onClick={close}>
      <div 
        className="cart-drawer-panel"
        style={{ width: '100%', maxWidth: '400px', background: C.bg, height: '100dvh', borderLeft: `4px solid ${C.border}`, display: 'flex', flexDirection: 'column', boxShadow: `-8px 0 0 ${C.shadow}`, animation: 'slideInRight 0.3s ease' }} 
        onClick={e => e.stopPropagation()}
      >
        <div style={{ background: C.yellow, borderBottom: `4px solid ${C.border}`, padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="ts" style={{ margin: 0 }}>YOUR BAG ({cart.reduce((a,c)=>a+c.qty,0)})</h2>
          <button onClick={close} style={{ background: 'none', border: 'none', fontSize: '2rem', cursor: 'pointer', color: C.ink, lineHeight: 1 }}>×</button>
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', color: C.muted, marginTop: '2rem' }}>
              <p className="tb">Your bag is completely empty.</p>
            </div>
          ) : (
            cart.map((item, i) => (
              <div key={`${item.id}-${i}`} style={{ display: 'flex', gap: '1rem', border: `3px solid ${C.border}`, background: C.surface, padding: '1rem', boxShadow: `4px 4px 0 ${C.shadow}` }}>
                <div style={{ width: '80px', height: '80px', background: item.color, border: `2px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: 'Bangers', color: 'rgba(255,255,255,0.3)', fontSize: '2rem' }}>{item.brand.charAt(0)}</span>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span className="label-sm">{item.brand}</span>
                    <button style={{ background: 'none', border: 'none', color: C.red, fontWeight: 'bold', cursor: 'pointer' }} onClick={() => setCart(prev => prev.filter((_, idx) => idx !== i))}>×</button>
                  </div>
                  <h4 className="tb" style={{ fontSize: '1rem', fontWeight: 600, margin: '0.25rem 0' }}>{item.name}</h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <button className="neo-btn" style={{...BTNG, padding: '0.25rem 0.6rem'}} onClick={() => setCart(prev => prev.map((p, idx) => idx === i ? { ...p, qty: p.qty - 1 } : p).filter(p => p.qty > 0))}>−</button>
                      <span className="label-sm" style={{ color: C.muted }}>{item.qty}</span>
                      <button className="neo-btn" style={{...BTNG, padding: '0.25rem 0.6rem'}} onClick={() => setCart(prev => prev.map((p, idx) => idx === i ? { ...p, qty: p.qty + 1 } : p))}>+</button>
                    </div>
                    {/* FIX 2 DONE */}
                    <Price n={item.price} />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {cart.length > 0 && (
          <div style={{ borderTop: `4px solid ${C.border}`, padding: '1.5rem', background: C.surface }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
              <span className="tb" style={{ fontWeight: 700 }}>SUBTOTAL</span>
              <Price n={total} style={{ fontSize: '1.5rem' }} />
            </div>
            <button className="neo-btn" style={{...BTNP, width: '100%', fontSize: '1.2rem', padding: '1rem'}} onClick={checkoutCart}>
              PROCEED TO CHECKOUT
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const OrderSummary = ({ items, nav }) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const shipping = subtotal > 100000 ? 0 : 299;
  const authFee = 500;
  const total = subtotal + shipping + authFee;

  return (
    <div className="ctr sec" style={{ animation: 'fadeIn 0.3s ease', flex: 1 }}>
      <button className="neo-btn" style={{...BTNG, padding: '0.5rem 1rem', marginBottom: '2rem', fontSize: '0.9rem'}} onClick={() => nav('browse')}>← BACK TO SHOP</button>
      <h1 className="tp" style={{ marginBottom: '2rem' }}>ORDER SUMMARY</h1>
      
      <div className="g-detail">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {items.map((item, i) => (
            <div key={`${item.id}-${i}`} className="neo-card" style={{ display: 'flex', gap: '1rem', border: `3px solid ${C.border}`, background: C.surface, padding: '1rem', boxShadow: `4px 4px 0 ${C.shadow}` }}>
              <div style={{ width: '80px', height: '80px', background: item.color, border: `2px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'Bangers', color: 'rgba(255,255,255,0.3)', fontSize: '2rem' }}>{item.brand.charAt(0)}</span>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span className="label-sm" style={{ color: C.muted }}>{item.brand}</span>
                  <span className="label-sm" style={{ background: C.bg, border: `2px solid ${C.border}`, padding: '0.1rem 0.3rem' }}>{item.size} • {item.cond}</span>
                </div>
                <h4 className="tb" style={{ fontSize: '1.2rem', fontWeight: 600, margin: '0.25rem 0' }}>{item.name}</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto', alignItems: 'flex-end' }}>
                  <span className="label-sm" style={{ color: C.ink }}>QTY: {item.qty}</span>
                  <Price n={item.price} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ alignSelf: 'start', position: 'sticky', top: '100px' }}>
          <div className="neo-card" style={{ background: C.surface, border: `4px solid ${C.border}`, padding: '2rem', boxShadow: `6px 6px 0 ${C.shadow}` }}>
            <h2 className="ts" style={{ marginBottom: '1.5rem', borderBottom: `3px solid ${C.border}`, paddingBottom: '1rem' }}>TOTAL</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="tb" style={{ color: C.muted, fontWeight: 600 }}>SUBTOTAL</span>
                <span className="tb" style={{ fontWeight: 600 }}>Rs. {fmt(subtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="tb" style={{ color: C.muted, fontWeight: 600 }}>SHIPPING</span>
                <span className="tb" style={{ fontWeight: 600 }}>{shipping === 0 ? 'FREE' : `Rs. ${fmt(shipping)}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="tb" style={{ color: C.muted, fontWeight: 600 }}>AUTH FEE</span>
                <span className="tb" style={{ fontWeight: 600 }}>Rs. {fmt(authFee)}</span>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: `4px solid ${C.border}`, paddingTop: '1.5rem', marginBottom: '2rem' }}>
              <span className="ts" style={{ margin: 0 }}>TOTAL</span>
              <Price n={total} style={{ fontSize: '2rem' }} />
            </div>
            
            <button className="neo-btn" style={{ ...BTNP, width: '100%', fontSize: '1rem', padding: '1.5rem 1rem', opacity: 0.6, cursor: 'not-allowed' }} disabled>
              PLACE ORDER (RAZORPAY COMING SOON)
            </button>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.5rem', justifyContent: 'center' }}>
              {['Authenticated', 'Escrow Protected', 'Easy Returns'].map(badge => (
                <span key={badge} className="label-sm" style={{ background: C.bg, border: `2px solid ${C.border}`, padding: '0.3rem 0.6rem', color: C.ink }}>
                  ✓ {badge.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
          {/* FEATURE 7 DONE */}
        </div>
      </div>
    </div>
  );
};

// 22. Footer
const Footer = ({ nav }) => (
  <footer style={{ background: C.surface, borderTop: `4px solid ${C.yellow}` }}>
    <div className="ctr sec">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
        <div>
          <h2 className="ts">INDREV</h2>
          <p className="tb" style={{ color: C.muted, marginTop: '1rem' }}>Comic Neobrutalism.<br/>All Genders. All Ages.</p>
        </div>
        <div>
          <h4 className="tc" style={{ marginBottom: '1rem' }}>SHOP</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <span style={{ cursor: 'pointer', fontWeight: 600, color: C.muted }} onClick={() => nav('browse')}>All Pieces</span>
            <span style={{ cursor: 'pointer', fontWeight: 600, color: C.muted }} onClick={() => nav('browse')}>Curators</span>
            {/* FIX 4 DONE */}
          </div>
        </div>
        <div>
          <h4 className="tc" style={{ marginBottom: '1rem' }}>PLATFORM</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <span style={{ cursor: 'pointer', fontWeight: 600, color: C.muted }} onClick={() => nav('how')}>How It Works</span>
            <span style={{ cursor: 'pointer', fontWeight: 600, color: C.muted }} onClick={() => nav('how')}>Authentication</span>
          </div>
        </div>
      </div>
      <div style={{ borderTop: `3px solid ${C.border}`, paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <span className="tsm" style={{ color: C.muted }}>© {new Date().getFullYear()} INDREV. All rights reserved.</span>
        <span className="tsm" style={{ color: C.muted }}>BUYER ONLY PLATFORM</span>
      </div>
    </div>
  </footer>
);

// 23. Admin
const Admin = ({ nav, dbProducts, setDbProducts, orders, setOrders, dbUsers, setDbUsers, featured, setFeatured }) => {
  const [adminTab, setAdminTab] = useState('dashboard');

  const totalRev = dbProducts.reduce((acc, p) => acc + p.price, 0);

  const toggleProduct = (id) => {
    setDbProducts(prev => prev.map(p => p.id === id ? { ...p, hidden: !p.hidden } : p));
  };
  const deleteProduct = (id) => {
    setDbProducts(prev => prev.filter(p => p.id !== id));
  };
  const toggleOrder = (id) => {
    setOrders(prev => prev.map(o => {
      if (o.id !== id) return o;
      const nx = o.status === 'Pending' ? 'Shipped' : o.status === 'Shipped' ? 'Delivered' : 'Pending';
      return { ...o, status: nx };
    }));
  };
  const toggleUserBan = (id) => {
    setDbUsers(prev => prev.map(u => u.id === id ? { ...u, banned: !u.banned } : u));
  };
  const toggleFeatured = (id) => {
    setFeatured(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= 9) return prev;
      return [...prev, id];
    });
  };

  return (
    <div key="admin" style={{ animation: 'fadeIn 0.3s ease', background: C.bg, flex: 1, paddingBottom: '5rem' }}>
      <div className="ctr sec">
        <h1 className="tp" style={{ marginBottom: '2rem' }}>ADMIN PANEL</h1>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {['dashboard', 'products', 'orders', 'users', 'content'].map(t => (
            <button key={t} className="neo-btn" style={{ ...(adminTab === t ? BTNP : BTNG), textTransform: 'uppercase' }} onClick={() => setAdminTab(t)}>
              {t}
            </button>
          ))}
          <button className="neo-btn" style={{...BTNG, marginLeft: 'auto'}} onClick={() => nav('home')}>EXIT ADMIN</button>
        </div>

        {adminTab === 'dashboard' && (
          <div className="g-3">
            {[
              { l: 'TOTAL REVENUE', v: <Price n={totalRev} /> },
              { l: 'INVENTORY COUNT', v: dbProducts.length }
            ].map((s, i) => (
              <div key={i} className="neo-card" style={{ background: C.surface, padding: '2rem', border: `3px solid ${C.border}`, boxShadow: `6px 6px 0 ${C.shadow}` }}>
                <h3 className="tc" style={{ color: C.muted, marginBottom: '1rem' }}>{s.l}</h3>
                <div className="tp">{s.v}</div>
              </div>
            ))}
          </div>
        )}

        {adminTab === 'products' && (
          <div className="neo-card" style={{ background: C.surface, padding: '2rem', border: `3px solid ${C.border}`, boxShadow: `6px 6px 0 ${C.shadow}` }}>
            <h2 className="ts" style={{ marginBottom: '1.5rem' }}>PRODUCTS DIRECTORY</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {dbProducts.map(p => (
                <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: `3px solid ${C.border}`, background: p.hidden ? C.bg : '#fff', flexWrap: 'wrap', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <span className="tb" style={{ fontWeight: 600 }}>{p.name}</span>
                    <Price n={p.price} style={{ fontSize: '1rem' }} />
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="neo-btn" style={{...BTNG, padding: '0.5rem 1rem', fontSize: '0.85rem'}} onClick={() => toggleProduct(p.id)}>
                      {p.hidden ? 'UNHIDE' : 'HIDE'}
                    </button>
                    <button className="neo-btn" style={{...BTND, padding: '0.5rem 1rem', fontSize: '0.85rem'}} onClick={() => deleteProduct(p.id)}>
                      DELETE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {adminTab === 'orders' && (
          <div className="neo-card" style={{ background: C.surface, padding: '2rem', border: `3px solid ${C.border}`, boxShadow: `6px 6px 0 ${C.shadow}` }}>
            <h2 className="ts" style={{ marginBottom: '1.5rem' }}>ORDERS DIRECTORY</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {orders.length === 0 && <p className="tb">No orders yet.</p>}
              {orders.map(o => (
                <div key={o.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: `3px solid ${C.border}`, background: '#fff', flexWrap: 'wrap', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <span className="tb" style={{ fontWeight: 600 }}>{o.buyer} ordered {o.product.name}</span>
                    <span className="label-sm" style={{ color: C.muted }}>Order #{o.id}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ 
                      background: o.status === 'Delivered' ? C.green : o.status === 'Pending' ? C.yellow : C.surface, 
                      color: C.ink, border: `2px solid ${C.border}`, boxShadow: `2px 2px 0 ${C.shadow}`, padding: '0.25rem 0.5rem', fontWeight: 600, fontSize: '0.85rem' 
                    }}>
                      {o.status}
                    </span>
                    <button className="neo-btn" style={{...BTNG, padding: '0.5rem 1rem', fontSize: '0.85rem'}} onClick={() => toggleOrder(o.id)}>
                      UPDATE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {adminTab === 'users' && (
          <div className="neo-card" style={{ background: C.surface, padding: '2rem', border: `3px solid ${C.border}`, boxShadow: `6px 6px 0 ${C.shadow}` }}>
            <h2 className="ts" style={{ marginBottom: '1.5rem' }}>USER ACCESS CONTROL</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {dbUsers.map(u => (
                <div key={u.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: `3px solid ${C.border}`, background: '#fff', flexWrap: 'wrap', gap: '1rem' }}>
                  <span className="tb" style={{ fontWeight: 600, textDecoration: u.banned ? 'line-through' : 'none' }}>{u.name} {u.banned && <span style={{ color: C.red }}>(BANNED)</span>}</span>
                  <button className="neo-btn" style={{...BTND, padding: '0.5rem 1rem', fontSize: '0.85rem'}} onClick={() => toggleUserBan(u.id)}>
                    {u.banned ? 'UNBAN' : 'BAN'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {adminTab === 'content' && (
          <div className="neo-card" style={{ background: C.surface, padding: '2rem', border: `3px solid ${C.border}`, boxShadow: `6px 6px 0 ${C.shadow}` }}>
            <h2 className="ts" style={{ marginBottom: '1.5rem' }}>FEATURED PIECES (MAX 9)</h2>
            <p className="tb" style={{ marginBottom: '1rem', color: C.muted }}>Select products to display on the Home page.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {dbProducts.map(p => (
                <label key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', padding: '0.5rem', border: `3px solid ${C.border}`, background: featured.includes(p.id) ? C.yellow : '#fff' }}>
                  <input type="checkbox" checked={featured.includes(p.id)} onChange={() => toggleFeatured(p.id)} style={{ width: '1.2rem', height: '1.2rem', accentColor: C.ink }} />
                  <span className="tb">{p.name} - {p.brand}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// 24. App
export default function App() {
  const [page, setPage] = useState('home');
  const [selProduct, setSelProduct] = useState(null);
  const [selCategory, setSelCategory] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [messageModal, setMessageModal] = useState(null);
  const [userAuthed, setUserAuthed] = useState(false);
  const [recent, setRecent] = useState([]);
  const [dbProducts, setDbProducts] = useState(INITIAL_PRODUCTS);
  const [adminAuthed, setAdminAuthed] = useState(false);
  const [orders, setOrders] = useState([]);
  const [dbUsers, setDbUsers] = useState(INITIAL_USERS);
  const [featured, setFeatured] = useState([101, 202, 301, 401, 501, 601, 102, 203, 305]);
  const [orderItems, setOrderItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const uuid = () => Math.random().toString(36).substring(2, 11);

  const nav = useCallback((k) => {
    setPage(k);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const checkoutProduct = useCallback((product) => {
    setOrderItems([{ ...product, qty: 1 }]);
    nav('order');
  }, [nav]);

  const checkoutCart = useCallback(() => {
    setOrderItems([...cart]);
    setCart([]);
    setCartOpen(false);
    nav('order');
  }, [cart, nav]);

  const handleSelProduct = useCallback((product) => {
    setSelProduct(product);
    setRecent(prev => {
      const filtered = prev.filter(x => x.id !== product.id);
      return [product, ...filtered].slice(0, 4);
    });
    // FEATURE 10 DONE
  }, []);

  const addCart = useCallback((product) => {
    setCart(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) return prev.map(p => p.id === product.id ? {...p, qty: (p.qty || 1) + 1} : p);
      return [...prev, { ...product, qty: 1 }];
    });
    setCartOpen(true);
    // FIX 1 DONE
  }, []);

  const toggleWishlist = useCallback((id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }, []);

  const onSearch = useCallback((q) => {
    setSearchQuery(q);
    nav('search');
  }, [nav]);

  useEffect(() => {
    if (!document.getElementById('indrev-fonts')) {
      const link = document.createElement('link');
      link.id = 'indrev-fonts';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Bangers&family=Inter:wght@400;600;700&display=swap';
      document.head.appendChild(link);
    }
    if (!document.getElementById('indrev-css')) {
      const style = document.createElement('style');
      style.id = 'indrev-css';
      style.innerHTML = GLOBAL_CSS + `
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `;
      document.head.appendChild(style);
    }
    if (!document.querySelector('meta[name="viewport"]')) {
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
      document.head.appendChild(meta);
    }
  }, []);

  const renderPage = () => {
    if (page === 'admin') {
      if (!adminAuthed) {
        return (
          <div className="ctr sec" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="neo-card" style={{ background: C.surface, padding: '3rem', width: '100%', maxWidth: '400px', border: `3px solid ${C.border}`, boxShadow: `6px 6px 0 ${C.shadow}` }}>
              <h2 className="ts" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>ADMIN ACCESS</h2>
              <input type="password" placeholder="Enter password..." style={{...INP, marginBottom: '1.5rem'}} onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if (e.target.value === 'indrev2026') setAdminAuthed(true);
                  else alert('Incorrect password.');
                }
              }} />
              <button className="neo-btn" style={{...BTNP, width: '100%'}} onClick={(e) => {
                if (e.target.previousSibling.value === 'indrev2026') setAdminAuthed(true);
                else alert('Incorrect password.');
              }}>UNLOCK</button>
            </div>
          </div>
        );
      }
      return <Admin nav={nav} dbProducts={dbProducts} setDbProducts={setDbProducts} dbSellers={dbSellers} setDbSellers={setDbSellers} orders={orders} setOrders={setOrders} dbUsers={dbUsers} setDbUsers={setDbUsers} featured={featured} setFeatured={setFeatured} />;
    }

    switch(page) {
      case 'home': return <Home nav={nav} dbProducts={dbProducts} featured={featured} setSelProduct={handleSelProduct} addCart={addCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />;
      case 'browse': return <Browse nav={nav} setSelProduct={handleSelProduct} addCart={addCart} recent={recent} dbProducts={dbProducts} wishlist={wishlist} toggleWishlist={toggleWishlist} />;
      case 'categories': return <CategoryList nav={nav} setSelCategory={setSelCategory} />;
      case 'category': return <CategoryDetail c={selCategory} nav={nav} dbProducts={dbProducts} setSelProduct={handleSelProduct} addCart={addCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />;
      case 'how': return <How nav={nav} />;
      case 'wishlist': return <Wishlist nav={nav} dbProducts={dbProducts} wishlist={wishlist} toggleWishlist={toggleWishlist} setSelProduct={handleSelProduct} addCart={addCart} />;
      case 'search': return <SearchResults query={searchQuery} setQuery={setSearchQuery} dbProducts={dbProducts} nav={nav} setSelProduct={handleSelProduct} addCart={addCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />;
      case 'order': return <OrderSummary items={orderItems} nav={nav} />;
      case 'product': return <Product p={selProduct} nav={nav} addCart={addCart} checkout={checkoutProduct} />;
      default: return <Home nav={nav} />;
    }
  };

  return (
    <div style={{ minHeight: '100dvh', display: 'grid', gridTemplateRows: 'auto 1fr auto' }}>
      <Navbar nav={nav} page={page} cartCount={cart.reduce((a,c)=>a+c.qty,0)} openLogin={() => setLoginOpen(true)} openCart={() => setCartOpen(true)} userAuthed={userAuthed} onSearch={onSearch} />
      <main style={{ display: 'flex', flexDirection: 'column' }}>
        {renderPage()}
      </main>
      <Footer nav={nav} />
      {loginOpen && <LoginModal close={() => setLoginOpen(false)} setUserAuthed={setUserAuthed} setMessageModal={setMessageModal} />}
      {cartOpen && <CartDrawer close={() => setCartOpen(false)} cart={cart} checkoutCart={checkoutCart} setCart={setCart} />}
      {messageModal && (
        <ModalWrapper close={() => setMessageModal(null)} title={messageModal.title}>
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <p className="tb" style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>{messageModal.text}</p>
            <button className="neo-btn" style={{...BTNP, padding: '0.5rem 2rem'}} onClick={() => setMessageModal(null)}>CONTINUE</button>
          </div>
        </ModalWrapper>
      )}
    </div>
  );
}

