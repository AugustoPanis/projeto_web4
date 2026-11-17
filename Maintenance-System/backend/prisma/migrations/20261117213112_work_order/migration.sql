-- CreateTable
CREATE TABLE "work_order" (
    "id" SERIAL NOT NULL,
    "equipament_id" INTEGER NOT NULL,
    "technician_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "priority" TEXT NOT NULL,

    CONSTRAINT "work_order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "work_order_technician_id_key" ON "work_order"("technician_id");

-- AddForeignKey
ALTER TABLE "work_order" ADD CONSTRAINT "work_order_equipament_id_fkey" FOREIGN KEY ("equipament_id") REFERENCES "equipament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_order" ADD CONSTRAINT "work_order_technician_id_fkey" FOREIGN KEY ("technician_id") REFERENCES "technician"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
