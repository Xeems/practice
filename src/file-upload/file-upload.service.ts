import { ConflictException, Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { AddressService } from 'src/address/address.service';
import { DataService } from 'src/data/data.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Address } from 'utils/globalTypes';

@Injectable()
export class FileUploadService {
    constructor(private readonly addressService: AddressService,
        private readonly prismaService: PrismaService,
        private readonly dataService: DataService) { }

    async readExelFile(file: Express.Multer.File) {
        const fileData = file.buffer
        const book = new ExcelJS.Workbook()
        await book.xlsx.load(fileData);
        const worksheet = book.getWorksheet(1)

        this.uploadFileToDB(file)

        const addresses = await this.readAdressesAndParse(worksheet)
        const metrics = await this.readMeters(worksheet)

        const verifyResult = this.verifyData(addresses, metrics)
        if (verifyResult != null)
            return verifyResult

        this.dataService.uploadMetrics(addresses, metrics)

    }

    async uploadFileToDB(file: Express.Multer.File) {
        let dateTime = new Date()

        await this.prismaService.excel_document.create({
            data: {
                document_name: file.originalname,
                upload_date: dateTime.toISOString(),
            }
        })
    }

    async readAdressesAndParse(worksheet: ExcelJS.Worksheet) {
        let addresses: any = [];

        worksheet.getColumn(1).eachCell({ includeEmpty: false }, (cell, rowNumber) => {
            if(rowNumber != 1)
                addresses.push(cell.value);
        });
        return this.addressService.parseAddresses(addresses)
    }

    async readMeters(worksheet: ExcelJS.Worksheet) {
        let meters: any[][] = []

        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber != 1) {
                const hotWater = row.getCell(2).value
                const coldWater = row.getCell(3).value
                meters.push([hotWater, coldWater])
            }
        })
        return meters
    }

    async verifyData(addresses: Address[], meters: any[][]) {
        if (addresses.length != meters.length) {
            return  new ConflictException('Количество адресоов и записей не совпадает')
        }

        for (let i = 0; i < meters.length; i++) {
            const innerMeters = meters[i];
            for (let j = 0; j < innerMeters.length; j++) {
              const value = innerMeters[j];
              if (value === null || typeof value !== 'number') {
                return new ConflictException('Ошибки в показаниях счетчиков');
              }
            }
          }

        return null
        
    }
}
