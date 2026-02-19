"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Loader2 } from "lucide-react";
import Image from "next/image";
import { UploadService } from "@/services/upload.service";
import { toast } from "react-toastify";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string[]) => void;
  maxFiles?: number;
}

export function ImageUpload({ value = [], onChange, maxFiles = 5 }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (value.length + files.length > maxFiles) {
        toast.error(`Bạn chỉ được tải lên tối đa ${maxFiles} ảnh.`);
        return;
    }

    setIsUploading(true);
    const newUrls: string[] = [];

    try {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const url = await UploadService.uploadImage(file);
            newUrls.push(url);
        }
        onChange([...value, ...newUrls]);
        toast.success("Tải ảnh thành công!");
    } catch (error) {
        console.error("Upload error:", error);
        toast.error("Có lỗi xảy ra khi tải ảnh.");
    } finally {
        setIsUploading(false);
        // Reset input
        e.target.value = "";
    }
  };

  const removeImage = (urlToRemove: string) => {
    onChange(value.filter((url) => url !== urlToRemove));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {value.map((url) => (
          <div key={url} className="relative aspect-square rounded-lg overflow-hidden border group">
            <Image 
                src={url} 
                alt="Uploaded image" 
                fill 
                className="object-cover" 
            />
            <button
                type="button"
                onClick={() => removeImage(url)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
                <X className="w-4 h-4" />
            </button>
          </div>
        ))}
        
        {value.length < maxFiles && (
            <div className="relative aspect-square rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer">
                <input 
                    type="file" 
                    multiple
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                    onChange={handleFileChange}
                    disabled={isUploading}
                />
                {isUploading ? (
                     <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
                ) : (
                    <>
                        <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                        <span className="text-xs text-muted-foreground font-medium">Tải ảnh lên</span>
                    </>
                )}
            </div>
        )}
      </div>
      <p className="text-xs text-muted-foreground">
        Hỗ trợ JPG, PNG. Tối đa {maxFiles} ảnh.
      </p>
    </div>
  );
}
