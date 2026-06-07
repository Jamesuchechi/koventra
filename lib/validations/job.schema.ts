import { z } from 'zod';

export const jobSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  team: z.string().min(1, 'Team is required').max(100, 'Team must be less than 100 characters'),
  location: z.string().min(1, 'Location is required').max(100, 'Location must be less than 100 characters'),
  type: z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP']),
  status: z.enum(['OPEN', 'CLOSED', 'DRAFT']),
  description: z.string().nullable().optional().or(z.literal('')),
  applyUrl: z.string().nullable().optional().or(z.literal('')),
  closesAt: z
    .preprocess((val) => {
      if (!val || val === '') return null;
      return new Date(val as string);
    }, z.date().nullable())
    .optional(),
});

export type JobInput = z.infer<typeof jobSchema>;
