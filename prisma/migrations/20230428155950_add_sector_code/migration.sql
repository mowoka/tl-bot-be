/*
  Warnings:

  - A unique constraint covering the columns `[sector_code]` on the table `sector` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sector_code` to the `sector` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sector" ADD COLUMN     "sector_code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "sector_sector_code_key" ON "sector"("sector_code");
