'use client';

import React from 'react';

interface PressEntry {
  id: string;
  headline: string;
  publication: string;
  url: string;
  publishedAt?: string;
}

interface PressGridProps {
  entries?: PressEntry[];
}

export default function PressGrid({ entries = [] }: PressGridProps) {
  if (entries.length === 0) {
    return (
      <div className="bg-navy-card border border-border rounded-[4px] p-6 text-sm text-muted">
        No press entries are available right now.
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {entries.map((entry) => (
        <a
          key={entry.id}
          href={entry.url}
          target="_blank"
          rel="noreferrer"
          className="block rounded-[4px] border border-border p-5 bg-navy-card hover:border-gold transition-colors duration-200"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-display text-sm text-white leading-snug">{entry.headline}</p>
              <p className="mt-2 text-[0.75rem] uppercase tracking-[0.18em] text-muted">{entry.publication}</p>
            </div>
            {entry.publishedAt && <span className="font-body text-[0.7rem] text-muted">{entry.publishedAt}</span>}
          </div>
        </a>
      ))}
    </div>
  );
}
