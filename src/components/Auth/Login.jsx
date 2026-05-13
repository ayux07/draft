import React, { useState, useEffect, useRef } from 'react';
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
      className={`auth-input${error ? ' auth-input--error' : ''}`}
      aria-label={label}
      aria-invalid={!!error}
    />
    <label className="auth-label" htmlFor={id}>{label}</label>
    {error && <span className="auth-error" role="alert">{error}</span>}
  </div>
);

// ══════════════════════════════════════════════════════════
//  Login Component
// ══════════════════════════════════════════════════════════
export default function Login({ onSwitchToSignup, onClose }) {
  const [email, setEmail]           = useState('');
  const [password, setPassword]     = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading]       = useState(false);
  const [errors, setErrors]         = useState({});
  const [switching, setSwitching]   = useState(false);
  const cardRef                     = useRef(null);

  // ── Auto-fill remembered email on mount ───────────────
  useEffect(() => {
    const saved = localStorage.getItem('indrev_remembered_email');
    if (saved) {
      setEmail(saved);
      setRememberMe(true);
    }
  }, []);

  // ── Validation ────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!email.trim())                        e.email    = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(email))    e.email    = 'Enter a valid email.';
    if (!password)                            e.password = 'Password is required.';
    else if (password.length < 6)            e.password = 'At least 6 characters required.';
    return e;
  };

  // ── Handle login submit ───────────────────────────────
  const handleLogin = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);

    try {
      // TODO: Connect to backend API here
      // Example: await api.post('/auth/login', { email, password });
      await new Promise(r => setTimeout(r, 1200)); // simulated delay

      if (rememberMe) {
        localStorage.setItem('indrev_remembered_email', email);
      } else {
        localStorage.removeItem('indrev_remembered_email');
      }

      onClose?.(); // close modal on success
    } catch (err) {
      setErrors({ form: 'Invalid credentials. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  // ── Handle Google OAuth ───────────────────────────────
  const handleGoogle = () => {
    // TODO: Implement Google OAuth (e.g. Firebase signInWithPopup, Supabase OAuth)
    console.info('[Auth] Google login triggered — not yet wired.');
  };

  // ── Switch to Signup with animation ──────────────────
  const handleSwitch = () => {
    setSwitching(true);
    setTimeout(() => {
      setSwitching(false);
      onSwitchToSignup();
    }, 280);
  };

  return (
    <div
      ref={cardRef}
      className={`auth-card${switching ? ' switching' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Login"
    >
      {/* Close */}
      {onClose && (
        <button className="auth-close" onClick={onClose} aria-label="Close login">×</button>
      )}

      {/* Brand */}
      <div className="auth-brand">
        <span className="auth-brand-logo">INDREV</span>
      </div>

      <h1 className="auth-heading">Welcome back</h1>
      <p className="auth-subheading">Sign in to your account to continue</p>

      {/* Global form error */}
      {errors.form && <span className="auth-error" role="alert">{errors.form}</span>}

      <form onSubmit={handleLogin} noValidate>
        <FloatingField
          id="login-email"
          label="Email address"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoComplete="email"
          error={errors.email}
        />

        <FloatingField
          id="login-password"
          label="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoComplete="current-password"
          error={errors.password}
        />

        {/* Remember me + Forgot password */}
        <div className="auth-row">
          <label className="auth-checkbox-label">
            <input
              type="checkbox"
              className="auth-checkbox"
              checked={rememberMe}
              onChange={e => setRememberMe(e.target.checked)}
            />
            Remember me
          </label>
          <button type="button" className="auth-link">
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          className="auth-btn-primary"
          disabled={loading}
        >
          {loading && <span className="auth-spinner" />}
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>

      <div className="auth-or">or</div>

      <button type="button" className="auth-btn-google" onClick={handleGoogle}>
        <GoogleIcon />
        Continue with Google
      </button>

      <p className="auth-switch">
        Don't have an account?{' '}
        <button type="button" onClick={handleSwitch}>Create one</button>
      </p>
    </div>
  );
}
