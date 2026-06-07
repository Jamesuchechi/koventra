import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { productSchema } from '@/lib/validations/product.schema';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/v1/products/[id] - public access
export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    console.error('API Error: GET product by ID failed:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch product' }, { status: 500 });
  }
}

// PUT /api/v1/products/[id] - authenticated edit access
export async function PUT(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
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

    // Check if product exists
    const existing = await prisma.product.findUnique({
      where: { id },
    });
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }

    // Check slug uniqueness if it changed
    if (data.slug !== existing.slug) {
      const slugDuplicate = await prisma.product.findUnique({
        where: { slug: data.slug },
      });
      if (slugDuplicate) {
        return NextResponse.json({ success: false, error: 'Product slug must be unique' }, { status: 409 });
      }
    }

    const product = await prisma.product.update({
      where: { id },
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

    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    console.error('API Error: PUT product failed:', error);
    return NextResponse.json({ success: false, error: 'Failed to update product' }, { status: 500 });
  }
}

// DELETE /api/v1/products/[id] - authenticated delete access
export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const session = await auth();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const existing = await prisma.product.findUnique({
      where: { id },
    });
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('API Error: DELETE product failed:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete product' }, { status: 500 });
  }
}
