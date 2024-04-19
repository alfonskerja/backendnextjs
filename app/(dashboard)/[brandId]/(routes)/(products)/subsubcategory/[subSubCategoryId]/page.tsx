import prismadb from "@/lib/prismadb";

import { SubSubCategoryForm } from "./components/sub-sub-category-form";

const SubSubCategoryPage = async ({
  params
}: {
  params: { subSubCategoryId: string }
}) => {
  const subsubcategory = await prismadb.allCategory.findUnique({
    where: {
      id: params.subSubCategoryId,
      type: "Sub Sub Category"
    }
  });

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SubSubCategoryForm initialData={subsubcategory} />
      </div>
    </div>
  );
}

export default SubSubCategoryPage;
