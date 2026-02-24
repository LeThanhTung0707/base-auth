"use client";

import { Logo } from "@/components/atoms/Logo";
import Link from "next/link";
import { SearchBar } from "@/components/molecules/SearchBar";
import { UserMenu } from "@/components/molecules/UserMenu";
import { ServiceTabs } from "@/components/molecules/ServiceTabs";
import { NotificationMenu } from "@/components/molecules/NotificationMenu";
import { useAuthStore } from "@/store/authStore";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { UserService } from "@/services/user.service";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter, usePathname } from "next/navigation";
import { FoodSearchBar } from "@/components/molecules/FoodSearchBar";

export function Header() {
  const { user } = useAuthStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isFoodPage = pathname === "/food";
  const queryClient = useQueryClient();
  const router = useRouter();
  const [loadingHost, setLoadingHost] = useState(false);

  const handleBecomeHost = async () => {
    setLoadingHost(true);
    try {
      await UserService.becomeHost();
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
      toast.success("Chúc mừng! Bạn đã trở thành người cho thuê.");
      router.push("/host/create-listing");
    } catch {
      toast.error("Đã xảy ra lỗi khi đăng ký người cho thuê.");
    } finally {
      setLoadingHost(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
        setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className={cn("shrink-0 w-full bg-transparent pointer-events-none transition-all duration-300", isScrolled ? "h-20" : "h-40")} aria-hidden="true" />
      <header 
          className={cn(
              "fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur-xs transition-all duration-300 ease-in-out",
              isScrolled ? "h-20 shadow-sm" : "h-40"
          )}
      >
        <div className="container mx-auto px-4 h-full flex flex-col justify-between relative">
          
          {/* Top Row: Logo - Center - UserMenu */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center pt-4 relative z-20">
            {/* Logo */}
            <div className="flex justify-start">
                <Logo />
            </div>
            
            {/* Center Area: Tabs (Large) -> Search (Small) */}
            <div className="flex justify-center h-12 w-full max-w-[500px] relative">
                 {/* Tabs: Fade out when scrolled */}
                 <div 
                    className={cn(
                        "absolute inset-0 flex justify-center transition-all duration-300 transform",
                        isScrolled ? "opacity-0 scale-50 pointer-events-none -translate-y-4" : "opacity-100 scale-100 translate-y-0"
                    )}
                 >
                    <ServiceTabs />
                 </div>

                 {/* Compact Search: Fade in when scrolled */}
                 <div 
                    className={cn(
                        "absolute inset-0 flex justify-center transition-all duration-300 transform",
                        isScrolled ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-75 pointer-events-none translate-y-4"
                    )}
                 >
                     {isFoodPage ? <FoodSearchBar compact /> : <SearchBar compact />}
                 </div>
            </div>
            
            {/* User Menu */}
            <div className="flex justify-end items-center gap-2">
                {user ? (
                  <>
                    {user?.roles?.includes('HOST') ? (
                      <Link href="/host/listings" className="text-sm font-semibold hover:bg-muted px-4 py-2 rounded-full transition-colors whitespace-nowrap">
                            Quản lý căn hiện có
                      </Link>
                    ) : (
                      <Button 
                        variant="ghost" 
                        className="hidden md:flex rounded-full" 
                        onClick={handleBecomeHost}
                        disabled={loadingHost}
                      >
                         {loadingHost ? "Đang xử lý..." : "Trở thành người cho thuê"}
                      </Button>
                    )}
                    <NotificationMenu />
                    <UserMenu />
                  </>
                ) : (
                  <div className="flex items-center gap-2">
                     <Button variant="ghost" className="font-medium" asChild>
                        <Link href="/login">Đăng nhập</Link>
                     </Button>
                     <Button className="font-medium" asChild>
                        <Link href="/register">Đăng ký</Link>
                     </Button>
                  </div>
                )}
            </div>
        </div>
        
        {/* Bottom Row: Large Search Bar */}
        {/* Scale down and fade out when scrolled */}
        <div 
            className={cn(
                "absolute left-0 right-0 top-20 flex justify-center transition-all duration-300 ease-in-out transform origin-top",
                isScrolled ? "opacity-0 scale-50 pointer-events-none -translate-y-10" : "opacity-100 scale-100 translate-y-0"
            )}
        >
            {isFoodPage ? <FoodSearchBar /> : <SearchBar />}
        </div>
      </div>
    </header>
  </>
);
}
