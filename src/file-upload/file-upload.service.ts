import { ConflictException, Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { AddressService } from 'src/address/address.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Address } from 'utils/globalTypes';

@Injectable()
export class FileUploadService {
    constructor(private readonly addressService: AddressService,
        private readonly prismaService: PrismaService) { }

    async readExelFile(file: Express.Multer.File) {
        const fileData = file.buffer
        const book = new ExcelJS.Workbook()
        await book.xlsx.load(fileData);
        const worksheet = book.getWorksheet(1)

        this.uploadFileToDB(file)

        const adresses = await this.readAdressesAndParse(worksheet)
        const meters = await this.readMeters(worksheet)
        console.log(meters.length, adresses.length)
        console.log(adresses)
        return this.verifyData(adresses, meters)

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
        return "Томас но мы же кошки"
    }
}
