"use client";

import { Search, MapPin, Briefcase, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useJobSearchStore } from "@/store/useJobSearchStore";
import { cn } from "@/lib/utils";
import { LocationPicker } from "./LocationPicker";

interface JobSearchBarProps {
  compact?: boolean;
}

export function JobSearchBar({ compact = false }: JobSearchBarProps) {
  const { keyword, setKeyword, location, setLocation } = useJobSearchStore();

  if (compact) {
    return (
      <div className="flex items-center border border-gray-200 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer bg-background py-1.5 pl-6 pr-1.5 gap-3 whitespace-nowrap overflow-hidden min-w-fit max-w-full">
        <div className="flex items-center gap-2 text-blue-600 shrink-0">
          <Briefcase className="w-4 h-4" />
          <span className="text-sm font-semibold text-foreground truncate max-w-[120px]">
            {keyword || "Tìm việc làm..."}
          </span>
        </div>
        <div className="h-4 w-[1px] bg-gray-300 shrink-0"></div>
        <div className="flex items-center gap-1 text-muted-foreground shrink-0">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{location}</span>
        </div>
        <div className="bg-blue-600 rounded-full p-2 text-white shrink-0">
          <Search className="w-4 h-4" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center border rounded-full shadow-lg transition-shadow bg-background h-16 w-full max-w-[900px] overflow-hidden">
      {/* Keyword Input */}
      <div className="flex-[1.5] px-6 py-2 flex items-center h-full group relative">
        <Search className="w-5 h-5 text-muted-foreground mr-3" />
        <Input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Tên công việc, vị trí, kỹ năng..."
          className="border-0 shadow-none focus-visible:ring-0 text-foreground text-base flex-1 bg-transparent h-full placeholder:text-muted-foreground"
        />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-8 bg-border" />
      </div>

      {/* Location Picker */}
      <div className="flex-1 h-full">
        <LocationPicker 
            location={location} 
            onSelect={setLocation} 
            variant="default" 
        />
      </div>

      {/* Button Section */}
      <div className="pr-2 ml-2">
        <Button
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 h-12 shrink-0 font-bold shadow-md hover:shadow-lg transition-all"
        >
          TÌM KIẾM
        </Button>
      </div>
    </div>
  );
}
