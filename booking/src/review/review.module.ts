import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewRepository } from './review.repository';
import { ReviewController } from './review.controller';
import { RoomModule } from '../room/room.module';
import { PrismaModule } from '../prisma/prisma.module';
import { UserGrpcClientModule } from '../grpc/user-grpc-client.module';

@Module({
  imports: [RoomModule, PrismaModule, UserGrpcClientModule],
  controllers: [ReviewController],
  providers: [ReviewService, ReviewRepository],
})
export class ReviewModule {}
