"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { RoomService } from "@/services/room.service";
import { AddressService, Province, District, Ward } from "@/services/address.service";

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

export default function CreateListingPage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // Address State
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    wardCode: "",
  });

  useEffect(() => {
    // Fetch Provinces on mount
    AddressService.getProvinces()
      .then(setProvinces)
      .catch(err => console.error("Failed to fetch provinces", err));
  }, []);

  const handleProvinceChange = async (provinceCode: string) => {
    setSelectedProvince(provinceCode);
    setSelectedDistrict("");
    setFormData(prev => ({ ...prev, wardCode: "" }));
    setDistricts([]);
    setWards([]);

    try {
        const data = await AddressService.getDistricts(Number(provinceCode));
        setDistricts(data);
    } catch (error) {
        console.error("Failed to fetch districts", error);
    }
  };

  const handleDistrictChange = async (districtCode: string) => {
    setSelectedDistrict(districtCode);
    setFormData(prev => ({ ...prev, wardCode: "" }));
    setWards([]);

    try {
        const data = await AddressService.getWards(Number(districtCode));
        setWards(data);
    } catch (error) {
        console.error("Failed to fetch wards", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!user?.id) throw new Error("User ID not found");
      if (!formData.wardCode) {
          alert("Vui lòng chọn Phường/Xã");
          setLoading(false);
          return;
      }

      await RoomService.createRoom({
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        category: formData.category,
        ownerId: user.id,
        wardCode: Number(formData.wardCode),
        // historicalWardCode is optional
      });

      router.push("/host/listings");
    } catch (error) {
      console.error("Error creating room:", error);
      alert("Đã xảy ra lỗi khi tạo căn.");
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
                    onChange={e => setFormData({...formData, price: e.target.value})}
                />
            </div>
          </div>

          <div className="space-y-2">
             <label className="text-sm font-medium leading-none">Địa chỉ</label>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={selectedProvince}
                    onChange={(e) => handleProvinceChange(e.target.value)}
                    required
                >
                    <option value="" disabled>Tỉnh / Thành</option>
                    {provinces.map(p => (
                        <option key={p.code} value={p.code}>{p.name}</option>
                    ))}
                </select>

                <select 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={selectedDistrict}
                    onChange={(e) => handleDistrictChange(e.target.value)}
                    required
                    disabled={!selectedProvince}
                >
                    <option value="" disabled>Quận / Huyện</option>
                    {districts.map(d => (
                        <option key={d.code} value={d.code}>{d.name}</option>
                    ))}
                </select>

                <select 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={formData.wardCode}
                    onChange={(e) => setFormData({...formData, wardCode: e.target.value})}
                    required
                    disabled={!selectedDistrict}
                >
                    <option value="" disabled>Phường / Xã</option>
                    {wards.map(w => (
                        <option key={w.code} value={w.code}>{w.name}</option>
                    ))}
                </select>
             </div>
          </div>

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
             <Link href="/host/listings">
                <Button variant="outline" type="button">Hủy bỏ</Button>
             </Link>
             <Button type="submit" disabled={loading}>
                {loading ? "Đang tạo..." : "Tạo mới"}
             </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
