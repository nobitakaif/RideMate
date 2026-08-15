/*
  Warnings:

  - Added the required column `fuel` to the `vehicles` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FUEL" AS ENUM ('ELECTRIC', 'FUEL', 'GAS');

-- AlterTable
ALTER TABLE "vehicles" ADD COLUMN     "fuel" "FUEL" NOT NULL;
