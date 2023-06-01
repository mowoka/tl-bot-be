/*
  Warnings:

  - Added the required column `date` to the `ticket_infra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `ticket_infra` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ticket_infra" ADD COLUMN     "date" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ticket_bantek" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "ticket_number" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "teknisi_bantek" TEXT NOT NULL,
    "teknisi_job_id" TEXT NOT NULL,
    "idTelegram" TEXT NOT NULL,

    CONSTRAINT "ticket_bantek_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ticket_bantek" ADD CONSTRAINT "ticket_bantek_teknisi_job_id_fkey" FOREIGN KEY ("teknisi_job_id") REFERENCES "teknisi_job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_bantek" ADD CONSTRAINT "ticket_bantek_idTelegram_fkey" FOREIGN KEY ("idTelegram") REFERENCES "user_teknisi"("idTelegram") ON DELETE RESTRICT ON UPDATE CASCADE;
