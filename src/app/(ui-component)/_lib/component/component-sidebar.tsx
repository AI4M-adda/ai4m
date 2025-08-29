"use client";

import { NavUser } from "@/components/nav-user";
import { ProductSwitcher } from "@/components/product-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { ComponentNavMain } from "./component-nav-main";
import { ThemeToggle } from "@/components/theme-toggler";

export function ComponentSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavUser />
      </SidebarHeader>
      <SidebarContent>
        <ComponentNavMain />
      </SidebarContent>
      <SidebarFooter>
        <ThemeToggle />
        <ProductSwitcher />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
