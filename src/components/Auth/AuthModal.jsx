import React from 'react';
import LoginComponent  from './Login';
import SignupComponent from './Signup';

/**
 * Auth Switcher Modal (wraps Login/Signup components with neon overlay)
 */
export const AuthModal = ({ close, mode, setMode }) => (
  <div className="auth-overlay" onClick={close}>
    <div onClick={e => e.stopPropagation()}>
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
);

export default AuthModal;
