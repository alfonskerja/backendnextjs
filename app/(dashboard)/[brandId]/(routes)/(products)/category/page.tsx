import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { CategoryColumn } from "./components/columns";
import { CategoriesClient } from "./components/client";

const CategoryPage = async ({
  params
}: {
  params: { brandId: string }
}) => {
  const category = await prismadb.allCategory.findMany({
    where: {
      brandId: params.brandId,
      type: "Category"
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedCategories: CategoryColumn[] = category.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    slug: item.slug,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoriesClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoryPage;
