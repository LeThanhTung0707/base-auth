import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { BookingModule } from './booking/booking.module';
import { RoomModule } from './room/room.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AddressGrpcClientModule } from './grpc/address-grpc-client.module';

@Module({
  imports: [PrismaModule, BookingModule, RoomModule, AddressGrpcClientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
