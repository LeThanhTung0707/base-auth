"use client";

import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RoomService, Room } from "@/services/room.service";
import { EmptyState } from "@/components/molecules/EmptyState";
import { HostListingsTable } from "@/components/organisms/HostListingsTable";
import { toast } from "react-toastify";



export default function HostListingsPage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return; // AuthGuard handles redirect
    
    // Simple role check
    if (!user.roles?.includes("HOST")) {
      router.push("/"); 
      return;
    }

    const fetchRooms = async () => {
      try {
        const data = await RoomService.getRooms({ ownerId: user.id });
        setRooms(data);
      } catch (error) {
        console.error("Failed to fetch rooms", error);
        toast.error("Không thể tải danh sách tài sản.");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [user, router]);

  if (!user || (!user.roles?.includes("HOST") && !user.roles?.includes("ADMIN"))) {
      return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Trở về trang chủ
        </Link>
        <div className="flex justify-between items-end">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Tài sản của tôi</h1>
                <p className="text-muted-foreground mt-1">Quản lý các căn hộ và danh sách cho thuê.</p>
            </div>
            <Link href="/host/create-listing">
                <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    Thêm căn mới
                </Button>
            </Link>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
            {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-muted/20 animate-pulse rounded-md" />
            ))}
        </div>
      ) : rooms.length === 0 ? (
        <EmptyState 
            title="Bạn chưa có căn hộ nào"
            description="Hãy bắt đầu kiếm tiền bằng cách đăng tải căn hộ đầu tiên của bạn."
            actionLabel="Tạo ngay căn đầu tiên"
            actionLink="/host/create-listing"
        />
      ) : (
        <HostListingsTable rooms={rooms} />
      )}
    </div>
  );
}
