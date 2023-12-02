-- AlterTable
ALTER TABLE "Country" ADD COLUMN     "geometry" JSONB NOT NULL DEFAULT '{}';

-- AlterTable
ALTER TABLE "State" ADD COLUMN     "geometry" JSONB NOT NULL DEFAULT '{}';

-- AlterTable
ALTER TABLE "audios" ADD COLUMN     "geometry" JSONB NOT NULL DEFAULT '{}';

-- AlterTable
ALTER TABLE "photos" ADD COLUMN     "geometry" JSONB NOT NULL DEFAULT '{}';

-- AlterTable
ALTER TABLE "projectPositions" ADD COLUMN     "geometry" JSONB NOT NULL DEFAULT '{}';

-- AlterTable
ALTER TABLE "videos" ADD COLUMN     "geometry" JSONB NOT NULL DEFAULT '{}';
