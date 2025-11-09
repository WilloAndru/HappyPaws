/*
  Warnings:

  - Made the column `description` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "AnimalType" AS ENUM ('DOG', 'CAT', 'CHICKEN', 'FISH', 'HAMSTER', 'HORSE');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('FOOD', 'HEALTH', 'TOYS', 'HYGIENE', 'ACCESSORIES', 'HABITAT');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "animalType" "AnimalType" NOT NULL DEFAULT 'CAT',
ADD COLUMN     "category" "Category" NOT NULL DEFAULT 'FOOD',
ALTER COLUMN "description" SET NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firebaseUid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "image" TEXT,
    "address" TEXT,
    "customerId" TEXT,
    "paymentMethodId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_firebaseUid_key" ON "User"("firebaseUid");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
