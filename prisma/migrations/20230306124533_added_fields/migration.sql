/*
  Warnings:

  - Added the required column `Attack` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Defense` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Generation` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `HP` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SpAtk` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SpDef` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Speed` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Total` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type1` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type2` to the `Pokemon` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pokemon" (
    "name" TEXT NOT NULL,
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
INSERT INTO "new_Pokemon" ("name") SELECT "name" FROM "Pokemon";
DROP TABLE "Pokemon";
ALTER TABLE "new_Pokemon" RENAME TO "Pokemon";
CREATE UNIQUE INDEX "Pokemon_name_key" ON "Pokemon"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
