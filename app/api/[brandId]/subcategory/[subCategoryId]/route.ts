import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

const slugify = (str: string): string => str.toLowerCase()
                            .replace(/[^a-z0-9]+/g, '-')
                            .replace(/(^-|-$)+/g, '');

export async function GET(
  req: Request,
  { params }: { params: { subCategoryId: string } }
) {
  try {
    if (!params.subCategoryId) {
      return new NextResponse("All Category id is required", { status: 400 });
    }

    const subCategory = await prismadb.allCategory.findUnique({
      where: {
        id: params.subCategoryId,
        type: "Sub Category"
      }
    });
  
    return NextResponse.json(subCategory);
  } catch (error) {
    console.log('[SUB_CATEGORY_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { subCategoryId: string, brandId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.subCategoryId) {
      return new NextResponse("Sub Category id is required", { status: 400 });
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

    const subCategory = await prismadb.allCategory.delete({
      where: {
        id: params.subCategoryId
      }
    });
  
    return NextResponse.json(subCategory);
  } catch (error) {
    console.log('[SUB_CATEGORY_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  { params }: { params: { subCategoryId: string, brandId: string } }
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

    if (!params.subCategoryId) {
      return new NextResponse("Sub Category id is required", { status: 400 });
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

    const subCategory = await prismadb.allCategory.update({
      where: {
        id: params.subCategoryId
      },
      data: {
        type: type,
        name: name,
        slug: slugify(name),
        description: description,
        thumbnail_url: ""
      }
    });
  
    return NextResponse.json(subCategory);
  } catch (error) {
    console.log('[SUB_CATEGORY_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
