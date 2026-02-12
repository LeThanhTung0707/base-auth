"use client";

import { BedDouble, Utensils } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function ServiceTabs() {
  const pathname = usePathname();
  const isFood = pathname === "/food";
  const isStays = pathname === "/";

  return (
    <div className="flex items-center gap-4">
      <Link
        href="/"
        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
          isStays
            ? "font-semibold text-black"
            : "text-muted-foreground hover:bg-muted/50"
        }`}
      >
        <BedDouble className="w-5 h-5" />
        <span>Stays</span>
      </Link>
      <Link
        href="/food"
        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
          isFood
            ? "font-semibold text-black"
            : "text-muted-foreground hover:bg-muted/50"
        }`}
      >
        <Utensils className="w-5 h-5" />
        <span>Food</span>
      </Link>
    </div>
  );
}
