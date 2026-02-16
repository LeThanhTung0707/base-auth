import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Bắt đầu nạp dữ liệu địa chỉ (Historical)...');

  try {
    // 1. Fetch data from API
    console.log('📥 Đang tải dữ liệu từ https://provinces.open-api.vn/api/?depth=3 ...');
    const response = await axios.get('https://provinces.open-api.vn/api/?depth=3');
    const provinces = response.data;

    console.log(`✅ Đã tải ${provinces.length} tỉnh/thành.`);

    // 2. Insert Data
    for (const p of provinces) {
      console.log(`Processing Province: ${p.name} (${p.code})`);

      // Upsert Province
      await prisma.historicalProvince.upsert({
        where: { code: p.code },
        update: {
          name: p.name,
          codename: p.codename,
          divisionType: p.division_type,
          phoneCode: p.phone_code,
        },
        create: {
          code: p.code,
          name: p.name,
          codename: p.codename,
          divisionType: p.division_type,
          phoneCode: p.phone_code,
        },
      });

      // Process Districts
      for (const d of p.districts) {
        // Upsert District
        await prisma.historicalDistrict.upsert({
          where: { code: d.code },
          update: {
            name: d.name,
            codename: d.codename,
            divisionType: d.division_type,
            provinceCode: p.code,
          },
          create: {
            code: d.code,
            name: d.name,
            codename: d.codename,
            divisionType: d.division_type,
            provinceCode: p.code,
          },
        });

        // Process Wards
        if (d.wards && d.wards.length > 0) {
            // Batch create wards is faster, but let's loop for safety/upsert or use createMany if confident.
            // Using loop with upsert to be safe against re-runs.
            // Optimization: Promise.all for wards in a district
            const wardPromises = d.wards.map((w: any) => 
                prisma.historicalWard.upsert({
                    where: { code: w.code },
                    update: {
                        name: w.name,
                        codename: w.codename,
                        divisionType: w.division_type,
                        districtCode: d.code,
                    },
                    create: {
                        code: w.code,
                        name: w.name,
                        codename: w.codename,
                        divisionType: w.division_type,
                        districtCode: d.code,
                    },
                })
            );
            await Promise.all(wardPromises);
        }
      }
    }

    console.log('🎉 Hoàn tất nạp dữ liệu!');
  } catch (error) {
    console.error('❌ Lỗi khi nạp dữ liệu:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
