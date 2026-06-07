import React from 'react';
import prisma from '@/lib/prisma';
import SettingsClient from '@/components/admin/SettingsClient';

export const revalidate = 0; // Fresh database query on each load

export default async function SettingsPage() {
  const settings = await prisma.siteSetting.findMany();
  
  // Transform database settings rows into a flat key-value object
  const settingsObj = settings.reduce((acc, item) => {
    acc[item.key] = item.value;
    return acc;
  }, {} as Record<string, string>);

  return <SettingsClient initialSettings={settingsObj} />;
}
