import { Star, MapPin } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import dynamic from "next/dynamic";

const LocationMap = dynamic(() => import("./LocationMap"), { 
    ssr: false,
    loading: () => <div className="h-[400px] w-full bg-muted animate-pulse rounded-md" />
});

interface RoomHeaderProps {
  name: string;
  category?: string;
  address?: string;
  rating?: number;
  reviewCount?: number;
}

export function RoomHeader({ name, category, address, rating = 4.88, reviewCount = 124 }: RoomHeaderProps) {
  return (
    <div className="py-6 border-b">
      <h1 className="text-2xl md:text-3xl font-semibold mb-2">{name}</h1>
      
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1 font-medium text-black">
          <Star className="w-4 h-4 fill-black" />
          {rating} · <span className="underline cursor-pointer">{reviewCount} đánh giá</span>
        </span>
        
        <span className="hidden md:inline">·</span>
        
        <Dialog>
            <DialogTrigger asChild>
                <span className="flex items-center gap-1 cursor-pointer hover:bg-muted p-1 rounded-md transition-colors -ml-1">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="underline font-medium text-black">{address || "Vị trí chưa cập nhật"}</span>
                </span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
                <DialogHeader>
                    <DialogTitle>Vị trí</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                    <LocationMap address={address || ""} />
                    <p className="mt-4 text-sm text-muted-foreground">
                        * Vị trí hiển thị trên bản đồ chỉ mang tính chất tham khảo.
                    </p>
                </div>
            </DialogContent>
        </Dialog>

         {category && (
            <>
                <span className="hidden md:inline">·</span>
                <span>{category}</span>
            </>
         )}
      </div>
    </div>
  );
}
