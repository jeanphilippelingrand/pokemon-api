-- CreateTable
CREATE TABLE "Pokemon" (
    "name" TEXT NOT NULL,
    "uuid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id" INTEGER NOT NULL,
    "type1" TEXT NOT NULL,
    "type2" TEXT NOT NULL,
    "Total" INTEGER NOT NULL,
    "HP" INTEGER NOT NULL,
    "Attack" INTEGER NOT NULL,
    "Defense" INTEGER NOT NULL,
    "SpAtk" INTEGER NOT NULL,
    "SpDef" INTEGER NOT NULL,
    "Speed" INTEGER NOT NULL,
    "Generation" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Pokemon_name_key" ON "Pokemon"("name");
