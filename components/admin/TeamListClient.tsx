'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Edit, Trash, Plus, Search, Eye, EyeOff, Linkedin, Twitter } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import { useRouter } from 'next/navigation';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  photoUrl: string | null;
  linkedin: string | null;
  twitter: string | null;
  sortOrder: number;
  visible: boolean;
}

export default function TeamListClient({ initialMembers }: { initialMembers: TeamMember[] }) {
  const router = useRouter();
  const [members, setMembers] = useState<TeamMember[]>(initialMembers);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/v1/team/${deleteId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setMembers(members.filter((m) => m.id !== deleteId));
        setDeleteId(null);
        router.refresh();
      } else {
        alert('Failed to delete team member.');
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
          <h1 className="font-display text-2xl font-light text-white tracking-wide">Team Members</h1>
          <p className="font-body text-xs text-muted mt-1 uppercase tracking-wider">
            Manage your venture leaders and contributors
          </p>
        </div>
        <Link
          href="/admin/team/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-gold text-navy font-body text-[0.8rem] font-medium tracking-[0.08em] uppercase rounded-[2px] hover:bg-[#d4b45a] transition-colors duration-200"
        >
          <Plus size={16} />
          Add Member
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
          placeholder="Search team members by name or role..."
          className="w-full pl-10 pr-4 py-2.5 bg-navy-card border border-border rounded-[2px] font-body text-xs text-white focus:outline-none focus:border-gold transition-colors duration-200"
        />
      </div>

      {/* Table */}
      <div className="bg-navy-card border border-border rounded-[4px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-border bg-navy/35 font-body text-[0.72rem] tracking-[0.15em] uppercase text-muted">
                <th className="px-6 py-4 font-semibold">Member</th>
                <th className="px-6 py-4 font-semibold">Role</th>
                <th className="px-6 py-4 font-semibold">Visibility</th>
                <th className="px-6 py-4 font-semibold">Social Links</th>
                <th className="px-6 py-4 font-semibold">Order</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-dim font-body text-xs">
              {filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted">
                    No team members registered.
                  </td>
                </tr>
              ) : (
                filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-navy-hover transition-colors">
                    <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                      {member.photoUrl ? (
                        <Image
                          src={member.photoUrl}
                          alt={member.name}
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-full object-cover border border-border"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-navy border border-border flex items-center justify-center text-[10px] text-muted font-bold">
                          {member.name.substring(0, 2).toUpperCase()}
                        </div>
                      )}
                      <div>{member.name}</div>
                    </td>
                    <td className="px-6 py-4 text-muted font-light">{member.role}</td>
                    <td className="px-6 py-4">
                      <Badge variant={member.visible ? 'green' : 'gray'}>
                        <span className="flex items-center gap-1.5">
                          {member.visible ? <Eye size={12} /> : <EyeOff size={12} />}
                          {member.visible ? 'Visible' : 'Hidden'}
                        </span>
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2 text-muted">
                        {member.linkedin ? (
                          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                            <Linkedin size={14} />
                          </a>
                        ) : (
                          <span className="opacity-25">-</span>
                        )}
                        {member.twitter ? (
                          <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                            <Twitter size={14} />
                          </a>
                        ) : null}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted">{member.sortOrder}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-3">
                        <Link
                          href={`/admin/team/${member.id}`}
                          className="p-1.5 bg-navy border border-border rounded-[2px] text-muted hover:text-gold hover:border-gold transition-colors duration-200"
                        >
                          <Edit size={14} />
                        </Link>
                        <button
                          onClick={() => setDeleteId(member.id)}
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
        title="Confirm Delete"
      >
        <div className="space-y-4">
          <p>
            Are you sure you want to delete this team member? This action cannot be undone.
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
