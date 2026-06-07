import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

export const revalidate = 0;

// GET /api/v1/settings - public access
export async function GET() {
  try {
    const settings = await prisma.siteSetting.findMany();
    
    // Map list of key-value rows to a single clean JSON object
    const settingsObj = settings.reduce((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {} as Record<string, string>);

    return NextResponse.json({ success: true, data: settingsObj });
  } catch (error) {
    console.error('API Error: GET settings failed:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch settings' }, { status: 500 });
  }
}

// POST /api/v1/settings - authenticated bulk upsert
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json(); // Expected format: { [key: string]: string }

    if (typeof body !== 'object' || body === null) {
      return NextResponse.json({ success: false, error: 'Invalid body format' }, { status: 400 });
    }

    // Perform bulk upserts of settings
    await Promise.all(
      Object.entries(body).map(([key, val]) =>
        prisma.siteSetting.upsert({
          where: { key },
          update: { value: String(val) },
          create: { key, value: String(val) },
        })
      )
    );

    return NextResponse.json({ success: true, message: 'Settings updated successfully' });
  } catch (error) {
    console.error('API Error: POST settings failed:', error);
    return NextResponse.json({ success: false, error: 'Failed to update settings' }, { status: 500 });
  }
}
