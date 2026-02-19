import { Button } from "@/components/ui/button";
import { Grid, ChevronLeft, ImageOff } from "lucide-react";
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
  if (images.length === 0) {
    return (
      <div className="relative rounded-xl overflow-hidden h-[300px] md:h-[400px] bg-muted flex flex-col items-center justify-center gap-3 text-muted-foreground border border-dashed border-border">
        <ImageOff className="w-12 h-12 opacity-30" />
        <p className="text-sm">Chưa có ảnh</p>
      </div>
    );
  }

  return (
    <Dialog>
      <div className="relative rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-4 gap-2 h-[300px] md:h-[400px] group">
        {/* Large Image */}
        <div className="md:col-span-2 md:row-span-2 relative h-full cursor-pointer overflow-hidden">
          <DialogTrigger asChild>
            <img
              src={images[0]}
              alt="Room main image"
              className="w-full h-full object-cover hover:opacity-95 transition"
            />
          </DialogTrigger>
        </div>

        {/* Small Images */}
        {images.slice(1, 5).map((img, idx) => (
          <div key={idx} className="relative hidden md:block h-full cursor-pointer overflow-hidden">
            <DialogTrigger asChild>
              <img
                src={img}
                alt={`Room image ${idx + 2}`}
                className="w-full h-full object-cover hover:opacity-95 transition"
              />
            </DialogTrigger>
          </div>
        ))}

        <div className="absolute bottom-4 right-4">
          <DialogTrigger asChild>
            <Button variant="secondary" size="sm" className="gap-2 shadow-md border-black/10">
              <Grid className="w-4 h-4" />
              Hiện tất cả ảnh ({images.length})
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
              {images.map((img, idx) => (
                <div key={idx} className={`relative overflow-hidden rounded-lg ${idx % 3 === 0 ? 'md:col-span-2 aspect-[16/9]' : 'aspect-[3/2]'}`}>
                  <img
                    src={img}
                    alt={`Gallery image ${idx + 1}`}
                    className="w-full h-full object-cover hover:opacity-95 transition cursor-pointer"
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
