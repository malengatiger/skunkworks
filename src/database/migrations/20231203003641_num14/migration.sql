-- CreateTable
CREATE TABLE "WorldPopulation" (
    "id" SERIAL NOT NULL,
    "countryName" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "indicator" TEXT NOT NULL,
    "indicatorCode" TEXT NOT NULL,
    "countryId" INTEGER NOT NULL,
    "population1960" INTEGER,
    "population1961" INTEGER,
    "population1962" INTEGER,
    "population1963" INTEGER,
    "population1964" INTEGER,
    "population1965" INTEGER,
    "population1966" INTEGER,
    "population1967" INTEGER,
    "population1968" INTEGER,
    "population1969" INTEGER,
    "population1970" INTEGER,
    "population1971" INTEGER,
    "population1972" INTEGER,
    "population1973" INTEGER,
    "population1974" INTEGER,
    "population1975" INTEGER,
    "population1976" INTEGER,
    "population1977" INTEGER,
    "population1978" INTEGER,
    "population1979" INTEGER,
    "population1980" INTEGER,
    "population1981" INTEGER,
    "population1982" INTEGER,
    "population1983" INTEGER,
    "population1984" INTEGER,
    "population1985" INTEGER,
    "population1986" INTEGER,
    "population1987" INTEGER,
    "population1988" INTEGER,
    "population1989" INTEGER,
    "population1990" INTEGER,
    "population1991" INTEGER,
    "population1992" INTEGER,
    "population1993" INTEGER,
    "population1994" INTEGER,
    "population1995" INTEGER,
    "population1996" INTEGER,
    "population1997" INTEGER,
    "population1998" INTEGER,
    "population1999" INTEGER,
    "population2000" INTEGER,
    "population2001" INTEGER,
    "population2002" INTEGER,
    "population2003" INTEGER,
    "population2004" INTEGER,
    "population2005" INTEGER,
    "population2006" INTEGER,
    "population2007" INTEGER,
    "population2008" INTEGER,
    "population2010" INTEGER,
    "population2011" INTEGER,
    "population2012" INTEGER,
    "population2013" INTEGER,
    "population2014" INTEGER,
    "population2015" INTEGER,
    "population2016" INTEGER,
    "population2017" INTEGER,
    "population2018" INTEGER,
    "population2019" INTEGER,
    "population2020" INTEGER,
    "population2021" INTEGER,
    "population2022" INTEGER,

    CONSTRAINT "WorldPopulation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WorldPopulation_countryName_key" ON "WorldPopulation"("countryName");

-- AddForeignKey
ALTER TABLE "WorldPopulation" ADD CONSTRAINT "WorldPopulation_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
