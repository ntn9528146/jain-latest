import React, { useState } from 'react';
import Button from '../components/common/Button.jsx';

export default function Login({ onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    facultyId: '',
    department: 'Computer Science',
    password: '',
    confirmPassword: '',
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
      setError('Please provide required credentials.');
      return;
    }

    if (isSignUp) {
      if (!formData.fullName) {
        setError('Please enter your full faculty name.');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (onLoginSuccess) {
        onLoginSuccess({
          ...formData,
          role: isSignUp ? 'Registered Faculty' : 'Evaluator'
        });
      }
    }, 700);
  };

  return (
    <div className="min-h-screen w-full flex bg-slate-900 text-slate-100">
      {/* Left Showcase Banner */}
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
            CBSE marking schemes, multi-set generation with anti-leak shuffling, and instant answer key production.
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

      {/* Right Form Card */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 bg-slate-950 overflow-y-auto">
        <div className="w-full max-w-md space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                {isSignUp ? 'Register Faculty Account' : 'Faculty Portal Access'}
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                {isSignUp ? 'Create your profile to start drafting question papers.' : 'Sign in with your registered school credentials.'}
              </p>
            </div>

            {/* Mode Switch Button */}
            <button
              type="button"
              onClick={() => { setIsSignUp(!isSignUp); setError(''); }}
              className="text-xs text-indigo-400 hover:text-indigo-300 underline font-medium"
            >
              {isSignUp ? 'Back to Sign In' : 'Sign Up'}
            </button>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="e.g. Nitin Tripathi"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-200 placeholder-slate-600 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Academic Session
                </label>
                <select
                  name="academicYear"
                  value={formData.academicYear}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
                >
                  <option value="2026-2027">2026 - 2027</option>
                  <option value="2025-2026">2025 - 2026</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Department
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
                >
                  <option value="Computer Science">Computer Science</option>
                  <option value="Information Tech">Information Tech</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Science">Science</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Faculty ID / Email
              </label>
              <input
                type="text"
                name="facultyId"
                placeholder="faculty@school.edu"
                value={formData.facultyId}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-200 placeholder-slate-600 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-200 placeholder-slate-600 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            {isSignUp && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-200 placeholder-slate-600 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            )}

            <div className="pt-2">
              <Button type="submit" disabled={loading}>
                {loading 
                  ? 'Processing Request...' 
                  : isSignUp ? 'Create Faculty Account' : 'Sign In to Generator Dashboard'}
              </Button>
            </div>
          </form>

          <div className="text-center text-xs text-slate-400">
            {isSignUp ? (
              <span>Already registered? <button onClick={() => setIsSignUp(false)} className="text-indigo-400 font-semibold underline">Sign In here</button></span>
            ) : (
              <span>New Faculty member? <button onClick={() => setIsSignUp(true)} className="text-indigo-400 font-semibold underline">Create an Account</button></span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
