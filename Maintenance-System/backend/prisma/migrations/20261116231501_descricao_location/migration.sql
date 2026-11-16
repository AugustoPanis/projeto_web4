/*
  Warnings:

  - Added the required column `description` to the `location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "location" ADD COLUMN     "description" TEXT NOT NULL;
