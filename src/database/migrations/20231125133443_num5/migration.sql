/*
  Warnings:

  - Added the required column `nickName` to the `organizationUsers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Country" ADD COLUMN     "flag" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "organizationUsers" ADD COLUMN     "nickName" TEXT NOT NULL;
