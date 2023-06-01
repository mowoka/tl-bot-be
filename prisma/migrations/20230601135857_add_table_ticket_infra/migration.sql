-- CreateTable
CREATE TABLE "ticket_infra" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "insiden_number" TEXT NOT NULL,
    "teknisi_job_id" TEXT NOT NULL,
    "idTelegram" TEXT NOT NULL,

    CONSTRAINT "ticket_infra_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ticket_infra" ADD CONSTRAINT "ticket_infra_teknisi_job_id_fkey" FOREIGN KEY ("teknisi_job_id") REFERENCES "teknisi_job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_infra" ADD CONSTRAINT "ticket_infra_idTelegram_fkey" FOREIGN KEY ("idTelegram") REFERENCES "user_teknisi"("idTelegram") ON DELETE RESTRICT ON UPDATE CASCADE;
