"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Profile", href: "/account" },
  { label: "Security", href: "/account/security" },
  { label: "Payments", href: "/account/payments" },
  { label: "Notifications", href: "/account/notifications" },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="container mx-auto py-10 px-4">
      <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Về trang chủ
      </Link>
      <h1 className="text-3xl font-bold mb-8">Cài đặt tài khoản</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <nav className="flex flex-col gap-2">
            {navItems.map(({ label, href }) => {
              const isActive =
                href === "/account"
                  ? pathname === "/account"
                  : pathname.startsWith(href);
              return (
                <a
                  key={label}
                  href={href}
                  className={cn(
                    "transition-colors hover:text-primary",
                    isActive
                      ? "font-semibold text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {label}
                </a>
              );
            })}
          </nav>
        </aside>
        <div className="lg:col-span-3">{children}</div>
      </div>
    </div>
  );
}
