import prismadb from "@/lib/prismadb";
import { AllProductCategoryForm } from "./components/categories-form";


const AllProductCategoryPage = async ({
  params
}: {
  params: { productId: string, brandId: string }
}) => {
  const categories = await prismadb.allCategory.findMany({
    where: {
      type: "Category",
    },
  });

  const subcategories = await prismadb.allCategory.findMany({
    where: {
      type: "Sub Category",
    },
  });
  
  const subsubcategories = await prismadb.allCategory.findMany({
    where: {
      type: "Sub Sub Category",
    },
  });

  const allproductcategories = await prismadb.allProductCategory.findMany({
    where: {
      productId: params.productId,
    },
  });

  const myproduct = await prismadb.product.findFirst({
    where: {
      id: params.productId,
    },
  });
  console.log(allproductcategories)
  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <AllProductCategoryForm 
          initialData={allproductcategories}
          categories={categories}
          subcategories={subcategories}
          subsubcategories={subsubcategories}
          myproduct={myproduct!}
        />
      </div>
    </div>
  );
}

export default AllProductCategoryPage;
