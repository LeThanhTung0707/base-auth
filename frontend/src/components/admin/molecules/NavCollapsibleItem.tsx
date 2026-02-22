import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { type NavItem } from "@/config/menu-data";
import Link from "next/link";

export function NavCollapsibleItem({ item }: { item: NavItem }) {
  const Icon = item.icon;
  return (
    <Collapsible
      asChild
      defaultOpen={item.isActive}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            tooltip={item.title}
            className={
              item.isActive
                ? "bg-emerald-600 text-white hover:bg-emerald-700 font-semibold rounded-md shadow-md justify-start w-full px-4 py-2 transition-colors duration-200"
                : "text-gray-700 hover:bg-emerald-100 hover:text-emerald-800 font-medium rounded-md justify-start w-full px-4 py-2 transition-colors duration-200"
            }
          >
            {Icon && <Icon className="size-4" />}

            <span>{item.title}</span>
            <ChevronRight className={
              item.isActive ?
              "ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 text-white" :
              "ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
            } />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items?.map((subItem) => (
              <SidebarMenuSubItem key={subItem.title}>
                <SidebarMenuSubButton asChild>
                  <Link href={subItem.url}>
                    <span>{subItem.title}</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}
