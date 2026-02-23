import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { NotificationGateway } from './notification.gateway';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    private prisma: PrismaService,
    private notificationGateway: NotificationGateway,
  ) {}

  async createNotification(userId: string, title: string, message: string, type: string) {
    this.logger.log(`Creating notification for user ${userId}: ${title}`);
    const notification = await this.prisma.notification.create({
      data: {
        userId,
        title,
        message,
        type,
      },
    });

    this.notificationGateway.emitToUser(userId, 'new_notification', notification);

    return notification;
  }

  async getUserNotifications(userId: string) {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 50, // Limit to recent 50
    });
  }

  async markAsRead(id: string) {
    return this.prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });
  }
}
