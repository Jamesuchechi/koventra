import React from 'react';
import Hero from '@/components/sections/Hero';
import Mission from '@/components/sections/Mission';
import Ecosystem from '@/components/sections/Ecosystem';
import WhyKoventra from '@/components/sections/WhyKoventra';
import CTABand from '@/components/sections/CTABand';
import StickyStackContainer from '@/components/layout/StickyStackContainer';
import { buildMetadata } from '@/lib/seo';

export const dynamic = 'auto';
export const revalidate = 60;
export const metadata = buildMetadata({
  title: 'Brand Hub & Product Ecosystem',
  description: 'The parent organization and ecosystem portal for Koventra Systems portfolio products.',
  pathname: '/',
});

export default function Home() {
  return (
    <main className="min-h-screen bg-navy">
      <StickyStackContainer navHeight={90}>
        <Hero />
        <Mission />
        <Ecosystem />
        <WhyKoventra />
        <CTABand />
      </StickyStackContainer>
    </main>
  );
}
