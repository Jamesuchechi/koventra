'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Edit, Trash, Plus, Search, Star } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import { useRouter } from 'next/navigation';

interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  status: string;
  featured: boolean;
  sortOrder: number;
}

export default function ProductListClient({ initialProducts }: { initialProducts: Product[] }) {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'LIVE':
        return 'green';
      case 'BUILDING':
        return 'yellow';
      case 'PLANNED':
        return 'blue';
      default:
        return 'gray';
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/v1/products/${deleteId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setProducts(products.filter((p) => p.id !== deleteId));
        setDeleteId(null);
        router.refresh();
      } else {
        alert('Failed to delete product.');
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
      {/* Header and Add Action */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-display text-2xl font-light text-white tracking-wide">Products</h1>
          <p className="font-body text-xs text-muted mt-1 uppercase tracking-wider">
            Manage your venture ecosystem
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-gold text-navy font-body text-[0.8rem] font-medium tracking-[0.08em] uppercase rounded-[2px] hover:bg-[#d4b45a] transition-colors duration-200"
        >
          <Plus size={16} />
          New Product
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-muted">
          <Search size={16} />
        </span>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products by name, slug or category..."
          className="w-full pl-10 pr-4 py-2.5 bg-navy-card border border-border rounded-[2px] font-body text-xs text-white focus:outline-none focus:border-gold transition-colors duration-200"
        />
      </div>

      {/* Table container */}
      <div className="bg-navy-card border border-border rounded-[4px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-border bg-navy/35 font-body text-[0.72rem] tracking-[0.15em] uppercase text-muted">
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Featured</th>
                <th className="px-6 py-4 font-semibold">Order</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-dim font-body text-xs">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted">
                    No products found.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-navy-hover transition-colors">
                    <td className="px-6 py-4 font-medium text-white">
                      <div>{product.name}</div>
                      <div className="text-[10px] text-muted font-mono mt-0.5">/{product.slug}</div>
                    </td>
                    <td className="px-6 py-4 text-muted uppercase tracking-wider">{product.category}</td>
                    <td className="px-6 py-4">
                      <Badge variant={getStatusVariant(product.status)}>
                        {product.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      {product.featured ? (
                        <Star className="text-gold fill-gold" size={15} />
                      ) : (
                        <Star className="text-muted" size={15} />
                      )}
                    </td>
                    <td className="px-6 py-4 text-muted">{product.sortOrder}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-3">
                        <Link
                          href={`/admin/products/${product.id}`}
                          className="p-1.5 bg-navy border border-border rounded-[2px] text-muted hover:text-gold hover:border-gold transition-colors duration-200"
                        >
                          <Edit size={14} />
                        </Link>
                        <button
                          onClick={() => setDeleteId(product.id)}
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
            Are you sure you want to delete this product? This action is permanent and will remove all associated features and data from the database.
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
