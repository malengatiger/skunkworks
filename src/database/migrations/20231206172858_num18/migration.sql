/*
  Warnings:

  - A unique constraint covering the columns `[countryId]` on the table `WorldPopulation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WorldPopulation_countryId_key" ON "WorldPopulation"("countryId");
