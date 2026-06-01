/* ============================================================
   INDREV Design System — Theme & Constants
   ============================================================ */

export const C = {
  // Backgrounds
  bg: "#F5F0E8", // Warm off-white / aged paper
  surface: "#FFFEF9", // Card surface
  dark: "#0D0D0D", // Near-black
  
  // Primary accent
  yellow: "#FFE500", 
  yellowDk: "#E5CE00", 
  
  // Secondary accents
  red: "#FF3131", 
  blue: "#1A1AFF", 
  green: "#00C853", 
  
  // Text
  ink: "#0D0D0D", 
  muted: "#555555", 
  mutedLo: "#999999", 
  
  // Borders & shadows
  border: "#0D0D0D", 
  shadow: "#0D0D0D",  // Hard offset, zero blur
};

export const ICONS = {
  cart: (s=24) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6zM3 6h18M16 10a4 4 0 01-8 0" /></svg>,
  search: (s=24) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>,
  heart: (s=24) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78v0z" /></svg>,
  user: (s=24) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
  menu: (s=24) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter"><path d="M3 12h18M3 6h18M3 18h18" /></svg>,
  close: (s=24) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter"><path d="M18 6L6 18M6 6l12 12" /></svg>,
  eye: (s=24) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>,
};

export const TAG_COLORS = {
  New: C.green,
  Rare: C.blue,
  Featured: C.yellow,
  Classic: C.red
};

export const GLOBAL_CSS = `
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

  .neo-btn, .neo-card, .neo-card-sm {
    transition: transform 0.15s ease, box-shadow 0.15s ease;
    cursor: pointer;
    border: 3px solid ${C.border};
  }
  
  @media(hover: hover) {
    .neo-btn:hover { transform: translate(-2px, -2px); box-shadow: 6px 6px 0 ${C.shadow}; }
    .neo-card:hover, .neo-card-sm:hover { transform: translate(-2px, -2px); box-shadow: 8px 8px 0 ${C.shadow}; }
  }
  
  .neo-btn:active, .neo-card:active, .neo-card-sm:active {
    transform: translate(4px, 4px) !important;
    box-shadow: 0 0 0 ${C.shadow} !important;
  }

  .g-prod { display: grid; gap: 0.75rem; grid-template-columns: repeat(2, 1fr); }
  @container (min-width: 600px) { .g-prod { grid-template-columns: repeat(2, 1fr); gap: 1.5rem; } }
  @container (min-width: 900px) { .g-prod { grid-template-columns: repeat(3, 1fr); gap: 1.5rem; } }
  @container (min-width: 1200px) { .g-prod { grid-template-columns: repeat(4, 1fr); gap: 2rem; } }
  
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
  @container (min-width: 768px) { .g-detail { grid-template-columns: 1fr 1fr; align-items: start; } }

  .th { font-size: clamp(1.5rem, 5vw + 1rem, 4rem); line-height: 1; margin: 0; }
  .ts { font-size: clamp(1.5rem, 4vw + 0.5rem, 3.5rem); line-height: 1.1; margin: 0; }
  .tp { font-size: clamp(2rem, 5vw + 0.5rem, 4rem); line-height: 1; margin: 0; }
  .tc { font-size: clamp(1.25rem, 2vw + 0.5rem, 1.75rem); line-height: 1.1; margin: 0; }
  .td { font-size: clamp(1.5rem, 3vw + 0.5rem, 3rem); line-height: 1.1; margin: 0; }
  .tb { font-size: clamp(1rem, 1vw + 0.5rem, 1.125rem); line-height: 1.5; margin: 0; }
  .tsm { font-size: clamp(0.75rem, 0.5vw + 0.5rem, 0.875rem); margin: 0; }
  .label-sm { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; }
  
  @media (hover: none) { 
    .atc-btn, .quick-view-btn { opacity: 1 !important; visibility: visible !important; } 
  }
  @media (hover: hover) {
    .quick-view-btn { opacity: 0; visibility: hidden; transition: all 0.2s ease; }
    .neo-card:hover .quick-view-btn { opacity: 1; visibility: visible; }
  }

  .gender-strip { scroll-behavior: smooth; }
  .gender-strip::-webkit-scrollbar { display: none; }

  .nav-desktop { display: none !important; }
  .nav-mobile { display: flex !important; align-items: center; }
  .tab-bar { display: flex; position: fixed; bottom: 0; left: 0; right: 0; background: ${C.surface}; border-top: 3px solid ${C.border}; z-index: 100; height: 60px; justify-content: space-around; align-items: center; }
  .tab-bar-spacer { height: 60px; }
  @media(min-width: 768px) {
    .nav-desktop { display: flex !important; }
    .nav-mobile, .tab-bar, .tab-bar-spacer { display: none !important; }
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
  @keyframes slideInLeft {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
  }
  @keyframes slideUp {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Mobile Layout Fixes & Extensions */
  .neo-card { width: 100%; max-width: 100%; }
  @media (max-width: 767px) {
    .stripe-bg { display: none !important; }
    .hero-buttons {
      display: flex !important;
      flex-direction: column !important;
      gap: 10px !important;
      width: 100% !important;
    }
    .hero-buttons button {
      width: 100% !important;
      box-sizing: border-box !important;
      font-size: 1rem !important;
      padding: 0.875rem 1.5rem !important;
    }
    .sec { padding: 2rem 0 !important; }
  }

  /* Sticky Action Bar at bottom on Mobile Scroll */
  .sticky-bottom-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #FFFEF9;
    border-top: 3px solid #0D0D0D;
    padding: 0.75rem 1rem;
    z-index: 1001;
    box-shadow: 0 -4px 10px rgba(0,0,0,0.15);
    display: flex;
    align-items: center;
    justify-content: space-between;
    animation: slideUp 0.3s ease-out;
  }

  /* Dashed Trust Boxes */
  .dashed-trust-box {
    border: 3px dashed #0D0D0D;
    padding: 1.25rem;
    background: #FFFEF9;
    margin-top: 1.5rem;
  }

  /* Marquee Banner */
  .marquee-container {
    overflow: hidden;
    white-space: nowrap;
    background: #5C00E6;
    color: #FFFFFF;
    font-weight: 700;
    font-size: 0.8rem;
    padding: 0.5rem 0;
    border-bottom: 3px solid #0D0D0D;
    letter-spacing: 0.05em;
  }
  .marquee-text {
    display: inline-block;
    padding-left: 100%;
    animation: marquee 25s linear infinite;
  }
  @keyframes marquee {
    0% { transform: translate(0, 0); }
    100% { transform: translate(-100%, 0); }
  }

`;

// Shared reusable button styles
export const BTNP = { background: C.yellow, color: C.ink, border: `3px solid ${C.border}`, boxShadow: `4px 4px 0 ${C.shadow}`, borderRadius: 0, padding: '0.75rem 1.5rem', fontWeight: 600, fontSize: '1rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' };
export const BTNG = { background: C.surface, color: C.ink, border: `3px solid ${C.border}`, boxShadow: `4px 4px 0 ${C.shadow}`, borderRadius: 0, padding: '0.75rem 1.5rem', fontWeight: 600, fontSize: '1rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' };
export const BTND = { background: C.red, color: "#fff", border: `3px solid ${C.border}`, boxShadow: `4px 4px 0 ${C.shadow}`, borderRadius: 0, padding: '0.75rem 1.5rem', fontWeight: 600, fontSize: '1rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' };
export const INP = { background: "#fff", color: C.ink, border: `3px solid ${C.border}`, borderRadius: 0, padding: '0.75rem', width: '100%', outline: 'none' };