import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { teamMemberSchema } from '@/lib/validations/team.schema';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const member = await prisma.teamMember.findUnique({
      where: { id },
    });

    if (!member) {
      return NextResponse.json({ success: false, error: 'Team member not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: member });
  } catch (error) {
    console.error('API Error: GET team member failed:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch team member' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
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

    const existing = await prisma.teamMember.findUnique({
      where: { id },
    });
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Team member not found' }, { status: 404 });
    }

    const member = await prisma.teamMember.update({
      where: { id },
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

    return NextResponse.json({ success: true, data: member });
  } catch (error) {
    console.error('API Error: PUT team member failed:', error);
    return NextResponse.json({ success: false, error: 'Failed to update team member' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const session = await auth();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const existing = await prisma.teamMember.findUnique({
      where: { id },
    });
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Team member not found' }, { status: 404 });
    }

    await prisma.teamMember.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Team member deleted successfully' });
  } catch (error) {
    console.error('API Error: DELETE team member failed:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete team member' }, { status: 500 });
  }
}
