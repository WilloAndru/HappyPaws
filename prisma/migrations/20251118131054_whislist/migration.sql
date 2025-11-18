/*
  Warnings:

  - You are about to drop the `WishList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."WishList" DROP CONSTRAINT "WishList_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."WishList" DROP CONSTRAINT "WishList_userId_fkey";

-- DropTable
DROP TABLE "public"."WishList";

-- CreateTable
CREATE TABLE "WishItem" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WishItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WishItem_userId_productId_key" ON "WishItem"("userId", "productId");

-- AddForeignKey
ALTER TABLE "WishItem" ADD CONSTRAINT "WishItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishItem" ADD CONSTRAINT "WishItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
