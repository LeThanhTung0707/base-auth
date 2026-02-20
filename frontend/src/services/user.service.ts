import { api } from "@/lib/api";
import { User } from "@/store/authStore";

export const UserService = {
  async getMe(): Promise<User> {
    const res = await api.get<User>("/users/me");
    return res.data;
  },

  async updateProfile(data: { firstName?: string; lastName?: string }): Promise<User> {
    const res = await api.patch<User>("/users/me", data);
    return res.data;
  },

  async updateAvatar(avatarUrl: string): Promise<User> {
    const res = await api.patch<User>('/users/me/avatar', { avatarUrl });
    return res.data;
  },

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await api.post('/auth/change-password', { currentPassword, newPassword });
  },

  async getSessions(): Promise<Session[]> {
    const res = await api.get<Session[]>('/auth/sessions');
    return res.data;
  },

  async revokeSession(sessionId: string): Promise<void> {
    await api.delete(`/auth/sessions/${sessionId}`);
  },

  async revokeOtherSessions(): Promise<void> {
    await api.delete('/auth/sessions');
  },
};

export interface Session {
  id: string;
  userAgent: string | null;
  ip: string | null;
  createdAt: string;
  expiresAt: string;
}
