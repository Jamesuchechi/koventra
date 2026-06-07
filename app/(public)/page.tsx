import React from 'react';
import Hero from '@/components/sections/Hero';
import Mission from '@/components/sections/Mission';
import Ecosystem from '@/components/sections/Ecosystem';
import WhyKoventra from '@/components/sections/WhyKoventra';
import CTABand from '@/components/sections/CTABand';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main className="min-h-screen bg-navy">
      <Hero />
      <Mission />
      <Ecosystem />
      <WhyKoventra />
      <CTABand />
    </main>
  );
}
