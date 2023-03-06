-- CreateTable
CREATE TABLE "Pokemon" (
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Pokemon_name_key" ON "Pokemon"("name");
