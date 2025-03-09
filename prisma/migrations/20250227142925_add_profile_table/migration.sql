-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "statuses_count" INTEGER NOT NULL,
    "followers_count" INTEGER NOT NULL,
    "friends_count" INTEGER NOT NULL,
    "favourites_count" INTEGER NOT NULL,
    "listed_count" INTEGER NOT NULL,
    "geo_enabled" INTEGER NOT NULL,
    "profile_use_background_image" INTEGER NOT NULL,
    "lang" TEXT NOT NULL,
    "isFake" INTEGER NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);
