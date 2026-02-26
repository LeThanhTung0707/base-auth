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

  async setCache(key: string, value: string) {
    await this.redis.set(key, value, 'EX', 3600);
    return { success: true };
  }

  async getCache(key: string) {
    const value = await this.redis.get(key);
    return { key, value };
  }

  getHello(): string {
    return 'Food Service is running!';
  }

  async findAllRestaurants() {
    return this.prisma.restaurant.findMany({
      include: { menuItems: true },
    });
  }

  async findRestaurantById(id: string) {
    return this.prisma.restaurant.findUnique({
      where: { id },
      include: { menuItems: true },
    });
  }

  async createRestaurant(data: any) {
    return this.prisma.restaurant.create({
      data,
    });
  }

  async findMenuItemsByRestaurant(restaurantId: string) {
    return this.prisma.menuItem.findMany({
      where: { restaurantId },
    });
  }
}
