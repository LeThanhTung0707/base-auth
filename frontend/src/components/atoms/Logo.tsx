import { Home } from "lucide-react";
import Link from "next/link";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2 font-bold text-xl text-primary ${className}`}
    >
      <Home className="h-6 w-6" />
      <span>Thanh Tùng AllInOne</span>
    </Link>
  );
}
