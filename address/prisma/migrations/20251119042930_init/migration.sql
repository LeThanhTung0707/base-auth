-- CreateTable
CREATE TABLE "Province" (
    "code" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "codename" TEXT NOT NULL,
    "divisionType" TEXT NOT NULL,
    "phoneCode" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Province_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Ward" (
    "code" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "codename" TEXT NOT NULL,
    "divisionType" TEXT NOT NULL,
    "provinceCode" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ward_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "HistoricalProvince" (
    "code" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "codename" TEXT NOT NULL,
    "divisionType" TEXT NOT NULL,
    "phoneCode" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HistoricalProvince_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "HistoricalDistrict" (
    "code" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "codename" TEXT NOT NULL,
    "divisionType" TEXT NOT NULL,
    "provinceCode" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HistoricalDistrict_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "HistoricalWard" (
    "code" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "codename" TEXT NOT NULL,
    "divisionType" TEXT NOT NULL,
    "districtCode" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HistoricalWard_pkey" PRIMARY KEY ("code")
);

-- AddForeignKey
ALTER TABLE "Ward" ADD CONSTRAINT "Ward_provinceCode_fkey" FOREIGN KEY ("provinceCode") REFERENCES "Province"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricalDistrict" ADD CONSTRAINT "HistoricalDistrict_provinceCode_fkey" FOREIGN KEY ("provinceCode") REFERENCES "HistoricalProvince"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricalWard" ADD CONSTRAINT "HistoricalWard_districtCode_fkey" FOREIGN KEY ("districtCode") REFERENCES "HistoricalDistrict"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
