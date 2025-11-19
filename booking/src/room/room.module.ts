import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RoomRepository } from './room.repository';
import { AddressGrpcClientModule } from 'src/grpc/address-grpc-client.module';

@Module({
  imports: [PrismaModule, AddressGrpcClientModule],
  controllers: [RoomController],
  providers: [RoomService, RoomRepository],
})
export class RoomModule {}
