import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { REDIS_CLIENT } from './redis/redis.module';
import Redis from 'ioredis';

@Injectable()
export class AppService {
  constructor(
    private prisma: PrismaService,
    @Inject(REDIS_CLIENT) private redis: Redis,
  ) {}

  getHello(): string {
    return 'Car Service is running!';
  }

  async findAllCars() {
    return this.prisma.car.findMany();
  }

  async findCarById(id: string) {
    return this.prisma.car.findUnique({
      where: { id },
    });
  }

  async createCar(data: any) {
    return this.prisma.car.create({
      data,
    });
  }

  async setCache(key: string, value: string) {
    await this.redis.set(key, value, 'EX', 3600);
    return { success: true };
  }

  async getCache(key: string) {
    const value = await this.redis.get(key);
    return { key, value };
  }
}
