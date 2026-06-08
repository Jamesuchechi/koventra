'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password.');
      } else {
        router.refresh();
        router.push('/admin');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-navy-card border border-border rounded-[4px] shadow-2xl relative overflow-hidden">
      {/* Background Gold Ambient Glow */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold via-gold-dim to-transparent" />

      {/* Brand Wordmark with Logo */}
      <div className="text-center mb-8 flex flex-col items-center">
        <div className="relative w-16 h-16 rounded-[8px] border border-border bg-gold/5 flex items-center justify-center overflow-hidden mb-4 select-none">
            <Image
              src="/logo.png"
              alt="Koventra Systems Logo"
              fill
              className="object-cover scale-[1.35]"
            />
          </div>
          <h1 className="font-display text-3xl font-light text-white mb-2 tracking-wide">
            Koventra Systems
          </h1>
          <p className="font-body text-[0.78rem] text-muted tracking-[0.12em] uppercase">
            Administration Portal
          </p>
        </div>
      {/* Error Message */}
      {error && (
        <div className="p-3 mb-6 bg-red-500/10 border border-red-500/30 rounded-[2px] text-red-400 text-xs font-body tracking-wide">
          {error}
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-body text-[0.72rem] tracking-[0.15em] uppercase text-muted mb-2 font-medium">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="w-full px-4 py-3 bg-navy border border-border-dim rounded-[2px] font-body text-sm text-white focus:outline-none focus:border-gold transition-colors duration-200"
            placeholder="admin@koventrasystems.com"
          />
        </div>

        <div>
          <label className="block font-body text-[0.72rem] tracking-[0.15em] uppercase text-muted mb-2 font-medium">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            className="w-full px-4 py-3 bg-navy border border-border-dim rounded-[2px] font-body text-sm text-white focus:outline-none focus:border-gold transition-colors duration-200"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-gold text-navy font-body text-[0.82rem] font-medium tracking-[0.08em] uppercase rounded-[2px] hover:bg-[#d4b45a] transition-colors duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4 text-navy" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Authenticating...
            </span>
          ) : (
            'Sign In'
          )}
        </button>
      </form>
    </div>
  );
}
