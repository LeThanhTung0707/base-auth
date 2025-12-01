import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { BookingModule } from './booking/booking.module';
import { RoomModule } from './room/room.module';

import { AddressGrpcClientModule } from './grpc/address-grpc-client.module';
import { RequestLoggerMiddleware } from './common/logger/request-logger.middleware';

@Module({
  imports: [PrismaModule, BookingModule, RoomModule, AddressGrpcClientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
