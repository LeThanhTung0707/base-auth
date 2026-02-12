"use client";

import { Menu, User } from "lucide-react";
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-2 border rounded-full p-1 pl-3 hover:shadow-md transition-shadow cursor-pointer bg-background">
          <Menu className="w-4 h-4" />
          <div className="bg-gray-500 rounded-full p-1 text-white">
            <User className="w-5 h-5 fill-current" />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {user ? (
          <>
            <DropdownMenuItem className="font-semibold" onClick={() => router.push("/dashboard")}>
              Dashboard
            </DropdownMenuItem>
             <DropdownMenuItem onClick={() => router.push("/account")}>
                Account
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem className="font-semibold" onClick={() => router.push("/login")}>
              Log in
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/register")}>
              Sign up
            </DropdownMenuItem>
             <DropdownMenuSeparator />
            <DropdownMenuItem>Airbnb your home</DropdownMenuItem>
            <DropdownMenuItem>Help Center</DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
