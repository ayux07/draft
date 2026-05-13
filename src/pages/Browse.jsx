import React, { useState, useMemo } from 'react';
import { C, BTNG, BTNP, INP } from '../data/theme';
import { GENDERS, CATS_BY_GENDER, CONDITIONS } from '../data/mockData';
import ProductCard from '../components/ProductCard';
import { fmt } from '../utils/formatters';

export const Browse = ({ nav, setSelProduct, addCart, recent, dbProducts, wishlist, toggleWishlist }) => {
  const [filterModal, setFilterModal] = useState(false);
  const [expanded, setExpanded] = useState({ dep: true, cat: false, cond: false, price: false });
  const [tab, setTab] = useState('All');
  const [cats, setCats] = useState([]);
  const [conds, setConds] = useState([]);
  const [maxP, setMaxP] = useState(500000);
  const [sort, setSort] = useState('newest');
  const [search, setSearch] = useState('');
  const [saleActive, setSaleActive] = useState(false);

  const toggleExp = (k) => setExpanded(p => ({ ...p, [k]: !p[k] }));

  const toggleCat = (c) => setCats(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  const toggleCond = (c) => setConds(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);

  const filtered = useMemo(() => {
    let res = dbProducts.filter(p => !p.hidden);
    if (tab !== 'All') res = res.filter(p => p.gender === tab);
    if (cats.length > 0) res = res.filter(p => cats.includes(p.cat));
    if (conds.length > 0) res = res.filter(p => conds.includes(p.cond));
    res = res.filter(p => p.price <= maxP);
    if (saleActive) res = res.filter(p => p.tag === 'New');
    
    if (search.trim()) {
      const q = search.toLowerCase();
      res = res.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
    }
    
    let sorted = [...res];
    if (sort === 'low') sorted.sort((a,b) => a.price - b.price);
    else if (sort === 'high') sorted.sort((a,b) => b.price - a.price);
    else sorted.sort((a,b) => a.id - b.id); // 'newest' proxy
    
    return sorted;
  }, [tab, cats, conds, maxP, sort, search, saleActive, dbProducts]);

  const activeCats = tab === 'All' ? Object.values(CATS_BY_GENDER).flat().filter((v,i,a) => a.indexOf(v)===i) : CATS_BY_GENDER[tab] || [];

  return (
    <div key="browse" style={{ animation: 'fadeIn 0.3s ease', background: C.bg, flex: 1 }}>
      <div className="ctr sec">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
          <h1 className="tp" style={{ margin: 0 }}>THE EDIT</h1>
        </div>

        {/* Gender Tab Strip */}
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
                <div style={{ padding: '1.5rem', borderBottom: `3px solid ${C.border}` }}>
                  <input type="text" placeholder="Search Name or Brand..." style={{...INP, padding: '0.75rem'}} value={search} onChange={e => setSearch(e.target.value)} />
                </div>

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

        {recent && recent.length > 0 && (
          <div style={{ marginTop: '5rem', paddingTop: '3rem', borderTop: `4px solid ${C.border}` }}>
            <h2 className="ts" style={{ marginBottom: '2rem' }}>RECENTLY VIEWED</h2>
            <div className="g-prod">
              {recent.map(p => <ProductCard key={`rec-${p.id}`} p={p} nav={nav} setSelProduct={setSelProduct} addCart={addCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
