-- CreateTable
CREATE TABLE "technician" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "patrymony" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "local" TEXT NOT NULL,
    "acquisitionDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "technician_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "technician_patrymony_key" ON "technician"("patrymony");
