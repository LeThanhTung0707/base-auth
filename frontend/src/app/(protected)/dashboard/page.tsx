"use client";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { AuthAPI } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { clearUser } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await AuthAPI.logout();
    clearUser();
    router.push("/login");
  };

  return (
    <main className="p-8 space-y-4">
      <Button onClick={handleLogout}>Logout</Button>
    </main>
  );
}
