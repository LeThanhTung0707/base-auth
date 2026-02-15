"use client";

import { Logo } from "@/components/atoms/Logo";
import { SearchBar } from "@/components/molecules/SearchBar";
import { UserMenu } from "@/components/molecules/UserMenu";
import { ServiceTabs } from "@/components/molecules/ServiceTabs";
import { NotificationMenu } from "@/components/molecules/NotificationMenu";

export function Header() {
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
                <NotificationMenu />
                <UserMenu />
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
