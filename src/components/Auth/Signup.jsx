import React, { useState, useRef } from 'react';
import '../../styles/auth.css';

// ── Google G Icon ─────────────────────────────────────────
const GoogleIcon = () => (
  <svg className="auth-google-icon" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
    <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
    <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
    <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z"/>
  </svg>
);

// ── FloatingField helper ──────────────────────────────────
const FloatingField = ({ id, label, type = 'text', value, onChange, autoComplete, error }) => (
  <div className="auth-field">
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder=" "
      autoComplete={autoComplete}
      className="auth-input"
      aria-label={label}
      aria-invalid={!!error}
    />
    <label className="auth-label" htmlFor={id}>{label}</label>
    {error && <span className="auth-error" role="alert">{error}</span>}
  </div>
);

// ── Password strength meter ───────────────────────────────
const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'];
const strengthColor = ['', '#ff4d4d', '#ffaa00', '#7ec8e3', '#00c853'];

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
    <div style={{ marginTop: '-0.75rem', marginBottom: '1rem' }}>
      <div style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
        {[1,2,3,4].map(i => (
          <div
            key={i}
            style={{
              flex: 1,
              height: '3px',
              borderRadius: '2px',
              background: i <= s ? strengthColor[s] : 'rgba(255,255,255,0.1)',
              transition: 'background 0.3s ease',
            }}
          />
        ))}
      </div>
      <span style={{
        fontSize: '0.72rem',
        color: strengthColor[s],
        fontFamily: 'Inter, sans-serif',
        transition: 'color 0.3s ease',
      }}>
        {strengthLabel[s]}
      </span>
    </div>
  );
};

// ══════════════════════════════════════════════════════════
//  Signup Component
// ══════════════════════════════════════════════════════════
export default function Signup({ onSwitchToLogin, onClose }) {
  const [fullName, setFullName]   = useState('');
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [loading, setLoading]     = useState(false);
  const [errors, setErrors]       = useState({});
  const [switching, setSwitching] = useState(false);
  const cardRef                   = useRef(null);

  // ── Validation ────────────────────────────────────────
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

  // ── Handle signup submit ──────────────────────────────
  const handleSignup = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);

    try {
      // TODO: Connect to backend API here
      // Example: await api.post('/auth/signup', { fullName, email, password });
      await new Promise(r => setTimeout(r, 1400)); // simulated delay

      onClose?.(); // close modal on success
    } catch (err) {
      setErrors({ form: 'Sign up failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  // ── Handle Google OAuth ───────────────────────────────
  const handleGoogle = () => {
    // TODO: Implement Google OAuth (e.g. Firebase signInWithPopup, Supabase OAuth)
    console.info('[Auth] Google signup triggered — not yet wired.');
  };

  // ── Switch to Login with animation ───────────────────
  const handleSwitch = () => {
    setSwitching(true);
    setTimeout(() => {
      setSwitching(false);
      onSwitchToLogin();
    }, 280);
  };

  return (
    <div
      ref={cardRef}
      className={`auth-card${switching ? ' switching' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Sign up"
    >
      {/* Close */}
      {onClose && (
        <button className="auth-close" onClick={onClose} aria-label="Close signup">×</button>
      )}

      {/* Brand */}
      <div className="auth-brand">
        <span className="auth-brand-logo">INDREV</span>
      </div>

      <h1 className="auth-heading">Create an account</h1>
      <p className="auth-subheading">Join the most curated fashion marketplace</p>

      {/* Global form error */}
      {errors.form && <span className="auth-error" role="alert">{errors.form}</span>}

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
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoComplete="new-password"
          error={errors.password}
        />

        <PasswordStrength password={password} />

        <button
          type="submit"
          className="auth-btn-primary"
          disabled={loading}
        >
          {loading && <span className="auth-spinner" />}
          {loading ? 'Creating account…' : 'Create Account'}
        </button>
      </form>

      <div className="auth-or">or</div>

      <button type="button" className="auth-btn-google" onClick={handleGoogle}>
        <GoogleIcon />
        Sign up with Google
      </button>

      <p className="auth-terms">
        By signing up you agree to our{' '}
        <a href="#terms" onClick={e => e.preventDefault()}>Terms of Service</a>
        {' '}and{' '}
        <a href="#privacy" onClick={e => e.preventDefault()}>Privacy Policy</a>.
      </p>

      <p className="auth-switch">
        Already have an account?{' '}
        <button type="button" onClick={handleSwitch}>Sign in</button>
      </p>
    </div>
  );
}
