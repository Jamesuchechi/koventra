import React from 'react';
import { getSiteSettings } from '@/lib/settings';
import HeroClient from './HeroClient';

export default async function Hero() {
  const settings = await getSiteSettings();

  const stats = [
    { value: settings.stat1Num, label: settings.stat1Label },
    { value: settings.stat2Num, label: settings.stat2Label },
    { value: settings.stat3Num, label: settings.stat3Label },
    { value: settings.stat4Num, label: settings.stat4Label },
  ];

  return <HeroClient settings={settings} stats={stats} />;
}