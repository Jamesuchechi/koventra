'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Edit, Trash, Plus, Search, Calendar, Star, ExternalLink } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import { useRouter } from 'next/navigation';

interface PressEntry {
  id: string;
  headline: string;
  publication: string;
  url: string;
  logoUrl: string | null;
  publishedAt: Date | string;
  featured: boolean;
}

export default function PressListClient({ initialEntries }: { initialEntries: PressEntry[] }) {
  const router = useRouter();
  const [entries, setEntries] = useState<PressEntry[]>(initialEntries);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filteredEntries = entries.filter(
    (entry) =>
      entry.headline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.publication.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/v1/press/${deleteId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setEntries(entries.filter((e) => e.id !== deleteId));
        setDeleteId(null);
        router.refresh();
      } else {
        alert('Failed to delete press entry.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-display text-2xl font-light text-white tracking-wide">Press & News</h1>
          <p className="font-body text-xs text-muted mt-1 uppercase tracking-wider">
            Manage public media coverage and announcements
          </p>
        </div>
        <Link
          href="/admin/press/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-gold text-navy font-body text-[0.8rem] font-medium tracking-[0.08em] uppercase rounded-[2px] hover:bg-[#d4b45a] transition-colors duration-200"
        >
          <Plus size={16} />
          Add Entry
        </Link>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-muted">
          <Search size={16} />
        </span>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search press by headline or publication..."
          className="w-full pl-10 pr-4 py-2.5 bg-navy-card border border-border rounded-[2px] font-body text-xs text-white focus:outline-none focus:border-gold transition-colors duration-200"
        />
      </div>

      {/* Table */}
      <div className="bg-navy-card border border-border rounded-[4px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-border bg-navy/35 font-body text-[0.72rem] tracking-[0.15em] uppercase text-muted">
                <th className="px-6 py-4 font-semibold">Headline</th>
                <th className="px-6 py-4 font-semibold">Publication</th>
                <th className="px-6 py-4 font-semibold">Published Date</th>
                <th className="px-6 py-4 font-semibold">Featured</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-dim font-body text-xs">
              {filteredEntries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted">
                    No press items recorded.
                  </td>
                </tr>
              ) : (
                filteredEntries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-navy-hover transition-colors">
                    <td className="px-6 py-4 font-medium text-white max-w-xs md:max-w-md truncate">
                      <div className="flex items-center gap-2">
                        {entry.headline}
                        <a
                          href={entry.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted hover:text-gold transition-colors"
                        >
                          <ExternalLink size={12} />
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted uppercase tracking-wider">{entry.publication}</td>
                    <td className="px-6 py-4 text-muted">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-muted-dim" />
                        {new Date(entry.publishedAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {entry.featured ? (
                        <Star className="text-gold fill-gold" size={15} />
                      ) : (
                        <Star className="text-muted" size={15} />
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-3">
                        <Link
                          href={`/admin/press/${entry.id}`}
                          className="p-1.5 bg-navy border border-border rounded-[2px] text-muted hover:text-gold hover:border-gold transition-colors duration-200"
                        >
                          <Edit size={14} />
                        </Link>
                        <button
                          onClick={() => setDeleteId(entry.id)}
                          className="p-1.5 bg-navy border border-border rounded-[2px] text-muted hover:text-red-400 hover:border-red-500/30 transition-colors duration-200"
                        >
                          <Trash size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        title="Confirm Deletion"
      >
        <div className="space-y-4">
          <p>
            Are you sure you want to delete this press entry? This action is irreversible.
          </p>
          <div className="flex justify-end gap-3 border-t border-border pt-4">
            <button
              onClick={() => setDeleteId(null)}
              disabled={isDeleting}
              className="px-4 py-2 bg-navy border border-border font-body text-[0.78rem] tracking-wide uppercase rounded-[2px] hover:text-white transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-4 py-2 bg-red-600 text-white font-body text-[0.78rem] tracking-wide uppercase rounded-[2px] hover:bg-red-700 transition-colors duration-200 disabled:opacity-50"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
