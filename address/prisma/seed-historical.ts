import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();
const BASE_URL = 'https://provinces.open-api.vn/api/v1';

async function main() {
  console.log('🔄 Fetch danh sách tỉnh cũ (3 cấp)...');
  const provincesRes = await axios.get(`${BASE_URL}/p`);
  const provinces = provincesRes.data as any[];

  for (const province of provinces) {
    console.log(`➡️ Tỉnh: ${province.name}`);

    // Fetch chi tiết tỉnh có district + ward
    const { data: fullProvince } = await axios.get(
      `${BASE_URL}/p/${province.code}?depth=3`,
    );

    // Insert HistoricalProvince
    const createdProvince = await prisma.historicalProvince.upsert({
      where: { code: fullProvince.code },
      update: {},
      create: {
        code: fullProvince.code,
        name: fullProvince.name,
        codename: fullProvince.codename,
        divisionType: fullProvince.division_type,
        phoneCode: fullProvince.phone_code,
      },
    });

    // Insert districts
    for (const district of fullProvince.districts || []) {
      console.log(`   └─ 🏢 Quận/Huyện: ${district.name}`);

      const createdDistrict = await prisma.historicalDistrict.upsert({
        where: { code: district.code },
        update: {},
        create: {
          code: district.code,
          name: district.name,
          codename: district.codename,
          divisionType: district.division_type,
          provinceCode: createdProvince.code,
        },
      });

      // Insert wards
      for (const ward of district.wards || []) {
        console.log(`       └─ 🏘 Phường/Xã: ${ward.name}`);

        await prisma.historicalWard.upsert({
          where: { code: ward.code },
          update: {},
          create: {
            code: ward.code,
            name: ward.name,
            codename: ward.codename,
            divisionType: ward.division_type,
            districtCode: createdDistrict.code,
          },
        });
      }
    }
  }

  console.log('✅ Đã seed xong địa chỉ cũ (3 cấp)!');
}

main()
  .catch((e) => {
    console.error('❌ Lỗi seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
