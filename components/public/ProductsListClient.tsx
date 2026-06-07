'use client';

import React, { useState } from 'react';
import { Product, ProductCategory } from '@/lib/types';
import ProductCard from '@/components/sections/ProductCard';
import SectionReveal from '@/components/ui/SectionReveal';
import SectionTag from '@/components/ui/SectionTag';
import { Search } from 'lucide-react';

interface ProductsListClientProps {
  initialProducts: Product[];
}

const CATEGORIES: (ProductCategory | 'ALL')[] = ['ALL', 'AI', 'SAAS', 'ENTERPRISE', 'FINTECH', 'OTHER'];

export default function ProductsListClient({ initialProducts }: ProductsListClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'ALL'>('ALL');

  // Filter products based on search term and category selection
  const filteredProducts = initialProducts.filter((product) => {
    const matchesCategory = selectedCategory === 'ALL' || product.category === selectedCategory;
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.tagline || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12">
      {/* Search & Filter Bar */}
      <SectionReveal>
        <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center border-b border-border-dim pb-8">
          {/* Categories select list */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-[10px] tracking-wider uppercase font-body rounded-[2px] transition-all duration-200 border ${
                  selectedCategory === cat
                    ? 'bg-gold border-gold text-navy font-semibold'
                    : 'bg-navy border-border-dim text-muted hover:text-white hover:border-border'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted">
              <Search size={14} />
            </span>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-navy-card border border-border-dim rounded-[2px] font-body text-xs text-white placeholder-muted focus:outline-none focus:border-gold transition-colors duration-200"
            />
          </div>
        </div>
      </SectionReveal>

      {/* Grid of Results */}
      <SectionReveal>
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 border border-border-dim rounded-[4px] bg-navy-card">
            <p className="font-body text-xs text-muted uppercase tracking-wider">
              No products found matching those parameters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-border-dim border border-border-dim rounded-[4px] overflow-hidden">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </SectionReveal>
    </div>
  );
}
