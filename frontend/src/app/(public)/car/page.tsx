import { CarTemplate } from "@/components/templates/CarTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thuê xe tự lái & có tài xế giá rẻ | Car Service",
  description: "Hàng ngàn mẫu xe hiện đại từ Sedan, SUV đến xe điện. Thuê xe nhanh chóng, thủ tục đơn giản.",
};

export default function CarPage() {
  return <CarTemplate />;
}
