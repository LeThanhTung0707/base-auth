import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AddressRepository {
  constructor(private prisma: PrismaService) {}

  async getProvinces() {
    return await this.prisma.province.findMany({
      orderBy: { name: 'asc' },
    });
  }
  async getWardsByProvince(provinceCode: number) {
    return await this.prisma.ward.findMany({
      where: { provinceCode },
      orderBy: { name: 'asc' },
    });
  }

  // Historical
  async getHistoricalProvinces() {
    return await this.prisma.historicalProvince.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async getHistoricalDistricts(provinceCode: number) {
    return await this.prisma.historicalDistrict.findMany({
      where: { provinceCode },
      orderBy: { name: 'asc' },
    });
  }

  async getHistoricalWards(districtCode: number) {
    return await this.prisma.historicalWard.findMany({
      where: { districtCode },
      orderBy: { name: 'asc' },
    });
  }

  async getHistoricalProvince(code: number) {
    return await this.prisma.historicalProvince.findUnique({
      where: { code },
    });
  }

  async getHistoricalDistrict(code: number) {
    return await this.prisma.historicalDistrict.findUnique({
      where: { code },
    });
  }

  async getHistoricalWard(code: number) {
    return await this.prisma.historicalWard.findUnique({
      where: { code },
    });
  }
}
