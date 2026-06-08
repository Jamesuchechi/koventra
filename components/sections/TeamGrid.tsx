'use client';

import React from 'react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  photoUrl?: string | null;
}

interface TeamGridProps {
  members?: TeamMember[];
}

export default function TeamGrid({ members = [] }: TeamGridProps) {
  if (members.length === 0) {
    return (
      <div className="bg-navy-card border border-border rounded-[4px] p-6 text-sm text-muted">
        No team members have been added yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {members.map((member) => (
        <div key={member.id} className="bg-navy-card border border-border rounded-[4px] p-5 text-white">
          <div className="mb-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-border-dim overflow-hidden">
              {member.photoUrl ? (
                <img src={member.photoUrl} alt={member.name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-navy text-muted">?</div>
              )}
            </div>
            <div>
              <p className="font-body text-sm font-semibold text-white">{member.name}</p>
              <p className="text-[0.72rem] text-muted uppercase tracking-[0.18em]">{member.role}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
