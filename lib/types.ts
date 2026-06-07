export type ProductStatus = 'PLANNED' | 'BUILDING' | 'LIVE' | 'ARCHIVED';

export type ProductCategory = 'AI' | 'SAAS' | 'ENTERPRISE' | 'FINTECH' | 'OTHER';

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string | null;
  description: string | null;
  category: ProductCategory;
  status: ProductStatus;
  externalUrl: string | null;
  logoUrl: string | null;
  images: string[]; // parsed from Json
  features: string[]; // parsed from Json
  featured: boolean;
  sortOrder: number;
  launchedAt: Date | string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  photoUrl: string | null;
  linkedin: string | null;
  twitter: string | null;
  sortOrder: number;
  visible: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export type JobType = 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERNSHIP';
export type JobStatus = 'OPEN' | 'CLOSED' | 'DRAFT';

export interface JobListing {
  id: string;
  title: string;
  team: string;
  location: string;
  type: JobType;
  status: JobStatus;
  description: string | null;
  applyUrl: string | null;
  closesAt: Date | string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface PressEntry {
  id: string;
  headline: string;
  publication: string;
  url: string;
  logoUrl: string | null;
  publishedAt: Date | string;
  featured: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: string;
  updatedAt: Date | string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company: string | null;
  subject: string | null;
  message: string;
  createdAt: Date | string;
}
