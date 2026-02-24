"use client";

import { useState, useEffect } from "react";
import { MapPin, Check, ChevronsUpDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { AddressService, Province } from "@/services/address.service";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

interface LocationPickerProps {
  location: string;
  onSelect: (location: string) => void;
  variant?: "default" | "compact";
}

export function LocationPicker({
  location,
  onSelect,
  variant = "default",
}: LocationPickerProps) {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    AddressService.getProvinces()
      .then(setProvinces)
      .catch((err) => console.error("Failed to fetch provinces:", err));
  }, []);

  const filteredProvinces = provinces.filter((p) =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  const isCompact = variant === "compact";

  return (
    <Popover
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        if (!val) setFilter("");
      }}
    >
      <PopoverTrigger asChild>
        {isCompact ? (
          <div className="flex items-center gap-2 text-rose-500 shrink-0 cursor-pointer hover:opacity-80 transition-opacity">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-semibold text-foreground truncate max-w-[100px]">
              {location}
            </span>
          </div>
        ) : (
          <div className="flex-[0.6] px-6 py-3 rounded-full hover:bg-muted relative group flex flex-col justify-center cursor-pointer transition-colors">
            <div className="text-xs font-bold text-foreground">Khu vực</div>
            <div className="flex items-center gap-1 text-sm text-rose-500 font-medium whitespace-nowrap overflow-hidden">
              <MapPin className="w-3 h-3 shrink-0" />
              <span className="truncate">{location}</span>
              <ChevronsUpDown className="w-3 h-3 text-muted-foreground ml-auto shrink-0" />
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-8 bg-border group-hover:hidden" />
          </div>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <div className="p-3 border-b sticky top-0 bg-background z-10">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm tỉnh thành..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-9 h-9 border-none bg-muted/50 focus-visible:ring-1 focus-visible:ring-rose-500"
            />
          </div>
        </div>
        <ScrollArea className="h-[300px] p-2">
          <div className="grid grid-cols-1 gap-1">
            {filteredProvinces.length > 0 ? (
              filteredProvinces.map((province) => (
                <button
                  key={province.code}
                  onClick={() => {
                    onSelect(province.name);
                    setOpen(false);
                    setFilter("");
                  }}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors text-left",
                    location === province.name
                      ? "bg-rose-50 text-rose-600 font-medium dark:bg-rose-950/30"
                      : "hover:bg-muted"
                  )}
                >
                  <span className="truncate">{province.name}</span>
                  {location === province.name && (
                    <Check className="w-4 h-4 shrink-0 ml-2" />
                  )}
                </button>
              ))
            ) : (
              <div className="p-4 text-center text-sm text-muted-foreground">
                Không tìm thấy kết quả
              </div>
            )}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
