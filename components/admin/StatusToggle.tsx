'use client';

import React from 'react';

interface StatusToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export default function StatusToggle({ checked, onChange, label, disabled }: StatusToggleProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <span className="relative">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(event) => onChange(event.target.checked)}
          className="sr-only"
        />
        <span className={`block w-10 h-6 rounded-full transition-colors duration-200 ${checked ? 'bg-gold' : 'bg-border-dim'}`} />
        <span
          className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${checked ? 'translate-x-4' : 'translate-x-0'}`}
        />
      </span>
      {label && <span className="font-body text-sm text-white">{label}</span>}
    </label>
  );
}
