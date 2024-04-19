import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";

import { ProductsClient } from "./components/client";
import { ProductColumn } from "./components/columns";

const ProductsPage = async ({
  params
}: {
  params: { brandId: string }
}) => {
  const products = await prismadb.product.findMany({
    where: {
      brandId: params.brandId
    },
    include: {
      // images_catalogues: true,
      // image_cover: true,
      // datasheet: true,
      // allCategory: true,
      // specification: true,
      size: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    desc: item.description,
    // allCategory: item.allCategory.name,
    size: item.size.name,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductsClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
