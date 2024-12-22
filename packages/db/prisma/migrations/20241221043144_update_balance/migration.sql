/*
  Warnings:

  - Added the required column `locked` to the `Balance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Balance" ADD COLUMN     "locked" INTEGER NOT NULL;
