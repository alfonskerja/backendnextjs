import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { SubCategoryColumn } from "./components/columns";
import { SubCategoriesClient } from "./components/client";

const SubCategoryPage = async ({
  params
}: {
  params: { brandId: string }
}) => {
  const subcategory = await prismadb.allCategory.findMany({
    where: {
      brandId: params.brandId,
      type: "Sub Category"
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedSubCategories: SubCategoryColumn[] = subcategory.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    slug: item.slug,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SubCategoriesClient data={formattedSubCategories} />
      </div>
    </div>
  );
};

export default SubCategoryPage;
