"use client";

import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useMemo, useState } from "react";
import {
  componentCategories,
  componentCategoryEnum,
  componentDetails,
} from "../component-configs";
import { groupBy } from "@/lib/utils";
import Link from "next/link";

export function ComponentNavMain() {
  const [actives, setActives] = useState([componentCategoryEnum.input]);
  const items = useMemo(() => {
    return groupBy(componentDetails, "category");
  }, []);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>All Components</SidebarGroupLabel>
      <SidebarMenu>
        {Object.entries(items).map(([category, items]) => {
          const Icon = componentCategories[category].icon;
          const categoryItems = items as typeof componentDetails; // cast to correct array type
          return (
            <Collapsible
              key={category}
              asChild
              open={actives.some((active) => active === category)}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger
                  asChild
                  onClick={() =>
                    setActives((prev) => {
                      return prev.includes(category)
                        ? prev.filter((c) => c !== category)
                        : [...prev, category];
                    })
                  }
                >
                  <SidebarMenuButton tooltip={category}>
                    {Icon && <Icon />}
                    <span>{category}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {categoryItems.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild>
                          <Link href={`/component/${item.name}`}>
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
