import React, { useState } from 'react';
import Button from '../components/common/Button.jsx';
import { getUsers, registerUserWithCode } from '../services/authStore.js';
import { verifyAndConsumeCode } from '../services/inviteService.js';
import { ROLES } from '../config/rbacRules.js';

export default function Login({ onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    secretCode: '',
    selectedRole: ROLES.TEACHER
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

    // Sign Up with Secret Code
    if (isSignUp) {
      if (!formData.fullName.trim() || !formData.email.trim() || !formData.password || !formData.secretCode.trim()) {
        setError('Name, Email, Password and Secret Authorization Code are mandatory.');
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
        setSuccessMsg(`Account created successfully for ${invite.schoolName} as ${invite.assignedRole}! Please Sign In.`);
        setIsSignUp(false);
        setFormData({ fullName: '', email: '', phone: '', password: '', confirmPassword: '', secretCode: '', selectedRole: ROLES.TEACHER });
      }, 600);
      return;
    }

    // Sign In logic
    if (!formData.email.trim() || !formData.password) {
      setError('Please provide your Email and Password.');
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

      if (user.status === 'Suspended') {
        setError('Your account has been suspended by the school authority.');
        return;
      }

      onLoginSuccess(user);
    }, 500);
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
            Strict role-based access: Teacher cockpits, Principal oversight, Management billing, and Super Developer controls.
          </p>
        </div>

        {/* Demo Credentials & Codes Card */}
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-3 text-xs">
          <p className="font-bold text-indigo-300 uppercase tracking-wider">Quick Access Keys (Testing):</p>
          <div className="space-y-1 font-mono text-slate-300">
            <p>• Developer: <strong className="text-white">developer@paperpilot.io</strong> | <span className="text-slate-400">DevMaster@2026</span></p>
            <p>• Principal: <strong className="text-white">principal@arden.edu</strong> | <span className="text-slate-400">Principal@123</span></p>
            <p>• Teacher: <strong className="text-white">alok.cs@arden.edu</strong> | <span className="text-slate-400">Faculty@123</span></p>
          </div>
          <div className="pt-2 border-t border-slate-800">
            <p className="text-slate-400">Unused Single-use Sign Up Tokens:</p>
            <span className="font-mono bg-slate-950 px-2 py-0.5 rounded text-amber-300 mr-2 border border-slate-800">APS-TCH-4891</span>
            <span className="font-mono bg-slate-950 px-2 py-0.5 rounded text-amber-300 border border-slate-800">APS-PRN-8820</span>
          </div>
        </div>

        <div className="text-xs text-slate-500">
          © 2026 Multi-School CBSE Engine. Unauthorized registrations blocked.
        </div>
      </div>

      {/* Right Login/Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-950">
        <div className="w-full max-w-md space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">
                {isSignUp ? 'Activate Faculty ID' : 'Portal Sign In'}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {isSignUp ? 'Enter single-use invite token provided by authority.' : 'Select role and authenticate your profile.'}
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

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp ? (
              <>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                    Secret Authorization Code *
                  </label>
                  <input
                    type="text"
                    name="secretCode"
                    placeholder="e.g. APS-TCH-4891"
                    value={formData.secretCode}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-amber-500/40 rounded-xl px-4 py-2.5 text-xs text-amber-300 font-mono focus:border-amber-400 focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-500 mt-0.5 block">Issued by Principal or Developer. Single use only.</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Contact Phone (Optional)</label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="+91..."
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </>
            ) : null}

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Email ID *</label>
              <input
                type="email"
                name="email"
                placeholder="faculty@school.edu"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
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
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
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
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            )}

            <Button type="submit" disabled={loading} className="mt-2">
              {loading ? 'Verifying...' : isSignUp ? 'Authorize & Register' : 'Enter Dashboard'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
