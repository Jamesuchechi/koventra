import type { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';
import { SITE_DOMAIN } from '@/lib/seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_DOMAIN}/`,
      lastModified: new Date(),
    },
    {
      url: `${SITE_DOMAIN}/about`,
      lastModified: new Date(),
    },
    {
      url: `${SITE_DOMAIN}/products`,
      lastModified: new Date(),
    },
    {
      url: `${SITE_DOMAIN}/careers`,
      lastModified: new Date(),
    },
    {
      url: `${SITE_DOMAIN}/press`,
      lastModified: new Date(),
    },
    {
      url: `${SITE_DOMAIN}/contact`,
      lastModified: new Date(),
    },
  ];

  let products: { slug: string; updatedAt: Date }[] = [];
  let jobs: { id: string; updatedAt: Date }[] = [];

  try {
    [products, jobs] = await Promise.all([
      prisma.product.findMany({
        where: { status: { not: 'ARCHIVED' } },
        select: { slug: true, updatedAt: true },
      }),
      prisma.jobListing.findMany({
        where: { status: 'OPEN' },
        select: { id: true, updatedAt: true },
      }),
    ]);
  } catch (error) {
    console.error('Sitemap generation skipped dynamic routes because the database is unavailable:', error);
  }

  products.forEach((product) => {
    routes.push({
      url: `${SITE_DOMAIN}/products/${product.slug}`,
      lastModified: product.updatedAt,
    });
  });

  jobs.forEach((job) => {
    routes.push({
      url: `${SITE_DOMAIN}/careers/${job.id}`,
      lastModified: job.updatedAt,
    });
  });

  return routes;
}
