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
    const res = await api.patch<User>("/users/me/avatar", { avatarUrl });
    return res.data;
  },
};
