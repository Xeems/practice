import { ConflictException, Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { AddressService } from 'src/address/address.service';
import { DataVerificationService } from 'src/data-verification/data-verification.service';
import { ErrorRow } from 'src/data-verification/errorRow.entitie';
import { DataRow } from './entities/dataRow.entitie';
import { DataService } from 'src/data/data.service';


@Injectable()
export class UploadFileService {
    constructor(private readonly addressService: AddressService,
        private readonly dataVerificationService: DataVerificationService,
        private readonly dataService: DataService) { }

    async uploadExelFile(file: Express.Multer.File, userId: number) {
        const fileName = file.originalname
        const fileBuffer = file.buffer
        const workbook = new ExcelJS.Workbook()
        await workbook.xlsx.load(fileBuffer);
        const worksheet = workbook.getWorksheet(1)

        const data = await this.parseDocumentData(worksheet)
        const { validData, errors } = await this.dataVerificationService.verifyDocument(data)
        
        await this.markErrors(errors, worksheet)
        // await workbook.xlsx.writeFile('export.xlsx');

        // const newWorkbook = new ExcelJS.Workbook();
        // await newWorkbook.xlsx.readFile('export.xlsx');

        const newBuffer = await workbook.xlsx.writeBuffer() as Buffer
        const document = await this.dataService.uploadFile(fileName, newBuffer, userId)

        const uploadedData = await this.dataService.uploadData(validData, document.fileId)
        return true
    }

    async parseDocumentData(worksheet: ExcelJS.Worksheet) {
        let data: DataRow[] = []
        worksheet.eachRow(async (row, rowNumber) => {
            if (rowNumber != 1) {
                const dataRow: DataRow = {
                    address: this.addressService.addressNormalization(row.getCell(1).value.toString()),
                    hotWater: parseFloat(row.getCell(2).value.toString()),
                    coldWater: parseFloat(row.getCell(3).value.toString()),
                    date: row.getCell(4).value as Date
                }
                data.push(dataRow)
            }
        })
        return data
    }

    async markErrors(errors: ErrorRow[], worksheet: ExcelJS.Worksheet) {
        for (let i = 0; i < errors.length; i++) {
            const rowNumber = errors[i].document_row;  // Увеличиваем номер строки на 1
            const row = worksheet.getRow(rowNumber);
            const cell = row.getCell(5)
            cell.value = errors[i].error_content
        }
    }
}
