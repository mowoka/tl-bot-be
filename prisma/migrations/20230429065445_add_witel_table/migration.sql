-- CreateTable
CREATE TABLE "witel" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "witel_code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "witel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "witel_witel_code_key" ON "witel"("witel_code");
