/*
  Warnings:

  - You are about to drop the column `acquisitionDate` on the `technician` table. All the data in the column will be lost.
  - You are about to drop the column `local` on the `technician` table. All the data in the column will be lost.
  - You are about to drop the column `patrymony` on the `technician` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `technician` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `technician` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `technician` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specialty` to the `technician` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "technician_patrymony_key";

-- AlterTable
ALTER TABLE "technician" DROP COLUMN "acquisitionDate",
DROP COLUMN "local",
DROP COLUMN "patrymony",
DROP COLUMN "status",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "specialty" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "technician_email_key" ON "technician"("email");
