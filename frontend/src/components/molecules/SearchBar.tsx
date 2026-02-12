"use client";

import { Search } from "lucide-react";


export function SearchBar() {
  return (
    <div className="flex items-center border rounded-full shadow-sm hover:shadow-md transition-shadow cursor-pointer py-2 px-4 gap-4 bg-background">
      <div className="text-sm font-semibold truncate pl-2">Anywhere</div>
      <div className="h-6 w-[1px] bg-gray-300"></div>
      <div className="text-sm font-semibold truncate">Any week</div>
      <div className="h-6 w-[1px] bg-gray-300"></div>
      <div className="flex items-center gap-3">
        <div className="text-sm text-gray-600 truncate">Add guests</div>
        <div className="bg-primary rounded-full p-2 text-primary-foreground">
            <Search className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
