import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AddressRepository } from './address.repository';
import { AddressGrpcController } from './address.grpc.controller';

@Module({
  imports: [PrismaModule],
  providers: [AddressService, AddressRepository],
  controllers: [AddressController, AddressGrpcController],
})
export class AddressModule {}
