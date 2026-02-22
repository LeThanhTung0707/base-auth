import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReviewRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    roomId: string;
    bookingId: string;
    userId: string;
    rating: number;
    comment?: string;
  }) {
    return this.prisma.review.create({ data });
  }

  async findByRoomId(roomId: string, take: number, skip: number) {
    const [reviews, total] = await Promise.all([
      this.prisma.review.findMany({
        where: { roomId },
        orderBy: { createdAt: 'desc' },
        take,
        skip,
      }),
      this.prisma.review.count({ where: { roomId } }),
    ]);

    return { reviews, total };
  }

  async findByBookingId(bookingId: string) {
    return this.prisma.review.findUnique({ where: { bookingId } });
  }

  async aggregateRating(roomId: string) {
    const agg = await this.prisma.review.aggregate({
      where: { roomId },
      _avg: { rating: true },
      _count: { rating: true },
    });
    return {
      average: agg._avg.rating || 0,
      count: agg._count.rating || 0,
    };
  }

  async delete(id: string) {
    return this.prisma.review.delete({ where: { id } });
  }

  async findById(id: string) {
    return this.prisma.review.findUnique({ where: { id } });
  }
}
