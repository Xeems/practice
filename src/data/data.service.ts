import { Injectable } from '@nestjs/common';
import { Address } from 'utils/globalTypes';
import { PrismaService } from 'src/prisma/prisma.service';
import { Meter_readings } from '@prisma/client';

@Injectable()
export class DataService {
    constructor(private prisma: PrismaService) { }

    async uploadMetrics(meter_readings: Meter_readings[]) {
        const meters = await this.prisma.meter_readings.createMany({
            data: meter_readings
        })
    }

    async uploadAddressesToDb(addresses: Address[]) {
        const existingAddresses: Address[] = []

        for (const address of addresses) {
            const existingAddress = await this.prisma.address.findFirst({
                where: {
                    city: address.city,
                    street: address.street,
                    house: address.house,
                    appartment: address.appartment,
                }
            })

            if (existingAddress)
                existingAddresses.push(existingAddress)
            else {
                const newAddres = await this.prisma.address.create({
                    data: {
                        city: address.city,
                        street: address.street,
                        house: address.house,
                        appartment: address.appartment,
                    }
                })
                existingAddresses.push(newAddres)
            }
        }
        console.log(existingAddresses)
        return existingAddresses
    }
}
