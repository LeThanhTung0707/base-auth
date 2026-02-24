"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFoodSearchStore } from "@/store/useFoodSearchStore";
import { LocationPicker } from "./LocationPicker";

interface FoodSearchBarProps {
  compact?: boolean;
}

export function FoodSearchBar({ compact = false }: FoodSearchBarProps) {
  const { searchQuery, setSearchQuery, location, setLocation } = useFoodSearchStore();

  if (compact) {
    return (
      <div className="flex items-center border border-gray-200 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer bg-background py-2 pl-6 pr-2 gap-3 whitespace-nowrap overflow-hidden min-w-fit max-w-full">
        <LocationPicker 
          location={location} 
          onSelect={setLocation} 
          variant="compact" 
        />
        <div className="h-4 w-[1px] bg-gray-300 shrink-0"></div>
        <div className="text-sm text-muted-foreground truncate max-w-[120px] sm:max-w-[200px]">
          {searchQuery || "Tìm món ngon..."}
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-rose-500 rounded-full p-2 text-white shrink-0">
          <Search className="w-4 h-4" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center border rounded-full shadow-sm hover:shadow-md transition-shadow bg-background h-16 w-full max-w-[700px] overflow-hidden">
      <LocationPicker 
        location={location} 
        onSelect={setLocation} 
      />

      {/* Search Input Section */}
      <div className="flex-1 px-4 py-2 flex items-center h-full">
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Tìm nhà hàng, món ăn..."
          className="border-0 shadow-none focus-visible:ring-0 text-foreground text-sm flex-1 bg-transparent h-full placeholder:text-muted-foreground"
        />
      </div>

      {/* Button Section */}
      <div className="pr-2">
        <Button
          size="sm"
          className="bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white rounded-full px-6 h-12 shrink-0 font-bold"
        >
          <Search className="w-4 h-4 mr-2" />
          Tìm kiếm
        </Button>
      </div>
    </div>
  );
}
