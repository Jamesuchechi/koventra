'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface JobFormProps {
  initialData?: {
    id?: string;
    title: string;
    team: string;
    location: string;
    type: string;
    status: string;
    description: string | null;
    applyUrl: string | null;
    closesAt: Date | string | null;
  };
  isEdit?: boolean;
}

export default function JobForm({ initialData, isEdit = false }: JobFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form States
  const [title, setTitle] = useState(initialData?.title || '');
  const [team, setTeam] = useState(initialData?.team || '');
  const [location, setLocation] = useState(initialData?.location || '');
  const [type, setType] = useState(initialData?.type || 'FULL_TIME');
  const [status, setStatus] = useState(initialData?.status || 'OPEN');
  const [description, setDescription] = useState(initialData?.description || '');
  const [applyUrl, setApplyUrl] = useState(initialData?.applyUrl || '');

  // Format date safely for input value (YYYY-MM-DD)
  const formatInputDate = (dateVal: Date | string | null | undefined) => {
    if (!dateVal) return '';
    const date = new Date(dateVal);
    if (isNaN(date.getTime())) return '';
    return date.toISOString().split('T')[0];
  };

  const [closesAt, setClosesAt] = useState(formatInputDate(initialData?.closesAt));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const payload = {
      title,
      team,
      location,
      type,
      status,
      description: description || null,
      applyUrl: applyUrl || null,
      closesAt: closesAt || null,
    };

    try {
      const url = isEdit ? `/api/v1/jobs/${initialData?.id}` : '/api/v1/jobs';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || 'Failed to save job posting details.');
      } else {
        router.refresh();
        router.push('/admin/jobs');
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
          href="/admin/jobs"
          className="inline-flex items-center gap-2 text-xs text-muted hover:text-white uppercase tracking-wider transition-colors duration-200"
        >
          <ArrowLeft size={14} />
          Back to List
        </Link>
      </div>

      <div>
        <h1 className="font-display text-2xl font-light text-white tracking-wide">
          {isEdit ? 'Edit Job Posting' : 'Create Job Posting'}
        </h1>
        <p className="font-body text-xs text-muted mt-1 uppercase tracking-wider">
          {isEdit ? 'Modify career opportunity details' : 'Publish a new job listing for Koventra or ventures'}
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
            Role Specifications
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-body text-[0.7rem] tracking-[0.12em] uppercase text-muted mb-2 font-medium">
                Job Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                disabled={loading}
                className="w-full px-4 py-3 bg-navy border border-border-dim rounded-[2px] font-body text-xs text-white focus:outline-none focus:border-gold transition-colors duration-200"
                placeholder="e.g. Lead Machine Learning Engineer"
              />
            </div>

            <div>
              <label className="block font-body text-[0.7rem] tracking-[0.12em] uppercase text-muted mb-2 font-medium">
                Team / Department *
              </label>
              <input
                type="text"
                value={team}
                onChange={(e) => setTeam(e.target.value)}
                required
                disabled={loading}
                className="w-full px-4 py-3 bg-navy border border-border-dim rounded-[2px] font-body text-xs text-white focus:outline-none focus:border-gold transition-colors duration-200"
                placeholder="e.g. Legal Engineering (Lex AI)"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-body text-[0.7rem] tracking-[0.12em] uppercase text-muted mb-2 font-medium">
                Location *
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                disabled={loading}
                className="w-full px-4 py-3 bg-navy border border-border-dim rounded-[2px] font-body text-xs text-white focus:outline-none focus:border-gold transition-colors duration-200"
                placeholder="e.g. London, UK / Remote"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-body text-[0.7rem] tracking-[0.12em] uppercase text-muted mb-2 font-medium">
                  Job Type *
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  disabled={loading}
                  className="w-full px-4 py-3 bg-navy border border-border-dim rounded-[2px] font-body text-xs text-white focus:outline-none focus:border-gold transition-colors duration-200"
                >
                  <option value="FULL_TIME">Full Time</option>
                  <option value="PART_TIME">Part Time</option>
                  <option value="CONTRACT">Contract</option>
                  <option value="INTERNSHIP">Internship</option>
                </select>
              </div>

              <div>
                <label className="block font-body text-[0.7rem] tracking-[0.12em] uppercase text-muted mb-2 font-medium">
                  Status *
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  disabled={loading}
                  className="w-full px-4 py-3 bg-navy border border-border-dim rounded-[2px] font-body text-xs text-white focus:outline-none focus:border-gold transition-colors duration-200"
                >
                  <option value="OPEN">Open</option>
                  <option value="CLOSED">Closed</option>
                  <option value="DRAFT">Draft</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-body text-[0.7rem] tracking-[0.12em] uppercase text-muted mb-2 font-medium">
                Apply URL / Email Address
              </label>
              <input
                type="text"
                value={applyUrl}
                onChange={(e) => setApplyUrl(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-3 bg-navy border border-border-dim rounded-[2px] font-body text-xs text-white focus:outline-none focus:border-gold transition-colors duration-200"
                placeholder="e.g. careers@koventrasystems.com or link"
              />
            </div>

            <div>
              <label className="block font-body text-[0.7rem] tracking-[0.12em] uppercase text-muted mb-2 font-medium">
                Closes At (Expiration Date)
              </label>
              <input
                type="date"
                value={closesAt}
                onChange={(e) => setClosesAt(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-3 bg-navy border border-border-dim rounded-[2px] font-body text-xs text-white focus:outline-none focus:border-gold transition-colors duration-200"
              />
            </div>
          </div>

          <div>
            <label className="block font-body text-[0.7rem] tracking-[0.12em] uppercase text-muted mb-2 font-medium">
              Job Description (Markdown Supported)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
              rows={8}
              className="w-full px-4 py-3 bg-navy border border-border-dim rounded-[2px] font-mono text-xs text-white focus:outline-none focus:border-gold transition-colors duration-200 resize-none"
              placeholder="### Role Overview&#10;Describe responsibilities, expectations, and experience..."
            />
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex justify-end gap-4 border-t border-border pt-6">
          <Link
            href="/admin/jobs"
            className="px-5 py-3 bg-navy border border-border font-body text-[0.78rem] tracking-wide uppercase rounded-[2px] hover:text-white transition-colors duration-200"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-gold text-navy font-body text-[0.78rem] font-medium tracking-[0.08em] uppercase rounded-[2px] hover:bg-[#d4b45a] transition-colors duration-200 disabled:opacity-50"
          >
            {loading ? 'Saving posting...' : 'Save posting'}
          </button>
        </div>
      </form>
    </div>
  );
}
