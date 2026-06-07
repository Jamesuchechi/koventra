import { PrismaClient, ProductCategory, ProductStatus, JobType, JobStatus } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Admin User
  const adminEmail = 'admin@koventra.com';
  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await hash('koventra2026!', 12);
    await prisma.adminUser.create({
      data: {
        email: adminEmail,
        name: 'James Uchechi',
        password: hashedPassword,
      },
    });
    console.log('Created default admin user: admin@koventra.com / koventra2026!');
  }

  // 2. Site Settings
  const defaultSettings = [
    { key: 'heroEyebrow', value: 'Koventra Systems' },
    { key: 'heroTitle', value: 'Building the intelligence layer for modern industry' },
    { key: 'heroSubtitle', value: 'We design, build, and scale technology products that solve hard problems — across AI, legal tech, SaaS, and enterprise software.' },
    { key: 'missionEyebrow', value: 'Who We Are' },
    { key: 'missionTitle', value: 'A systems company that builds to last' },
    { key: 'missionParagraph1', value: "Koventra Systems is the parent organization behind a growing portfolio of technology ventures. We don't build features — we build companies. Each product under our umbrella is designed with a singular focus, long-term capital, and a mandate to lead its category." },
    { key: 'missionParagraph2', value: 'From legal intelligence to enterprise cloud infrastructure, our ventures share a common foundation: precision engineering, deep domain expertise, and the conviction that great software changes how industries operate.' },
    { key: 'stat1Num', value: '$400M+' },
    { key: 'stat1Label', value: 'Venture Value' },
    { key: 'stat2Num', value: '04' },
    { key: 'stat2Label', value: 'Active Ventures' },
    { key: 'stat3Num', value: '2024' },
    { key: 'stat3Label', value: 'Founded' },
    { key: 'stat4Num', value: '100%' },
    { key: 'stat4Label', value: 'Private Capital' },
    { key: 'ogImageUrl', value: '/images/default-og.jpg' },
    { key: 'metaDescription', value: 'Parent company of a portfolio of industry leading software companies.' }
  ];

  for (const setting of defaultSettings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
  }
  console.log('Upserted default site settings.');

  // 3. Products
  const products = [
    {
      name: 'Lex AI',
      slug: 'lex-ai',
      tagline: 'AI-powered legal workspace',
      description: 'An AI-powered legal workspace built for modern legal teams. Lex AI handles clause extraction, contract risk scoring, intelligent drafting, and real-time collaborative document review — turning weeks of legal work into hours.',
      category: ProductCategory.AI,
      status: ProductStatus.LIVE,
      externalUrl: 'https://ailex.space',
      logoUrl: 'Lx',
      features: JSON.stringify(['Clause Extraction', 'Risk Scoring', 'Contract Drafting', 'Collaborative Review', 'Legal Intelligence']),
      images: JSON.stringify([]),
      featured: true,
      sortOrder: 0,
      launchedAt: new Date('2025-01-15'),
    },
    {
      name: 'Product Two',
      slug: 'product-two',
      tagline: 'Next product in the Koventra ecosystem',
      description: 'The next product in the Koventra ecosystem is taking shape. Built on the same foundation of precision and scale.',
      category: ProductCategory.SAAS,
      status: ProductStatus.BUILDING,
      externalUrl: '#contact',
      logoUrl: 'K2',
      features: JSON.stringify([]),
      images: JSON.stringify([]),
      featured: false,
      sortOrder: 1,
    },
    {
      name: 'Product Three',
      slug: 'product-three',
      tagline: 'Another focused venture',
      description: 'Another focused venture is in build. Our pipeline is full — and every product ships when it\'s ready, not before.',
      category: ProductCategory.SAAS,
      status: ProductStatus.BUILDING,
      externalUrl: '#contact',
      logoUrl: 'K3',
      features: JSON.stringify([]),
      images: JSON.stringify([]),
      featured: false,
      sortOrder: 2,
    },
    {
      name: 'Unannounced One',
      slug: 'unannounced-1',
      tagline: 'Deep research phase',
      description: 'Something new is being built inside Koventra. Details to follow.',
      category: ProductCategory.OTHER,
      status: ProductStatus.PLANNED,
      externalUrl: null,
      logoUrl: '—',
      features: JSON.stringify([]),
      images: JSON.stringify([]),
      featured: false,
      sortOrder: 3,
    },
    {
      name: 'Unannounced Two',
      slug: 'unannounced-2',
      tagline: 'Ecosystem growth pipeline',
      description: 'The ecosystem keeps growing. More ventures are always in the pipeline.',
      category: ProductCategory.OTHER,
      status: ProductStatus.PLANNED,
      externalUrl: null,
      logoUrl: '—',
      features: JSON.stringify([]),
      images: JSON.stringify([]),
      featured: false,
      sortOrder: 4,
    }
  ];

  for (const prod of products) {
    await prisma.product.upsert({
      where: { slug: prod.slug },
      update: {},
      create: prod,
    });
  }
  console.log('Upserted default products (including Lex AI).');

  // 4. Team Members
  const team = [
    {
      name: 'Joseph Harry',
      role: 'Managing Partner & Founder',
      bio: 'Joseph oversees corporate directive, capital allocation, and systems architecture across all Koventra portfolios. Previously built and exited two enterprise SaaS organizations.',
      photoUrl: null,
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      sortOrder: 0,
      visible: true,
    },
    {
      name: 'James Uchechi',
      role: 'Head of Artificial Intelligence & Co-Founder',
      bio: 'James leads neural architectural research and LLM fine-tuning pipelines. Formerly research engineer at OpenAI and PhD candidate at Stanford.',
      photoUrl: null,
      linkedin: 'https://linkedin.com',
      twitter: 'https://x.com/jamesuchechi6',
      sortOrder: 1,
      visible: true,
    },
    {
      name: 'Marcus Vance',
      role: 'Principal Systems Architect',
      bio: 'Marcus manages distributed cluster configurations, API endpoints security, and container orchestration frameworks. Open-source contributor to Postgres and Linux kernel kernels.',
      photoUrl: null,
      linkedin: null,
      twitter: 'https://twitter.com',
      sortOrder: 2,
      visible: true,
    }
  ];

  for (const member of team) {
    const existingMember = await prisma.teamMember.findFirst({
      where: { name: member.name },
    });
    if (!existingMember) {
      await prisma.teamMember.create({ data: member });
    }
  }
  console.log('Upserted default team directory.');

  // 5. Job Listings
  const jobs = [
    {
      title: 'Senior Machine Learning Engineer',
      team: 'Lex AI Research',
      location: 'New York, NY (Hybrid)',
      type: JobType.FULL_TIME,
      status: JobStatus.OPEN,
      description: 'We are looking for a Senior Machine Learning Engineer to join our Lex AI division. You will design, build, and deploy fine-tuned legal LLMs, clause extraction pipelines, and contract embeddings. Experience with PyTorch, Transformers, and vector databases is required.',
      applyUrl: 'https://careers.koventra.com/apply/ml-engineer',
    },
    {
      title: 'Principal Software Engineer (Rust/C++)',
      team: 'Core Systems Infrastructure',
      location: 'Remote (US/EU)',
      type: JobType.FULL_TIME,
      status: JobStatus.OPEN,
      description: 'Join the core infrastructure squad building distributed storage engines and highly performant backend layers. You will optimize low-latency APIs, compile custom tooling, and enforce system security primitives. Deep systems level engineering experience is mandatory.',
      applyUrl: null,
    }
  ];

  for (const job of jobs) {
    const existingJob = await prisma.jobListing.findFirst({
      where: { title: job.title },
    });
    if (!existingJob) {
      await prisma.jobListing.create({ data: job });
    }
  }
  console.log('Upserted default job vacancies.');

  // 6. Press Entries
  const press = [
    {
      headline: 'Koventra Systems Announces Launch of Lex AI Workspace to Optimize Contract Legal Tech',
      publication: 'Lex AI Press',
      url: 'https://ailex.space',
      logoUrl: null,
      publishedAt: new Date('2025-01-20'),
      featured: true,
    },
    {
      headline: 'Parent Company Koventra Systems Deploys $100M Private Capital Venture Fund for Enterprise SaaS',
      publication: 'Bloomberg',
      url: 'https://bloomberg.com',
      logoUrl: null,
      publishedAt: new Date('2024-11-05'),
      featured: true,
    }
  ];

  for (const entry of press) {
    const existingEntry = await prisma.pressEntry.findFirst({
      where: { headline: entry.headline },
    });
    if (!existingEntry) {
      await prisma.pressEntry.create({ data: entry });
    }
  }
  console.log('Upserted default press coverage releases.');

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
