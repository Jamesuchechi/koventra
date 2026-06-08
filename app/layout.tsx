import type { Metadata } from 'next';
import Script from 'next/script';
import localFont from 'next/font/local';
import '../styles/globals.css';
import { buildMetadata, getOrganizationSchema } from '@/lib/seo';

const displayFont = localFont({
  src: [
    { path: '../public/fonts/cormorant-garamond-300-normal.woff2', weight: '300', style: 'normal' },
    { path: '../public/fonts/cormorant-garamond-300-italic.woff2', weight: '300', style: 'italic' },
    { path: '../public/fonts/cormorant-garamond-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/cormorant-garamond-400-italic.woff2', weight: '400', style: 'italic' },
    { path: '../public/fonts/cormorant-garamond-500-normal.woff2', weight: '500', style: 'normal' },
    { path: '../public/fonts/cormorant-garamond-500-italic.woff2', weight: '500', style: 'italic' },
    { path: '../public/fonts/cormorant-garamond-600-normal.woff2', weight: '600', style: 'normal' },
    { path: '../public/fonts/cormorant-garamond-600-italic.woff2', weight: '600', style: 'italic' },
    { path: '../public/fonts/cormorant-garamond-700-normal.woff2', weight: '700', style: 'normal' },
    { path: '../public/fonts/cormorant-garamond-700-italic.woff2', weight: '700', style: 'italic' },
  ],
  variable: '--font-display',
  display: 'swap',
});

const bodyFont = localFont({
  src: [
    { path: '../public/fonts/dm-sans-300-normal.woff2', weight: '300', style: 'normal' },
    { path: '../public/fonts/dm-sans-300-italic.woff2', weight: '300', style: 'italic' },
    { path: '../public/fonts/dm-sans-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/dm-sans-400-italic.woff2', weight: '400', style: 'italic' },
    { path: '../public/fonts/dm-sans-500-normal.woff2', weight: '500', style: 'normal' },
    { path: '../public/fonts/dm-sans-500-italic.woff2', weight: '500', style: 'italic' },
    { path: '../public/fonts/dm-sans-700-normal.woff2', weight: '700', style: 'normal' },
    { path: '../public/fonts/dm-sans-700-italic.woff2', weight: '700', style: 'italic' },
  ],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = buildMetadata();

const organizationSchema = getOrganizationSchema();
const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body className="antialiased bg-navy text-white min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {plausibleDomain && (
          <Script
            src="https://plausible.io/js/plausible.js"
            strategy="afterInteractive"
            data-domain={plausibleDomain}
          />
        )}
        {children}
      </body>
    </html>
  );
}
