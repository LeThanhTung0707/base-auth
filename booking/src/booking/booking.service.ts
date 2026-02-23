import { Injectable, NotFoundException, Inject, OnModuleInit } from '@nestjs/common';
import { BookingRepository } from './booking.repository';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { ClientGrpc, ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

interface UserServiceGrpc {
  getUsers(data: { ids: string[] }): any;
}

@Injectable()
export class BookingService implements OnModuleInit {
  private userService: UserServiceGrpc;

  constructor(
    private readonly repo: BookingRepository,
    @Inject('USER_SERVICE') private client: ClientGrpc,
    @Inject('NOTIFICATION_SERVICE') private notificationClient: ClientProxy,
  ) {}

  onModuleInit() {
    this.userService = this.client.getService<UserServiceGrpc>('UserService');
  }

  async create(dto: CreateBookingDto) {
    const booking = await this.repo.create(dto);
    
    // Asynchronously dispatch notification creation event to RabbitMQ
    this.notificationClient.emit('booking.created', {
      userId: booking.userId,
      bookingId: booking.id,
      roomName: 'your requested room', // Room string will populate placeholder
    });
    
    return booking;
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
        this.userService.getUsers({ ids: userIds }),
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
