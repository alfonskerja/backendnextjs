import prismadb from "@/lib/prismadb";

import { ProductForm } from "./components/product-form";

const ProductPage = async ({
  params
}: {
  params: { productId: string, brandId: string }
}) => {
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images_catalogues: true,
      datasheet: true,
      cover_img: true,
      // specification: true,
      // image_cover: true,
      // datasheet: true,
    },
  });

  const sizes = await prismadb.size.findMany({
    where: {
      brandId: params.brandId,
    },
  });

  // const specification = await prismadb.specification.findFirst({
  //   where: {
  //     id: params.productId,
  //   },
  // });

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm 
          initialData={product}
          // categories={categories} 
          // subcategories={subcategories} 
          // subsubcategories={subsubcategories} 
          // specification={specification!}
          sizes={sizes}
        />
      </div>
    </div>
  );
}

export default ProductPage;
