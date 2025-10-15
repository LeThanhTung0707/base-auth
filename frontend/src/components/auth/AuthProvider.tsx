"use client";
import { useAuthQuery } from "@/hooks/useAuthQuery";
import { Loader2 } from "lucide-react";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useAuthQuery();

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin w-6 h-6 text-blue-600" />
      </div>
    );

  return <>{children}</>;
};
