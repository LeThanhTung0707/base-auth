import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewRepository } from './review.repository';
import { ReviewController } from './review.controller';
import { RoomModule } from '../room/room.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [RoomModule, PrismaModule],
  controllers: [ReviewController],
  providers: [ReviewService, ReviewRepository],
})
export class ReviewModule {}
