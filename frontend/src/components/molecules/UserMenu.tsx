"use client";

import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { AuthAPI } from "@/lib/auth";

export function UserMenu() {
  const { user, clearUser } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await AuthAPI.logout();
    } catch (error) {
      console.error("Logout failed", error);
    }
    clearUser();
    router.push("/");
    router.refresh();
  };

  const initials = [user?.firstName, user?.lastName]
    .filter(Boolean)
    .map((s) => s![0].toUpperCase())
    .join("") || user?.email?.[0].toUpperCase() || "U";

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-2 border rounded-full p-1 pl-3 hover:shadow-md transition-shadow cursor-pointer bg-background">
          <Menu className="w-4 h-4" />
          {/* Avatar or initials */}
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-500 flex items-center justify-center text-white text-sm font-semibold shrink-0">
            {user ? (
               <img src={user.avatar || "/default-avatar.png"} alt="avatar" className="w-full h-full object-cover" />
            ) : (
               <span>{initials}</span>
            )}
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {user ? (
          <>
            <div className="px-2 py-1.5">
              <p className="text-sm font-semibold truncate">
                {user.firstName && user.lastName
                  ? `${user.firstName} ${user.lastName}`
                  : user.email}
              </p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="font-semibold" onClick={() => router.push("/dashboard")}>
              Dashboard
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/account/trips")}>
              Chuyến đi
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/account")}>
              Tài khoản
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Đăng xuất</DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem className="font-semibold" onClick={() => router.push("/login")}>
              Đăng nhập
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/register")}>
              Đăng ký
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>ThanhTungAllInOne your home</DropdownMenuItem>
            <DropdownMenuItem>Help Center</DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
