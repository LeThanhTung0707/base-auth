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

  findAll(category?: string, ownerId?: string) {
    const where: any = {};
    if (category) where.category = category;
    if (ownerId) where.ownerId = ownerId;

    return this.prisma.room.findMany({ 
      where, 
      orderBy: { createdAt: 'desc' },
      include: {
        bookings: false,
      } 
    });
  }

  findById(id: string) {
    return this.prisma.room.findUnique({ where: { id } });
  }

  update(id: string, data: UpdateRoomDto) {
    return this.prisma.room.update({ where: { id }, data });
  }

  updateImages(id: string, images: string[]) {
    return this.prisma.room.update({ where: { id }, data: { images } });
  }

  delete(id: string) {
    return this.prisma.room.delete({ where: { id } });
  }

  updateRating(id: string, averageRating: number, reviewCount: number) {
    return this.prisma.room.update({
      where: { id },
      data: { averageRating, reviewCount },
    });
  }
}
