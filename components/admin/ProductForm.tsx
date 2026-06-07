'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, X, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ImageUpload from '@/components/admin/ImageUpload';

interface ProductFormProps {
  initialData?: {
    id?: string;
    name: string;
    slug: string;
    category: string;
    status: string;
    tagline: string | null;
    description: string | null;
    externalUrl: string | null;
    logoUrl: string | null;
    features: string[];
    featured: boolean;
    sortOrder: number;
  };
  isEdit?: boolean;
}

export default function ProductForm({ initialData, isEdit = false }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Form States
  const [name, setName] = useState(initialData?.name || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [category, setCategory] = useState(initialData?.category || 'AI');
  const [status, setStatus] = useState(initialData?.status || 'PLANNED');
  const [tagline, setTagline] = useState(initialData?.tagline || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [externalUrl, setExternalUrl] = useState(initialData?.externalUrl || '');
  const [logoUrl, setLogoUrl] = useState(initialData?.logoUrl || '');
  const [featured, setFeatured] = useState(initialData?.featured || false);
  const [sortOrder, setSortOrder] = useState(initialData?.sortOrder || 0);

  // Features List State
  const [features, setFeatures] = useState<string[]>(initialData?.features || []);
  const [newFeature, setNewFeature] = useState('');

  // Auto-slugify name (only if it's not edit mode or slug wasn't manually touched)
  const [autoSlug, setAutoSlug] = useState(!isEdit);

  useEffect(() => {
    if (autoSlug && !isEdit) {
      const generatedSlug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setSlug(generatedSlug);
    }
  }, [name, autoSlug, isEdit]);

  const handleAddFeature = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFeature.trim() && !features.includes(newFeature.trim())) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (indexToRemove: number) => {
    setFeatures(features.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const payload = {
      name,
      slug,
      category,
      status,
      tagline: tagline || null,
      description: description || null,
      externalUrl: externalUrl || null,
      logoUrl: logoUrl || null,
      features,
      featured,
      sortOrder: Number(sortOrder),
    };

    try {
      const url = isEdit ? `/api/v1/products/${initialData?.id}` : '/api/v1/products';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || 'Failed to save product details.');
      } else {
        router.refresh();
        router.push('/admin/products');
      }
    } catch (err) {
      setError('A system error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Back button */}
      <div>
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 text-xs text-muted hover:text-white uppercase tracking-wider transition-colors duration-200"
        >
          <ArrowLeft size={14} />
          Back to List
        </Link>
      </div>

      <div>
        <h1 className="font-display text-2xl font-light text-white tracking-wide">
          {isEdit ? 'Edit Product' : 'Add New Product'}
        </h1>
        <p className="font-body text-xs text-muted mt-1 uppercase tracking-wider">
          {isEdit ? 'Modify system product specifications' : 'Register a new venture under the umbrella'}
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-[2px] text-red-400 text-xs font-body tracking-wide">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Block - Core Info */}
          <div className="bg-navy-card border border-border rounded-[4px] p-6 space-y-5">
            <h2 className="font-body text-xs font-semibold tracking-wider text-gold uppercase border-b border-border pb-3">
              Core Specifications
            </h2>

            <div>
              <label className="block font-body text-[0.7rem] tracking-[0.12em] uppercase text-muted mb-2 font-medium">
                Product Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={loading}
                className="w-full px-4 py-3 bg-navy border border-border-dim rounded-[2px] font-body text-xs text-white focus:outline-none focus:border-gold transition-colors duration-200"
                placeholder="e.g. Lex AI"
              />
            </div>

            <div>
              <label className="block font-body text-[0.7rem] tracking-[0.12em] uppercase text-muted mb-2 font-medium">
                URL Slug *
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => {
                    setSlug(e.target.value);
                    setAutoSlug(false);
                  }}
                  required
                  disabled={loading}
                  className="flex-1 px-4 py-3 bg-navy border border-border-dim rounded-[2px] font-body text-xs text-white focus:outline-none focus:border-gold transition-colors duration-200"
                  placeholder="e.g. lex-ai"
                />
                {!isEdit && (
                  <button
                    type="button"
                    onClick={() => setAutoSlug(true)}
                    className="px-3 bg-navy border border-border text-[10px] text-muted hover:text-white uppercase tracking-wider rounded-[2px]"
                  >
                    Auto
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-body text-[0.7rem] tracking-[0.12em] uppercase text-muted mb-2 font-medium">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  disabled={loading}
                  className="w-full px-4 py-3 bg-navy border border-border-dim rounded-[2px] font-body text-xs text-white focus:outline-none focus:border-gold transition-colors duration-200"
                >
                  <option value="AI">AI</option>
                  <option value="SAAS">SAAS</option>
                  <option value="ENTERPRISE">ENTERPRISE</option>
                  <option value="FINTECH">FINTECH</option>
                  <option value="OTHER">OTHER</option>
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
                  <option value="PLANNED">Planned</option>
                  <option value="BUILDING">Building</option>
                  <option value="LIVE">Live</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </div>
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
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    disabled={loading}
                    className="w-4 h-4 bg-navy border border-border-dim text-gold rounded focus:ring-0 focus:ring-offset-0 focus:outline-none"
                  />
                  <span className="font-body text-[0.7rem] tracking-[0.12em] uppercase text-muted">
                    Featured Card
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Block - Presentation / Detail */}
          <div className="bg-navy-card border border-border rounded-[4px] p-6 space-y-5">
            <h2 className="font-body text-xs font-semibold tracking-wider text-gold uppercase border-b border-border pb-3">
              Presentation & Media
            </h2>

            <div>
              <label className="block font-body text-[0.7rem] tracking-[0.12em] uppercase text-muted mb-2 font-medium">
                Tagline
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-3 bg-navy border border-border-dim rounded-[2px] font-body text-xs text-white focus:outline-none focus:border-gold transition-colors duration-200"
                placeholder="e.g. Next-generation legal workspace"
              />
            </div>

            <div>
              <ImageUpload
                value={logoUrl}
                onChange={setLogoUrl}
                label="Logo Image"
              />
              <input
                type="text"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                disabled={loading}
                className="w-full mt-2 px-4 py-2 bg-navy border border-border-dim rounded-[2px] font-body text-xs text-white focus:outline-none focus:border-gold transition-colors duration-200"
                placeholder="Or paste direct image URL here..."
              />
            </div>

            <div>
              <label className="block font-body text-[0.7rem] tracking-[0.12em] uppercase text-muted mb-2 font-medium">
                External Link
              </label>
              <input
                type="text"
                value={externalUrl}
                onChange={(e) => setExternalUrl(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-3 bg-navy border border-border-dim rounded-[2px] font-body text-xs text-white focus:outline-none focus:border-gold transition-colors duration-200"
                placeholder="e.g. https://lexai.com"
              />
            </div>

            <div>
              <label className="block font-body text-[0.7rem] tracking-[0.12em] uppercase text-muted mb-2 font-medium">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={loading}
                rows={3}
                className="w-full px-4 py-3 bg-navy border border-border-dim rounded-[2px] font-body text-xs text-white focus:outline-none focus:border-gold transition-colors duration-200 resize-none"
                placeholder="Describe what this venture does..."
              />
            </div>
          </div>
        </div>

        {/* Features / Capabilities List */}
        <div className="bg-navy-card border border-border rounded-[4px] p-6 space-y-4">
          <h2 className="font-body text-xs font-semibold tracking-wider text-gold uppercase border-b border-border pb-3">
            Product Capabilities & Features
          </h2>

          <div className="flex gap-2">
            <input
              type="text"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              disabled={loading}
              className="flex-1 px-4 py-3 bg-navy border border-border-dim rounded-[2px] font-body text-xs text-white focus:outline-none focus:border-gold transition-colors duration-200"
              placeholder="e.g. Automated contract indexing"
            />
            <button
              onClick={handleAddFeature}
              type="button"
              disabled={loading}
              className="px-5 bg-gold text-navy font-body text-[0.75rem] font-medium tracking-[0.05em] uppercase rounded-[2px] hover:bg-[#d4b45a] transition-colors flex items-center gap-1.5"
            >
              <Plus size={14} />
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {features.length === 0 ? (
              <span className="font-body text-xs text-muted italic">No features defined.</span>
            ) : (
              features.map((feat, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-1.5 bg-navy border border-border text-xs text-white rounded-[2px]"
                >
                  <span>{feat}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(index)}
                    className="text-muted hover:text-red-400 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Submit Bar */}
        <div className="flex justify-end gap-4 border-t border-border pt-6">
          <Link
            href="/admin/products"
            className="px-5 py-3 bg-navy border border-border font-body text-[0.78rem] tracking-wide uppercase rounded-[2px] hover:text-white transition-colors duration-200"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-gold text-navy font-body text-[0.78rem] font-medium tracking-[0.08em] uppercase rounded-[2px] hover:bg-[#d4b45a] transition-colors duration-200 disabled:opacity-50"
          >
            {loading ? 'Saving specifications...' : 'Save specifications'}
          </button>
        </div>
      </form>
    </div>
  );
}
