import Link from "next/link";
import { Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Room } from "@/services/room.service";

interface HostListingsTableProps {
  rooms: Room[];
}

export function HostListingsTable({ rooms }: HostListingsTableProps) {
  return (
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
                                        src={room.images && room.images.length > 0 ? room.images[0] : `https://picsum.photos/seed/${room.id}/50/50`} 
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
                                <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                                    <Link href={`/host/listings/${room.id}/edit`}>
                                        <Edit className="w-4 h-4" />
                                    </Link>
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
  );
}
