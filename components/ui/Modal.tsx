'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-navy-card border border-border rounded-[4px] p-6 shadow-2xl space-y-4">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h3 className="font-body text-sm font-medium uppercase tracking-wider text-white">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-muted hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        
        {/* Content */}
        <div className="font-body text-[0.85rem] text-muted leading-relaxed font-light">
          {children}
        </div>
      </div>
    </div>
  );
}
