import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { productSchema } from '@/lib/validations/product.schema';

export const revalidate = 0; // Disable static route caching

// GET /api/v1/products - public access
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { sortOrder: 'asc' },
    });
    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    console.error('API Error: GET products failed:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch products' }, { status: 500 });
  }
}

// POST /api/v1/products - authenticated write access
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const parseResult = productSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: parseResult.error.flatten() },
        { status: 400 }
      );
    }

    const data = parseResult.data;

    // Check slug uniqueness
    const existing = await prisma.product.findUnique({
      where: { slug: data.slug },
    });
    if (existing) {
      return NextResponse.json({ success: false, error: 'Product slug must be unique' }, { status: 409 });
    }

    const product = await prisma.product.create({
      data: {
        name: data.name,
        slug: data.slug,
        tagline: data.tagline || null,
        description: data.description || null,
        category: data.category,
        status: data.status,
        externalUrl: data.externalUrl || null,
        logoUrl: data.logoUrl || null,
        images: data.images,
        features: data.features,
        featured: data.featured,
        sortOrder: data.sortOrder,
      },
    });

    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error) {
    console.error('API Error: POST product failed:', error);
    return NextResponse.json({ success: false, error: 'Failed to create product' }, { status: 500 });
  }
}
