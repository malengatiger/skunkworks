/*
  Warnings:

  - You are about to drop the `Translation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Translation" DROP CONSTRAINT "Translation_countryId_fkey";

-- DropTable
DROP TABLE "Translation";
