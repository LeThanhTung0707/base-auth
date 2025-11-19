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

  findAll() {
    return this.prisma.room.findMany({ orderBy: { createdAt: 'desc' } });
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
