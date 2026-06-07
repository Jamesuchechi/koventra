import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { teamMemberSchema } from '@/lib/validations/team.schema';

export const revalidate = 0;

export async function GET() {
  try {
    const members = await prisma.teamMember.findMany({
      where: { visible: true },
      orderBy: { sortOrder: 'asc' },
    });
    return NextResponse.json({ success: true, data: members });
  } catch (error) {
    console.error('API Error: GET team members failed:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch team members' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const parseResult = teamMemberSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: parseResult.error.flatten() },
        { status: 400 }
      );
    }

    const data = parseResult.data;

    const member = await prisma.teamMember.create({
      data: {
        name: data.name,
        role: data.role,
        bio: data.bio || null,
        photoUrl: data.photoUrl || null,
        linkedin: data.linkedin || null,
        twitter: data.twitter || null,
        sortOrder: data.sortOrder,
        visible: data.visible,
      },
    });

    return NextResponse.json({ success: true, data: member }, { status: 201 });
  } catch (error) {
    console.error('API Error: POST team member failed:', error);
    return NextResponse.json({ success: false, error: 'Failed to create team member' }, { status: 500 });
  }
}
