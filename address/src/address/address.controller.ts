import { Controller, Get, Query } from '@nestjs/common';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  // =======================
  // 🟢 API địa chỉ MỚI (2 cấp)
  // =======================

  @Get('/provinces')
  getProvinces() {
    return this.addressService.getProvinces();
  }

  @Get('/wards')
  getWards(@Query('provinceCode') provinceCode: string) {
    return this.addressService.getWardsByProvince(+provinceCode);
  }

  // =======================
  // 🔴 API địa chỉ CŨ (3 cấp)
  // =======================

  @Get('/historical/provinces')
  getHistoricalProvinces() {
    return this.addressService.getHistoricalProvinces();
  }

  @Get('/historical/districts')
  getHistoricalDistricts(@Query('provinceCode') provinceCode: string) {
    return this.addressService.getHistoricalDistricts(+provinceCode);
  }

  @Get('/historical/wards')
  getHistoricalWards(@Query('districtCode') districtCode: string) {
    return this.addressService.getHistoricalWards(+districtCode);
  }
}
