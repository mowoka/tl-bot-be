/*
  Warnings:

  - You are about to drop the `lapor_langsung` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `proman` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tutup_odp` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `unspect` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `valins` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "lapor_langsung" DROP CONSTRAINT "lapor_langsung_idTelegram_fkey";

-- DropForeignKey
ALTER TABLE "lapor_langsung" DROP CONSTRAINT "lapor_langsung_teknisi_job_id_fkey";

-- DropForeignKey
ALTER TABLE "proman" DROP CONSTRAINT "proman_idTelegram_fkey";

-- DropForeignKey
ALTER TABLE "proman" DROP CONSTRAINT "proman_teknisi_job_id_fkey";

-- DropForeignKey
ALTER TABLE "tutup_odp" DROP CONSTRAINT "tutup_odp_idTelegram_fkey";

-- DropForeignKey
ALTER TABLE "tutup_odp" DROP CONSTRAINT "tutup_odp_teknisi_job_id_fkey";

-- DropForeignKey
ALTER TABLE "unspect" DROP CONSTRAINT "unspect_idTelegram_fkey";

-- DropForeignKey
ALTER TABLE "unspect" DROP CONSTRAINT "unspect_teknisi_job_id_fkey";

-- DropForeignKey
ALTER TABLE "valins" DROP CONSTRAINT "valins_idTelegram_fkey";

-- DropForeignKey
ALTER TABLE "valins" DROP CONSTRAINT "valins_teknisi_job_id_fkey";

-- DropTable
DROP TABLE "lapor_langsung";

-- DropTable
DROP TABLE "proman";

-- DropTable
DROP TABLE "tutup_odp";

-- DropTable
DROP TABLE "unspect";

-- DropTable
DROP TABLE "valins";

-- CreateTable
CREATE TABLE "ticket_lapor_langsung" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "speedy_number" TEXT NOT NULL,
    "customer_phone" TEXT NOT NULL,
    "customer_name" TEXT NOT NULL,
    "problem" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "teknisi_job_id" TEXT NOT NULL,
    "idTelegram" TEXT NOT NULL,

    CONSTRAINT "ticket_lapor_langsung_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket_tutup_odp" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "odp_name" TEXT NOT NULL,
    "odp_address" TEXT NOT NULL,
    "teknisi_job_id" TEXT NOT NULL,
    "idTelegram" TEXT NOT NULL,

    CONSTRAINT "ticket_tutup_odp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket_proman" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "odp_name" TEXT NOT NULL,
    "distribusi" TEXT NOT NULL,
    "capacity_port" INTEGER NOT NULL,
    "status_port_use" INTEGER NOT NULL,
    "status_port_available" INTEGER NOT NULL,
    "odp_cradle" INTEGER NOT NULL,
    "opm_length" INTEGER NOT NULL,
    "teknisi_job_id" TEXT NOT NULL,
    "idTelegram" TEXT NOT NULL,

    CONSTRAINT "ticket_proman_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket_unspect" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "speedy_number" TEXT NOT NULL,
    "odp" TEXT NOT NULL,
    "problem" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "teknisi_job_id" TEXT NOT NULL,
    "idTelegram" TEXT NOT NULL,

    CONSTRAINT "ticket_unspect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket_valins" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "valins_id" TEXT NOT NULL,
    "odp" TEXT NOT NULL,
    "teknisi_job_id" TEXT NOT NULL,
    "idTelegram" TEXT NOT NULL,

    CONSTRAINT "ticket_valins_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ticket_lapor_langsung" ADD CONSTRAINT "ticket_lapor_langsung_teknisi_job_id_fkey" FOREIGN KEY ("teknisi_job_id") REFERENCES "teknisi_job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_lapor_langsung" ADD CONSTRAINT "ticket_lapor_langsung_idTelegram_fkey" FOREIGN KEY ("idTelegram") REFERENCES "user_teknisi"("idTelegram") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_tutup_odp" ADD CONSTRAINT "ticket_tutup_odp_teknisi_job_id_fkey" FOREIGN KEY ("teknisi_job_id") REFERENCES "teknisi_job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_tutup_odp" ADD CONSTRAINT "ticket_tutup_odp_idTelegram_fkey" FOREIGN KEY ("idTelegram") REFERENCES "user_teknisi"("idTelegram") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_proman" ADD CONSTRAINT "ticket_proman_teknisi_job_id_fkey" FOREIGN KEY ("teknisi_job_id") REFERENCES "teknisi_job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_proman" ADD CONSTRAINT "ticket_proman_idTelegram_fkey" FOREIGN KEY ("idTelegram") REFERENCES "user_teknisi"("idTelegram") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_unspect" ADD CONSTRAINT "ticket_unspect_teknisi_job_id_fkey" FOREIGN KEY ("teknisi_job_id") REFERENCES "teknisi_job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_unspect" ADD CONSTRAINT "ticket_unspect_idTelegram_fkey" FOREIGN KEY ("idTelegram") REFERENCES "user_teknisi"("idTelegram") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_valins" ADD CONSTRAINT "ticket_valins_teknisi_job_id_fkey" FOREIGN KEY ("teknisi_job_id") REFERENCES "teknisi_job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_valins" ADD CONSTRAINT "ticket_valins_idTelegram_fkey" FOREIGN KEY ("idTelegram") REFERENCES "user_teknisi"("idTelegram") ON DELETE RESTRICT ON UPDATE CASCADE;
