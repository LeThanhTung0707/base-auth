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
          protoPath: join(process.cwd(), 'proto/address.proto'),
          url: 'address:50051',
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class AddressGrpcClientModule {}
