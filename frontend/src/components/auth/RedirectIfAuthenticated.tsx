"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthQuery } from "@/hooks/useAuthQuery";
import { useAuthStore } from "@/store/authStore";
import { Loader2 } from "lucide-react";

interface RedirectIfAuthenticatedProps {
  children: React.ReactNode;
  redirectTo?: string; // default = "/"
}

export const RedirectIfAuthenticated = ({
  children,
  redirectTo = "/",
}: RedirectIfAuthenticatedProps) => {
  const router = useRouter();
  const { user } = useAuthStore();
  const { isLoading } = useAuthQuery();

  useEffect(() => {
    if (!isLoading && user) {
      router.replace(redirectTo);
    }
  }, [isLoading, user, router, redirectTo]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin w-6 h-6 text-blue-600" />
      </div>
    );

  if (user) return null;

  return <>{children}</>;
};
