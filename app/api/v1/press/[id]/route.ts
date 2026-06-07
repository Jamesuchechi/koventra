import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { pressEntrySchema } from '@/lib/validations/press.schema';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const entry = await prisma.pressEntry.findUnique({
      where: { id },
    });

    if (!entry) {
      return NextResponse.json({ success: false, error: 'Press entry not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: entry });
  } catch (error) {
    console.error('API Error: GET press entry failed:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch press entry' }, { status: 500 });
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
    const parseResult = pressEntrySchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: parseResult.error.flatten() },
        { status: 400 }
      );
    }

    const data = parseResult.data;

    const existing = await prisma.pressEntry.findUnique({
      where: { id },
    });
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Press entry not found' }, { status: 404 });
    }

    const entry = await prisma.pressEntry.update({
      where: { id },
      data: {
        headline: data.headline,
        publication: data.publication,
        url: data.url,
        logoUrl: data.logoUrl || null,
        publishedAt: data.publishedAt,
        featured: data.featured,
      },
    });

    return NextResponse.json({ success: true, data: entry });
  } catch (error) {
    console.error('API Error: PUT press entry failed:', error);
    return NextResponse.json({ success: false, error: 'Failed to update press entry' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const session = await auth();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const existing = await prisma.pressEntry.findUnique({
      where: { id },
    });
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Press entry not found' }, { status: 404 });
    }

    await prisma.pressEntry.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Press entry deleted successfully' });
  } catch (error) {
    console.error('API Error: DELETE press entry failed:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete press entry' }, { status: 500 });
  }
}
