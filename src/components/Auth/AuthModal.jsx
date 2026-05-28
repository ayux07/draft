import React from 'react';
import LoginComponent  from './Login';
import SignupComponent from './Signup';
import '../../styles/auth.css';

/**
 * Auth Switcher Modal (wraps Login/Signup components with neon overlay)
 */
export const AuthModal = ({ close, mode, setMode }) => (
  <div className="auth-overlay" onClick={close}>
    <div className="auth-card" onClick={e => e.stopPropagation()}>
      
      {/* Left Editorial Pane */}
      <div className="auth-pane-image">
        <img 
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80" 
          alt="Fashion Model"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div className="halftone" style={{ position: 'absolute', inset: 0, opacity: 0.5 }}></div>
        
        <div className="auth-brand">
          <span className="auth-brand-logo">INDREV</span>
        </div>

        <div className="auth-image-text">
          <h2>THE EDIT.</h2>
          <p>Join the definitive marketplace for authenticated luxury & rare archive fashion.</p>
        </div>
      </div>

      {/* Right Form Pane */}
      <div className="auth-pane-form">
        {mode === 'login'
          ? <LoginComponent
              onClose={close}
              onSwitchToSignup={() => setMode('signup')}
            />
          : <SignupComponent
              onClose={close}
              onSwitchToLogin={() => setMode('login')}
            />
        }
      </div>
    </div>
  </div>
);

export default AuthModal;
