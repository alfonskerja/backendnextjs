import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';
import { any } from 'zod';
 
export async function POST(
  req: Request,
  { params }: { params: { brandId: string, productId: string } }
) {
  const allResults = [];
  try {
    const { userId } = auth();

    const body = await req.json();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    
    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    for (const item of body) {
      const { 
        id,
        brandId,
        type,
        name,
        slug,
        description,
        thumbnail_url,
        createdAt,
        updatedAt
      } = item;
    
      const allproductcategory = await prismadb.allProductCategory.create({
        data: {
          productId: params.productId,
          categoryId: id,
          type,
          name,
          slug,
          createdAt,
          updatedAt
        }
      });
      allResults.push(allproductcategory);
      
    }

    return NextResponse.json(allResults);
  } catch (error) {
    console.log('[ALL_PRODUCT_CATEGORY_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
    // return NextResponse.json(allproductcategory);

};

export async function GET(
  req: Request,
  { params }: { params: { brandId: string, productId: string } }
) {
  try {
    if (!params.brandId) {
      return new NextResponse("Brand id is required", { status: 400 });
    }

    const allProductCategory = await prismadb.allProductCategory.findMany({
      where: {
        productId: params.productId
      }
    });
    return NextResponse.json(allProductCategory);
  } catch (error) {
    console.log('[ALL_PRODUCT_CATEGORY_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { brandId: string, productId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.brandId) {
      return new NextResponse("Brand id is required", { status: 400 });
    }

    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const allproductcategory = await prismadb.allProductCategory.deleteMany({
      where: {
        productId: params.productId
      }
    });
  
    return NextResponse.json(allproductcategory);
  } catch (error) {
    console.log('[ALL_PRODUCT_CATEGORY_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  { params }: { params: { brandId: string, productId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.brandId) {
      return new NextResponse("Brand id is required", { status: 400 });
    }

    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const deleteOldCategories = await prismadb.allProductCategory.deleteMany({
      where: {
        productId: params.productId
      }
    });
  
    const allResults = []
    for (const item of body) {
      const { 
        id,
        brandId,
        type,
        name,
        slug,
        description,
        thumbnail_url,
        createdAt,
        updatedAt
      } = item;
    
      const allproductcategory = await prismadb.allProductCategory.create({
        data: {
          productId: params.productId,
          categoryId: id,
          type,
          name,
          slug,
          createdAt,
          updatedAt
        }
      });
      allResults.push(allproductcategory);
    }
  
    const responseData = {
      deletedCount: deleteOldCategories.count,
      addedRecords: allResults
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.log('[ALL_CATEGORY_PRODUCT_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

