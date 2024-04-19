import prismadb from "@/lib/prismadb";
import { SpecForm } from "./components/specification-form";


const SpecPage = async ({
  params
}: {
  params: { productId: string, brandId: string }
}) => {
  const spec = await prismadb.specification.findFirst({
    where: {
      productId: params.productId,
    },
  });


  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SpecForm 
          initialData={spec!}
        />
      </div>
    </div>
  );
}

export default SpecPage;
