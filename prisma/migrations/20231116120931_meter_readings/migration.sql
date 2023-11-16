-- CreateTable
CREATE TABLE "Meter_readings" (
    "meter_readings_id" SERIAL NOT NULL,
    "address_id" INTEGER NOT NULL,
    "hot_water" DOUBLE PRECISION NOT NULL,
    "cold_water" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Meter_readings_pkey" PRIMARY KEY ("meter_readings_id")
);

-- AddForeignKey
ALTER TABLE "Meter_readings" ADD CONSTRAINT "Meter_readings_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Address"("address_id") ON DELETE RESTRICT ON UPDATE CASCADE;
