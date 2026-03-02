/*
  Warnings:

  - A unique constraint covering the columns `[googleId]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "authProvider" VARCHAR(50) NOT NULL DEFAULT 'email',
ADD COLUMN     "googleId" VARCHAR(255),
ADD COLUMN     "passwordHash" VARCHAR(255);

-- CreateIndex
CREATE UNIQUE INDEX "Users_googleId_key" ON "Users"("googleId");
