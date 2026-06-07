'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';

interface SettingsClientProps {
  initialSettings: Record<string, string>;
}

export default function SettingsClient({ initialSettings }: SettingsClientProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Hero States
  const [heroEyebrow, setHeroEyebrow] = useState(initialSettings.heroEyebrow || 'Koventra Systems');
  const [heroTitle, setHeroTitle] = useState(initialSettings.heroTitle || 'Building the intelligence layer for modern industry');
  const [heroSubtitle, setHeroSubtitle] = useState(initialSettings.heroSubtitle || 'Precision engineered software and systems built to last.');

  // Mission States
  const [missionEyebrow, setMissionEyebrow] = useState(initialSettings.missionEyebrow || 'Who We Are');
  const [missionTitle, setMissionTitle] = useState(initialSettings.missionTitle || 'A systems company that builds to last');
  const [missionParagraph1, setMissionParagraph1] = useState(initialSettings.missionParagraph1 || "Koventra Systems is the parent organization behind a growing portfolio of technology ventures. We don't build features — we build companies. Each product under our umbrella is designed with a singular focus, long-term capital, and a mandate to lead its category.");
  const [missionParagraph2, setMissionParagraph2] = useState(initialSettings.missionParagraph2 || 'From legal intelligence to enterprise cloud infrastructure, our ventures share a common foundation: precision engineering, deep domain expertise, and the conviction that great software changes how industries operate.');

  // Stats States
  const [stat1Num, setStat1Num] = useState(initialSettings.stat1Num || '$400M+');
  const [stat1Label, setStat1Label] = useState(initialSettings.stat1Label || 'Venture Value');
  const [stat2Num, setStat2Num] = useState(initialSettings.stat2Num || '04');
  const [stat2Label, setStat2Label] = useState(initialSettings.stat2Label || 'Active Ventures');
  const [stat3Num, setStat3Num] = useState(initialSettings.stat3Num || '2024');
  const [stat3Label, setStat3Label] = useState(initialSettings.stat3Label || 'Founded');
  const [stat4Num, setStat4Num] = useState(initialSettings.stat4Num || '100%');
  const [stat4Label, setStat4Label] = useState(initialSettings.stat4Label || 'Private Capital');

  // Metadata States
  const [ogImageUrl, setOgImageUrl] = useState(initialSettings.ogImageUrl || '/images/default-og.jpg');
  const [metaDescription, setMetaDescription] = useState(initialSettings.metaDescription || 'Parent company of a portfolio of industry leading software companies.');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const payload = {
      heroEyebrow,
      heroTitle,
      heroSubtitle,
      missionEyebrow,
      missionTitle,
      missionParagraph1,
      missionParagraph2,
      stat1Num,
      stat1Label,
      stat2Num,
      stat2Label,
      stat3Num,
      stat3Label,
      stat4Num,
      stat4Label,
      ogImageUrl,
      metaDescription,
    };

    try {
      const res = await fetch('/api/v1/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || 'Failed to update system settings.');
      } else {
        setSuccess('System settings updated successfully!');
        router.refresh();
      }
    } catch (err) {
      setError('A system error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-display text-2xl font-light text-white tracking-wide">System Settings</h1>
        <p className="font-body text-xs text-muted mt-1 uppercase tracking-wider">
          Configure site content, statistics, and landing page variables
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-[2px] text-red-400 text-xs font-body tracking-wide">
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-[2px] text-green-400 text-xs font-body tracking-wide">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Hero settings */}
        <div className="bg-navy-card border border-border rounded-[4px] p-6 space-y-5">
          <h2 className="font-body text-xs font-semibold tracking-wider text-gold uppercase border-b border-border pb-3">
            Hero Area Content
          </h2>

          <div>
            <label className="block font-body text-[0.7rem] tracking-[0.12em] uppercase text-muted mb-2 font-medium">
              Hero Eyebrow Text
            </label>
            <input
              type="text"
              value={heroEyebrow}
              onChange={(e) => setHeroEyebrow(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-3 bg-navy border border-border-dim rounded-[2px] font-body text-xs text-white focus:outline-none focus:border-gold transition-colors duration-200"
            />
          </div>

          <div>
            <label className="block font-body text-[0.7rem] tracking-[0.12em] uppercase text-muted mb-2 font-medium">
              Hero Title Headline
            </label>
            <input
              type="text"
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-3 bg-navy border border-border-dim rounded-[2px] font-body text-xs text-white focus:outline-none focus:border-gold transition-colors duration-200"
            />
          </div>

          <div>
            <label className="block font-body text-[0.7rem] tracking-[0.12em] uppercase text-muted mb-2 font-medium">
              Hero Subtitle Text
            </label>
            <textarea
              value={heroSubtitle}
              onChange={(e) => setHeroSubtitle(e.target.value)}
              disabled={loading}
              rows={3}
              className="w-full px-4 py-3 bg-navy border border-border-dim rounded-[2px] font-body text-xs text-white focus:outline-none focus:border-gold transition-colors duration-200 resize-none"
            />
          </div>
        </div>

        {/* Mission settings */}
        <div className="bg-navy-card border border-border rounded-[4px] p-6 space-y-5">
          <h2 className="font-body text-xs font-semibold tracking-wider text-gold uppercase border-b border-border pb-3">
            Mission Section Content
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-body text-[0.7rem] tracking-[0.12em] uppercase text-muted mb-2 font-medium">
                Mission Eyebrow
              </label>
              <input
                type="text"
                value={missionEyebrow}
                onChange={(e) => setMissionEyebrow(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-3 bg-navy border border-border-dim rounded-[2px] font-body text-xs text-white focus:outline-none focus:border-gold transition-colors duration-200"
              />
            </div>

            <div>
              <label className="block font-body text-[0.7rem] tracking-[0.12em] uppercase text-muted mb-2 font-medium">
                Mission Section Title
              </label>
              <input
                type="text"
                value={missionTitle}
                onChange={(e) => setMissionTitle(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-3 bg-navy border border-border-dim rounded-[2px] font-body text-xs text-white focus:outline-none focus:border-gold transition-colors duration-200"
              />
            </div>
          </div>

          <div>
            <label className="block font-body text-[0.7rem] tracking-[0.12em] uppercase text-muted mb-2 font-medium">
              Primary Paragraph
            </label>
            <textarea
              value={missionParagraph1}
              onChange={(e) => setMissionParagraph1(e.target.value)}
              disabled={loading}
              rows={4}
              className="w-full px-4 py-3 bg-navy border border-border-dim rounded-[2px] font-body text-xs text-white focus:outline-none focus:border-gold transition-colors duration-200 resize-none"
            />
          </div>

          <div>
            <label className="block font-body text-[0.7rem] tracking-[0.12em] uppercase text-muted mb-2 font-medium">
              Secondary Paragraph
            </label>
            <textarea
              value={missionParagraph2}
              onChange={(e) => setMissionParagraph2(e.target.value)}
              disabled={loading}
              rows={4}
              className="w-full px-4 py-3 bg-navy border border-border-dim rounded-[2px] font-body text-xs text-white focus:outline-none focus:border-gold transition-colors duration-200 resize-none"
            />
          </div>
        </div>

        {/* Stats settings */}
        <div className="bg-navy-card border border-border rounded-[4px] p-6 space-y-5">
          <h2 className="font-body text-xs font-semibold tracking-wider text-gold uppercase border-b border-border pb-3">
            Metric Stats Parameters (Hero Panel)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-3">
              <span className="font-body text-[10px] tracking-wider uppercase text-gold block">Metric 1</span>
              <div>
                <label className="block font-body text-[0.65rem] text-muted uppercase mb-1">Value</label>
                <input
                  type="text"
                  value={stat1Num}
                  onChange={(e) => setStat1Num(e.target.value)}
                  disabled={loading}
                  className="w-full px-3 py-2 bg-navy border border-border-dim rounded-[2px] font-body text-xs text-white focus:outline-none focus:border-gold"
                />
              </div>
              <div>
                <label className="block font-body text-[0.65rem] text-muted uppercase mb-1">Label</label>
                <input
                  type="text"
                  value={stat1Label}
                  onChange={(e) => setStat1Label(e.target.value)}
                  disabled={loading}
                  className="w-full px-3 py-2 bg-navy border border-border-dim rounded-[2px] font-body text-xs text-white focus:outline-none focus:border-gold"
                />
              </div>
            </div>

            <div className="space-y-3">
              <span className="font-body text-[10px] tracking-wider uppercase text-gold block">Metric 2</span>
              <div>
                <label className="block font-body text-[0.65rem] text-muted uppercase mb-1">Value</label>
                <input
                  type="text"
                  value={stat2Num}
                  onChange={(e) => setStat2Num(e.target.value)}
                  disabled={loading}
                  className="w-full px-3 py-2 bg-navy border border-border-dim rounded-[2px] font-body text-xs text-white focus:outline-none focus:border-gold"
                />
              </div>
              <div>
                <label className="block font-body text-[0.65rem] text-muted uppercase mb-1">Label</label>
                <input
                  type="text"
                  value={stat2Label}
                  onChange={(e) => setStat2Label(e.target.value)}
                  disabled={loading}
                  className="w-full px-3 py-2 bg-navy border border-border-dim rounded-[2px] font-body text-xs text-white focus:outline-none focus:border-gold"
                />
              </div>
            </div>

            <div className="space-y-3">
              <span className="font-body text-[10px] tracking-wider uppercase text-gold block">Metric 3</span>
              <div>
                <label className="block font-body text-[0.65rem] text-muted uppercase mb-1">Value</label>
                <input
                  type="text"
                  value={stat3Num}
                  onChange={(e) => setStat3Num(e.target.value)}
                  disabled={loading}
                  className="w-full px-3 py-2 bg-navy border border-border-dim rounded-[2px] font-body text-xs text-white focus:outline-none focus:border-gold"
                />
              </div>
              <div>
                <label className="block font-body text-[0.65rem] text-muted uppercase mb-1">Label</label>
                <input
                  type="text"
                  value={stat3Label}
                  onChange={(e) => setStat3Label(e.target.value)}
                  disabled={loading}
                  className="w-full px-3 py-2 bg-navy border border-border-dim rounded-[2px] font-body text-xs text-white focus:outline-none focus:border-gold"
                />
              </div>
            </div>

            <div className="space-y-3">
              <span className="font-body text-[10px] tracking-wider uppercase text-gold block">Metric 4</span>
              <div>
                <label className="block font-body text-[0.65rem] text-muted uppercase mb-1">Value</label>
                <input
                  type="text"
                  value={stat4Num}
                  onChange={(e) => setStat4Num(e.target.value)}
                  disabled={loading}
                  className="w-full px-3 py-2 bg-navy border border-border-dim rounded-[2px] font-body text-xs text-white focus:outline-none focus:border-gold"
                />
              </div>
              <div>
                <label className="block font-body text-[0.65rem] text-muted uppercase mb-1">Label</label>
                <input
                  type="text"
                  value={stat4Label}
                  onChange={(e) => setStat4Label(e.target.value)}
                  disabled={loading}
                  className="w-full px-3 py-2 bg-navy border border-border-dim rounded-[2px] font-body text-xs text-white focus:outline-none focus:border-gold"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Metadata Settings */}
        <div className="bg-navy-card border border-border rounded-[4px] p-6 space-y-5">
          <h2 className="font-body text-xs font-semibold tracking-wider text-gold uppercase border-b border-border pb-3">
            System Metadata & SEO
          </h2>

          <div>
            <ImageUpload
              value={ogImageUrl}
              onChange={setOgImageUrl}
              label="Global Default OG Image"
            />
            <input
              type="text"
              value={ogImageUrl}
              onChange={(e) => setOgImageUrl(e.target.value)}
              disabled={loading}
              className="w-full mt-2 px-4 py-2 bg-navy border border-border-dim rounded-[2px] font-body text-xs text-white focus:outline-none focus:border-gold transition-colors duration-200"
              placeholder="Or paste direct image URL here..."
            />
          </div>

          <div>
            <label className="block font-body text-[0.7rem] tracking-[0.12em] uppercase text-muted mb-2 font-medium">
              Global Meta Description
            </label>
            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              disabled={loading}
              rows={3}
              className="w-full px-4 py-3 bg-navy border border-border-dim rounded-[2px] font-body text-xs text-white focus:outline-none focus:border-gold transition-colors duration-200 resize-none"
              placeholder="Provide a general summary describing the company for search results..."
            />
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex justify-end gap-4 border-t border-border pt-6">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-gold text-navy font-body text-[0.78rem] font-medium tracking-[0.08em] uppercase rounded-[2px] hover:bg-[#d4b45a] transition-colors duration-200 disabled:opacity-50 flex items-center gap-2"
          >
            <Save size={14} />
            {loading ? 'Saving Settings...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
