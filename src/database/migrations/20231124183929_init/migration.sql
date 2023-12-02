/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "countries" (
    "countryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("countryId")
);

-- CreateTable
CREATE TABLE "organizations" (
    "organizationId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("organizationId")
);

-- CreateTable
CREATE TABLE "organizationUsers" (
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,

    CONSTRAINT "organizationUsers_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "projects" (
    "projectId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "dateRegistered" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("projectId")
);

-- CreateTable
CREATE TABLE "photos" (
    "photoId" TEXT NOT NULL,
    "caption" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "date" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "photos_pkey" PRIMARY KEY ("photoId")
);

-- CreateTable
CREATE TABLE "videos" (
    "videoId" TEXT NOT NULL,
    "caption" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "date" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "videos_pkey" PRIMARY KEY ("videoId")
);

-- CreateTable
CREATE TABLE "audios" (
    "audioId" TEXT NOT NULL,
    "caption" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "date" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "audios_pkey" PRIMARY KEY ("audioId")
);

-- CreateIndex
CREATE UNIQUE INDEX "organizations_email_key" ON "organizations"("email");

-- CreateIndex
CREATE UNIQUE INDEX "organizationUsers_email_key" ON "organizationUsers"("email");

-- AddForeignKey
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("countryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizationUsers" ADD CONSTRAINT "organizationUsers_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("organizationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("organizationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photos" ADD CONSTRAINT "photos_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("projectId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "videos" ADD CONSTRAINT "videos_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("projectId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audios" ADD CONSTRAINT "audios_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("projectId") ON DELETE RESTRICT ON UPDATE CASCADE;
