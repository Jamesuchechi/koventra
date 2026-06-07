import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { pressEntrySchema } from '@/lib/validations/press.schema';

export const revalidate = 0;

// GET /api/v1/press - public access
export async function GET() {
  try {
    const entries = await prisma.pressEntry.findMany({
      orderBy: { publishedAt: 'desc' },
    });
    return NextResponse.json({ success: true, data: entries });
  } catch (error) {
    console.error('API Error: GET press entries failed:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch press entries' }, { status: 500 });
  }
}

// POST /api/v1/press - authenticated write access
export async function POST(req: NextRequest) {
  try {
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

    const entry = await prisma.pressEntry.create({
      data: {
        headline: data.headline,
        publication: data.publication,
        url: data.url,
        logoUrl: data.logoUrl || null,
        publishedAt: data.publishedAt,
        featured: data.featured,
      },
    });

    return NextResponse.json({ success: true, data: entry }, { status: 201 });
  } catch (error) {
    console.error('API Error: POST press entry failed:', error);
    return NextResponse.json({ success: false, error: 'Failed to create press entry' }, { status: 500 });
  }
}
