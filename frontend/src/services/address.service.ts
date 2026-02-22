const ADDRESS_API_URL = typeof window === 'undefined'
  ? (process.env.INTERNAL_ADDRESS_URL || 'http://address:4002')
  : (process.env.NEXT_PUBLIC_ADDRESS_API_URL || 'http://localhost:8080');

export interface Province {
  code: number;
  name: string;
  nameEn?: string;
  fullName?: string;
  fullNameEn?: string;
  codeName?: string;
}

export interface District {
  code: number;
  name: string;
  nameEn?: string;
  fullName?: string;
  fullNameEn?: string;
  codeName?: string;
  provinceCode: number;
}

export interface Ward {
  code: number;
  name: string;
  nameEn?: string;
  fullName?: string;
  fullNameEn?: string;
  codeName?: string;
  districtCode: number;
}

export const AddressService = {
  async getProvinces(): Promise<Province[]> {
    const res = await fetch(`${ADDRESS_API_URL}/address/historical/provinces`);
    if (!res.ok) throw new Error('Failed to fetch provinces');
    return res.json();
  },

  async getDistricts(provinceCode: number): Promise<District[]> {
    const res = await fetch(`${ADDRESS_API_URL}/address/historical/districts?provinceCode=${provinceCode}`);
    if (!res.ok) throw new Error('Failed to fetch districts');
    return res.json();
  },

  async getWards(districtCode: number): Promise<Ward[]> {
    const res = await fetch(`${ADDRESS_API_URL}/address/historical/wards?districtCode=${districtCode}`);
    if (!res.ok) throw new Error('Failed to fetch wards');
    return res.json();
  },

  async getProvince(code: number): Promise<Province> {
    const res = await fetch(`${ADDRESS_API_URL}/address/historical/province/${code}`);
    if (!res.ok) throw new Error('Failed to fetch province');
    return res.json();
  },

  async getDistrict(code: number): Promise<District> {
    const res = await fetch(`${ADDRESS_API_URL}/address/historical/district/${code}`);
    if (!res.ok) throw new Error('Failed to fetch district');
    return res.json();
  },

  async getWard(code: number): Promise<Ward> {
    const res = await fetch(`${ADDRESS_API_URL}/address/historical/ward/${code}`);
    if (!res.ok) throw new Error('Failed to fetch ward');
    return res.json();
  }
};
