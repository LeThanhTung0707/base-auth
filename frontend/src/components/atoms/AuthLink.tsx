"use client";
import Link from "next/link";

export const AuthLink = ({ href, label }: { href: string; label: string }) => (
  <Link href={href} className="text-blue-500 hover:underline text-sm">
    {label}
  </Link>
);
