import { SsoTemplate } from "@/components/templates/SsoTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cổng đăng nhập tập trung | SSO Service",
  description: "Trải nghiệm đăng nhập một lần, an toàn và tiện lợi cho tất cả ứng dụng của bạn.",
};

export default function SsoPage() {
  return <SsoTemplate />;
}
