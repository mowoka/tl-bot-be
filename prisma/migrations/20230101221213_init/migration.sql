-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "nik" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "idTelegram" TEXT NOT NULL,
    "partner" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "witel" TEXT NOT NULL,
    "regional" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_teknisi" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "nik" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "idTelegram" TEXT NOT NULL,
    "partner" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "witel" TEXT NOT NULL,
    "regional" TEXT NOT NULL,

    CONSTRAINT "user_teknisi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "team_lead_job" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "point" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "team_lead_job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teknisi_job" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "point" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "teknisi_job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lapor_langsung" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "speedy_number" TEXT NOT NULL,
    "customer_phone" TEXT NOT NULL,
    "customer_name" TEXT NOT NULL,
    "problem" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "teknisi_job_id" INTEGER NOT NULL,
    "idTelegram" TEXT NOT NULL,

    CONSTRAINT "lapor_langsung_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tutup_odp" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "odp_name" TEXT NOT NULL,
    "odp_address" TEXT NOT NULL,
    "teknisi_job_id" INTEGER NOT NULL,
    "idTelegram" TEXT NOT NULL,

    CONSTRAINT "tutup_odp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket_regular" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "insiden_number" TEXT NOT NULL,
    "speedy_number" TEXT NOT NULL,
    "customer_name" TEXT NOT NULL,
    "customer_number" TEXT NOT NULL,
    "problem" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "teknisi_job_id" INTEGER NOT NULL,
    "idTelegram" TEXT NOT NULL,

    CONSTRAINT "ticket_regular_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket_sqm" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "insiden_number" TEXT NOT NULL,
    "speedy_number" TEXT NOT NULL,
    "customer_name" TEXT NOT NULL,
    "customer_number" TEXT NOT NULL,
    "problem" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "teknisi_job_id" INTEGER NOT NULL,
    "idTelegram" TEXT NOT NULL,

    CONSTRAINT "ticket_sqm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "proman" (
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
    "teknisi_job_id" INTEGER NOT NULL,
    "idTelegram" TEXT NOT NULL,

    CONSTRAINT "proman_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unspect" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "speedy_number" TEXT NOT NULL,
    "odp" TEXT NOT NULL,
    "problem" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "teknisi_job_id" INTEGER NOT NULL,
    "idTelegram" TEXT NOT NULL,

    CONSTRAINT "unspect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "valins" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "valins_id" TEXT NOT NULL,
    "odp" TEXT NOT NULL,
    "teknisi_job_id" INTEGER NOT NULL,
    "idTelegram" TEXT NOT NULL,

    CONSTRAINT "valins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket_team_lead" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "teknisi_user_id" INTEGER NOT NULL,
    "team_lead_job_id" INTEGER NOT NULL,

    CONSTRAINT "ticket_team_lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket_redundant" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "insiden_number" TEXT NOT NULL,
    "speedy_number" TEXT NOT NULL,
    "customer_name" TEXT NOT NULL,
    "problem" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "minus_point" INTEGER NOT NULL,
    "job_id" INTEGER NOT NULL,
    "idTelegram" TEXT NOT NULL,

    CONSTRAINT "ticket_redundant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_nik_key" ON "user"("nik");

-- CreateIndex
CREATE UNIQUE INDEX "user_idTelegram_key" ON "user"("idTelegram");

-- CreateIndex
CREATE UNIQUE INDEX "user_teknisi_nik_key" ON "user_teknisi"("nik");

-- CreateIndex
CREATE UNIQUE INDEX "user_teknisi_idTelegram_key" ON "user_teknisi"("idTelegram");

-- CreateIndex
CREATE UNIQUE INDEX "team_lead_job_name_key" ON "team_lead_job"("name");

-- CreateIndex
CREATE UNIQUE INDEX "teknisi_job_name_key" ON "teknisi_job"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ticket_regular_speedy_number_key" ON "ticket_regular"("speedy_number");

-- CreateIndex
CREATE UNIQUE INDEX "ticket_sqm_speedy_number_key" ON "ticket_sqm"("speedy_number");

-- AddForeignKey
ALTER TABLE "lapor_langsung" ADD CONSTRAINT "lapor_langsung_teknisi_job_id_fkey" FOREIGN KEY ("teknisi_job_id") REFERENCES "teknisi_job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lapor_langsung" ADD CONSTRAINT "lapor_langsung_idTelegram_fkey" FOREIGN KEY ("idTelegram") REFERENCES "user_teknisi"("idTelegram") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tutup_odp" ADD CONSTRAINT "tutup_odp_teknisi_job_id_fkey" FOREIGN KEY ("teknisi_job_id") REFERENCES "teknisi_job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tutup_odp" ADD CONSTRAINT "tutup_odp_idTelegram_fkey" FOREIGN KEY ("idTelegram") REFERENCES "user_teknisi"("idTelegram") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_regular" ADD CONSTRAINT "ticket_regular_teknisi_job_id_fkey" FOREIGN KEY ("teknisi_job_id") REFERENCES "teknisi_job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_regular" ADD CONSTRAINT "ticket_regular_idTelegram_fkey" FOREIGN KEY ("idTelegram") REFERENCES "user_teknisi"("idTelegram") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_sqm" ADD CONSTRAINT "ticket_sqm_teknisi_job_id_fkey" FOREIGN KEY ("teknisi_job_id") REFERENCES "teknisi_job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_sqm" ADD CONSTRAINT "ticket_sqm_idTelegram_fkey" FOREIGN KEY ("idTelegram") REFERENCES "user_teknisi"("idTelegram") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proman" ADD CONSTRAINT "proman_teknisi_job_id_fkey" FOREIGN KEY ("teknisi_job_id") REFERENCES "teknisi_job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proman" ADD CONSTRAINT "proman_idTelegram_fkey" FOREIGN KEY ("idTelegram") REFERENCES "user_teknisi"("idTelegram") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unspect" ADD CONSTRAINT "unspect_teknisi_job_id_fkey" FOREIGN KEY ("teknisi_job_id") REFERENCES "teknisi_job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unspect" ADD CONSTRAINT "unspect_idTelegram_fkey" FOREIGN KEY ("idTelegram") REFERENCES "user_teknisi"("idTelegram") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "valins" ADD CONSTRAINT "valins_teknisi_job_id_fkey" FOREIGN KEY ("teknisi_job_id") REFERENCES "teknisi_job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "valins" ADD CONSTRAINT "valins_idTelegram_fkey" FOREIGN KEY ("idTelegram") REFERENCES "user_teknisi"("idTelegram") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_team_lead" ADD CONSTRAINT "ticket_team_lead_teknisi_user_id_fkey" FOREIGN KEY ("teknisi_user_id") REFERENCES "user_teknisi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_team_lead" ADD CONSTRAINT "ticket_team_lead_team_lead_job_id_fkey" FOREIGN KEY ("team_lead_job_id") REFERENCES "team_lead_job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_redundant" ADD CONSTRAINT "ticket_redundant_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "teknisi_job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_redundant" ADD CONSTRAINT "ticket_redundant_idTelegram_fkey" FOREIGN KEY ("idTelegram") REFERENCES "user_teknisi"("idTelegram") ON DELETE RESTRICT ON UPDATE CASCADE;
