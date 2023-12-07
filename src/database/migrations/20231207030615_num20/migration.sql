/*
  Warnings:

  - The primary key for the `audios` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `audioId` column on the `audios` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `organizationUsers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `userId` column on the `organizationUsers` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `organizations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `organizationId` column on the `organizations` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `photos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `photoId` column on the `photos` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `projectPositions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `projectPositionId` column on the `projectPositions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `projects` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `projectId` column on the `projects` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `orgUserUserId` column on the `projects` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `videos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `videoId` column on the `videos` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `B` on the `_CityToOrganization` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `B` on the `_CityToProject` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `projectId` on the `audios` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `audios` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `organizationId` on the `organizationUsers` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `projectId` on the `photos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `photos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `projectId` on the `projectPositions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `organizationId` on the `projects` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `projectId` on the `videos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `videos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "_CityToOrganization" DROP CONSTRAINT "_CityToOrganization_B_fkey";

-- DropForeignKey
ALTER TABLE "_CityToProject" DROP CONSTRAINT "_CityToProject_B_fkey";

-- DropForeignKey
ALTER TABLE "audios" DROP CONSTRAINT "audios_projectId_fkey";

-- DropForeignKey
ALTER TABLE "audios" DROP CONSTRAINT "audios_userId_fkey";

-- DropForeignKey
ALTER TABLE "organizationUsers" DROP CONSTRAINT "organizationUsers_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "photos" DROP CONSTRAINT "photos_projectId_fkey";

-- DropForeignKey
ALTER TABLE "photos" DROP CONSTRAINT "photos_userId_fkey";

-- DropForeignKey
ALTER TABLE "projectPositions" DROP CONSTRAINT "projectPositions_projectId_fkey";

-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_orgUserUserId_fkey";

-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "videos" DROP CONSTRAINT "videos_projectId_fkey";

-- DropForeignKey
ALTER TABLE "videos" DROP CONSTRAINT "videos_userId_fkey";

-- AlterTable
ALTER TABLE "_CityToOrganization" DROP COLUMN "B",
ADD COLUMN     "B" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "_CityToProject" DROP COLUMN "B",
ADD COLUMN     "B" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "audios" DROP CONSTRAINT "audios_pkey",
DROP COLUMN "audioId",
ADD COLUMN     "audioId" SERIAL NOT NULL,
DROP COLUMN "projectId",
ADD COLUMN     "projectId" INTEGER NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "audios_pkey" PRIMARY KEY ("audioId");

-- AlterTable
ALTER TABLE "organizationUsers" DROP CONSTRAINT "organizationUsers_pkey",
DROP COLUMN "userId",
ADD COLUMN     "userId" SERIAL NOT NULL,
DROP COLUMN "organizationId",
ADD COLUMN     "organizationId" INTEGER NOT NULL,
ADD CONSTRAINT "organizationUsers_pkey" PRIMARY KEY ("userId");

-- AlterTable
ALTER TABLE "organizations" DROP CONSTRAINT "organizations_pkey",
DROP COLUMN "organizationId",
ADD COLUMN     "organizationId" SERIAL NOT NULL,
ADD CONSTRAINT "organizations_pkey" PRIMARY KEY ("organizationId");

-- AlterTable
ALTER TABLE "photos" DROP CONSTRAINT "photos_pkey",
DROP COLUMN "photoId",
ADD COLUMN     "photoId" SERIAL NOT NULL,
DROP COLUMN "projectId",
ADD COLUMN     "projectId" INTEGER NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "photos_pkey" PRIMARY KEY ("photoId");

-- AlterTable
ALTER TABLE "projectPositions" DROP CONSTRAINT "projectPositions_pkey",
DROP COLUMN "projectPositionId",
ADD COLUMN     "projectPositionId" SERIAL NOT NULL,
DROP COLUMN "projectId",
ADD COLUMN     "projectId" INTEGER NOT NULL,
ADD CONSTRAINT "projectPositions_pkey" PRIMARY KEY ("projectPositionId");

-- AlterTable
ALTER TABLE "projects" DROP CONSTRAINT "projects_pkey",
DROP COLUMN "projectId",
ADD COLUMN     "projectId" SERIAL NOT NULL,
DROP COLUMN "organizationId",
ADD COLUMN     "organizationId" INTEGER NOT NULL,
DROP COLUMN "orgUserUserId",
ADD COLUMN     "orgUserUserId" INTEGER,
ADD CONSTRAINT "projects_pkey" PRIMARY KEY ("projectId");

-- AlterTable
ALTER TABLE "videos" DROP CONSTRAINT "videos_pkey",
DROP COLUMN "videoId",
ADD COLUMN     "videoId" SERIAL NOT NULL,
DROP COLUMN "projectId",
ADD COLUMN     "projectId" INTEGER NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "videos_pkey" PRIMARY KEY ("videoId");

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
CREATE UNIQUE INDEX "projects_organizationId_name_key" ON "projects"("organizationId", "name");

-- AddForeignKey
ALTER TABLE "organizationUsers" ADD CONSTRAINT "organizationUsers_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("organizationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("organizationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_orgUserUserId_fkey" FOREIGN KEY ("orgUserUserId") REFERENCES "organizationUsers"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projectPositions" ADD CONSTRAINT "projectPositions_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("projectId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photos" ADD CONSTRAINT "photos_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("projectId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photos" ADD CONSTRAINT "photos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "organizationUsers"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "videos" ADD CONSTRAINT "videos_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("projectId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "videos" ADD CONSTRAINT "videos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "organizationUsers"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audios" ADD CONSTRAINT "audios_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("projectId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audios" ADD CONSTRAINT "audios_userId_fkey" FOREIGN KEY ("userId") REFERENCES "organizationUsers"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CityToOrganization" ADD CONSTRAINT "_CityToOrganization_B_fkey" FOREIGN KEY ("B") REFERENCES "organizations"("organizationId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CityToProject" ADD CONSTRAINT "_CityToProject_B_fkey" FOREIGN KEY ("B") REFERENCES "projects"("projectId") ON DELETE CASCADE ON UPDATE CASCADE;
