import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { jobSchema } from '@/lib/validations/job.schema';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const job = await prisma.jobListing.findUnique({
      where: { id },
    });

    if (!job) {
      return NextResponse.json({ success: false, error: 'Job listing not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: job });
  } catch (error) {
    console.error('API Error: GET job failed:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch job' }, { status: 500 });
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
    const parseResult = jobSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: parseResult.error.flatten() },
        { status: 400 }
      );
    }

    const data = parseResult.data;

    const existing = await prisma.jobListing.findUnique({
      where: { id },
    });
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Job listing not found' }, { status: 404 });
    }

    const job = await prisma.jobListing.update({
      where: { id },
      data: {
        title: data.title,
        team: data.team,
        location: data.location,
        type: data.type,
        status: data.status,
        description: data.description || null,
        applyUrl: data.applyUrl || null,
        closesAt: data.closesAt || null,
      },
    });

    return NextResponse.json({ success: true, data: job });
  } catch (error) {
    console.error('API Error: PUT job failed:', error);
    return NextResponse.json({ success: false, error: 'Failed to update job' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const session = await auth();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const existing = await prisma.jobListing.findUnique({
      where: { id },
    });
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Job listing not found' }, { status: 404 });
    }

    await prisma.jobListing.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Job listing deleted successfully' });
  } catch (error) {
    console.error('API Error: DELETE job failed:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete job' }, { status: 500 });
  }
}
