import { Injectable } from '@nestjs/common';
import { Address, Error_row, Excel_document } from 'utils/globalTypes';
import { PrismaService } from 'src/prisma/prisma.service';
import { Meter_readings } from 'utils/globalTypes';

@Injectable()
export class DataService {
    constructor(private prisma: PrismaService) { }

    async uploadData(metrics: Meter_readings[], excel_document: Excel_document) {
        const data: Meter_readings[] = []
        for (let i = 0; i < metrics.length; i++)
        {
            metrics[i].address = await this.uploadAddressToDb(metrics[i].address)
            metrics[i].excel_document_id = excel_document.excel_document_id
            const metric = await this.uploadMetric(metrics[i])
            data.push(metric)
        }
        console.log(data)
        return data
    }

    async uploadMetric(data: Meter_readings): Promise<Meter_readings> {
        const metric = await this.prisma.meter_readings.create({
            data: {
                address_id: data.address.address_id,
                cold_water: data.cold_water,
                hot_water: data.hot_water,
                excel_document_id: data.excel_document_id
            }
        })

        return metric
    }

    async uploadAddressToDb(address: Address): Promise<Address> {
        const existingAddress = await this.prisma.address.findFirst({
            where: {
                city: address.city,
                street: address.street,
                house: address.house,
                appartment: address.appartment,
            }
        })

        if (existingAddress)
            return existingAddress
        else {
            const newAddres = await this.prisma.address.create({
                data: {
                    city: address.city,
                    street: address.street,
                    house: address.house,
                    appartment: address.appartment,
                }
            })
            return newAddres
        }
    }

    async uploadErrors(errors: Error_row[]){
        for(let i = 0; i < errors.length; i++){
            const error = errors[i]
            await this.prisma.error.create({
                data:{
                    document_row: error.document_row,
                    error_content: error.error_content,
                    excel_document_id: error.excel_document_id
                }
            })
        }
    }
}
