import type { Metadata } from 'next';
import type { MetadataRoute } from 'next';
import { DEFAULT_SETTINGS } from './settings';

export const SITE_NAME = 'Koventra Systems';
export const SITE_DOMAIN = 'https://koventrasystems.com';
export const DEFAULT_OG_IMAGE = '/og-image.png';
export const DEFAULT_DESCRIPTION = DEFAULT_SETTINGS.metaDescription;

export function buildMetadata({
  title,
  description,
  pathname,
  ogImageUrl,
}: {
  title?: string;
  description?: string;
  pathname?: string;
  ogImageUrl?: string;
} = {}): Metadata {
  const resolvedTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Brand Hub & Product Ecosystem`;
  const resolvedDescription = description ?? DEFAULT_DESCRIPTION;
  const url = pathname ? `${SITE_DOMAIN}${pathname}` : SITE_DOMAIN;
  const ogImage = ogImageUrl
    ? ogImageUrl.startsWith('http')
      ? ogImageUrl
      : `${SITE_DOMAIN}${ogImageUrl}`
    : `${SITE_DOMAIN}${DEFAULT_OG_IMAGE}`;

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    metadataBase: new URL(SITE_DOMAIN),
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url,
      siteName: SITE_NAME,
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description: resolvedDescription,
      images: [ogImage],
    },
  };
}

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_DOMAIN,
    logo: `${SITE_DOMAIN}/logo.png`,
    description: DEFAULT_DESCRIPTION,
    sameAs: [
      'https://twitter.com',
      'https://linkedin.com',
      'https://github.com',
    ],
  };
}
