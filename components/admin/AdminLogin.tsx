import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface AdminLoginProps {
  onAuthenticated: () => void;
}

const DEMO_EMAIL = 'admin@gmail.com';
const DEMO_PASSWORD = 'demo1234';

const AdminLogin: React.FC<AdminLoginProps> = ({ onAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();

    if (normalizedEmail === DEMO_EMAIL.toLowerCase() && normalizedPassword === DEMO_PASSWORD) {
      setError(null);
      onAuthenticated();
    } else {
      setError('Invalid email or password. Please use the demo credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-900/80 border border-slate-800 rounded-3xl p-8 shadow-2xl">
        <p className="text-xs uppercase tracking-[0.2em] text-pink-400 mb-2">Admin Access</p>
        <h1 className="text-2xl font-semibold text-slate-50 mb-1">Sign in to Mini CRM</h1>
        <p className="text-xs text-slate-400 mb-6">
          This page is private. Use the demo credentials below to access the admin panel.
        </p>

        <div className="mb-5 rounded-2xl bg-slate-950/60 border border-slate-700 px-4 py-3 text-[11px] text-slate-300">
          <p className="font-semibold mb-1 text-slate-100">Demo credentials</p>
          <p><span className="text-slate-400">Email:</span> {DEMO_EMAIL}</p>
          <p><span className="text-slate-400">Password:</span> {DEMO_PASSWORD}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-2xl bg-slate-950/70 border border-slate-700 px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-pink-500"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-2xl bg-slate-950/70 border border-slate-700 px-4 py-2.5 pr-10 text-sm text-slate-100 focus:outline-none focus:border-pink-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-slate-500 hover:text-slate-200"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && <p className="text-xs text-red-400 mt-1">{error}</p>}

          <button
            type="submit"
            className="w-full mt-2 py-2.5 rounded-full bg-pink-500 text-slate-950 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-pink-400 transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
