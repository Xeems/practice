import { ConflictException, Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { AddressService } from 'src/address/address.service';
import { DataVerificationService } from 'src/data-verification/data-verification.service';
import { DataService } from 'src/data/data.service';
import { Meter_readings, Address, Excel_document, Error_row } from 'utils/globalTypes';
import { DataRow } from './entities/dataRow.entitie';

@Injectable()
export class FileService {
    constructor(private readonly addressService: AddressService,
        private readonly dataService: DataService,
        private readonly dataVerificationService: DataVerificationService) { }

    async uploadExelFile(file: Express.Multer.File) {
        const fileData = file.buffer
        const book = new ExcelJS.Workbook()
        await book.xlsx.load(fileData);
        const worksheet = book.getWorksheet(1)

        return await this.parseDocumentData(worksheet)

        // const excelDocument = await this.dataService.uploadFileToDB(file)

        // const verifyResult = await this.dataVerificationService.verifyDocument(addresses, metrics)
        // if (verifyResult != null)
        //     return verifyResult

        // const validData = await this.dataVerificationService.checkErors(metricsWithAdresses, excelDocument)

        // await this.dataService.uploadData(validData, excelDocument)
        // return await this.dataService.getDocumentData(excelDocument.excel_document_id)
    }

    async parseDocumentData(worksheet: ExcelJS.Worksheet){
        let data: DataRow[] = []
        worksheet.eachRow((row, rowNumber) => {
            if(rowNumber != 1){
                const dataRow: DataRow = {
                    address: this.addressService.addressNormalization(row.getCell(1).value.toString()),
                    hotWater: row.getCell(2).value.toString(),
                    coldWater: row.getCell(3).value.toString(),
                    date: row.getCell(4).value as Date
                }
                data.push(dataRow)
            }
        })
        return data
    }
}
