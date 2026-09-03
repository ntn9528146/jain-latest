import React, { useState } from 'react';
import Button from '../components/common/Button';

export default function Login({ onLoginSuccess }) {
  const [formData, setFormData] = useState({
    facultyId: '',
    password: '',
    academicYear: '2026-2027',
    rememberMe: true
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.facultyId || !formData.password) {
      setError('Please fill in both Faculty ID/Email and Password.');
      return;
    }

    setLoading(true);

    // Mock authentication transition
    setTimeout(() => {
      setLoading(false);
      if (onLoginSuccess) {
        onLoginSuccess(formData);
      }
    }, 900);
  };

  return (
    <div className="min-h-screen w-full flex bg-slate-900 text-slate-100">
      {/* Left Showcase Banner (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 border-r border-slate-800">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-indigo-500 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-indigo-500/30">
            P
          </div>
          <span className="text-xl font-bold tracking-wide text-white">PaperPilot <span className="text-indigo-400">ExamSuite</span></span>
        </div>

        <div className="space-y-6 max-w-lg">
          <div className="inline-block bg-indigo-500/10 border border-indigo-500/30 px-3 py-1 rounded-full text-xs font-semibold text-indigo-300">
            Automated CBSE Blueprint Engine
          </div>
          <h1 className="text-4xl font-extrabold leading-tight text-white">
            Generate balanced, print-ready question papers in under 60 seconds.
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            Strict adherence to CBSE Class 9–12 marking schemes, multi-set generation with anti-leak shuffling, and instant answer key production.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800/80">
            <div>
              <p className="text-2xl font-bold text-white">100%</p>
              <p className="text-xs text-slate-400">CBSE Blueprint Match</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-indigo-400">4 Sets</p>
              <p className="text-xs text-slate-400">One-click Jumble</p>
            </div>
          </div>
        </div>

        <div className="text-xs text-slate-500">
          © 2026 Academic Evaluation Framework. All Rights Reserved.
        </div>
      </div>

      {/* Right Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 bg-slate-950">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">Faculty Portal Access</h2>
            <p className="mt-1 text-sm text-slate-400">
              Sign in with your registered school coordinator credentials.
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-center gap-2">
              <span className="font-bold">Error:</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Academic Session
              </label>
              <select
                name="academicYear"
                value={formData.academicYear}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="2026-2027">Session 2026 - 2027</option>
                <option value="2025-2026">Session 2025 - 2026</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Faculty ID / Email
              </label>
              <input
                type="text"
                name="facultyId"
                placeholder="e.g. nitin.tripathi@school.edu"
                value={formData.facultyId}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Password
                </label>
                <a href="#reset" className="text-xs text-indigo-400 hover:text-indigo-300 transition">
                  Forgot?
                </a>
              </div>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="rounded border-slate-800 bg-slate-900 text-indigo-600 focus:ring-0 h-4 w-4"
                />
                Keep session logged in on this terminal
              </label>
            </div>

            <Button type="submit" disabled={loading} className="mt-2">
              {loading ? 'Authenticating Credentials...' : 'Sign In to Generator Dashboard'}
            </Button>
          </form>

          <div className="pt-6 text-center border-t border-slate-900 text-xs text-slate-500">
            Designated strictly for CBSE Evaluators & Academic Department Heads.
          </div>
        </div>
      </div>
    </div>
  );
}
