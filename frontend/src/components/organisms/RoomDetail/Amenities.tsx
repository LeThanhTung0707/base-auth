import { Wifi, Tv, Car, Wind, Coffee, Utensils } from "lucide-react";

export function Amenities() {
  const amenities = [
    { icon: Wifi, label: "Wifi tốc độ cao" },
    { icon: Tv, label: "TV thông minh" },
    { icon: Car, label: "Chỗ đỗ xe miễn phí" },
    { icon: Wind, label: "Điều hòa nhiệt độ" },
    { icon: Coffee, label: "Máy pha cà phê" },
    { icon: Utensils, label: "Bếp đầy đủ tiện nghi" },
  ];

  return (
    <div className="py-6 border-b">
      <h3 className="text-xl font-semibold mb-4">Nơi này có những gì cho bạn</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {amenities.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <item.icon className="w-6 h-6 text-gray-600" />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
