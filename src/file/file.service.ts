import { Injectable } from '@nestjs/common';
import { DataService } from 'src/data/data.service';
import * as ExcelJS from 'exceljs';

@Injectable()
export class FileService {
    constructor (private readonly dataService: DataService){}

    async getUserFiles(userId: number){
        const result = await this.dataService.getUserFiles(userId)
        return result
    }

    async getFile(fileId: number){

        const result = await this.dataService.getExcelDocument(fileId)
        const buffer = result.fileContent

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet();
        await workbook.xlsx.load(buffer)
        
        return workbook
    }

}