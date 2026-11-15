-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "descriptionCategory" TEXT NOT NULL,
    "height" DECIMAL(10,2) NOT NULL,
    "width" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_descriptionCategory_key" ON "Category"("descriptionCategory");
