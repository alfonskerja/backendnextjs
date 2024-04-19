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

    const { name, sizeId,  description, isFeatured, isArchived, images_catalogues, datasheet, cover_img } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    // if (!images_catalogues || !images_catalogues.length) {
    //   return new NextResponse("Images are required", { status: 400 });
    // }
    
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!sizeId) {
      return new NextResponse("Size id is required", { status: 400 });
    }

    // if (!specification) {
    //   return new NextResponse("Specification is required", { status: 400 });
    // }

    if (!params.brandId) {
      return new NextResponse("brand id is required", { status: 400 });
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

    // const allCategoryFinal = allCategories

    const product = await prismadb.product.create({
      data: {
        images_catalogues: {
          createMany: {
            data: [
              ...images_catalogues.map((image: { url: string }) => image),
            ],
          },
        },
        datasheet: {
          createMany: {
            data: [
              ...datasheet.map((image: { url: string }) => image),
            ],
          },
        },
        cover_img: {
          createMany: {
            data: [
              ...cover_img.map((image: { url: string }) => image),
            ],
          },
        },
        name: name,
        slug: slugify(name),
        // size: size,
        // allCategory: allCategoryFinal,
        description: description,
        // specification: specification,
        isFeatured: isFeatured,
        isArchived: isArchived,
        sizeId: sizeId,
        specId: "0",
        // allCategoryId: "",
        // specificationId: "",
        brandId: params.brandId,
      },
    });
  
    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCTS_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function GET(
  req: Request,
  { params }: { params: { brandId: string } },
) {
  try {
    const { searchParams } = new URL(req.url)
    // const allCategoryId = searchParams.get('allCategoryId') || undefined;
    // const specificationId = searchParams.get('specificationId') || undefined;
    const isFeatured = searchParams.get('isFeatured');

    if (!params.brandId) {
      return new NextResponse("brand id is required", { status: 400 });
    }

    const products = await prismadb.product.findMany({
      where: {
        brandId: params.brandId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        // images_catalogues: true,
        // datasheet: true,
        cover_img: true,
        allCat: true,
        // specification: true,
        size: true,
      },
      orderBy: {
        createdAt: 'desc',
      }
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log('[PRODUCTS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
