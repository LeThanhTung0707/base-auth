"use client";
import Image from "next/image";
import { ReactNode } from "react";

export const AuthLayout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen flex bg-blue-600">
    {/* Left side image */}
    <div className="hidden md:flex md:w-1/2 items-center justify-center">
      <Image
        src="/login-bg.webp"
        alt="auth background"
        width={800}
        height={800}
        className="object-cover h-full w-full"
      />
    </div>

    <div className="flex justify-center items-center md:w-1/2 w-full bg-white rounded-none  p-8">
      <div className="max-w-md w-full">{children}</div>
    </div>
  </div>
);
