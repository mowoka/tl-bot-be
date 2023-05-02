/*
  Warnings:

  - A unique constraint covering the columns `[team_lead_job_code]` on the table `team_lead_job` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `team_lead_job_code` to the `team_lead_job` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "team_lead_job_name_key";

-- AlterTable
ALTER TABLE "team_lead_job" ADD COLUMN     "team_lead_job_code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "team_lead_job_team_lead_job_code_key" ON "team_lead_job"("team_lead_job_code");
