import React, { useState } from 'react';
import Button from '../components/common/Button.jsx';
import { getUsers, registerUserWithCode, getSchools } from '../services/authStore.js';
import { verifyAndConsumeCode } from '../services/inviteService.js';
import { ROLES } from '../config/rbacRules.js';

export default function Login({ onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [googlePrompt, setGooglePrompt] = useState(false);
  const [googleSecretCode, setGoogleSecretCode] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    secretCode: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    const users = getUsers();
    const schools = getSchools();

    if (isSignUp) {
      if (!formData.fullName.trim() || !formData.email.trim() || !formData.password || !formData.secretCode.trim()) {
        setError('Name, Email, Password, and Secret Authorization Code are mandatory.');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match.');
        return;
      }

      setLoading(true);
      setTimeout(() => {
        const verifyRes = verifyAndConsumeCode(formData.secretCode, formData.email.trim());
        if (!verifyRes.success) {
          setError(verifyRes.message);
          setLoading(false);
          return;
        }

        const invite = verifyRes.data;
        registerUserWithCode({
          fullName: formData.fullName.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim(),
          password: formData.password,
          role: invite.assignedRole,
          schoolId: invite.schoolId,
          schoolName: invite.schoolName,
          department: invite.department
        });

        setLoading(false);
        setSuccessMsg(`Account authorized for ${invite.schoolName}! Please sign in.`);
        setIsSignUp(false);
        setFormData({ fullName: '', email: '', phone: '', password: '', confirmPassword: '', secretCode: '' });
      }, 500);
      return;
    }

    // Normal Login
    if (!formData.email.trim() || !formData.password) {
      setError('Please provide Email and Password.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const user = users.find((u) => u.email.toLowerCase() === formData.email.trim().toLowerCase());

      if (!user) {
        setError('No account found with this Email.');
        return;
      }

      if (user.password !== formData.password) {
        setError('Incorrect password.');
        return;
      }

      // Check if school is suspended
      const linkedSchool = schools.find((s) => s.id === user.schoolId);
      if (linkedSchool && linkedSchool.status === 'Suspended') {
        setError(`Access Blocked: ${linkedSchool.name} is currently suspended. (${linkedSchool.suspendReason || "Contact Administrator"})`);
        return;
      }

      if (user.status === 'Suspended') {
        setError('Your individual faculty account is suspended by school authorities.');
        return;
      }

      onLoginSuccess(user);
    }, 400);
  };

  // Google Sign-In with Secret Code
  const handleGoogleAuth = () => {
    setError('');
    const googleUserEmail = "nitin.google@school.edu"; // Simulated Google Account
    const users = getUsers();
    const existing = users.find((u) => u.email.toLowerCase() === googleUserEmail);

    if (existing) {
      onLoginSuccess(existing);
      return;
    }

    // If new user via Google, ask for Secret Code
    setGooglePrompt(true);
  };

  const handleVerifyGoogleToken = (e) => {
    e.preventDefault();
    if (!googleSecretCode.trim()) {
      setError('Secret code is required to link institutional Google ID.');
      return;
    }

    const verifyRes = verifyAndConsumeCode(googleSecretCode, "nitin.google@school.edu");
    if (!verifyRes.success) {
      setError(verifyRes.message);
      return;
    }

    const invite = verifyRes.data;
    const newGoogleUser = {
      fullName: "Nitin Tripathi (Google Verified)",
      email: "nitin.google@school.edu",
      role: invite.assignedRole,
      schoolId: invite.schoolId,
      schoolName: invite.schoolName,
      department: invite.department
    };

    registerUserWithCode(newGoogleUser);
    onLoginSuccess(newGoogleUser);
  };

  return (
    <div className="min-h-screen w-full flex bg-slate-950 text-slate-100">
      {/* Left Info Column */}
      <div className="hidden lg:flex lg:w-1/2 p-12 bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 border-r border-slate-800 flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-indigo-600/30">P</div>
            <span className="text-xl font-bold tracking-wide">PaperPilot <span className="text-indigo-400">Enterprise</span></span>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 border border-indigo-500/30 text-indigo-300">
            RBAC Multi-Tenant Platform
          </span>
          <h1 className="text-3xl font-extrabold mt-4 text-white leading-snug">
            Protected Academic Governance & Question Architecture.
          </h1>
          <p className="text-sm text-slate-400 mt-2 leading-relaxed">
            Multi-tier access: Developers, Principals, Vice Principals, and Subject Faculty.
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-3 text-xs">
          <p className="font-bold text-indigo-300 uppercase tracking-wider">Demo Accounts (For Testing):</p>
          <div className="space-y-1 font-mono text-slate-300">
            <p>• Developer: <strong className="text-white">developer@paperpilot.io</strong> | DevMaster@2026</p>
            <p>• Principal: <strong className="text-white">principal@arden.edu</strong> | Principal@123</p>
            <p>• Teacher: <strong className="text-white">alok.cs@arden.edu</strong> | Faculty@123</p>
          </div>
        </div>

        <div className="text-xs text-slate-500">
          © 2026 Academic Evaluation Framework. Single-use invitation tokens active.
        </div>
      </div>

      {/* Right Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-950">
        <div className="w-full max-w-md space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">{isSignUp ? 'Activate Faculty ID' : 'Welcome Back'}</h2>
              <p className="text-xs text-slate-400 mt-1">
                {isSignUp ? 'Redeem single-use token issued by Principal/Developer.' : 'Sign in to access your dashboard.'}
              </p>
            </div>
            <button
              onClick={() => { setIsSignUp(!isSignUp); setError(''); setSuccessMsg(''); }}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 underline"
            >
              {isSignUp ? 'Back to Login' : 'Enter Secret Code'}
            </button>
          </div>

          {error && <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">{error}</div>}
          {successMsg && <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">{successMsg}</div>}

          {/* Google Link Prompt Modal */}
          {googlePrompt && (
            <div className="p-4 rounded-xl bg-indigo-950/60 border border-indigo-500/30 space-y-3">
              <p className="text-xs font-bold text-indigo-300">Link Google Account (nitin.google@school.edu)</p>
              <p className="text-[11px] text-slate-300">Enter your institution's Secret Authorization Code to proceed:</p>
              <input
                type="text"
                placeholder="e.g. APS-TCH-4891"
                value={googleSecretCode}
                onChange={(e) => setGoogleSecretCode(e.target.value)}
                className="w-full bg-slate-900 border border-amber-400/40 rounded-xl px-3 py-2 text-xs text-amber-300 font-mono"
              />
              <div className="flex gap-2">
                <button onClick={handleVerifyGoogleToken} className="bg-indigo-600 text-white text-xs px-3 py-1.5 rounded-lg font-semibold">Verify & Join</button>
                <button onClick={() => setGooglePrompt(false)} className="text-slate-400 text-xs px-2">Cancel</button>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                    Secret Authorization Code *
                  </label>
                  <input
                    type="text"
                    name="secretCode"
                    placeholder="e.g. SCH001-TEA-XXXX"
                    value={formData.secretCode}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-amber-500/40 rounded-xl px-4 py-2.5 text-xs text-amber-300 font-mono focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="e.g. Nitin Tripathi"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Email *</label>
              <input
                type="email"
                name="email"
                placeholder="name@school.edu"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Password *</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
              />
            </div>

            {isSignUp && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Confirm Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                />
              </div>
            )}

            <Button type="submit" disabled={loading} className="mt-2">
              {loading ? 'Authenticating...' : isSignUp ? 'Authorize & Register' : 'Log in'}
            </Button>
          </form>

          {/* Or Continue with Google */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-800"></div>
            <span className="flex-shrink mx-4 text-[11px] text-slate-500 uppercase tracking-wider">Or continue with</span>
            <div className="flex-grow border-t border-slate-800"></div>
          </div>

          <button
            type="button"
            onClick={handleGoogleAuth}
            className="w-full py-2.5 px-4 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800/80 text-white text-xs font-semibold flex items-center justify-center gap-3 transition"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}
