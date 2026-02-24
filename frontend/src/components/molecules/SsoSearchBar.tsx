"use client";

import { Search, LayoutGrid } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSsoStore } from "@/store/useSsoStore";
import { cn } from "@/lib/utils";

interface SsoSearchBarProps {
  compact?: boolean;
}

export function SsoSearchBar({ compact = false }: SsoSearchBarProps) {
  const { searchQuery, setSearchQuery } = useSsoStore();

  if (compact) {
    return (
      <div className="flex items-center border border-purple-200 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer bg-background py-1.5 pl-6 pr-1.5 gap-3 whitespace-nowrap overflow-hidden min-w-[200px] max-w-full group">
        <div className="flex items-center gap-2 text-purple-600 shrink-0">
          <LayoutGrid className="w-4 h-4" />
          <span className="text-sm font-semibold text-foreground truncate max-w-[150px]">
            {searchQuery || "Tìm dịch vụ..."}
          </span>
        </div>
        <div className="bg-purple-600 rounded-full p-2 text-white shrink-0 ml-auto transition-transform group-hover:scale-105">
          <Search className="w-4 h-4" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center border-2 border-purple-100 rounded-full shadow-lg transition-all focus-within:border-purple-300 bg-background h-16 w-full max-w-[600px] overflow-hidden group">
      {/* Icon Area */}
      <div className="pl-6 pr-2 flex items-center justify-center border-r border-purple-50 group-hover:border-purple-100 transition-colors">
         <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
            <LayoutGrid className="w-5 h-5" />
         </div>
      </div>

      {/* Input Section */}
      <div className="flex-1 px-4 py-2 flex items-center h-full">
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Bạn muốn tìm ứng dụng hoặc dịch vụ nào?"
          className="border-0 shadow-none focus-visible:ring-0 text-foreground text-base flex-1 bg-transparent h-full placeholder:text-muted-foreground font-medium"
        />
      </div>

      {/* Button Section */}
      <div className="pr-2">
        <Button
          size="lg"
          className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6 h-12 shrink-0 font-bold shadow-md hover:shadow-lg transition-all"
        >
          <Search className="w-4 h-4 mr-2" />
          TÌM NGAY
        </Button>
      </div>
    </div>
  );
}
