import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { jobSchema } from '@/lib/validations/job.schema';

export const revalidate = 0;

// GET /api/v1/jobs - public access (only shows OPEN jobs)
export async function GET() {
  try {
    const jobs = await prisma.jobListing.findMany({
      where: { status: 'OPEN' },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, data: jobs });
  } catch (error) {
    console.error('API Error: GET jobs failed:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch jobs' }, { status: 500 });
  }
}

// POST /api/v1/jobs - authenticated write access
export async function POST(req: NextRequest) {
  try {
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

    const job = await prisma.jobListing.create({
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

    return NextResponse.json({ success: true, data: job }, { status: 201 });
  } catch (error) {
    console.error('API Error: POST job failed:', error);
    return NextResponse.json({ success: false, error: 'Failed to create job' }, { status: 500 });
  }
}
