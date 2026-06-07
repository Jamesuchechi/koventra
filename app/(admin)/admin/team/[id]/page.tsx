import React from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import TeamMemberForm from '@/components/admin/TeamMemberForm';

interface EditTeamPageProps {
  params: Promise<{ id: string }>;
}

export const revalidate = 0; // Fresh database query on each load

export default async function EditTeamPage({ params }: EditTeamPageProps) {
  const { id } = await params;

  const member = await prisma.teamMember.findUnique({
    where: { id },
  });

  if (!member) {
    notFound();
  }

  return <TeamMemberForm initialData={member} isEdit={true} />;
}
