"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { CreateRoomDto, RoomService } from "@/services/room.service";
import { RoomForm } from "@/components/organisms/RoomForm";
import { toast } from "react-toastify";

export default function CreateListingPage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: CreateRoomDto) => {
    setLoading(true);

    try {
      if (!user?.id) throw new Error("User ID not found");

      await RoomService.createRoom({
        ...data,
        ownerId: user.id,
      });

      router.push("/host/listings");
    } catch (error) {
      console.error("Error creating room:", error);
      toast.error("Đã xảy ra lỗi khi tạo căn.");
    } finally {
      setLoading(false);
    }
  };

  if (!user || !user.roles?.includes("HOST")) {
      return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Link href="/host/listings" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Quay lại
      </Link>

      <div className="space-y-6">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Tạo căn hộ mới</h1>
            <p className="text-muted-foreground mt-1">Điền thông tin chi tiết về chỗ nghỉ của bạn.</p>
        </div>

        <RoomForm 
            onSubmit={async (data) => await handleSubmit(data)} 
            isLoading={loading} 
            submitLabel="Tạo mới" 
        />
      </div>
    </div>
  );
}
