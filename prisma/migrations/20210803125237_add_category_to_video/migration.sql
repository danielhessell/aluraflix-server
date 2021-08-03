/*
  Warnings:

  - Added the required column `category_id` to the `videos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "videos" ADD COLUMN     "category_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "videos" ADD FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
