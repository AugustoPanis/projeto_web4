/*
  Warnings:

  - Added the required column `local` to the `equipament` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "equipament" ADD COLUMN     "local" TEXT NOT NULL;
