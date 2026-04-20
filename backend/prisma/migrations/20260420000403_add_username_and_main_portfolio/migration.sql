/*
  Warnings:

  - You are about to drop the column `bio` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `headline` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `skills` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `socialLinks` on the `Users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Portfolios" ADD COLUMN     "isMainPortfolio" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "bio",
DROP COLUMN "headline",
DROP COLUMN "skills",
DROP COLUMN "socialLinks",
ADD COLUMN     "username" VARCHAR(100);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");
