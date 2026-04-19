/*
  Warnings:

  - You are about to drop the `History` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_assetId_fkey";

-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_supplierId_fkey";

-- DropTable
DROP TABLE "History";

-- CreateTable
CREATE TABLE "history" (
    "id" TEXT NOT NULL,
    "type" "MaintenanceType" NOT NULL,
    "assetId" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "date" DATE NOT NULL,

    CONSTRAINT "history_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "history" ADD CONSTRAINT "history_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "assets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "history" ADD CONSTRAINT "history_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
