'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ImageUpload from '@/components/admin/ImageUpload';

interface TeamMemberFormProps {
  initialData?: {
    id?: string;
    name: string;
    role: string;
    bio: string | null;
    photoUrl: string | null;
    linkedin: string | null;
    twitter: string | null;
    visible: boolean;
    sortOrder: number;
  };
  isEdit?: boolean;
}

export default function TeamMemberForm({ initialData, isEdit = false }: TeamMemberFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form States
  const [name, setName] = useState(initialData?.name || '');
  const [role, setRole] = useState(initialData?.role || '');
  const [bio, setBio] = useState(initialData?.bio || '');
  const [photoUrl, setPhotoUrl] = useState(initialData?.photoUrl || '');
  const [linkedin, setLinkedin] = useState(initialData?.linkedin || '');
  const [twitter, setTwitter] = useState(initialData?.twitter || '');
  const [visible, setVisible] = useState(initialData ? initialData.visible : true);
  const [sortOrder, setSortOrder] = useState(initialData?.sortOrder || 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const payload = {
      name,
      role,
      bio: bio || null,
      photoUrl: photoUrl || null,
      linkedin: linkedin || null,
      twitter: twitter || null,
      visible,
      sortOrder: Number(sortOrder),
    };

    try {
      const url = isEdit ? `/api/v1/team/${initialData?.id}` : '/api/v1/team';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || 'Failed to save team member details.');
      } else {
        router.refresh();
        router.push('/admin/team');
      }
    } catch (err) {
      setError('A system error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Back link */}
      <div>
        <Link
          href="/admin/team"
          className="inline-flex items-center gap-2 text-xs text-muted hover:text-white uppercase tracking-wider transition-colors duration-200"
        >
          <ArrowLeft size={14} />
          Back to List
        </Link>
      </div>

      <div>
        <h1 className="font-display text-2xl font-light text-white tracking-wide">
          {isEdit ? 'Edit Team Member' : 'Add Team Member'}
        </h1>
        <p className="font-body text-xs text-muted mt-1 uppercase tracking-wider">
          {isEdit ? 'Modify profiles of leadership and personnel' : 'Introduce a new executive or team member'}
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
            Profile Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-body text-[0.7rem] tracking-[0.12em] uppercase text-muted mb-2 font-medium">
                Full Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={loading}
                className="w-full px-4 py-3 bg-navy border border-border-dim rounded-[2px] font-body text-xs text-white focus:outline-none focus:border-gold transition-colors duration-200"
                placeholder="e.g. John Doe"
              />
            </div>

            <div>
              <label className="block font-body text-[0.7rem] tracking-[0.12em] uppercase text-muted mb-2 font-medium">
                Corporate Role *
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                disabled={loading}
                className="w-full px-4 py-3 bg-navy border border-border-dim rounded-[2px] font-body text-xs text-white focus:outline-none focus:border-gold transition-colors duration-200"
                placeholder="e.g. Director of Infrastructure"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <ImageUpload
                value={photoUrl}
                onChange={setPhotoUrl}
                label="Photo Image"
              />
              <input
                type="text"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                disabled={loading}
                className="w-full mt-2 px-4 py-2 bg-navy border border-border-dim rounded-[2px] font-body text-xs text-white focus:outline-none focus:border-gold transition-colors duration-200"
                placeholder="Or paste direct photo URL..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-body text-[0.7rem] tracking-[0.12em] uppercase text-muted mb-2 font-medium">
                  Sort Order
                </label>
                <input
                  type="number"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(Number(e.target.value))}
                  disabled={loading}
                  className="w-full px-4 py-3 bg-navy border border-border-dim rounded-[2px] font-body text-xs text-white focus:outline-none focus:border-gold transition-colors duration-200"
                />
              </div>

              <div className="flex items-center h-full pt-6">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={visible}
                    onChange={(e) => setVisible(e.target.checked)}
                    disabled={loading}
                    className="w-4 h-4 bg-navy border border-border-dim text-gold rounded focus:ring-0 focus:ring-offset-0 focus:outline-none"
                  />
                  <span className="font-body text-[0.7rem] tracking-[0.12em] uppercase text-muted">
                    Visible Profile
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-body text-[0.7rem] tracking-[0.12em] uppercase text-muted mb-2 font-medium">
                LinkedIn Profile URL
              </label>
              <input
                type="text"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-3 bg-navy border border-border-dim rounded-[2px] font-body text-xs text-white focus:outline-none focus:border-gold transition-colors duration-200"
                placeholder="e.g. https://linkedin.com/in/johndoe"
              />
            </div>

            <div>
              <label className="block font-body text-[0.7rem] tracking-[0.12em] uppercase text-muted mb-2 font-medium">
                Twitter Profile URL
              </label>
              <input
                type="text"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-3 bg-navy border border-border-dim rounded-[2px] font-body text-xs text-white focus:outline-none focus:border-gold transition-colors duration-200"
                placeholder="e.g. https://twitter.com/johndoe"
              />
            </div>
          </div>

          <div>
            <label className="block font-body text-[0.7rem] tracking-[0.12em] uppercase text-muted mb-2 font-medium">
              Short Biography
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              disabled={loading}
              rows={4}
              className="w-full px-4 py-3 bg-navy border border-border-dim rounded-[2px] font-body text-xs text-white focus:outline-none focus:border-gold transition-colors duration-200 resize-none"
              placeholder="A short biography summarizing executive experience and scope..."
            />
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex justify-end gap-4 border-t border-border pt-6">
          <Link
            href="/admin/team"
            className="px-5 py-3 bg-navy border border-border font-body text-[0.78rem] tracking-wide uppercase rounded-[2px] hover:text-white transition-colors duration-200"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-gold text-navy font-body text-[0.78rem] font-medium tracking-[0.08em] uppercase rounded-[2px] hover:bg-[#d4b45a] transition-colors duration-200 disabled:opacity-50"
          >
            {loading ? 'Saving details...' : 'Save details'}
          </button>
        </div>
      </form>
    </div>
  );
}
