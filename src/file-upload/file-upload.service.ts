import { ConflictException, Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { AddressService } from 'src/address/address.service';
import { DataVerificationService } from 'src/data-verification/data-verification.service';
import { DataService } from 'src/data/data.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Meter_readings, Address, Excel_document, Error_row } from 'utils/globalTypes';

@Injectable()
export class FileUploadService {
    constructor(private readonly addressService: AddressService,

        private readonly dataService: DataService,
        private readonly dataVerificationService: DataVerificationService) { }

    async readExelFile(file: Express.Multer.File) {
        const fileData = file.buffer
        const book = new ExcelJS.Workbook()
        await book.xlsx.load(fileData);
        const worksheet = book.getWorksheet(1)

        const excelDocument = await this.dataService.uploadFileToDB(file)

        const addresses = await this.readAdressesAndParse(worksheet)
        const metrics = await this.readMeters(worksheet)

        const verifyResult = await this.dataVerificationService.verifyDocument(addresses, metrics)
        if (verifyResult != null)
            return verifyResult

        const metricsWithAdresses = await this.buildMeterReadings(addresses, metrics)

        const validData = await this.dataVerificationService.checkErors(metricsWithAdresses, excelDocument)

        await this.dataService.uploadData(validData, excelDocument)
        return await this.dataService.getDocumentData(excelDocument.excel_document_id)
    }

    async readAdressesAndParse(worksheet: ExcelJS.Worksheet) {
        let addresses: any = [];

        worksheet.getColumn(1).eachCell({ includeEmpty: false }, (cell, rowNumber) => {
            if (rowNumber != 1)
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

    async buildMeterReadings(addresses: Address[], meters: any[][]) {
        const result: Meter_readings[] = [];

        for (let i = 0; i < addresses.length; i++) {
            const address = addresses[i];
            const metrics = meters[i];

            if (address && metrics) {
                const meterReading: Meter_readings = {
                    address_id: address.address_id,
                    address: address,
                    hot_water: metrics[0],
                    cold_water: metrics[1],
                }
                result.push(meterReading);
            }
        }
        return result;
    }

}
