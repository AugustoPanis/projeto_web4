/*
  Warnings:

  - Added the required column `category` to the `equipament` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "equipament" ADD COLUMN     "category" TEXT NOT NULL;
