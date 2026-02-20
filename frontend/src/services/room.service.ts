import { api } from '@/lib/api';

export interface CreateRoomDto {
  name: string;
  description?: string;
  price: number;
  category?: string;
  ownerId: string;
  wardCode: number;
  historicalWardCode?: number;
  images?: string[];
}

export interface Room {
  id: string;
  name: string;
  description?: string;
  price: number;
  category?: string;
  ownerId: string;
  wardCode: number;
  createdAt: string;
  updatedAt: string;
  images: string[];
  owner?: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
  };
}

export const RoomService = {
  async getRooms(params: { ownerId?: string; category?: string }): Promise<Room[]> {
    const res = await api.get<Room[]>('/rooms', { params });
    return res.data;
  },

  async createRoom(data: CreateRoomDto): Promise<Room> {
    const res = await api.post<Room>('/rooms', data);
    return res.data;
  },

  async getRoomById(id: string): Promise<Room> {
    const res = await api.get<Room>(`/rooms/${id}`);
    return res.data;
  },

  async updateRoom(id: string, data: Partial<CreateRoomDto>): Promise<Room> {
    const res = await api.patch<Room>(`/rooms/${id}`, data);
    return res.data;
  },

  async updateRoomImages(id: string, images: string[]): Promise<Room> {
    const res = await api.patch<Room>(`/rooms/${id}/images`, { images });
    return res.data;
  },

  async deleteRoom(id: string): Promise<void> {
    await api.delete(`/rooms/${id}`);
  },
};
