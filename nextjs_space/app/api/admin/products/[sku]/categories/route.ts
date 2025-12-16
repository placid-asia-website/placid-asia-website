
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth-config';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function PUT(
  request: NextRequest,
  { params }: { params: { sku: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { sku } = params;
    const { categories, primaryCategory } = await request.json();

    // Validate input
    if (!categories || !Array.isArray(categories) || categories.length === 0) {
      return NextResponse.json(
        { error: 'Categories array is required' },
        { status: 400 }
      );
    }

    if (!primaryCategory) {
      return NextResponse.json(
        { error: 'Primary category is required' },
        { status: 400 }
      );
    }

    // Find the product
    const product = await prisma.product.findUnique({
      where: { sku }
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Get the primary category name
    const primaryCat = await prisma.category.findUnique({
      where: { id: primaryCategory }
    });

    if (!primaryCat) {
      return NextResponse.json(
        { error: 'Primary category not found' },
        { status: 404 }
      );
    }

    // Update product's primary category field
    await prisma.product.update({
      where: { sku },
      data: { category: primaryCat.name_en }
    });

    // Delete existing category relationships
    await prisma.productCategory.deleteMany({
      where: { product_id: product.id }
    });

    // Create new category relationships
    for (const categoryId of categories) {
      await prisma.productCategory.create({
        data: {
          product_id: product.id,
          category_id: categoryId,
          is_primary: categoryId === primaryCategory
        }
      });
    }

    // Update category product counts
    const allCategories = await prisma.category.findMany({
      where: { active: true }
    });

    for (const category of allCategories) {
      const count = await prisma.productCategory.count({
        where: {
          category_id: category.id,
          product: { active: true }
        }
      });

      await prisma.category.update({
        where: { id: category.id },
        data: { product_count: count }
      });
    }

    // Fetch updated product with categories
    const updatedProduct = await prisma.product.findUnique({
      where: { sku },
      include: {
        categories: {
          include: {
            category: true
          }
        }
      }
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product categories:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
