import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookingRepository {
  constructor(private prisma: PrismaService) {}

  create({ roomId, userId, fromDate, toDate, totalPrice }: CreateBookingDto) {
    if (!userId) throw new Error('userId is required');
    return this.prisma.booking.create({
      data: {
        roomId,
        userId,
        totalPrice,
        fromDate: new Date(fromDate),
        toDate: new Date(toDate),
        status: 'PENDING',
      },
      include: { room: true },
    });
  }

  findAll(userId?: string) {
    const where = userId ? { userId } : {};
    return this.prisma.booking.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        room: true,
        review: true,
      },
    });
  }

  findByRoomIdAndOwner(roomId: string, ownerId: string) {
    return this.prisma.booking.findMany({
      where: {
        roomId,
        room: {
          ownerId,
        }
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  findById(id: string) {
    return this.prisma.booking.findUnique({
      where: { id },
    });
  }

  update(id: string, data: UpdateBookingDto) {
    return this.prisma.booking.update({
      where: { id },
      data,
    });
  }

  delete(id: string) {
    return this.prisma.booking.delete({
      where: { id },
    });
  }
}
