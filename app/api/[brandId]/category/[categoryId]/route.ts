import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

const slugify = (str: string): string => str.toLowerCase()
                            .replace(/[^a-z0-9]+/g, '-')
                            .replace(/(^-|-$)+/g, '');

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    const Category = await prismadb.allCategory.findUnique({
      where: {
        id: params.categoryId,
        type: "Category"
      }
    });
  
    return NextResponse.json(Category);
  } catch (error) {
    console.log('[CATEGORY_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { categoryId: string, brandId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
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

    const Category = await prismadb.allCategory.delete({
      where: {
        id: params.categoryId
      }
    });
  
    return NextResponse.json(Category);
  } catch (error) {
    console.log('[CATEGORY_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  { params }: { params: { categoryId: string, brandId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { type, name, description } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
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

    const Category = await prismadb.allCategory.update({
      where: {
        id: params.categoryId
      },
      data: {
        type: type,
        name: name,
        slug: slugify(name),
        description: description,
        thumbnail_url: ""
      }
    });
  
    return NextResponse.json(Category);
  } catch (error) {
    console.log('[CATEGORY_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
