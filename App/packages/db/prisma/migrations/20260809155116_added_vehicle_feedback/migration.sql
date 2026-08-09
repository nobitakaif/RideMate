/*
  Warnings:

  - Added the required column `currentState` to the `vehicles` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CurrentState" AS ENUM ('BOOKED', 'AVAILABLE');

-- AlterTable
ALTER TABLE "vehicles" ADD COLUMN     "currentState" "CurrentState" NOT NULL;

-- CreateTable
CREATE TABLE "VehicleFeedback" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VehicleFeedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VehicleFeedback_userId_key" ON "VehicleFeedback"("userId");

-- AddForeignKey
ALTER TABLE "VehicleFeedback" ADD CONSTRAINT "VehicleFeedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleFeedback" ADD CONSTRAINT "VehicleFeedback_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
