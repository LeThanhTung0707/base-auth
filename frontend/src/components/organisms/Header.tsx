"use client";

import { Logo } from "@/components/atoms/Logo";
import Link from "next/link";
import { SearchBar } from "@/components/molecules/SearchBar";
import { UserMenu } from "@/components/molecules/UserMenu";
import { ServiceTabs } from "@/components/molecules/ServiceTabs";
import { NotificationMenu } from "@/components/molecules/NotificationMenu";
import { useAuthStore } from "@/store/authStore";
import { Button } from "../ui/button";

export function Header() {
  const { user } = useAuthStore();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-xs supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
        {/* Top Row: Logo - Tabs - UserMenu */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center">
            <div className="flex justify-start">
                <Logo />
            </div>
            
            <div className="flex justify-center">
                 <ServiceTabs />
            </div>
            
            <div className="flex justify-end items-center gap-2">
                {user ? (
                  <>
                    {user?.roles?.includes('HOST') ? (
                      <Link href="/host/listings">
                        <button className="text-sm font-semibold hover:bg-muted px-4 py-2 rounded-full transition-colors">
                            Quản lý căn hiện có
                        </button>
                      </Link>
                    ) : (
                      <Link href="/host/create-listing">
                        <Button variant="ghost" className="hidden md:flex rounded-full">
                          Trở thành người cho thuê
                        </Button>
                      </Link>
                    )}
                    <NotificationMenu />
                    <UserMenu />
                  </>
                ) : (
                  <div className="flex items-center gap-2">
                     <Link href="/login">
                        <Button variant="ghost" className="font-medium">Đăng nhập</Button>
                     </Link>
                     <Link href="/register">
                        <Button className="font-medium">Đăng ký</Button>
                     </Link>
                  </div>
                )}
            </div>
        </div>
        
        {/* Bottom Row: Search Bar */}
        <div className="flex justify-center pb-2">
            <SearchBar />
        </div>
      </div>
    </header>
  );
}
