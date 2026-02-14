"use client";

import { useEffect, useRef } from "react";
import { useAuthStore } from "@/store/authStore";
import { AuthAPI } from "@/lib/auth";

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const { setUser, user } = useAuthStore();
  const mounted = useRef(false);

  useEffect(() => {
    const initAuth = async () => {
        if (mounted.current || user) return;
        mounted.current = true;
        
      try {
        const userData = await AuthAPI.me();
        setUser(userData);
      } catch (error) {
        // Silent fail if not logged in
        console.log("Not logged in or failed to fetch user");
      }
    };

    initAuth();
  }, [setUser, user]);

  return <>{children}</>;
}
