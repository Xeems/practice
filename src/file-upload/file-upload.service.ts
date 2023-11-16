import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import * as fs from 'fs';
import { AddressService } from 'src/address/address.service';

@Injectable()
export class FileUploadService {
    constructor(private readonly addressService: AddressService){}

    async readExelFile(fileData: Buffer) {
        const book = new ExcelJS.Workbook()
        await book.xlsx.load(fileData);

        const sheet = book.getWorksheet(1)

        const addresses = [];
        sheet.eachRow((row, rowNumber) => {
            if (rowNumber != 1) {
                addresses.push((row.getCell(1)).value)
            }
        });

        this.addressService.parseAddresses(addresses)

    }
}
