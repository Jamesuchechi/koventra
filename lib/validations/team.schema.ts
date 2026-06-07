import { z } from 'zod';

export const teamMemberSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  role: z.string().min(1, 'Role is required').max(100, 'Role must be less than 100 characters'),
  bio: z.string().nullable().optional().or(z.literal('')),
  photoUrl: z.string().nullable().optional().or(z.literal('')),
  linkedin: z.string().nullable().optional().or(z.literal('')),
  twitter: z.string().nullable().optional().or(z.literal('')),
  sortOrder: z.number().int().default(0),
  visible: z.boolean().default(true),
});

export type TeamMemberInput = z.infer<typeof teamMemberSchema>;
