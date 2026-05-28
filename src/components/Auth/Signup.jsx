import React, { useState } from 'react';

// ── Icons ─────────────────────────────────────────
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
    <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
    <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
    <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z"/>
  </svg>
);

const AppleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg">
    <path fill="#000" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.1-44.6-35.9-2.8-74.3 22.7-93.1 22.7-18.9 0-50.1-22.3-80.4-21.7-41 1-80.8 24-102.7 61.6-44.4 75.8-12.2 188.4 30.8 250.7 21.2 30.6 46.2 64.9 79.1 63.8 31.8-1.1 43.6-20.7 82.2-20.7 38.6 0 49.3 20.7 82.7 20 34.6-.6 56.4-32.3 77.2-62.8 24.3-35.7 34.2-70.3 35-72.1-1.3-.5-76.3-29.2-76.7-112.1zM232.8 72c18.5-22.2 30.9-53 27.5-83.6-25.7 1-57.1 17.2-76 39.4-15.8 18.5-29.8 49.7-25.7 79.6 28.7 2.2 55.7-13.3 74.2-35.4z"/>
  </svg>
);

const EyeIcon = ({ closed }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter">
    {closed ? (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </>
    ) : (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    )}
  </svg>
);

// ── FloatingField helper ──────────────────────────────────
const FloatingField = ({ id, label, type = 'text', value, onChange, autoComplete, error, children }) => (
  <div className="auth-field">
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder=" "
      autoComplete={autoComplete}
      className={`auth-input${error ? ' auth-input--error' : ''}`}
      aria-label={label}
      aria-invalid={!!error}
    />
    <label className="auth-label" htmlFor={id}>{label}</label>
    {children}
    {error && <span className="auth-error" role="alert">{error}</span>}
  </div>
);

// ── Password strength meter ───────────────────────────────
const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'];
const strengthColor = ['', '#FF3131', '#FFE500', '#1A1AFF', '#00C853'];

const getStrength = (pw) => {
  let s = 0;
  if (pw.length >= 8)            s++;
  if (/[A-Z]/.test(pw))         s++;
  if (/[0-9]/.test(pw))         s++;
  if (/[^A-Za-z0-9]/.test(pw))  s++;
  return s;
};

const PasswordStrength = ({ password }) => {
  if (!password) return null;
  const s = getStrength(password);
  return (
    <div style={{ marginTop: '-0.75rem', marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', gap: '4px', marginBottom: '6px' }}>
        {[1,2,3,4].map(i => (
          <div
            key={i}
            style={{
              flex: 1,
              height: '4px',
              border: `1px solid #0D0D0D`,
              background: i <= s ? strengthColor[s] : '#fff',
              transition: 'background 0.3s ease',
            }}
          />
        ))}
      </div>
      <span style={{
        fontSize: '0.75rem',
        color: '#0D0D0D',
        fontWeight: 800,
      }}>
        {strengthLabel[s]}
      </span>
    </div>
  );
};

export default function Signup({ onSwitchToLogin, onClose }) {
  const [fullName, setFullName]   = useState('');
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [showPassword, setShowPw] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [errors, setErrors]       = useState({});
  const [shake, setShake]           = useState(false);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const validate = () => {
    const e = {};
    if (!fullName.trim())                        e.fullName = 'Full name is required.';
    if (!email.trim())                           e.email    = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(email))       e.email    = 'Enter a valid email.';
    if (!password)                               e.password = 'Password is required.';
    else if (password.length < 8)               e.password = 'Use at least 8 characters.';
    else if (getStrength(password) < 2)         e.password = 'Password is too weak.';
    return e;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { 
      setErrors(errs); 
      triggerShake();
      return; 
    }
    setErrors({});
    setLoading(true);

    try {
      // TODO: Connect to backend API here
      await new Promise(r => setTimeout(r, 1400));

      onClose?.();
    } catch (err) {
      setErrors({ form: 'Sign up failed. Please try again.' });
      triggerShake();
    } finally {
      setLoading(false);
    }
  };

  const handleSocial = (provider) => {
    // TODO: Implement Social OAuth
    console.info(`[Auth] ${provider} signup triggered.`);
  };

  return (
    <div className={shake ? 'errorShake' : ''} style={{ position: 'relative' }}>
      {onClose && (
        <button className="auth-close" onClick={onClose} aria-label="Close signup">×</button>
      )}

      <h1 className="auth-heading">Create Account</h1>
      <p className="auth-subheading">Join the definitive marketplace for luxury fashion.</p>

      {errors.form && <span className="auth-error" style={{ marginBottom: '1rem' }} role="alert">{errors.form}</span>}

      <form onSubmit={handleSignup} noValidate>
        <FloatingField
          id="signup-name"
          label="Full name"
          type="text"
          value={fullName}
          onChange={e => setFullName(e.target.value)}
          autoComplete="name"
          error={errors.fullName}
        />

        <FloatingField
          id="signup-email"
          label="Email address"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoComplete="email"
          error={errors.email}
        />

        <FloatingField
          id="signup-password"
          label="Password (min. 8 characters)"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoComplete="new-password"
          error={errors.password}
        >
          <button 
            type="button" 
            className="auth-pw-toggle" 
            onClick={() => setShowPw(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <EyeIcon closed={!showPassword} />
          </button>
        </FloatingField>

        <PasswordStrength password={password} />

        <button
          type="submit"
          className="auth-btn-primary"
          disabled={loading}
        >
          {loading && <span className="auth-spinner" />}
          {loading ? 'Processing…' : 'CREATE ACCOUNT'}
        </button>
      </form>

      <div className="auth-divider">or continue with</div>

      <div className="auth-social-row">
        <button type="button" className="auth-btn-social" onClick={() => handleSocial('Google')}>
          <GoogleIcon /> Google
        </button>
        <button type="button" className="auth-btn-social" onClick={() => handleSocial('Apple')}>
          <AppleIcon /> Apple
        </button>
      </div>

      <p className="auth-terms">
        By signing up you agree to our{' '}
        <a href="#terms" onClick={e => e.preventDefault()}>Terms of Service</a>
        {' '}and{' '}
        <a href="#privacy" onClick={e => e.preventDefault()}>Privacy Policy</a>.
      </p>

      <p className="auth-switch">
        Already have an account?{' '}
        <button type="button" onClick={onSwitchToLogin}>SIGN IN</button>
      </p>
    </div>
  );
}
