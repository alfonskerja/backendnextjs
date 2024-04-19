"use client"

import * as React from "react"
import { Check, ChevronsUpDown, PlusCircle, Store } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useParams, useRouter } from "next/navigation"
import { useBrandModal } from "@/hooks/use-brand-modal"

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface BrandSwitcherProps extends PopoverTriggerProps {
  items: Record<string, any>[];
}

export default function BrandSwitcher({ className, items = [] }: BrandSwitcherProps) {
  const brandModal = useBrandModal();
  const params = useParams();
  const router = useRouter();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id
  }));

  const currentBrand = formattedItems.find((item) => item.value === params.brandId);

  const [open, setOpen] = React.useState(false)

  const onBrandSelect = (brand: { value: string, label: string }) => {
    setOpen(false);
    router.push(`/${brand.value}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a Brand"
          className={cn("w-[200px] justify-between", className)}
        >
          <Store className="mr-2 h-4 w-4" />
          {currentBrand?.label}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search Brand..." />
            <CommandEmpty>No Brand found.</CommandEmpty>
            <CommandGroup heading="Brands">
              {formattedItems.map((brand) => (
                <CommandItem
                  key={brand.value}
                  onSelect={() => onBrandSelect(brand)}
                  className="text-sm"
                >
                  <Store className="mr-2 h-4 w-4" />
                  {brand.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentBrand?.value === brand.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false)
                  brandModal.onOpen()
                }}
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Brand
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
