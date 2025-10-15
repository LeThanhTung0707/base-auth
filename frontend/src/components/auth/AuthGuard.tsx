"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { Loader2 } from "lucide-react";
import { useAuthQuery } from "@/hooks/useAuthQuery";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStore();
  const { isLoading } = useAuthQuery();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin w-6 h-6 text-blue-600" />
      </div>
    );

  if (!user) return null;

  return <>{children}</>;
};
