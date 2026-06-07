import { Product, ProductCategory, ProductStatus } from './types';

export const NAV_LINKS = [
  { label: 'About', href: '#mission' },
  { label: 'Products', href: '#ecosystem' },
  { label: 'Why Us', href: '#why' },
  { label: 'Careers', href: '#careers' },
];

export const CONTACT_LINK = { label: 'Contact', href: '#contact' };

export const STATS = [
  { value: '1+', label: 'Live products' },
  { value: '3', label: 'Industry verticals' },
  { value: '∞', label: 'Problems left to solve' },
];

export const MISSION_PILLARS = [
  {
    num: '01',
    title: 'Build with precision',
    body: 'Every decision is deliberate. We ship software that is engineered to last, not shipped to impress.',
  },
  {
    num: '02',
    title: 'Think at scale',
    body: 'Our products are designed from day one to serve thousands of teams, not a handful of early adopters.',
  },
  {
    num: '03',
    title: 'Move with purpose',
    body: 'We move fast but deliberately — shipping what matters, cutting what doesn\'t.',
  },
  {
    num: '04',
    title: 'Own the future',
    body: 'We\'re not building for today\'s market. We\'re building for the world five years from now.',
  },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-lex-ai',
    name: 'Lex AI',
    slug: 'lex-ai',
    tagline: 'AI-powered legal workspace',
    description: 'An AI-powered legal workspace built for modern legal teams. Lex AI handles clause extraction, contract risk scoring, intelligent drafting, and real-time collaborative document review — turning weeks of legal work into hours.',
    category: 'AI' as ProductCategory,
    status: 'LIVE' as ProductStatus,
    externalUrl: 'https://ailex.space',
    logoUrl: 'Lx',
    images: [],
    features: ['Clause Extraction', 'Risk Scoring', 'Contract Drafting', 'Collaborative Review', 'Legal Intelligence'],
    featured: true,
    sortOrder: 0,
    launchedAt: '2025-01-15',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-two',
    name: 'Product Two',
    slug: 'product-two',
    tagline: 'Next product in the Koventra ecosystem',
    description: 'The next product in the Koventra ecosystem is taking shape. Built on the same foundation of precision and scale.',
    category: 'SAAS' as ProductCategory,
    status: 'BUILDING' as ProductStatus,
    externalUrl: '#contact',
    logoUrl: 'K2',
    images: [],
    features: [],
    featured: false,
    sortOrder: 1,
    launchedAt: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-three',
    name: 'Product Three',
    slug: 'product-three',
    tagline: 'Another focused venture',
    description: 'Another focused venture is in build. Our pipeline is full — and every product ships when it\'s ready, not before.',
    category: 'SAAS' as ProductCategory,
    status: 'BUILDING' as ProductStatus,
    externalUrl: '#contact',
    logoUrl: 'K3',
    images: [],
    features: [],
    featured: false,
    sortOrder: 2,
    launchedAt: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-unannounced-1',
    name: 'Unannounced',
    slug: 'unannounced-1',
    tagline: null,
    description: 'Something new is being built inside Koventra. Details to follow.',
    category: 'OTHER' as ProductCategory,
    status: 'PLANNED' as ProductStatus,
    externalUrl: null,
    logoUrl: '—',
    images: [],
    features: [],
    featured: false,
    sortOrder: 3,
    launchedAt: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-unannounced-2',
    name: 'Unannounced',
    slug: 'unannounced-2',
    tagline: null,
    description: 'The ecosystem keeps growing. More ventures are always in the pipeline.',
    category: 'OTHER' as ProductCategory,
    status: 'PLANNED' as ProductStatus,
    externalUrl: null,
    logoUrl: '—',
    images: [],
    features: [],
    featured: false,
    sortOrder: 4,
    launchedAt: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const DIFFERENTIATORS = [
  {
    num: '01',
    title: 'Deep domain focus',
    body: 'Each product is backed by real research and domain expertise — not trend-chasing. We go deep before we go wide.',
  },
  {
    num: '02',
    title: 'Unified infrastructure',
    body: 'Our products share a common technical foundation — faster development, better security, compounding knowledge.',
  },
  {
    num: '03',
    title: 'Long-term conviction',
    body: 'Koventra is built to last decades. We measure success in years — and every product decision reflects that.',
  },
  {
    num: '04',
    title: 'People first, always',
    body: 'Every tool we build is designed around how people actually work — intuitive by default, powerful when needed.',
  },
];

export const FOOTER_COLUMNS = [
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#mission' },
      { label: 'Our Values', href: '#why' },
      { label: 'Careers', href: '#careers' },
      { label: 'Press', href: '#press' },
    ],
  },
  {
    title: 'Products',
    links: [
      { label: 'Lex AI', href: 'https://ailex.space', external: true },
      { label: 'Product Two', href: '#' },
      { label: 'Product Three', href: '#' },
      { label: 'Roadmap', href: '#' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'hello@koventrasystems.com', href: 'mailto:hello@koventrasystems.com' },
      { label: 'LinkedIn', href: '#' },
      { label: 'Twitter / X', href: '#' },
      { label: 'Privacy Policy', href: '#' },
    ],
  },
];
