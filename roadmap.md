# INDREV Project Roadmap

## Phase 1 — Modular Architecture & Foundation [DONE]
- [x] Extraction of monolithic `indrev.jsx` into components/pages
- [x] Establishment of central theme and mockData
- [x] Refined neobrutalist design system
- [x] Environment variables for configuration

## Phase 2 — Shopping Experience [DONE]
- [x] Wishlist / saved items system
- [x] Cart qty merging and stepper controls
- [x] Order summary (checkout preview) screen
- [x] LocalStorage persistence for all user states

## Phase 3 — Discovery & UI [DONE]
- [x] Full search results page with real-time filtering
- [x] Sort controls on Browse (Price Low/High, Newest)
- [x] Recently viewed tracking (last 4 items)
- [x] Product reviews and detailed meta displays
- [x] Authentication certificate and Size guide modals

## Phase 4 — Admin Panel [DONE]
- [x] Secure password gate (.env based)
- [x] Dashboard with revenue and inventory overview
- [x] Products CRUD (Add/Edit/Delete/Hide)
- [x] Orders management (Status updates)
- [x] User access control (Ban/Unban)
- [x] Homepage content management (Featured slots)

## Phase 5 — Content Enrichment [IN PROGRESS]
- [ ] Real product images (high-quality Unsplash URLs)
- [ ] Size guide specific data refinement
- [ ] Dynamic category SEO descriptions

## Phase 6 — Backend Integration
- [ ] Supabase / Firebase setup
- [ ] Replace mock arrays with real-time queries
- [ ] Server-side Auth + Role-based access (RBAC)
- [ ] Permanent database persistence for orders/wishlist

## Phase 7 — Payments & Launch
- [ ] Real Payment Gateway (Razorpay / Stripe)
- [ ] Order confirmation emails / SMS
- [ ] Performance optimization & SEO Meta tags
- [ ] Production deployment (Vercel / Netlify)