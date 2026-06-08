'use client';

import React from 'react';

interface TeamFormProps {
  title?: string;
  description?: string;
}

export default function TeamForm({
  title = 'Team Form',
  description = 'Use this section to build and manage team-related content.',
}: TeamFormProps) {
  return (
    <div className="bg-navy-card border border-border rounded-[4px] p-6">
      <h2 className="font-display text-xl font-light text-white mb-3">{title}</h2>
      <p className="font-body text-sm text-muted leading-relaxed">{description}</p>
      <div className="mt-6 rounded-[4px] border border-border-dim bg-navy p-4 text-[0.8rem] text-muted">
        This component is a placeholder for any future team form UI.
      </div>
    </div>
  );
}
