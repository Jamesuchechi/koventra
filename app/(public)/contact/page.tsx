'use client';

import React, { useState } from 'react';
import SectionReveal from '@/components/ui/SectionReveal';
import SectionTag from '@/components/ui/SectionTag';
import { Mail, MapPin, Phone, Loader2, Send } from 'lucide-react';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    const payload = {
      name,
      email,
      company: company || null,
      subject: subject || null,
      message,
    };

    try {
      const res = await fetch('/api/v1/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to submit contact request.');
      } else {
        setSuccess(true);
        // Clear Form
        setName('');
        setEmail('');
        setCompany('');
        setSubject('');
        setMessage('');
      }
    } catch (err) {
      setError('An error occurred during submission. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-navy pt-32 pb-24 px-[6vw]">
      {/* Page Header */}
      <div className="max-w-4xl mb-20">
        <SectionReveal>
          <span className="font-body text-[0.72rem] tracking-[0.2em] uppercase text-gold block mb-3 font-semibold">
            Get In Touch
          </span>
          <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-light leading-[1.05] text-white tracking-tight">
            Initiate communication with <br />
            the <em className="italic text-gold">Koventra</em> executive team
          </h1>
        </SectionReveal>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-24 border-t border-border-dim pt-16">
        {/* Left Side: General Info */}
        <div className="space-y-10">
          <SectionReveal>
            <SectionTag>Corporate Channels</SectionTag>
            <h2 className="font-display text-2xl font-light text-white mt-4 mb-6">
              General coordinates
            </h2>
            <p className="font-body text-sm text-muted leading-relaxed font-light mb-10">
              For venture proposals, capital inquiries, careers, or general operations, reach out via the secure form or directly using the details below.
            </p>
          </SectionReveal>

          <SectionReveal>
            <div className="space-y-6 font-body text-xs text-muted font-light">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-border-dim rounded-full flex items-center justify-center text-gold shrink-0">
                  <Mail size={16} />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-muted-dim">Email Address</span>
                  <a href="mailto:office@koventra.com" className="hover:text-white transition-colors mt-0.5 block">
                    office@koventra.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-border-dim rounded-full flex items-center justify-center text-gold shrink-0">
                  <Phone size={16} />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-muted-dim">Direct Phone</span>
                  <a href="tel:+15550199" className="hover:text-white transition-colors mt-0.5 block">
                    +1 (555) 0199
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-border-dim rounded-full flex items-center justify-center text-gold shrink-0">
                  <MapPin size={16} />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-muted-dim">Headquarters</span>
                  <span className="mt-0.5 block">
                    800 Metropole Avenue, Suite 1200<br />
                    New York, NY 10001
                  </span>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>

        {/* Right Side: Contact Form */}
        <div className="bg-navy-card border border-border-dim rounded-[4px] p-8 md:p-10 space-y-6">
          <SectionReveal>
            <h3 className="font-body text-xs font-semibold tracking-wider text-gold uppercase border-b border-border pb-3 mb-6">
              Secure Message Submission
            </h3>
          </SectionReveal>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-[2px] text-red-400 text-xs font-body tracking-wide">
              {error}
            </div>
          )}

          {success && (
            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-[2px] text-green-400 text-xs font-body tracking-wide">
              Your inquiry has been logged successfully. The executive office will review it shortly.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block font-body text-[0.68rem] tracking-[0.12em] uppercase text-muted mb-2 font-medium">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  disabled={loading}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-navy border border-border-dim rounded-[2px] font-body text-xs text-white focus:outline-none focus:border-gold transition-colors duration-200"
                  placeholder="e.g. John Doe"
                />
              </div>

              <div>
                <label className="block font-body text-[0.68rem] tracking-[0.12em] uppercase text-muted mb-2 font-medium">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  disabled={loading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-navy border border-border-dim rounded-[2px] font-body text-xs text-white focus:outline-none focus:border-gold transition-colors duration-200"
                  placeholder="e.g. john@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block font-body text-[0.68rem] tracking-[0.12em] uppercase text-muted mb-2 font-medium">
                  Company / Organization
                </label>
                <input
                  type="text"
                  disabled={loading}
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-4 py-3 bg-navy border border-border-dim rounded-[2px] font-body text-xs text-white focus:outline-none focus:border-gold transition-colors duration-200"
                  placeholder="e.g. LexCorp"
                />
              </div>

              <div>
                <label className="block font-body text-[0.68rem] tracking-[0.12em] uppercase text-muted mb-2 font-medium">
                  Subject / Topic
                </label>
                <input
                  type="text"
                  disabled={loading}
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-3 bg-navy border border-border-dim rounded-[2px] font-body text-xs text-white focus:outline-none focus:border-gold transition-colors duration-200"
                  placeholder="e.g. Investment Proposal"
                />
              </div>
            </div>

            <div>
              <label className="block font-body text-[0.68rem] tracking-[0.12em] uppercase text-muted mb-2 font-medium">
                Message Body *
              </label>
              <textarea
                required
                disabled={loading}
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 bg-navy border border-border-dim rounded-[2px] font-body text-xs text-white focus:outline-none focus:border-gold transition-colors duration-200 resize-none"
                placeholder="Compose your inquiry..."
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gold hover:bg-[#d4b45a] text-navy font-body text-[0.78rem] font-semibold tracking-widest uppercase rounded-[2px] flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={14} />
                    <span>Transmitting...</span>
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    <span>Transmit Message</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
