import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const brand = await prismadb.brand.findFirst({
    where: {
      userId,
    }
  });

  if (brand) {
    redirect(`/${brand.id}`);
  };

  return (
    <>
      {children}
    </>
  );
};
