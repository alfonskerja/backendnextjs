import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

export async function GET(
  req: Request,
  { params }: { params: { allCategoryProductId: string } }
) {
  try {
    if (!params.allCategoryProductId) {
      return new NextResponse("All Category Product id is required", { status: 400 });
    }

    const allproductcategory = await prismadb.allProductCategory.findUnique({
      where: {
        id: params.allCategoryProductId
      }
    });
    return NextResponse.json(allproductcategory);
  } catch (error) {
    console.log('[ALL_PRODUCT_CATEGORY_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { allCategoryProductId: string, brandId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.allCategoryProductId) {
      return new NextResponse("All Category Product id is required", { status: 400 });
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

    const allcategoryproduct = await prismadb.allProductCategory.delete({
      where: {
        id: params.allCategoryProductId
      }
    });
  
    return NextResponse.json(allcategoryproduct);
  } catch (error) {
    console.log('[ALL_PRODUCT_CATEGORY_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  { params }: { params: { productId: string, brandId: string, allCategoryProductId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { 
      categoryId,
      type,
      name,
      slug
     } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
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
    
    const allcategoryproduct = await prismadb.allProductCategory.update({
      where: {
        id : params.allCategoryProductId
      },
      data: {
        categoryId,
        type,
        name,
        slug,
        productId: params.productId
      }
    });
  
    return NextResponse.json(allcategoryproduct);
  } catch (error) {
    console.log('[ALL_CATEGORY_PRODUCT_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
