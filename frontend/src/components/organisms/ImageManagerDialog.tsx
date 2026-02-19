"use client";

import { useState, useRef } from "react";
import { X, Upload, Trash2, ImageIcon, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { RoomService } from "@/services/room.service";
import { UploadService } from "@/services/upload.service";

interface ImageManagerDialogProps {
  roomId: string;
  images: string[];
  onImagesChange: (images: string[]) => void;
}

export function ImageManagerDialog({
  roomId,
  images,
  onImagesChange,
}: ImageManagerDialogProps) {
  const [open, setOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState<string[]>(images);
  const [uploading, setUploading] = useState(false);
  const [deletingUrl, setDeletingUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleOpen = () => {
    setCurrentImages(images); // sync with latest from parent
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploading(true);
    try {
      const uploadedUrls: string[] = [];
      for (const file of files) {
        const url = await UploadService.uploadImage(file);
        uploadedUrls.push(url);
      }

      const newImages = [...currentImages, ...uploadedUrls];
      await RoomService.updateRoomImages(roomId, newImages);
      setCurrentImages(newImages);
      onImagesChange(newImages);
      toast.success(`Đã thêm ${uploadedUrls.length} ảnh`);
    } catch (error) {
      console.error(error);
      toast.error("Thêm ảnh thất bại");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDeleteImage = async (url: string) => {
    setDeletingUrl(url);
    try {
      // Delete from S3
      await UploadService.deleteImage(url);

      // Update DB with new image list
      const newImages = currentImages.filter((img) => img !== url);
      await RoomService.updateRoomImages(roomId, newImages);

      setCurrentImages(newImages);
      onImagesChange(newImages);
      toast.success("Đã xóa ảnh");
    } catch (error) {
      console.error(error);
      toast.error("Xóa ảnh thất bại");
    } finally {
      setDeletingUrl(null);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-input bg-background text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
      >
        <ImageIcon className="w-4 h-4" />
        Quản lý ảnh
        {currentImages.length > 0 && (
          <span className="ml-1 px-1.5 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
            {currentImages.length}
          </span>
        )}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Dialog */}
          <div className="relative z-10 w-full max-w-2xl mx-4 bg-background rounded-2xl shadow-2xl border border-border overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h2 className="text-xl font-semibold">Quản lý ảnh phòng</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Thêm hoặc xóa ảnh. Mỗi thay đổi được lưu ngay lập tức.
                </p>
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded-lg hover:bg-accent transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {currentImages.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>Chưa có ảnh nào</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {currentImages.map((url) => (
                    <div
                      key={url}
                      className="relative group aspect-video rounded-lg overflow-hidden border border-border bg-muted"
                    >
                      <img
                        src={url}
                        alt="Room image"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          onClick={() => handleDeleteImage(url)}
                          disabled={deletingUrl === url}
                          className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                        >
                          {deletingUrl === url ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-border bg-muted/30">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/gif"
                multiple
                className="hidden"
                onChange={handleAddImages}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Đang tải lên...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Thêm ảnh
                  </>
                )}
              </button>
              <button
                onClick={handleClose}
                className="px-4 py-2 rounded-lg border border-input bg-background text-sm hover:bg-accent transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
