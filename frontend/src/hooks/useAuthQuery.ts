"use client";
import { useQuery } from "@tanstack/react-query";
import { AuthAPI } from "@/lib/auth";
import { useAuthStore } from "@/store/authStore";

export function useAuthQuery() {
  const { setUser, clearUser } = useAuthStore();

  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      try {
        const data = await AuthAPI.me();
        setUser(data);
        return data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        // nếu bị 401 (access và refresh đều fail)
        if (err?.response?.status === 401) {
          clearUser();
        }
        throw err;
      }
    },
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
}
