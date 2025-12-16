
import { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Folder, FolderOpen, FileText } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Product Categories - Placid Asia',
  description: 'Browse our comprehensive range of acoustic and vibration measurement products organized by category',
};

interface CategoryBase {
  id: string;
  name_en: string;
  name_th: string;
  slug: string;
  description_en: string | null;
  product_count: number;
  order: number;
}

interface CategoryWithChildren extends CategoryBase {
  children?: CategoryWithChildren[];
}

async function getCategoryHierarchy(): Promise<CategoryWithChildren[]> {
  const categories = await prisma.category.findMany({
    where: {
      active: true,
      parent_id: null, // Get root categories only
    },
    orderBy: { order: 'asc' },
    select: {
      id: true,
      name_en: true,
      name_th: true,
      slug: true,
      description_en: true,
      product_count: true,
      order: true,
      children: {
        where: { active: true },
        orderBy: { order: 'asc' },
        select: {
          id: true,
          name_en: true,
          name_th: true,
          slug: true,
          description_en: true,
          product_count: true,
          order: true,
          children: {
            where: { active: true },
            orderBy: { order: 'asc' },
            select: {
              id: true,
              name_en: true,
              name_th: true,
              slug: true,
              description_en: true,
              product_count: true,
              order: true,
            },
          },
        },
      },
    },
  });

  return categories;
}

function CategoryCard({ category, level = 0 }: { category: CategoryWithChildren; level?: number }) {
  const hasChildren = category.children && category.children.length > 0;
  const Icon = level === 0 ? Folder : level === 1 ? FolderOpen : FileText;
  const marginLeft = level * 24; // Indent based on level

  return (
    <div style={{ marginLeft: `${marginLeft}px` }}>
      <Link href={`/categories/${category.slug}`}>
        <Card className="mb-4 hover:shadow-lg transition-shadow border-2 hover:border-accent cursor-pointer">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icon className={`h-6 w-6 ${level === 0 ? 'text-primary' : level === 1 ? 'text-accent' : 'text-muted-foreground'}`} />
                <div>
                  <CardTitle className="text-lg">
                    {category.name_en}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {category.name_th}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-sm">
                  {category.product_count} Products
                </Badge>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </CardHeader>
          {category.description_en && (
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {category.description_en}
              </p>
            </CardContent>
          )}
        </Card>
      </Link>

      {/* Render children recursively */}
      {hasChildren && category.children && (
        <div className="ml-0">
          {category.children.map((child) => (
            <CategoryCard key={child.id} category={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default async function CategoriesHierarchyPage() {
  const categories = await getCategoryHierarchy();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Product Categories
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Browse our comprehensive range of professional acoustic and vibration measurement equipment
        </p>
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Folder className="h-4 w-4" />
          <span>Organized into {categories.length} main categories</span>
        </div>
      </div>

      {/* Category Hierarchy */}
      <div className="max-w-4xl mx-auto">
        <Card className="p-6 mb-8 bg-muted/50">
          <div className="flex items-center gap-3 mb-4">
            <Folder className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Category Legend</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Folder className="h-4 w-4 text-primary" />
              <span>Main Categories</span>
            </div>
            <div className="flex items-center gap-2">
              <FolderOpen className="h-4 w-4 text-accent" />
              <span>Sub-Categories</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span>Product Types</span>
            </div>
          </div>
        </Card>

        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-12 text-center">
        <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/10 to-accent/10 border-accent/20">
          <CardContent className="pt-6">
            <h3 className="text-xl font-semibold mb-2">Need Help Choosing?</h3>
            <p className="text-muted-foreground mb-4">
              Our experts can help you select the right equipment for your specific application
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-medium text-white hover:bg-accent/90 transition-colors"
            >
              Contact Our Team
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
