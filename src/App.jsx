import React, { useState, useEffect, useCallback } from 'react';

// Data & Theme
import { C, GLOBAL_CSS, BTNP, INP } from './data/theme';
import { INITIAL_PRODUCTS, INITIAL_USERS, INITIAL_SELLERS } from './data/mockData';

// Utils
import { uuid } from './utils/formatters';

// Common Components
import ModalWrapper from './components/common/ModalWrapper';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import AuthModal from './components/Auth/AuthModal';

// Pages
import Home from './pages/Home';
import Browse from './pages/Browse';
import CategoryList from './pages/CategoryList';
import CategoryDetail from './pages/CategoryDetail';
import ProductDetail from './pages/ProductDetail';
import Wishlist from './pages/Wishlist';
import SearchResults from './pages/SearchResults';
import How from './pages/How';
import OrderSummary from './pages/OrderSummary';
import Admin from './pages/Admin';

export default function App() {
  const [page, setPage] = useState('home');
  const [selProduct, setSelProduct] = useState(null);
  const [selCategory, setSelCategory] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [authMode, setAuthMode]   = useState('login'); // 'login' | 'signup'
  const [messageModal, setMessageModal] = useState(null);
  const [userAuthed, setUserAuthed] = useState(false);
  const [recent, setRecent] = useState([]);
  const [dbProducts, setDbProducts] = useState(INITIAL_PRODUCTS);
  const [dbSellers, setDbSellers]   = useState(INITIAL_SELLERS);
  const [adminAuthed, setAdminAuthed] = useState(false);
  const [orders, setOrders] = useState([]);
  const [dbUsers, setDbUsers] = useState(INITIAL_USERS);
  const [featured, setFeatured] = useState([101, 202, 301, 401, 501, 601, 102, 203, 305]);
  const [orderItems, setOrderItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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
  }, []);

  const addCart = useCallback((product) => {
    setCart(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) return prev.map(p => p.id === product.id ? {...p, qty: (p.qty || 1) + 1} : p);
      return [...prev, { ...product, qty: 1 }];
    });
    setCartOpen(true);
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
                const input = e.target.previousSibling;
                if (input.value === 'indrev2026') setAdminAuthed(true);
                else alert('Incorrect password.');
              }}>UNLOCK</button>
            </div>
          </div>
        );
      }
      return <Admin nav={nav} dbProducts={dbProducts} setDbProducts={setDbProducts} orders={orders} setOrders={setOrders} dbUsers={dbUsers} setDbUsers={setDbUsers} featured={featured} setFeatured={setFeatured} />;
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
      case 'product': return <ProductDetail p={selProduct} nav={nav} addCart={addCart} checkout={checkoutProduct} />;
      default: return <Home nav={nav} />;
    }
  };

  return (
    <div style={{ minHeight: '100dvh', display: 'grid', gridTemplateRows: 'auto 1fr auto' }}>
      <Navbar nav={nav} page={page} cartCount={cart.reduce((a,c)=>a+c.qty,0)} openLogin={() => { setAuthMode('login'); setLoginOpen(true); }} openCart={() => setCartOpen(true)} userAuthed={userAuthed} onSearch={onSearch} />
      <main style={{ display: 'flex', flexDirection: 'column' }}>
        {renderPage()}
      </main>
      <Footer nav={nav} />
      {loginOpen && (
        <AuthModal
          close={() => setLoginOpen(false)}
          mode={authMode}
          setMode={setAuthMode}
        />
      )}
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
