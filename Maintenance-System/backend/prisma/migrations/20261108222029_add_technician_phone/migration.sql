/*
  Warnings:

  - Added the required column `phone` to the `technician` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "technician" ADD COLUMN     "phone" TEXT NOT NULL;
