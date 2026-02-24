import { JobsTemplate } from "@/components/templates/JobsTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tìm việc làm nhanh, tuyển dụng hiệu quả | Jobs",
  description: "Hàng ngàn công việc hấp dẫn đang chờ bạn. Tìm việc làm mơ ước ngay hôm nay.",
};

export default function JobsPage() {
  return <JobsTemplate />;
}
