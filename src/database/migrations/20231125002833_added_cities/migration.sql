/*
  Warnings:

  - Added the required column `userId` to the `audios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cityId` to the `organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `photos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cityId` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `videos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "audios" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "organizations" ADD COLUMN     "cityId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "photos" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "cityId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "videos" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "cities" (
    "cityId" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "countryId" TEXT NOT NULL,

    CONSTRAINT "cities_pkey" PRIMARY KEY ("cityId")
);

-- CreateTable
CREATE TABLE "projectPositions" (
    "projectPositionId" TEXT NOT NULL,
    "name" TEXT,
    "dateRegistered" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "projectPositions_pkey" PRIMARY KEY ("projectPositionId")
);

-- AddForeignKey
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("cityId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cities" ADD CONSTRAINT "cities_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("countryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("cityId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_userId_fkey" FOREIGN KEY ("userId") REFERENCES "organizationUsers"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projectPositions" ADD CONSTRAINT "projectPositions_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("projectId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photos" ADD CONSTRAINT "photos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "organizationUsers"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "videos" ADD CONSTRAINT "videos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "organizationUsers"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audios" ADD CONSTRAINT "audios_userId_fkey" FOREIGN KEY ("userId") REFERENCES "organizationUsers"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
