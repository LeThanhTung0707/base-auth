"use client";

import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RoomService, Room } from "@/services/room.service";



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
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [user, router]);

  if (!user || !user.roles?.includes("HOST")) {
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
        <div className="text-center py-20 bg-muted/10 rounded-lg border border-dashed text-muted-foreground">
          <p className="mb-4">Bạn chưa có căn hộ nào.</p>
          <Link href="/host/create-listing" className="text-primary hover:underline">Tạo ngay căn đầu tiên</Link>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm text-left">
                <thead className="bg-muted/50 text-muted-foreground font-medium border-b">
                    <tr>
                        <th className="py-3 px-4">Tên căn</th>
                        <th className="py-3 px-4">Danh mục</th>
                        <th className="py-3 px-4">Giá</th>
                        <th className="py-3 px-4">Trạng thái</th>
                        <th className="py-3 px-4 text-right">Hành động</th>
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {rooms.map((room) => (
                        <tr key={room.id} className="hover:bg-muted/10 transition-colors">
                            <td className="py-3 px-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-muted rounded overflow-hidden relative">
                                        {/* Placeholder Image */}
                                        <img 
                                            src={`https://picsum.photos/seed/${room.id}/50/50`} 
                                            alt={room.name}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                    <span className="font-medium">{room.name}</span>
                                </div>
                            </td>
                            <td className="py-3 px-4 text-muted-foreground">{room.category || "Chưa phân loại"}</td>
                            <td className="py-3 px-4 font-medium">${room.price}</td>
                            <td className="py-3 px-4">
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                    Đang hoạt động
                                </span>
                            </td>
                            <td className="py-3 px-4 text-right">
                                <div className="flex justify-end gap-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                                        <Trash className="w-4 h-4" />
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      )}
    </div>
  );
}
