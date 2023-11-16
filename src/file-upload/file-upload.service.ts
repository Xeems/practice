import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import * as fs from 'fs';
import { AddressService } from 'src/address/address.service';

@Injectable()
export class FileUploadService {
    constructor(private readonly addressService: AddressService) { }

    async readExelFile(fileData: Buffer) {
        const book = new ExcelJS.Workbook()
        await book.xlsx.load(fileData);

        const worksheet = book.getWorksheet(1)



        //this.addressService.parseAddresses(addresses)

    }

    async readAdresses(worksheet: ExcelJS.Worksheet) {
        const addresses = [];

        worksheet.getColumn("Полный адрес").eachCell({ includeEmpty: false }, (cell, rowNumber) => {
            addresses.push(cell.value);
        });
    }
}
