"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { RoomService, Room } from "@/services/room.service";
import { AddressService, Province, District, Ward } from "@/services/address.service";
import { ImageGallery } from "@/components/organisms/RoomDetail/ImageGallery";
import { RoomHeader } from "@/components/organisms/RoomDetail/RoomHeader";
import { HostInfo } from "@/components/organisms/RoomDetail/HostInfo";
import { Amenities } from "@/components/organisms/RoomDetail/Amenities";
import { BookingWidget } from "@/components/organisms/RoomDetail/BookingWidget";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "react-toastify";

export default function RoomDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [room, setRoom] = useState<Room | null>(null);
  const [address, setAddress] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const roomData = await RoomService.getRoomById(id);
        setRoom(roomData);

        // Fetch Address details
        if (roomData.wardCode) {
            try {
                const ward = await AddressService.getWard(roomData.wardCode);
                const district = await AddressService.getDistrict(ward.districtCode);
                const province = await AddressService.getProvince(district.provinceCode);
                setAddress(`${ward.name}, ${district.name}, ${province.name}`);
            } catch (err) {
                console.error("Failed to fetch address details:", err);
                setAddress("Địa chỉ không khả dụng");
            }
        }

      } catch (error) {
        console.error("Error fetching room:", error);
        toast.error("Không thể tải thông tin phòng.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!room) {
    return (
      <div className="container py-10 text-center">
        <h1 className="text-2xl font-bold">Không tìm thấy phòng</h1>
        <p className="text-muted-foreground">Phòng bạn tìm kiếm không tồn tại hoặc đã bị xóa.</p>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      {/* Title & Header */}
      <RoomHeader 
        name={room.name} 
        address={address} 
        category={room.category}
      />

      {/* Image Gallery */}
      <div className="py-6">
        <ImageGallery images={room.images} />

      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-8">
        
        {/* Left Column: Details */}
        <div className="md:col-span-2 space-y-8">
            <HostInfo ownerId={room.ownerId} />
            
            <div className="py-6 border-b">
                <h3 className="text-xl font-semibold mb-4">Mô tả</h3>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {room.description || "Chủ nhà chưa thêm mô tả cho phòng này."}
                </p>
            </div>

            <Amenities />
            
            {/* Reviews Placeholder */}
            {/* <Reviews /> */}
        </div>

        {/* Right Column: Booking Widget (Sticky) */}
        <div className="relative">
             <BookingWidget price={room.price} />
        </div>

      </div>
    </div>
  );
}
