-- DropForeignKey
ALTER TABLE "WorldPopulation" DROP CONSTRAINT "WorldPopulation_countryId_fkey";

-- AlterTable
ALTER TABLE "WorldPopulation" ALTER COLUMN "countryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "WorldPopulation" ADD CONSTRAINT "WorldPopulation_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;
