/*
  Warnings:

  - You are about to drop the column `geometry` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `geometry` on the `Country` table. All the data in the column will be lost.
  - You are about to drop the column `geometry` on the `State` table. All the data in the column will be lost.
  - You are about to drop the column `geometry` on the `audios` table. All the data in the column will be lost.
  - You are about to drop the column `geometry` on the `photos` table. All the data in the column will be lost.
  - You are about to drop the column `geometry` on the `projectPositions` table. All the data in the column will be lost.
  - You are about to drop the column `geometry` on the `videos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "City" DROP COLUMN "geometry",
ADD COLUMN     "position" JSONB NOT NULL DEFAULT '{}';

-- AlterTable
ALTER TABLE "Country" DROP COLUMN "geometry",
ADD COLUMN     "position" JSONB NOT NULL DEFAULT '{}';

-- AlterTable
ALTER TABLE "State" DROP COLUMN "geometry",
ADD COLUMN     "position" JSONB NOT NULL DEFAULT '{}';

-- AlterTable
ALTER TABLE "audios" DROP COLUMN "geometry",
ADD COLUMN     "position" JSONB NOT NULL DEFAULT '{}';

-- AlterTable
ALTER TABLE "photos" DROP COLUMN "geometry",
ADD COLUMN     "position" JSONB NOT NULL DEFAULT '{}';

-- AlterTable
ALTER TABLE "projectPositions" DROP COLUMN "geometry",
ADD COLUMN     "position" JSONB NOT NULL DEFAULT '{}';

-- AlterTable
ALTER TABLE "videos" DROP COLUMN "geometry",
ADD COLUMN     "position" JSONB NOT NULL DEFAULT '{}';
