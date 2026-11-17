/*
  Warnings:

  - Added the required column `description` to the `work_order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "work_order" ADD COLUMN     "description" TEXT NOT NULL;
