import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Grid, ChevronLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";

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
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1516455590571-18259e0b7498?q=80&w=2000&auto=format&fit=crop",
  ];

  return (
    <Dialog>
      <div className="relative rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-4 gap-2 h-[300px] md:h-[400px] group">
        {/* Large Image */}
        <div className="md:col-span-2 md:row-span-2 relative h-full cursor-pointer">
          <DialogTrigger asChild>
            <Image 
              src={displayImages[0]} 
              alt="Room main image" 
              fill 
              className="object-cover hover:opacity-95 transition"
            />
          </DialogTrigger>
        </div>

        {/* Small Images */}
        {displayImages.slice(1, 5).map((img, idx) => (
          <div key={idx} className="relative hidden md:block h-full cursor-pointer">
             <DialogTrigger asChild>
                <Image 
                  src={img} 
                  alt={`Room image ${idx + 2}`} 
                  fill 
                  className="object-cover hover:opacity-95 transition"
                />
             </DialogTrigger>
          </div>
        ))}

        <div className="absolute bottom-4 right-4">
          <DialogTrigger asChild>
            <Button variant="secondary" size="sm" className="gap-2 shadow-md border-black/10">
                <Grid className="w-4 h-4" />
                Hiện tất cả ảnh
            </Button>
          </DialogTrigger>
        </div>
      </div>

      <DialogContent className="max-w-[100vw] h-[100vh] rounded-none p-0 flex flex-col bg-background/95 backdrop-blur-sm">
        <DialogHeader className="p-4 border-b flex-row items-center gap-4 space-y-0">
             <DialogClose asChild>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted">
                    <ChevronLeft className="w-5 h-5" />
                </Button>
             </DialogClose>
             <DialogTitle className="text-lg">Thư viện ảnh</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto p-4 md:p-10">
            <div className="max-w-4xl mx-auto space-y-4">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {displayImages.map((img, idx) => (
                        <div key={idx} className={`relative aspect-[3/2] ${idx % 3 === 0 ? 'md:col-span-2 aspect-[16/9]' : ''}`}>
                             <Image 
                                src={img} 
                                alt={`Gallery image ${idx + 1}`} 
                                fill 
                                className="object-cover rounded-lg hover:opacity-95 transition cursor-pointer"
                                loading="lazy"
                              />
                        </div>
                    ))}
                 </div>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
