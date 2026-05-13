import React from 'react';
import { C } from '../data/theme';
import { CATEGORY_DIRECTORY } from '../data/mockData';

export const CategoryList = ({ nav, setSelCategory }) => (
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

export default CategoryList;
