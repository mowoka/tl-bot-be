-- CreateTable
CREATE TABLE "regional" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "regional_code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "regional_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "regional_regional_code_key" ON "regional"("regional_code");
