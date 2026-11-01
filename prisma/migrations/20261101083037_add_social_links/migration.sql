-- CreateTable
CREATE TABLE "social_link" (
    "id" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "social_link_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "social_link_profileId_platform_key" ON "social_link"("profileId", "platform");

-- AddForeignKey
ALTER TABLE "social_link" ADD CONSTRAINT "social_link_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
