import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase, numbers, or hyphens only'),
  tagline: z.string().max(150, 'Tagline must be less than 150 characters').nullable().optional().or(z.literal('')),
  description: z.string().nullable().optional().or(z.literal('')),
  category: z.enum(['AI', 'SAAS', 'ENTERPRISE', 'FINTECH', 'OTHER']),
  status: z.enum(['PLANNED', 'BUILDING', 'LIVE', 'ARCHIVED']),
  externalUrl: z.string().nullable().optional().or(z.literal('')),
  logoUrl: z.string().nullable().optional().or(z.literal('')),
  images: z.array(z.string()).default([]),
  features: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  sortOrder: z.number().int().default(0),
});

export type ProductInput = z.infer<typeof productSchema>;
