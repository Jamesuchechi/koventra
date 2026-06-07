import { z } from 'zod';

export const pressEntrySchema = z.object({
  headline: z.string().min(1, 'Headline is required').max(200, 'Headline must be less than 200 characters'),
  publication: z.string().min(1, 'Publication is required').max(100, 'Publication name must be less than 100 characters'),
  url: z.string().min(1, 'URL is required').url('Invalid URL format'),
  logoUrl: z.string().nullable().optional().or(z.literal('')),
  publishedAt: z.preprocess((val) => {
    if (!val || val === '') return new Date();
    return new Date(val as string);
  }, z.date()),
  featured: z.boolean().default(false),
});

export type PressEntryInput = z.infer<typeof pressEntrySchema>;
