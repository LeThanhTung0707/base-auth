import { Injectable, BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { ReviewRepository } from './review.repository';
import { RoomRepository } from '../room/room.repository';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReviewService {
  constructor(
    private reviewRepo: ReviewRepository,
    private roomRepo: RoomRepository,
    private prisma: PrismaService,
  ) {}

  async createReview(
    roomId: string,
    bookingId: string,
    userId: string,
    rating: number,
    comment?: string,
  ) {
    // 1. Verify booking exists and belongs to user
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) throw new NotFoundException('Booking not found');
    if (booking.userId !== userId) throw new ForbiddenException('Not your booking');
    if (booking.roomId !== roomId) throw new BadRequestException('Booking is for a different room');
    if (booking.status !== 'COMPLETED') throw new BadRequestException('Can only review completed bookings');

    // 2. Check if already reviewed
    const existing = await this.reviewRepo.findByBookingId(bookingId);
    if (existing) throw new BadRequestException('Booking already reviewed');

    // 3. Create review
    const review = await this.reviewRepo.create({
      roomId,
      bookingId,
      userId,
      rating,
      comment,
    });

    // 4. Recalculate and update room rating
    await this.updateRoomRating(roomId);

    return review;
  }

  async getRoomReviews(roomId: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    return this.reviewRepo.findByRoomId(roomId, limit, skip);
  }

  async deleteReview(id: string, userId: string, isAdmin: boolean = false) {
    const review = await this.reviewRepo.findById(id);
    if (!review) throw new NotFoundException('Review not found');

    if (!isAdmin && review.userId !== userId) {
      throw new ForbiddenException('Cannot delete another user\'s review');
    }

    await this.reviewRepo.delete(id);
    await this.updateRoomRating(review.roomId);
  }

  private async updateRoomRating(roomId: string) {
    const { average, count } = await this.reviewRepo.aggregateRating(roomId);
    await this.roomRepo.updateRating(roomId, average, count);
  }
}
