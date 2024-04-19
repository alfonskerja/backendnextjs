"use client";

import Link from "next/link"
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import React from "react";

type Checked = DropdownMenuCheckboxItemProps["checked"]
export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.brandId}`,
      label: 'Overview',
      active: pathname === `/${params.brandId}`,
    },
    {
      href: `/${params.brandId}/customapi`,
      label: 'Custom API',
      active: pathname === `/${params.brandId}/customapi`,
    },
    {
      href: `/${params.brandId}/settings`,
      label: 'Settings',
      active: pathname === `/${params.brandId}/settings`,
    },
  ]


  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Link
        href={""}
        className={cn(
          'text-sm font-medium transition-colors hover:text-primary',
          pathname === `/${params.brandId}/products` || pathname === `/${params.brandId}/size` || pathname === `/${params.brandId}/category` || pathname === `/${params.brandId}/subcategory` || pathname === `/${params.brandId}/subsubcategory` ? 'text-black dark:text-white' : 'text-muted-foreground'
        )}
        >Products</Link>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
           <Link
            key={`/${params.brandId}/products`}
            href={`/${params.brandId}/products`}
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              pathname === `/${params.brandId}/allproducts` ? 'text-black dark:text-white' : 'text-muted-foreground'
            )}
          >
        <DropdownMenuCheckboxItem>
          All Products
        </DropdownMenuCheckboxItem>
          </Link>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Specifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
          <Link
            key={`/${params.brandId}/size`}
            href={`/${params.brandId}/size`}
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              pathname === `/${params.brandId}/size` ? 'text-black dark:text-white' : 'text-muted-foreground'
            )}
          >
        <DropdownMenuCheckboxItem>
          Size
        </DropdownMenuCheckboxItem>
          </Link>
          <Link
            key={`/${params.brandId}/category`}
            href={`/${params.brandId}/category`}
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              pathname === `/${params.brandId}/category` ? 'text-black dark:text-white' : 'text-muted-foreground'
            )}
          >
        <DropdownMenuCheckboxItem>
            Category
        </DropdownMenuCheckboxItem>
          </Link>
        <Link
            key={`/${params.brandId}/subcategory`}
            href={`/${params.brandId}/subcategory`}
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              pathname === `/${params.brandId}/subcategory` ? 'text-black dark:text-white' : 'text-muted-foreground'
            )}
          >
        <DropdownMenuCheckboxItem>
          Sub Category
        </DropdownMenuCheckboxItem>
          </Link>
          <Link
            key={`/${params.brandId}/subsubcategory`}
            href={`/${params.brandId}/subsubcategory`}
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              pathname === `/${params.brandId}/subsubcategory` ? 'text-black dark:text-white' : 'text-muted-foreground'
            )}
          >
        <DropdownMenuCheckboxItem>
          Sub Sub Category
        </DropdownMenuCheckboxItem>
          </Link>
      </DropdownMenuContent>
    </DropdownMenu>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            route.active ? 'text-black dark:text-white' : 'text-muted-foreground'
          )}
        >
          {route.label}
      </Link>
      ))}
    </nav>
  )
};
