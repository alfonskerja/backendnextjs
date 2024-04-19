import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { SubSubCategoryColumn } from "./components/columns";
import { SubSubCategoriesClient } from "./components/client";

const SubSubCategoryPage = async ({
  params
}: {
  params: { brandId: string }
}) => {
  const subsubcategory = await prismadb.allCategory.findMany({
    where: {
      brandId: params.brandId,
      type: "Sub Sub Category"
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedSubSubCategories: SubSubCategoryColumn[] = subsubcategory.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    slug: item.slug,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SubSubCategoriesClient data={formattedSubSubCategories} />
      </div>
    </div>
  );
};

export default SubSubCategoryPage;
