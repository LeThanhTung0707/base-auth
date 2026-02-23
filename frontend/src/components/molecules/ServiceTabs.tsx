"use client";

import { BedDouble, Utensils, Car, Briefcase, Shield } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";

export function ServiceTabs() {
  const pathname = usePathname();
  const isFood = pathname === "/food";
  const isStays = pathname === "/";

  const handleComingSoon = (e: React.MouseEvent) => {
    e.preventDefault();
    toast.info("Coming soon...");
  };

  return (
    <div className="flex flex-wrap items-center gap-2 md:gap-4 overflow-x-auto pb-2 scrollbar-hide shrink-0">
      <Link
        href="/"
        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors whitespace-nowrap ${
          isStays
            ? "font-semibold text-foreground bg-secondary/50"
            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
        }`}
      >
        <BedDouble className="w-5 h-5" />
        <span>Stays</span>
      </Link>
      <Link
        href="/food"
        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors whitespace-nowrap ${
          isFood
            ? "font-semibold text-foreground bg-secondary/50"
            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
        }`}
      >
        <Utensils className="w-5 h-5" />
        <span>Food</span>
      </Link>
      <button
        onClick={handleComingSoon}
        className="flex items-center gap-2 px-4 py-2 rounded-full transition-colors text-muted-foreground hover:bg-muted/50 hover:text-foreground whitespace-nowrap"
      >
        <Car className="w-5 h-5" />
        <span>Car</span>
      </button>
      <button
        onClick={handleComingSoon}
        className="flex items-center gap-2 px-4 py-2 rounded-full transition-colors text-muted-foreground hover:bg-muted/50 hover:text-foreground whitespace-nowrap"
      >
        <Briefcase className="w-5 h-5" />
        <span>Job finding</span>
      </button>
      <button
        onClick={handleComingSoon}
        className="flex items-center gap-2 px-4 py-2 rounded-full transition-colors text-muted-foreground hover:bg-muted/50 hover:text-foreground whitespace-nowrap"
      >
        <Shield className="w-5 h-5" />
        <span>SSO</span>
      </button>
    </div>
  );
}
