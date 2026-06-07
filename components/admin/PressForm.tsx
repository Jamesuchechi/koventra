'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ImageUpload from '@/components/admin/ImageUpload';

interface PressFormProps {
  initialData?: {
    id?: string;
    headline: string;
    publication: string;
    url: string;
    logoUrl: string | null;
    publishedAt: Date | string;
    featured: boolean;
  };
  isEdit?: boolean;
}

export default function PressForm({ initialData, isEdit = false }: PressFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form States
  const [headline, setHeadline] = useState(initialData?.headline || '');
  const [publication, setPublication] = useState(initialData?.publication || '');
  const [url, setUrl] = useState(initialData?.url || '');
  const [logoUrl, setLogoUrl] = useState(initialData?.logoUrl || '');
  const [featured, setFeatured] = useState(initialData?.featured || false);

  // Format date safely for input value (YYYY-MM-DD)
  const formatInputDate = (dateVal: Date | string | undefined) => {
    const date = dateVal ? new Date(dateVal) : new Date();
    if (isNaN(date.getTime())) return new Date().toISOString().split('T')[0];
    return date.toISOString().split('T')[0];
  };

  const [publishedAt, setPublishedAt] = useState(formatInputDate(initialData?.publishedAt));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const payload = {
      headline,
      publication,
      url,
      logoUrl: logoUrl || null,
      publishedAt: publishedAt || new Date().toISOString(),
      featured,
    };

    try {
      const apiUrl = isEdit ? `/api/v1/press/${initialData?.id}` : '/api/v1/press';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(apiUrl, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || 'Failed to save press entry details.');
      } else {
        router.refresh();
        router.push('/admin/press');
      }
    } catch (err) {
      setError('A system error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Back button */}
      <div>
        <Link
          href="/admin/press"
          className="inline-flex items-center gap-2 text-xs text-muted hover:text-white uppercase tracking-wider transition-colors duration-200"
        >
          <ArrowLeft size={14} />
          Back to List
        </Link>
      </div>

      <div>
        <h1 className="font-display text-2xl font-light text-white tracking-wide">
          {isEdit ? 'Edit Press Entry' : 'Add Press Entry'}
        </h1>
        <p className="font-body text-xs text-muted mt-1 uppercase tracking-wider">
          {isEdit ? 'Modify recorded news story specifications' : 'Publish a new external media coverage record'}
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-[2px] text-red-400 text-xs font-body tracking-wide">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-navy-card border border-border rounded-[4px] p-6 space-y-5">
          <h2 className="font-body text-xs font-semibold tracking-wider text-gold uppercase border-b border-border pb-3">
            Coverage Details
          </h2>

          <div>
            <label className="block font-body text-[0.7rem] tracking-[0.12em] uppercase text-muted mb-2 font-medium">
              Headline / Title *
            </label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              required
              disabled={loading}
              className="w-full px-4 py-3 bg-navy border border-border-dim rounded-[2px] font-body text-xs text-white focus:outline-none focus:border-gold transition-colors duration-200"
              placeholder="e.g. Koventra Systems Announces Launch of Lex AI Platform"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-body text-[0.7rem] tracking-[0.12em] uppercase text-muted mb-2 font-medium">
                Publication Name *
              </label>
              <input
                type="text"
                value={publication}
                onChange={(e) => setPublication(e.target.value)}
                required
                disabled={loading}
                className="w-full px-4 py-3 bg-navy border border-border-dim rounded-[2px] font-body text-xs text-white focus:outline-none focus:border-gold transition-colors duration-200"
                placeholder="e.g. TechCrunch"
              />
            </div>

            <div>
              <label className="block font-body text-[0.7rem] tracking-[0.12em] uppercase text-muted mb-2 font-medium">
                Published Date *
              </label>
              <input
                type="date"
                value={publishedAt}
                onChange={(e) => setPublishedAt(e.target.value)}
                required
                disabled={loading}
                className="w-full px-4 py-3 bg-navy border border-border-dim rounded-[2px] font-body text-xs text-white focus:outline-none focus:border-gold transition-colors duration-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-body text-[0.7rem] tracking-[0.12em] uppercase text-muted mb-2 font-medium">
                Coverage Article URL *
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                disabled={loading}
                className="w-full px-4 py-3 bg-navy border border-border-dim rounded-[2px] font-body text-xs text-white focus:outline-none focus:border-gold transition-colors duration-200"
                placeholder="e.g. https://techcrunch.com/article"
              />
            </div>

            <div>
              <ImageUpload
                value={logoUrl}
                onChange={setLogoUrl}
                label="Publication Logo Image"
              />
              <input
                type="text"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                disabled={loading}
                className="w-full mt-2 px-4 py-2 bg-navy border border-border-dim rounded-[2px] font-body text-xs text-white focus:outline-none focus:border-gold transition-colors duration-200"
                placeholder="Or paste direct logo URL..."
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                disabled={loading}
                className="w-4 h-4 bg-navy border border-border-dim text-gold rounded focus:ring-0 focus:ring-offset-0 focus:outline-none"
              />
              <span className="font-body text-[0.7rem] tracking-[0.12em] uppercase text-muted">
                Featured Article (Highlighted on Press page)
              </span>
            </label>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex justify-end gap-4 border-t border-border pt-6">
          <Link
            href="/admin/press"
            className="px-5 py-3 bg-navy border border-border font-body text-[0.78rem] tracking-wide uppercase rounded-[2px] hover:text-white transition-colors duration-200"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-gold text-navy font-body text-[0.78rem] font-medium tracking-[0.08em] uppercase rounded-[2px] hover:bg-[#d4b45a] transition-colors duration-200 disabled:opacity-50"
          >
            {loading ? 'Saving press entry...' : 'Save press entry'}
          </button>
        </div>
      </form>
    </div>
  );
}
