"use client";

import { CategoryIcon } from "@/components/atoms/CategoryIcon";
import { LucideIcon } from "lucide-react";

interface CategoryItemProps {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export function CategoryItem({ icon, label, isActive, onClick }: CategoryItemProps) {
  return (
    <div onClick={onClick} className="inline-block relative">
      <CategoryIcon icon={icon} label={label} isActive={isActive} />
    </div>
  );
}
