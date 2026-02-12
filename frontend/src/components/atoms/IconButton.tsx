"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

export function IconButton({ icon, className, variant = "ghost", size = "icon", ...props }: IconButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      className={cn("rounded-full", className)}
      {...props}
    >
      {icon}
    </Button>
  );
}
