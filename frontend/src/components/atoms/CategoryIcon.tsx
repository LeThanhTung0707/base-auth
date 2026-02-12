import { LucideIcon } from "lucide-react";

interface CategoryIconProps {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
}

export function CategoryIcon({ icon: Icon, label, isActive }: CategoryIconProps) {
    return (
        <div className={`flex flex-col items-center gap-2 group cursor-pointer border-b-2 pb-2 transition-all min-w-[64px] ${isActive ? "border-black text-black" : "border-transparent text-muted-foreground hover:text-black hover:border-gray-300"}`}>
            <Icon className={`w-6 h-6 ${isActive ? "stroke-black" : "stroke-current"}`}/>
            <span className="text-xs font-medium truncate w-full text-center">{label}</span>
        </div>
    )
}
