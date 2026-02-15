import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoomRepository {
  constructor(private prisma: PrismaService) {}

  create(data: CreateRoomDto) {
    return this.prisma.room.create({ data });
  }

  findAll(category?: string) {
    const where = category ? { category } : {};
    return this.prisma.room.findMany({ 
      where, 
      orderBy: { createdAt: 'desc' },
      include: {
        bookings: false, // We don't need bookings for listing
      } 
    });
  }

  findById(id: string) {
    return this.prisma.room.findUnique({ where: { id } });
  }

  update(id: string, data: UpdateRoomDto) {
    return this.prisma.room.update({ where: { id }, data });
  }

  delete(id: string) {
    return this.prisma.room.delete({ where: { id } });
  }
}
