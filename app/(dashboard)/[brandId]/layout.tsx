import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

import Navbar from '@/components/navbar'
import prismadb from '@/lib/prismadb';

export default async function DashboardLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { brandId: string }
}) {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const brand = await prismadb.brand.findFirst({ 
    where: {
      id: params.brandId,
      userId,
    }
   });

  if (!brand) {
    redirect('/');
  };

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};
