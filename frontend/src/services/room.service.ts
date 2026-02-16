const BOOKING_API_URL = process.env.NEXT_PUBLIC_BOOKING_API_URL || 'http://localhost:4001';

export interface CreateRoomDto {
  name: string;
  description?: string;
  price: number;
  category?: string;
  ownerId: string;
  wardCode: number;
  historicalWardCode?: number;
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
}

export const RoomService = {
  async getRooms(params: { ownerId?: string; category?: string }): Promise<Room[]> {
    const url = new URL(`${BOOKING_API_URL}/rooms`);
    if (params.ownerId) url.searchParams.append('ownerId', params.ownerId);
    if (params.category) url.searchParams.append('category', params.category);

    const res = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch rooms: ${res.statusText}`);
    }

    return res.json();
  },

  async createRoom(data: CreateRoomDto): Promise<Room> {
    const res = await fetch(`${BOOKING_API_URL}/rooms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || `Failed to create room: ${res.statusText}`);
    }

    return res.json();
  },

  async getRoomById(id: string): Promise<Room> {
    const res = await fetch(`${BOOKING_API_URL}/rooms/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch room: ${res.statusText}`);
    }

    return res.json();
  },

  async updateRoom(id: string, data: Partial<CreateRoomDto>): Promise<Room> {
    const res = await fetch(`${BOOKING_API_URL}/rooms/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || `Failed to update room: ${res.statusText}`);
    }

    return res.json();
  }
};
