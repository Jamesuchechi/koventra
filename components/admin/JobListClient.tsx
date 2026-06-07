'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Edit, Trash, Plus, Search, Calendar, Briefcase } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import { useRouter } from 'next/navigation';

interface Job {
  id: string;
  title: string;
  team: string;
  location: string;
  type: string;
  status: string;
  closesAt: Date | string | null;
}

export default function JobListClient({ initialJobs }: { initialJobs: Job[] }) {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'OPEN':
        return 'green';
      case 'CLOSED':
        return 'red';
      case 'DRAFT':
        return 'gray';
      default:
        return 'gray';
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || job.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/v1/jobs/${deleteId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setJobs(jobs.filter((j) => j.id !== deleteId));
        setDeleteId(null);
        router.refresh();
      } else {
        alert('Failed to delete job listing.');
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
          <h1 className="font-display text-2xl font-light text-white tracking-wide">Careers / Job Postings</h1>
          <p className="font-body text-xs text-muted mt-1 uppercase tracking-wider">
            Manage corporate and venture job openings
          </p>
        </div>
        <Link
          href="/admin/jobs/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-gold text-navy font-body text-[0.8rem] font-medium tracking-[0.08em] uppercase rounded-[2px] hover:bg-[#d4b45a] transition-colors duration-200"
        >
          <Plus size={16} />
          Create Job
        </Link>
      </div>

      {/* Controls: Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative w-full max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-muted">
            <Search size={16} />
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search jobs by title, team or location..."
            className="w-full pl-10 pr-4 py-2.5 bg-navy-card border border-border rounded-[2px] font-body text-xs text-white focus:outline-none focus:border-gold transition-colors duration-200"
          />
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          <label className="font-body text-[10px] tracking-wider uppercase text-muted">Filter:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-navy-card border border-border rounded-[2px] font-body text-xs text-white focus:outline-none focus:border-gold transition-colors duration-200"
          >
            <option value="ALL">All Statuses</option>
            <option value="OPEN">Open</option>
            <option value="CLOSED">Closed</option>
            <option value="DRAFT">Draft</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-navy-card border border-border rounded-[4px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-border bg-navy/35 font-body text-[0.72rem] tracking-[0.15em] uppercase text-muted">
                <th className="px-6 py-4 font-semibold">Job Title</th>
                <th className="px-6 py-4 font-semibold">Team / Department</th>
                <th className="px-6 py-4 font-semibold">Location / Type</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Closes At</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-dim font-body text-xs">
              {filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted">
                    No job postings found.
                  </td>
                </tr>
              ) : (
                filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-navy-hover transition-colors">
                    <td className="px-6 py-4 font-medium text-white">{job.title}</td>
                    <td className="px-6 py-4 text-muted uppercase tracking-wider">{job.team}</td>
                    <td className="px-6 py-4 text-muted font-light">
                      <div>{job.location}</div>
                      <div className="text-[10px] text-muted-dim uppercase mt-0.5">{job.type.replace('_', ' ')}</div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={getStatusVariant(job.status)}>{job.status}</Badge>
                    </td>
                    <td className="px-6 py-4 text-muted">
                      {job.closesAt ? (
                        <div className="flex items-center gap-1.5">
                          <Calendar size={13} className="text-muted-dim" />
                          {new Date(job.closesAt).toLocaleDateString()}
                        </div>
                      ) : (
                        <span className="opacity-25">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-3">
                        <Link
                          href={`/admin/jobs/${job.id}`}
                          className="p-1.5 bg-navy border border-border rounded-[2px] text-muted hover:text-gold hover:border-gold transition-colors duration-200"
                        >
                          <Edit size={14} />
                        </Link>
                        <button
                          onClick={() => setDeleteId(job.id)}
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
            Are you sure you want to delete this job listing? This action is irreversible.
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
