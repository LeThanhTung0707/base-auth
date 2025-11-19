import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ADDRESS_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'address',
          protoPath: join(__dirname, '../../../proto/address.proto'),
          url: 'localhost:50051',
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class AddressGrpcClientModule {}
