import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { type NavItem } from "@/config/menu-data";
import Link from "next/link";

export function NavSingleItem({ item }: { item: NavItem }) {
  const Icon = item.icon;
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        tooltip={item.title}
        className={
          item.isActive
            ? "bg-emerald-600 text-white hover:bg-emerald-700 font-semibold rounded-md shadow-md justify-start w-full px-4 py-2 transition-colors duration-200"
            : "text-gray-700 hover:bg-emerald-100 hover:text-emerald-800 font-medium rounded-md justify-start w-full px-4 py-2 transition-colors duration-200"
        }
      >
        <Link href={item.url}>
          {Icon && <Icon className="size-4" />}
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
