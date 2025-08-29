"use client";

import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  AIIcon,
  CalendarIcon,
  ComponentIcon,
  UpDownIcon,
} from "@/assests/icons";
import { usePathname, useRouter } from "next/navigation";

const products = [
  {
    name: "Components",
    logo: ComponentIcon,
    plan: "component.ai4m.com",
    path: "/component",
  },
  {
    name: "AI Assistance",
    logo: AIIcon,
    plan: "ai.ai4m.com",
    path: "/ai",
  },
  {
    name: "Calendar",
    logo: CalendarIcon,
    plan: "calendar.ai4m.com",
    path: "/calendar",
  },
];

export function ProductSwitcher() {
  const { isMobile } = useSidebar();
  const pathName = usePathname();
  const router = useRouter();
  const activeProduct = React.useMemo(() => {
    console.log("router", pathName);

    return products.find((product) => product.path === pathName);
  }, [pathName]);

  if (!activeProduct) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <activeProduct.logo className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {activeProduct.name}
                </span>
                <span className="truncate text-xs">{activeProduct.plan}</span>
              </div>
              <UpDownIcon className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Products
            </DropdownMenuLabel>
            {products?.map((product) => (
              <DropdownMenuItem
                key={product.name}
                onClick={() => router.push(product.path)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-md border">
                  <product.logo className="size-3.5 shrink-0" />
                </div>
                {product.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
