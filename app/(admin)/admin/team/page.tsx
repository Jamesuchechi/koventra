import React from 'react';
import prisma from '@/lib/prisma';
import TeamListClient from '@/components/admin/TeamListClient';

export const revalidate = 0; // Fetch fresh data on each load

export default async function AdminTeamPage() {
  const members = await prisma.teamMember.findMany({
    orderBy: { sortOrder: 'asc' },
    select: {
      id: true,
      name: true,
      role: true,
      photoUrl: true,
      linkedin: true,
      twitter: true,
      sortOrder: true,
      visible: true,
    },
  });

  return <TeamListClient initialMembers={members} />;
}
