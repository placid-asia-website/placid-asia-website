import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    // Check for secret parameter
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');

    if (!process.env.SEED_SECRET || secret !== process.env.SEED_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('🔍 Starting cleanup and image fix...');

    // STEP 1: Find and deactivate invalid products
    const invalidProducts = await prisma.product.findMany({
      where: {
        OR: [
          {
            title_en: {
              contains: 'Sorry, page not found',
              mode: 'insensitive',
            },
          },
          {
            title_en: {
              contains: 'Page not found',
              mode: 'insensitive',
            },
          },
          {
            sku: {
              contains: 'SKIPNAVIGATION',
              mode: 'insensitive',
            },
          },
          {
            sku: {
              contains: 'PRODUCTS-TOP',
              mode: 'insensitive',
            },
          },
          {
            sku: {
              endsWith: '-HTML',
            },
          },
          {
            AND: [
              {
                supplier: {
                  in: ['SPEKTRA Dresden', 'APS Dynamics'],
                },
              },
              {
                OR: [
                  {
                    title_en: {
                      in: [
                        'Your benefits',
                        'Wishlist',
                        'Product Overview',
                        'Selected References',
                        'Vibration Exciter',
                        'Power Amplifier',
                        'Adapters & Cables',
                        'Options & Accessories',
                        'Accessories',
                        'Power Amplifiers',
                        'System Concept',
                        'Mobile Calibration Solutions',
                        'Measuring systems & Interface cards',
                        'Modes of Operation',
                        'Protection Functions',
                        'Device Testing',
                        'Calibration Solutions',
                        'Engineering Solutions',
                        'Exciter & Components',
                        'Exciters & Components',
                        'Modal Exciters & Components',
                        'Vibration Control Systems',
                        'The SPEKTRA calibration systems',
                        'Mobile Calibration System CV-10',
                        'S-TEST Lab Systems',
                        'My Wishlist',
                      ],
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    });

    // Group by supplier for reporting
    const bySupplier: Record<string, typeof invalidProducts> = {};
    invalidProducts.forEach((p) => {
      const supplier = p.supplier || 'Unknown';
      if (!bySupplier[supplier]) bySupplier[supplier] = [];
      bySupplier[supplier].push(p);
    });

    // Deactivate invalid products
    let deactivatedCount = 0;
    if (invalidProducts.length > 0) {
      const result = await prisma.product.updateMany({
        where: {
          sku: {
            in: invalidProducts.map((p) => p.sku),
          },
        },
        data: {
          active: false,
        },
      });
      deactivatedCount = result.count;
    }

    // STEP 2: Fix missing images for Placid Instruments products
    const placidProducts = await prisma.product.findMany({
      where: {
        supplier: 'Placid Instruments',
        active: true,
      },
    });

    const imageUpdates: Array<{ sku: string; imagePath: string }> = [];

    for (const product of placidProducts) {
      const images = product.images as string[] | null;
      const hasValidImage =
        images && Array.isArray(images) && images.length > 0 && images[0].startsWith('/');

      if (!hasValidImage) {
        // Try to find image file in public folder
        const imagePath = `/${product.sku}.jpg`;
        imageUpdates.push({ sku: product.sku, imagePath });
      }
    }

    let imagesFixedCount = 0;
    for (const update of imageUpdates) {
      await prisma.product.update({
        where: { sku: update.sku },
        data: { images: [update.imagePath] },
      });
      imagesFixedCount++;
    }

    // Get remaining valid products by supplier
    const spektraValid = await prisma.product.count({
      where: {
        supplier: 'SPEKTRA Dresden',
        active: true,
      },
    });

    const apsValid = await prisma.product.count({
      where: {
        supplier: 'APS Dynamics',
        active: true,
      },
    });

    const placidValid = await prisma.product.count({
      where: {
        supplier: 'Placid Instruments',
        active: true,
      },
    });

    await prisma.$disconnect();

    return NextResponse.json({
      success: true,
      message: 'Product cleanup and image fix completed successfully',
      details: {
        step1_invalidProducts: {
          invalidProductsFound: invalidProducts.length,
          deactivatedCount,
          bySupplier: Object.entries(bySupplier).map(([supplier, products]) => ({
            supplier,
            count: products.length,
            skus: products.map((p) => p.sku),
          })),
        },
        step2_imagesFix: {
          placidProductsChecked: placidProducts.length,
          imagesFixed: imagesFixedCount,
          updatedSkus: imageUpdates.map((u) => u.sku),
        },
        validProductsRemaining: {
          spektraDresden: spektraValid,
          apsDynamics: apsValid,
          placidInstruments: placidValid,
        },
      },
    });
  } catch (error: any) {
    console.error('Error during cleanup:', error);
    await prisma.$disconnect();
    return NextResponse.json(
      {
        error: 'Failed to cleanup products',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
