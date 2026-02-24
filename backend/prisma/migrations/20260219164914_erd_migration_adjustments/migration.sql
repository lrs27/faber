/*
  Warnings:

  - Made the column `message` on table `ContactSubmissions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fileSize` on table `Media` required. This step will fail if there are existing NULL values in that column.
  - Made the column `projectUrl` on table `Projects` required. This step will fail if there are existing NULL values in that column.
  - Made the column `technologies` on table `Projects` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ContactSubmissions" ALTER COLUMN "message" SET NOT NULL;

-- AlterTable
ALTER TABLE "Media" ALTER COLUMN "fileSize" SET NOT NULL;

-- AlterTable
ALTER TABLE "Projects" ALTER COLUMN "projectUrl" SET NOT NULL,
ALTER COLUMN "technologies" SET NOT NULL;
