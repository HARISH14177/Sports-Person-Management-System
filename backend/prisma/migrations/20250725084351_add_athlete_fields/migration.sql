/*
  Warnings:

  - Added the required column `gender` to the `Athlete` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Athlete" ADD COLUMN     "gender" TEXT NOT NULL,
ALTER COLUMN "photoUrl" DROP NOT NULL,
ALTER COLUMN "aadharUrl" DROP NOT NULL;
