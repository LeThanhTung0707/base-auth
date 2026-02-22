import { Injectable, BadRequestException, ForbiddenException, NotFoundException, Inject } from '@nestjs/common';
import { ReviewRepository } from './review.repository';
import { RoomRepository } from '../room/room.repository';
import { PrismaService } from '../prisma/prisma.service';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';

interface UserServiceGrpc {
  getUsers(data: { ids: string[] }): Observable<{
    users: Array<{ id: string; email: string; firstName: string; lastName: string; avatar: string }>;
  }>;
}

@Injectable()
export class ReviewService {
  private userService: UserServiceGrpc;

  constructor(
    private reviewRepo: ReviewRepository,
    private roomRepo: RoomRepository,
    private prisma: PrismaService,
    @Inject('USER_SERVICE') private userClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.userService = this.userClient.getService<UserServiceGrpc>('UserService');
  }

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
    const { reviews, total } = await this.reviewRepo.findByRoomId(roomId, limit, skip);

    if (reviews.length === 0) {
      return { reviews: [], total };
    }

    const userIds = [...new Set(reviews.map((r) => r.userId))];
    let usersMap: Record<string, any> = {};

    try {
      const { users } = await firstValueFrom(
        this.userService.getUsers({ ids: userIds })
      );
      usersMap = users.reduce((acc, user) => {
        acc[user.id] = user;
        return acc;
      }, {} as Record<string, any>);
    } catch (error) {
      console.error('Failed to fetch users for reviews via gRPC:', error);
    }

    const enrichedReviews = reviews.map((review) => {
      const user = usersMap[review.userId];
      return {
        ...review,
        user: user || null,
      };
    });

    return { reviews: enrichedReviews, total };
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
