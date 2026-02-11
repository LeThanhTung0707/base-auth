"use client";

import AdminLayout from "@/components/admin/templates/AdminLayout";

export default function AdminLayoutMain({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout> {children}</AdminLayout>;
}
