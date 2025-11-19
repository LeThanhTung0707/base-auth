import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookingRepository {
  constructor(private prisma: PrismaService) {}

  create(data: CreateBookingDto) {
    return this.prisma.booking.create({
      data: {
        ...data,
        fromDate: new Date(data.fromDate),
        toDate: new Date(data.toDate),
        status: 'PENDING',
      },
    });
  }

  findAll() {
    return this.prisma.booking.findMany({
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
