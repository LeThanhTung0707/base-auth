import {
  LayoutDashboard,
  PieChart,
  UserCircle,
  Settings2,
  GitFork,
  Users,
  UserCog,
  LayoutGrid,
  BookOpen,
  Megaphone,
  FileText,
  MonitorCheck,
  MessageSquare,
  Settings,
  type Icon,
} from "lucide-react";
import { LucideIcon } from "lucide-react";
export interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
}

export const menuData: NavItem[] = [
  {
    title: "工作台 (Workbench)",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Admin Dashboard",
    url: "/admin/dashboard",
    icon: PieChart, // Changed from LayoutDashboard
  },
  {
    title: "Admin Page",
    url: "/admin",
    icon: Settings, // Changed from LayoutDashboard
  },
];
