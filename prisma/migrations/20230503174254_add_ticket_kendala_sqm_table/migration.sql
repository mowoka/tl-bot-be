-- CreateTable
CREATE TABLE "ticket_kendala_sqm" (
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

    CONSTRAINT "ticket_kendala_sqm_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ticket_kendala_sqm_speedy_number_key" ON "ticket_kendala_sqm"("speedy_number");

-- AddForeignKey
ALTER TABLE "ticket_kendala_sqm" ADD CONSTRAINT "ticket_kendala_sqm_teknisi_job_id_fkey" FOREIGN KEY ("teknisi_job_id") REFERENCES "teknisi_job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_kendala_sqm" ADD CONSTRAINT "ticket_kendala_sqm_idTelegram_fkey" FOREIGN KEY ("idTelegram") REFERENCES "user_teknisi"("idTelegram") ON DELETE RESTRICT ON UPDATE CASCADE;
