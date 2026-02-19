"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreateRoomDto, Room } from "@/services/room.service";
import { AddressSelector } from "@/components/molecules/AddressSelector";
import Link from "next/link";
import { toast } from "react-toastify";
import { ImageUpload } from "@/components/molecules/ImageUpload";

const CATEGORIES = [
  "Bãi biển",
  "Thành phố",
  "Nông thôn",
  "Núi",
  "Đảo",
  "Hoang dã",
  "Sang trọng",
  "Khác"
];

interface RoomFormProps {
  initialData?: Room;
  onSubmit: (data: CreateRoomDto) => Promise<void>;
  isLoading: boolean;
  submitLabel: string;
  onCancel?: () => void;
}

export function RoomForm({ initialData, onSubmit, isLoading, submitLabel, onCancel }: RoomFormProps) {


  const [formData, setFormData] = useState<CreateRoomDto>({
    name: initialData?.name || "",
    description: initialData?.description || "",
    price: initialData?.price || 0,
    category: initialData?.category || "",
    ownerId: initialData?.ownerId || "",
    wardCode: initialData?.wardCode || 0,
    historicalWardCode: undefined,
    images: initialData?.images || [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.wardCode) {
        toast.error("Vui lòng chọn Phường/Xã");
        return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Tên căn hộ</label>
        <Input 
            required 
            placeholder="Ví dụ: Căn hộ cao cấp view biển" 
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Danh mục</label>
            <select 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                required
            >
                <option value="" disabled>Chọn danh mục</option>
                {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
            </select>
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Giá mỗi đêm ($)</label>
            <Input 
                type="number" 
                required 
                min="0"
                placeholder="0" 
                value={formData.price}
                onChange={e => setFormData({...formData, price: Number(e.target.value)})}
            />
        </div>
      </div>

      <AddressSelector 
        initialWardCode={initialData?.wardCode}
        onAddressChange={(p, d, w) => setFormData({...formData, wardCode: w})}
        required={!initialData} 
      />

      {/* Images: only shown when creating a new room. For editing, use the ImageManagerDialog. */}
      {!initialData && (
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none">Hình ảnh</label>
          <ImageUpload 
              value={formData.images || []}
              onChange={(images) => setFormData({...formData, images})}
          />
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium leading-none">Mô tả</label>
        <textarea 
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Mô tả chi tiết về căn hộ của bạn..."
            required
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
        />
      </div>

      <div className="flex justify-end gap-4">
         {onCancel && (
            <Button variant="outline" type="button" onClick={onCancel}>Hủy bỏ</Button>
         )}
         {!onCancel && (
             <Link href="/host/listings">
                <Button variant="outline" type="button">Hủy bỏ</Button>
             </Link>
         )}
         <Button type="submit" disabled={isLoading}>
            {isLoading ? "Đang xử lý..." : submitLabel}
         </Button>
      </div>
    </form>
  );
}
