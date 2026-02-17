import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Grid } from "lucide-react";

interface ImageGalleryProps {
  images?: string[];
}

export function ImageGallery({ images = [] }: ImageGalleryProps) {
  // Mock images if none provided
  const displayImages = images.length > 0 ? images : [
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1505693416388-503464e23755?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2000&auto=format&fit=crop"
  ];

  return (
    <div className="relative rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-4 gap-2 h-[300px] md:h-[400px]">
      {/* Large Image */}
      <div className="md:col-span-2 md:row-span-2 relative h-full">
        <Image 
          src={displayImages[0]} 
          alt="Room main image" 
          fill 
          className="object-cover hover:opacity-95 transition cursor-pointer"
        />
      </div>

      {/* Small Images */}
      {displayImages.slice(1, 5).map((img, idx) => (
        <div key={idx} className="relative hidden md:block h-full">
           <Image 
            src={img} 
            alt={`Room image ${idx + 2}`} 
            fill 
            className="object-cover hover:opacity-95 transition cursor-pointer"
          />
        </div>
      ))}

      <div className="absolute bottom-4 right-4">
        <Button variant="secondary" size="sm" className="gap-2 shadow-md border-black/10">
            <Grid className="w-4 h-4" />
            Hiện tất cả ảnh
        </Button>
      </div>
    </div>
  );
}
