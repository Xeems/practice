import { Injectable } from '@nestjs/common';
import { Address } from 'src/address/address.entitie';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExcelFile } from 'src/file/entities/excelFile.entitie';
import { DataRow } from 'src/file/entities/dataRow.entitie';
import { ErrorRow } from 'src/data-verification/errorRow.entitie';

@Injectable()
export class DataService {
    constructor(private prisma: PrismaService) { }

    async uploadData(metrics: DataRow[], excelFileId: number) {
        const result = []
        for (let i = 0; i < metrics.length; i++) {
            metrics[i].documentId = excelFileId
            const metric = await this.uploadMetric(metrics[i])
            result.push(metric)
        }
        return result
    }

    async uploadMetric(data: DataRow) {
        const metric = await this.prisma.meter_readings.create({
            data: {
                address_id: data.address.address_id,
                cold_water: data.coldWater,
                hot_water: data.hotWater,
                fileId: data.documentId,
                date: data.date
            },
        })
        return metric
    }

    async uploadAddress(address: Address) {
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

    async uploadErrors(errors: ErrorRow[]) {
        for (let i = 0; i < errors.length; i++) {
            const error = errors[i]
            await this.prisma.error.create({
                data: {
                    document_row: error.document_row,
                    error_content: error.error_content,
                    fileId: error.file_id
                }
            })
        }
    }

    async uploadFile(file: Express.Multer.File, userId: number) {
        let dateTime = new Date()

        const uploadedFile = await this.prisma.excelFile.create({
            data: {
                fileName: file.originalname,
                uploadDate: dateTime.toISOString(),
                userId: userId,
                fileContent: file.buffer
            }
        })

        return uploadedFile
    }

    async getExcelDocument(fileId: number) {
        const excelFile = await this.prisma.excelFile.findFirstOrThrow({
            where: {
                fileId
            }
        })

        // const meter_readings = await this.prisma.meter_readings.findMany({
        //     where: {
        //        fileId: excel_document.fileId
        //     },
        //     select: {
        //         address_id: true,
        //         address: {
        //             select: {
        //                 city: true,
        //                 street: true,
        //                 house: true,
        //                 appartment: true
        //             }
        //         },
        //         hot_water: true,
        //         cold_water: true
        //     }

        // })

        // const errors = await this.prisma.error.findMany({
        //     where: {
        //         fileId: excel_document.fileId
        //     }
        // })

        return excelFile
    }

    async getPreviosuReadig(addressId: number) {
        const lastMeterReading = await this.prisma.meter_readings.findFirst({
            where: {
                address_id: addressId,
            },
            orderBy: {
                date: 'desc',
            },
        });

        return lastMeterReading;
    }

    async getUserFiles(userId: number){
        const result = await this.prisma.excelFile.findMany({
           where:{
            userId
           }
        })
        return result
    }
}
