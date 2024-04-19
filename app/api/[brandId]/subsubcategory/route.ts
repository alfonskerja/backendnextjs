import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';
 
const slugify = (str: string): string => str.toLowerCase()
                            .replace(/[^a-z0-9]+/g, '-')
                            .replace(/(^-|-$)+/g, '');

export async function POST(
  req: Request,
  { params }: { params: { brandId: string } }
) {
  try {
    const { userId } = auth();
    
    const body = await req.json();

    const { name, description, type } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.brandId) {
      return new NextResponse("Brand id is required", { status: 400 });
    }

    const brandByUserId = await prismadb.brand.findFirst({
      where: {
        id: params.brandId,
        userId
      }
    });

    if (!brandByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const subsubCategory = await prismadb.allCategory.create({
      data: {
        name: name,
        description: description,
        brandId: params.brandId,
        type: type,
        slug: slugify(name),
        thumbnail_url:"",
      }
    });
    return NextResponse.json(subsubCategory);
  } catch (error) {
    console.log('[SUB_SUB_CATEGORY_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function GET(
  req: Request,
  { params }: { params: { brandId: string } }
) {
  try {
    if (!params.brandId) {
      return new NextResponse("Brand id is required", { status: 400 });
    }

    const subsubcategories = await prismadb.allCategory.findMany({
      where: {
        brandId: params.brandId,
        type: "Sub Sub Category"
      }
    });
  
    return NextResponse.json(subsubcategories);
  } catch (error) {
    console.log('[SUB_SUB_CATEGORY_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};