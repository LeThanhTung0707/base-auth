"use client";

import { useEffect, useState } from "react";
import { AddressService, Province, District, Ward } from "@/services/address.service";

interface AddressSelectorProps {
  initialWardCode?: number;
  onAddressChange: (provinceCode: string, districtCode: string, wardCode: number) => void;
  required?: boolean;
  disabled?: boolean;
}

export function AddressSelector({ 
  initialWardCode, 
  onAddressChange,
  required = false,
  disabled = false
}: AddressSelectorProps) {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedWard, setSelectedWard] = useState<number>(0);

  // Fetch Provinces on mount
  useEffect(() => {
    AddressService.getProvinces()
      .then(setProvinces)
      .catch(err => console.error("Failed to fetch provinces", err));
  }, []);

  // Handle initialWardCode
  useEffect(() => {
    if (initialWardCode) {
       setSelectedWard(initialWardCode);
       // Note: We can't easily accept initialProvince/District without reverse lookup or passing them in.
       // Current implementation in RoomForm also just warns the user.
       // We will keep the props consistent.
    }
  }, [initialWardCode]);

  const handleProvinceChange = async (provinceCode: string) => {
    setSelectedProvince(provinceCode);
    setSelectedDistrict("");
    setSelectedWard(0);
    setDistricts([]);
    setWards([]);
    onAddressChange(provinceCode, "", 0);

    try {
        const data = await AddressService.getDistricts(Number(provinceCode));
        setDistricts(data);
    } catch (error) {
        console.error("Failed to fetch districts", error);
    }
  };

  const handleDistrictChange = async (districtCode: string) => {
    setSelectedDistrict(districtCode);
    setSelectedWard(0);
    setWards([]);
    onAddressChange(selectedProvince, districtCode, 0);

    try {
        const data = await AddressService.getWards(Number(districtCode));
        setWards(data);
    } catch (error) {
        console.error("Failed to fetch wards", error);
    }
  };

  const handleWardChange = (wardCode: number) => {
    setSelectedWard(wardCode);
    onAddressChange(selectedProvince, selectedDistrict, wardCode);
  };

  return (
    <div className="space-y-2">
         <label className="text-sm font-medium leading-none">Địa chỉ</label>
         {initialWardCode && !selectedProvince && (
            <p className="text-xs text-muted-foreground mb-2">
                * Địa chỉ hiện tại đã được lưu. Vui lòng chọn lại nếu bạn muốn thay đổi.
            </p>
         )}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={selectedProvince}
                onChange={(e) => handleProvinceChange(e.target.value)}
                required={required && !initialWardCode} // Only required if not pre-filled
                disabled={disabled}
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
                required={!!selectedProvince}
                disabled={!selectedProvince}
            >
                <option value="" disabled>Quận / Huyện</option>
                {districts.map(d => (
                    <option key={d.code} value={d.code}>{d.name}</option>
                ))}
            </select>

            <select 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={selectedWard || ""}
                onChange={(e) => handleWardChange(Number(e.target.value))}
                required={!!selectedDistrict}
                disabled={!selectedDistrict}
            >
                <option value="" disabled>Phường / Xã</option>
                {wards.map(w => (
                    <option key={w.code} value={w.code}>{w.name}</option>
                ))}
            </select>
         </div>
      </div>
  );
}
