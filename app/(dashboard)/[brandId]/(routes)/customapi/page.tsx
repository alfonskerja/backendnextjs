import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";
import { CustomApiList } from "@/components/ui/custom-api-list";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";


const CustomApiPage = async ({
  params
}: {
  params: { brandId: string }
}) => {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const brand = await prismadb.brand.findFirst({
    where: {
      id: params.brandId,
      userId
    }
  });

  if (!brand) {
    redirect('/');
  }

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
      <Heading title="API" description="API Calls for Custom Usage" />
      <Separator />
        <CustomApiList entityName="searchbox" entityIdName="productId" />
      </div>
    </div>
  );
}

export default CustomApiPage;
