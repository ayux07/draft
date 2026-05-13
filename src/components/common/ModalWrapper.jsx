import React from 'react';
import { C } from '../../data/theme';

/**
 * Standard INDREV Modal with Neobrutalist styling
 */
export const ModalWrapper = ({ close, title, children }) => (
  <div 
    style={{ 
      position: 'fixed', 
      inset: 0, 
      background: 'rgba(245, 240, 232, 0.9)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      zIndex: 1000, 
      padding: '1rem' 
    }} 
    onClick={close}
  >
    <div 
      className="neo-card" 
      onClick={e => e.stopPropagation()} 
      style={{ 
        background: C.surface, 
        width: '100%', 
        maxWidth: '500px', 
        border: `3px solid ${C.border}`, 
        boxShadow: `6px 6px 0 ${C.shadow}`, 
        display: 'flex', 
        flexDirection: 'column', 
        maxHeight: '90vh' 
      }}
    >
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        borderBottom: `3px solid ${C.border}`, 
        padding: '1rem 1.5rem', 
        background: C.yellow 
      }}>
        <h3 className="tc" style={{ margin: 0 }}>{title}</h3>
        <button 
          onClick={close} 
          style={{ 
            background: 'none', 
            border: 'none', 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            cursor: 'pointer', 
            color: C.ink 
          }}
        >
          ×
        </button>
      </div>
      <div style={{ padding: '1.5rem', overflowY: 'auto' }}>
        {children}
      </div>
    </div>
  </div>
);

export default ModalWrapper;
