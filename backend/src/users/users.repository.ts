import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  create(email: string, passwordHash: string): Promise<User> {
    return this.prisma.user.create({ data: { email, password: passwordHash } });
  }

  findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  updateProfile(id: string, data: { firstName?: string; lastName?: string }): Promise<User> {
    return this.prisma.user.update({ where: { id }, data });
  }

  updateAvatar(id: string, avatar: string): Promise<User> {
    return this.prisma.user.update({ where: { id }, data: { avatar } });
  }
}
