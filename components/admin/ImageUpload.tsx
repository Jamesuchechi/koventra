'use client';

import React, { useState } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label }: ImageUploadProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/v1/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to upload image.');
      } else {
        onChange(data.url);
      }
    } catch (err) {
      setError('Upload error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <span className="block font-body text-[0.7rem] tracking-[0.12em] uppercase text-muted font-medium">
          {label}
        </span>
      )}

      {value ? (
        <div className="relative w-32 h-32 rounded-[2px] border border-border overflow-hidden bg-navy group">
          <Image
            src={value}
            alt="Preview"
            fill
            unoptimized
            className="object-cover"
          />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-1.5 right-1.5 p-1 bg-navy/80 hover:bg-red-600 rounded-full text-white transition-colors duration-200"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-32 h-32 border border-dashed border-border-dim hover:border-gold rounded-[2px] cursor-pointer bg-navy transition-colors duration-200">
          {loading ? (
            <Loader2 className="animate-spin text-gold" size={24} />
          ) : (
            <>
              <Upload className="text-muted hover:text-gold transition-colors" size={20} />
              <span className="text-[10px] text-muted tracking-wider uppercase mt-2">Upload</span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={loading}
            className="hidden"
          />
        </label>
      )}

      {error && (
        <p className="font-body text-[10px] text-red-400 mt-1">{error}</p>
      )}
    </div>
  );
}
