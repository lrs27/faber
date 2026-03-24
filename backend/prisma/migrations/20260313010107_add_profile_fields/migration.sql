-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "headline" VARCHAR(255),
ADD COLUMN     "skills" JSONB,
ADD COLUMN     "socialLinks" JSONB;
