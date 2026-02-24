import { Controller, Get, Patch, Param, UseGuards } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { AuthGuard } from './common/guards/auth.guard';
import { User } from './common/decorators/user.decorator';

@Controller('notifications')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('booking.created')
  async handleBookingCreated(@Payload() data: { userId: string; bookingId: string; roomName?: string }) {
    const title = 'Booking Successful!';
    const message = `Your booking for ${data.roomName || 'a room'} has been confirmed. Booking ID: ${data.bookingId}`;
    await this.appService.createNotification(data.userId, title, message, 'BOOKING');
  }

  @EventPattern('booking.received')
  async handleBookingReceived(@Payload() data: { hostId: string; bookingId: string; roomName?: string }) {
    const title = 'New Booking Received!';
    const message = `Someone has booked ${data.roomName || 'your room'}. Booking ID: ${data.bookingId}`;
    await this.appService.createNotification(data.hostId, title, message, 'BOOKING');
  }

  @Get()
  @UseGuards(AuthGuard)
  async getUserNotifications(@User() user: { sub: string }) {
    if (!user?.sub) return [];
    return this.appService.getUserNotifications(user.sub);
  }

  @Patch(':id/read')
  @UseGuards(AuthGuard)
  async markAsRead(@Param('id') id: string) {
    return this.appService.markAsRead(id);
  }
}
