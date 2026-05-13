import React from 'react';
import { C } from '../../data/theme';

/**
 * INDREV Verified Badge
 */
export const VerBadge = () => (
  <span style={{ 
    display: 'inline-flex', 
    alignItems: 'center', 
    gap: '0.25rem', 
    background: C.yellow, 
    color: C.ink, 
    border: `2px solid ${C.border}`, 
    boxShadow: `2px 2px 0 ${C.shadow}`, 
    borderRadius: 0, 
    padding: '0 0.25rem', 
    fontSize: '0.65rem', 
    fontWeight: 700, 
    letterSpacing: '0.05em', 
    lineHeight: 1.2 
  }}>
    <span style={{ fontSize: '0.8rem', lineHeight: 1 }}>✓</span> VERIFIED
  </span>
);

export default VerBadge;
