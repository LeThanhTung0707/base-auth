import { Injectable, NotFoundException } from '@nestjs/common';
import { AddressRepository } from './address.repository';

@Injectable()
export class AddressService {
  constructor(private repo: AddressRepository) {}
  async getProvinces() {
    const result = await this.repo.getProvinces();
    if (!result.length) throw new NotFoundException('Không có tỉnh nào');
    return result;
  }

  async getWardsByProvince(provinceCode: number) {
    const result = await this.repo.getWardsByProvince(provinceCode);
    if (!result.length) throw new NotFoundException('Không có phường nào');
    return result;
  }

  async getHistoricalProvinces() {
    const result = await this.repo.getHistoricalProvinces();
    if (!result.length) throw new NotFoundException('Không có tỉnh cũ');
    return result;
  }

  async getHistoricalDistricts(provinceCode: number) {
    const result = await this.repo.getHistoricalDistricts(provinceCode);
    if (!result.length) throw new NotFoundException('Không có quận/huyện cũ');
    return result;
  }

  async getHistoricalWards(districtCode: number) {
    const result = await this.repo.getHistoricalWards(districtCode);
    if (!result.length) throw new NotFoundException('Không có phường/xã cũ');
    return result;
  }
}
