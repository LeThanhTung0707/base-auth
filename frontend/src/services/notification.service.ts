import { api } from '@/lib/api';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

class NotificationService {
  async getNotifications(): Promise<Notification[]> {
    const res = await api.get('/notifications');
    return res.data;
  }

  async markAsRead(id: string): Promise<Notification> {
    const res = await api.patch(`/notifications/${id}/read`);
    return res.data;
  }
}

export default new NotificationService();
