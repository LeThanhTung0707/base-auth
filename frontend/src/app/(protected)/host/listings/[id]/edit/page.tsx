"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { CreateRoomDto, Room, RoomService } from "@/services/room.service";
import { RoomForm } from "@/components/organisms/RoomForm";
import { toast } from "react-toastify";

export default function EditListingPage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [roomData, setRoomData] = useState<Room | undefined>(undefined);

  useEffect(() => {
    if (id) {
        RoomService.getRoomById(id)
            .then(data => {
                setRoomData(data);
                // Check if user is owner
                if (user && data.ownerId !== user.id && !user.roles?.includes("ADMIN")) {
                    toast.error("Bạn không có quyền chỉnh sửa căn hộ này.");
                    router.push("/host/listings");
                }
            })
            .catch(err => {
                console.error("Failed to fetch room", err);
                toast.error("Không tìm thấy căn hộ.");
                router.push("/host/listings");
            })
            .finally(() => setFetching(false));
    }
  }, [id, user, router]);

  const handleSubmit = async (data: CreateRoomDto) => {
    setLoading(true);

    try {
      if (!user?.id) throw new Error("User ID not found");

      await RoomService.updateRoom(id, data);
      toast.success("Cập nhật thành công!");
      router.push("/host/listings");
    } catch (error) {
      console.error("Error updating room:", error);
      toast.error("Đã xảy ra lỗi khi cập nhật.");
    } finally {
      setLoading(false);
    }
  };

  if (!user || (!user.roles?.includes("HOST") && !user.roles?.includes("ADMIN"))) {
      return null;
  }

  if (fetching) return <div className="container mx-auto p-8">Đang tải dữ liệu...</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Link href="/host/listings" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Quay lại
      </Link>

      <div className="space-y-6">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Chỉnh sửa căn hộ</h1>
            <p className="text-muted-foreground mt-1">Cập nhật thông tin chi tiết về chỗ nghỉ của bạn.</p>
        </div>

        {roomData && (
            <RoomForm 
                initialData={roomData}
                onSubmit={async (data) => await handleSubmit(data)} 
                isLoading={loading} 
                submitLabel="Lưu thay đổi" 
            />
        )}
      </div>
    </div>
  );
}
