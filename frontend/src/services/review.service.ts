import { api } from '@/lib/api';

export interface Review {
  id: string;
  roomId: string;
  bookingId: string;
  userId: string;
  rating: number;
  comment?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewPagination {
  reviews: Review[];
  total: number;
}

export const ReviewService = {
  async getRoomReviews(roomId: string, page = 1, limit = 10): Promise<ReviewPagination> {
    const res = await api.get<ReviewPagination>(`/rooms/${roomId}/reviews`, {
      params: { page, limit },
    });
    return res.data;
  },

  async createReview(roomId: string, bookingId: string, rating: number, comment?: string): Promise<Review> {
    const res = await api.post<Review>(`/rooms/${roomId}/reviews`, {
      bookingId,
      rating,
      comment,
    });
    return res.data;
  },

  async deleteReview(id: string): Promise<void> {
    await api.delete(`/reviews/${id}`);
  },
};
