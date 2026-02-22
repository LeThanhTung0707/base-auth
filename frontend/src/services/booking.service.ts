import { api } from '@/lib/api';
import { Room } from './room.service';

export interface Booking {
  id: string;
  roomId: string;
  userId: string;
  fromDate: string;
  toDate: string;
  totalPrice: number;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELED' | 'COMPLETED';
  createdAt: string;
  room?: Room;
  user?: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
  };
}

export const BookingService = {
  async getMyBookings(): Promise<Booking[]> {
    const res = await api.get<Booking[]>('/bookings'); 
    return res.data;
  },

  async getRoomBookings(roomId: string): Promise<Booking[]> {
    const res = await api.get<Booking[]>(`/bookings/room/${roomId}`);
    return res.data;
  },

  async createBooking(data: { roomId: string; fromDate: string; toDate: string; totalPrice: number }): Promise<Booking> {
    const res = await api.post<Booking>('/bookings', data);
    return res.data;
  },

  async updateBookingStatus(id: string, status: 'PENDING' | 'CONFIRMED' | 'CANCELED' | 'COMPLETED'): Promise<Booking> {
    const res = await api.patch<Booking>(`/bookings/${id}`, { status });
    return res.data;
  },
};
