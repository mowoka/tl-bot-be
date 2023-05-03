/*
  Warnings:

  - You are about to drop the column `partner` on the `user_teknisi` table. All the data in the column will be lost.
  - You are about to drop the column `regional` on the `user_teknisi` table. All the data in the column will be lost.
  - You are about to drop the column `sector` on the `user_teknisi` table. All the data in the column will be lost.
  - You are about to drop the column `witel` on the `user_teknisi` table. All the data in the column will be lost.
  - Added the required column `partner_id` to the `user_teknisi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regional_id` to the `user_teknisi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sector_id` to the `user_teknisi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `user_teknisi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `witel_id` to the `user_teknisi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_teknisi" DROP COLUMN "partner",
DROP COLUMN "regional",
DROP COLUMN "sector",
DROP COLUMN "witel",
ADD COLUMN     "partner_id" INTEGER NOT NULL,
ADD COLUMN     "regional_id" INTEGER NOT NULL,
ADD COLUMN     "sector_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL,
ADD COLUMN     "witel_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "user_teknisi" ADD CONSTRAINT "user_teknisi_partner_id_fkey" FOREIGN KEY ("partner_id") REFERENCES "partner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_teknisi" ADD CONSTRAINT "user_teknisi_sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "sector"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_teknisi" ADD CONSTRAINT "user_teknisi_witel_id_fkey" FOREIGN KEY ("witel_id") REFERENCES "witel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_teknisi" ADD CONSTRAINT "user_teknisi_regional_id_fkey" FOREIGN KEY ("regional_id") REFERENCES "regional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_teknisi" ADD CONSTRAINT "user_teknisi_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
