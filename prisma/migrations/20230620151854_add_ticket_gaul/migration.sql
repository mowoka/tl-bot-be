-- CreateTable
CREATE TABLE "ticket_gaul_regular" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "insiden_number" TEXT NOT NULL,
    "speedy_number" TEXT NOT NULL,
    "customer_name" TEXT NOT NULL,
    "customer_number" TEXT NOT NULL,
    "problem" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "teknisi_job_id" TEXT NOT NULL,
    "idTelegram" TEXT NOT NULL,

    CONSTRAINT "ticket_gaul_regular_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket_gaul_us" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "speedy_number" TEXT NOT NULL,
    "odp" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tanggal" TEXT NOT NULL,
    "teknisi_job_id" TEXT NOT NULL,
    "idTelegram" TEXT NOT NULL,

    CONSTRAINT "ticket_gaul_us_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket_gaul_sqm" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "insiden_number" TEXT NOT NULL,
    "speedy_number" TEXT NOT NULL,
    "customer_name" TEXT NOT NULL,
    "customer_number" TEXT NOT NULL,
    "problem" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "teknisi_job_id" TEXT NOT NULL,
    "idTelegram" TEXT NOT NULL,

    CONSTRAINT "ticket_gaul_sqm_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ticket_gaul_regular" ADD CONSTRAINT "ticket_gaul_regular_teknisi_job_id_fkey" FOREIGN KEY ("teknisi_job_id") REFERENCES "teknisi_job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_gaul_regular" ADD CONSTRAINT "ticket_gaul_regular_idTelegram_fkey" FOREIGN KEY ("idTelegram") REFERENCES "user_teknisi"("idTelegram") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_gaul_us" ADD CONSTRAINT "ticket_gaul_us_teknisi_job_id_fkey" FOREIGN KEY ("teknisi_job_id") REFERENCES "teknisi_job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_gaul_us" ADD CONSTRAINT "ticket_gaul_us_idTelegram_fkey" FOREIGN KEY ("idTelegram") REFERENCES "user_teknisi"("idTelegram") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_gaul_sqm" ADD CONSTRAINT "ticket_gaul_sqm_teknisi_job_id_fkey" FOREIGN KEY ("teknisi_job_id") REFERENCES "teknisi_job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_gaul_sqm" ADD CONSTRAINT "ticket_gaul_sqm_idTelegram_fkey" FOREIGN KEY ("idTelegram") REFERENCES "user_teknisi"("idTelegram") ON DELETE RESTRICT ON UPDATE CASCADE;
