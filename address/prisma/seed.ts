import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

const BASE_URL = 'https://provinces.open-api.vn/api/v2';

async function main() {
  console.log('🔄 Đang fetch danh sách tỉnh...');
  const provincesRes = await axios.get(`${BASE_URL}/p`);
  const provinces = provincesRes.data as any[];

  for (const province of provinces) {
    console.log(`➡️  Tỉnh: ${province.name}`);

    // Upsert Province
    const createdProvince = await prisma.province.upsert({
      where: { code: province.code },
      update: {},
      create: {
        code: province.code,
        name: province.name,
        codename: province.codename,
        divisionType: province.division_type,
        phoneCode: province.phone_code,
      },
    });

    // Fetch wards of this province
    const detailRes = await axios.get(`${BASE_URL}/p/${province.code}?depth=2`);
    const wards = detailRes.data.wards || [];

    for (const ward of wards) {
      console.log(`   └─ 🏘 Phường/Xã: ${ward.name}`);

      await prisma.ward.upsert({
        where: { code: ward.code },
        update: {},
        create: {
          code: ward.code,
          name: ward.name,
          codename: ward.codename,
          divisionType: ward.division_type,
          provinceCode: createdProvince.code,
        },
      });
    }
  }

  console.log('✅ Seeder hoàn tất!');
}

main()
  .catch((e) => {
    console.error('❌ Lỗi seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
