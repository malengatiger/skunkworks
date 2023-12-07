/*
  Warnings:

  - You are about to drop the column `cityId` on the `organizations` table. All the data in the column will be lost.
  - You are about to drop the column `cityId` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `projects` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[organizationId,name]` on the table `organizationUsers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[countryId,name]` on the table `organizations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[organizationId,name]` on the table `projects` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "organizations" DROP CONSTRAINT "organizations_cityId_fkey";

-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_cityId_fkey";

-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_userId_fkey";

-- AlterTable
ALTER TABLE "organizations" DROP COLUMN "cityId";

-- AlterTable
ALTER TABLE "projects" DROP COLUMN "cityId",
DROP COLUMN "userId",
ADD COLUMN     "orgUserUserId" TEXT;

-- CreateTable
CREATE TABLE "_CityToOrganization" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CityToProject" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CityToOrganization_AB_unique" ON "_CityToOrganization"("A", "B");

-- CreateIndex
CREATE INDEX "_CityToOrganization_B_index" ON "_CityToOrganization"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CityToProject_AB_unique" ON "_CityToProject"("A", "B");

-- CreateIndex
CREATE INDEX "_CityToProject_B_index" ON "_CityToProject"("B");

-- CreateIndex
CREATE UNIQUE INDEX "organizationUsers_organizationId_name_key" ON "organizationUsers"("organizationId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_countryId_name_key" ON "organizations"("countryId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "projects_organizationId_name_key" ON "projects"("organizationId", "name");

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_orgUserUserId_fkey" FOREIGN KEY ("orgUserUserId") REFERENCES "organizationUsers"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CityToOrganization" ADD CONSTRAINT "_CityToOrganization_A_fkey" FOREIGN KEY ("A") REFERENCES "City"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CityToOrganization" ADD CONSTRAINT "_CityToOrganization_B_fkey" FOREIGN KEY ("B") REFERENCES "organizations"("organizationId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CityToProject" ADD CONSTRAINT "_CityToProject_A_fkey" FOREIGN KEY ("A") REFERENCES "City"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CityToProject" ADD CONSTRAINT "_CityToProject_B_fkey" FOREIGN KEY ("B") REFERENCES "projects"("projectId") ON DELETE CASCADE ON UPDATE CASCADE;
