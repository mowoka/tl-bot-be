/*
  Warnings:

  - A unique constraint covering the columns `[teknisi_job_code]` on the table `teknisi_job` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `teknisi_job_code` to the `teknisi_job` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "teknisi_job_name_key";

-- AlterTable
ALTER TABLE "teknisi_job" ADD COLUMN     "teknisi_job_code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "teknisi_job_teknisi_job_code_key" ON "teknisi_job"("teknisi_job_code");
