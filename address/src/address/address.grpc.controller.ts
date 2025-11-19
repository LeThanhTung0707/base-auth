import { Controller, NotFoundException } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { PrismaService } from '../prisma/prisma.service';

@Controller()
export class AddressGrpcController {
  constructor(private readonly prisma: PrismaService) {}

  @GrpcMethod('AddressService', 'IsValidWard')
  async isValidWard({ code }: { code: number }) {
    const ward = await this.prisma.ward.findUnique({ where: { code } });
    return { isValid: !!ward };
  }

  @GrpcMethod('AddressService', 'IsValidHistoricalWard')
  async isValidHistoricalWard({ code }: { code: number }) {
    const ward = await this.prisma.historicalWard.findUnique({
      where: { code },
    });
    return { isValid: !!ward };
  }

  @GrpcMethod('AddressService', 'GetWardDetail')
  async getWardDetail({ code }: { code: number }) {
    const ward = await this.prisma.ward.findUnique({
      where: { code },
      include: { province: true },
    });

    if (!ward) throw new NotFoundException(`Ward ${code} not found`);

    return {
      code: ward.code,
      name: ward.name,
      districtName: '', // địa chỉ mới KHÔNG có quận
      provinceName: ward.province.name,
    };
  }

  @GrpcMethod('AddressService', 'GetHistoricalWardDetail')
  async getHistoricalWardDetail({ code }: { code: number }) {
    const ward = await this.prisma.historicalWard.findUnique({
      where: { code },
      include: {
        district: {
          include: {
            province: true,
          },
        },
      },
    });

    if (!ward) throw new NotFoundException(`Historical Ward ${code} not found`);

    return {
      code: ward.code,
      name: ward.name,
      districtName: ward.district.name,
      provinceName: ward.district.province.name,
    };
  }
}
