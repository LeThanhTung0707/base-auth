import { Injectable, NotFoundException, Inject, OnModuleInit } from '@nestjs/common';
import { BookingRepository } from './booking.repository';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

interface UserServiceGrpc {
  getUsers(data: { userIds: string[] }): any;
}

@Injectable()
export class BookingService implements OnModuleInit {
  private userService: UserServiceGrpc;

  constructor(
    private readonly repo: BookingRepository,
    @Inject('USER_SERVICE') private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.userService = this.client.getService<UserServiceGrpc>('UserService');
  }

  create(dto: CreateBookingDto) {
    return this.repo.create(dto);
  }

  findAll(userId?: string) {
    return this.repo.findAll(userId);
  }

  async findByRoomForHost(roomId: string, ownerId: string) {
    const bookings = await this.repo.findByRoomIdAndOwner(roomId, ownerId);
    
    // Group unique user IDs
    const userIds = [...new Set(bookings.map((b) => b.userId))];

    if (userIds.length === 0) {
      return bookings;
    }

    try {
      // Fetch users via gRPC
      const response: any = await firstValueFrom(
        this.userService.getUsers({ userIds }),
      );

      // Map users to bookings
      const userMap = new Map();
      response.users?.forEach((u: any) => userMap.set(u.id, u));

      return bookings.map((b) => ({
        ...b,
        user: userMap.get(b.userId),
      }));
    } catch (error) {
      console.error('Error fetching users from User service:', error);
      // Return bookings without user profiles on error
      return bookings;
    }
  }

  async findOne(id: string) {
    const booking = await this.repo.findById(id);
    if (!booking) throw new NotFoundException('Booking not found');
    return booking;
  }

  update(id: string, dto: UpdateBookingDto) {
    return this.repo.update(id, dto);
  }

  remove(id: string) {
    return this.repo.delete(id);
  }
}
