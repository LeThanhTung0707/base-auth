"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarRail,
} from "@/components/ui/sidebar";

import { menuData } from "@/config/menu-data";
// Import file viết hoa
import { SidebarBrand } from "../molecules/SidebarBrand";
import { NavSingleItem } from "../molecules/NavSingleItem";
import { NavCollapsibleItem } from "../molecules/NavCollapsibleItem";

export function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarBrand />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {menuData.map((item) => {
              if (item.items && item.items.length > 0) {
                return <NavCollapsibleItem key={item.title} item={item} />;
              }
              return <NavSingleItem key={item.title} item={item} />;
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
