import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { UserService } from "@/services/user.service";
import { toast } from "react-toastify";

export const queryKeys = {
  sessions: ['sessions'] as const,
};

export function useSessions() {
  return useQuery({
    queryKey: queryKeys.sessions,
    queryFn: UserService.getSessions,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useRevokeSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => UserService.revokeSession(id),
    onSuccess: () => {
      toast.success("Đã đăng xuất phiên này");
      queryClient.invalidateQueries({ queryKey: queryKeys.sessions });
    },
    onError: () => toast.error("Không thể đăng xuất phiên này"),
  });
}

export function useRevokeOtherSessions() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => UserService.revokeOtherSessions(),
    onSuccess: () => {
      toast.success("Đã đăng xuất tất cả thiết bị khác");
      queryClient.invalidateQueries({ queryKey: queryKeys.sessions });
    },
    onError: () => {
      toast.error("Không thể đăng xuất tất cả");
    }
  });
}
