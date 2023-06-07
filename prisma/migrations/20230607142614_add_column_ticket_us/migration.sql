-- CreateTable
CREATE TABLE "ticket_us" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "speedy_number" TEXT NOT NULL,
    "odp" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tanggal" TEXT NOT NULL,
    "teknisi_job_id" TEXT NOT NULL,
    "idTelegram" TEXT NOT NULL,

    CONSTRAINT "ticket_us_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ticket_us" ADD CONSTRAINT "ticket_us_teknisi_job_id_fkey" FOREIGN KEY ("teknisi_job_id") REFERENCES "teknisi_job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_us" ADD CONSTRAINT "ticket_us_idTelegram_fkey" FOREIGN KEY ("idTelegram") REFERENCES "user_teknisi"("idTelegram") ON DELETE RESTRICT ON UPDATE CASCADE;
