import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

const slugify = (str: string): string => str.toLowerCase()
                            .replace(/[^a-z0-9]+/g, '-')
                            .replace(/(^-|-$)+/g, '');

export async function GET(
  req: Request,
  { params }: { params: { subSubCategoryId: string } }
) {
  try {
    if (!params.subSubCategoryId) {
      return new NextResponse("Sub Sub Category id is required", { status: 400 });
    }

    const subsubCategory = await prismadb.allCategory.findUnique({
      where: {
        id: params.subSubCategoryId,
        type: "Sub Sub Category"
      }
    });
  
    return NextResponse.json(subsubCategory);
  } catch (error) {
    console.log('[SUB_SUB_CATEGORY_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { subSubCategoryId: string, brandId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.subSubCategoryId) {
      return new NextResponse("Sub Sub Category id is required", { status: 400 });
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

    const subsubCategory = await prismadb.allCategory.delete({
      where: {
        id: params.subSubCategoryId
      }
    });
  
    return NextResponse.json(subsubCategory);
  } catch (error) {
    console.log('[SUB_SUB_CATEGORY_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  { params }: { params: { subSubCategoryId: string, brandId: string } }
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

    if (!params.subSubCategoryId) {
      return new NextResponse("Sub Sub Category id is required", { status: 400 });
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

    const subsubCategory = await prismadb.allCategory.update({
      where: {
        id: params.subSubCategoryId
      },
      data: {
        type: type,
        name: name,
        slug: slugify(name),
        description: description,
        thumbnail_url: ""
      }
    });
  
    return NextResponse.json(subsubCategory);
  } catch (error) {
    console.log('[SUB_SUB_CATEGORY_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
