"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default icon issue
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface LocationMapProps {
  address: string;
}

// Component to update map view when coords change
function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 15);
  }, [center, map]);
  return null;
}

export default function LocationMap({ address }: LocationMapProps) {
  const [coords, setCoords] = useState<[number, number] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!address) return;

    const fetchCoords = async () => {
      try {
        setLoading(true);
        // Clean address to improve search results (might remove specific unit numbers if needed)
        // For now, search directly.
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`
        );
        const data = await res.json();
        if (data && data.length > 0) {
          setCoords([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
        } else {
             // Fallback to coordinates of "Vietnam" or just null
             console.log("Found no coordinates for address:", address);
        }
      } catch (error) {
        console.error("Geocoding error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoords();
  }, [address]);

  if (loading) {
    return <div className="h-[400px] w-full flex items-center justify-center bg-muted animate-pulse">Đang tải bản đồ...</div>;
  }

  if (!coords) {
    return <div className="h-[400px] w-full flex items-center justify-center bg-muted text-muted-foreground">Không tìm thấy vị trí trên bản đồ</div>;
  }

  return (
    <MapContainer center={coords} zoom={15} scrollWheelZoom={false} className="h-[400px] w-full rounded-md z-0">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={coords}>
        <Popup>{address}</Popup>
      </Marker>
      <ChangeView center={coords} />
    </MapContainer>
  );
}
