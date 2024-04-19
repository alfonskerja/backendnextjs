import { CreditCard, DollarSign, Package } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Overview } from "@/components/overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { formatter } from "@/lib/utils";
import { ApiList } from "@/components/ui/api-list";
import { CustomApiList } from "@/components/ui/custom-api-list";
import prismadb from "@/lib/prismadb";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


const DashboardPage = async ({
  params
}: {
  params: { brandId: string }
}) => {
  const products = await prismadb.product.findMany({
    where: {
      brandId: params.brandId
    },
    select: {
      id: true,
      name: true,
      updatedAt: true,
    },
    orderBy: {
      updatedAt: 'desc'
    }
  });
  const sizes = await prismadb.size.findMany({
    where: {
      brandId: params.brandId
    },
    select: {
      name: true
    }
  });
  const allCat = await prismadb.allCategory.findMany({
    where: {
      brandId: params.brandId,
      type: "Category"
    },
    select: {
      name: true
    }
  });
  const allSubCat = await prismadb.allCategory.findMany({
    where: {
      brandId: params.brandId,
      type: "Sub Category"
    },
    select: {
      name: true
    }
  });
  const allSubSubCat = await prismadb.allCategory.findMany({
    where: {
      brandId: params.brandId,
      type: "Sub Sub Category"
    },
    select: {
      name: true
    }
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Overview of your Brand" />
        <Separator />
        <div className="grid gap-4 grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle style={{ fontSize: '1.3rem' }} className="text-sm font-medium">Total Product</CardTitle>
              {products.length}
            </CardHeader>
              {/* <CardContent>
                <div className="text-2xl font-bold">{formatter.format(totalRevenue)}</div>
              </CardContent> */}
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle style={{ fontSize: '1.3rem' }} className="text-sm font-medium">Total Sizes</CardTitle>
              {sizes.length}
            </CardHeader>
            {/* <CardContent>
              <div className="text-2xl font-bold">+{salesCount}</div>
            </CardContent> */}
          </Card>
        </div>

        <div className="grid gap-4 grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle style={{ fontSize: '1.3rem' }} className="text-sm font-medium">
                Total Categories
              </CardTitle>
              {allCat.length}
            </CardHeader>
              {/* <CardContent>
                <div className="text-2xl font-bold">{formatter.format(totalRevenue)}</div>
              </CardContent> */}
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle style={{ fontSize: '1.3rem' }} className="text-sm font-medium">Total Sub Categories</CardTitle>
              {allSubCat.length}
            </CardHeader>
            {/* <CardContent>
              <div className="text-2xl font-bold">+{salesCount}</div>
            </CardContent> */}
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle style={{ fontSize: '1.3rem' }} className="text-sm font-medium">Total Sub Sub Categories</CardTitle>
              {allSubSubCat.length}
            </CardHeader>
            {/* <CardContent>
              <div className="text-2xl font-bold">{stockCount}</div>
            </CardContent> */}
          </Card>
        </div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle style={{ fontSize: '1.3rem' }}>Recently Updated</CardTitle>
          </CardHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Updated At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.updatedAt.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
