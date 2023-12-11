import { ConflictException, Injectable } from '@nestjs/common';
import { DataService } from 'src/data/data.service';
import { DataRow } from 'src/file/entities/dataRow.entitie';
import { Address, Meter_readings, Error_row, Excel_document } from 'utils/globalTypes';

@Injectable()
export class DataVerificationService {
    constructor (private readonly dataService: DataService){}

    async verifyDocument(data: DataRow[]) {

        // for (let i = 0; i < meters.length; i++) {
        //     const innerMeters = meters[i];
        //     for (let j = 0; j < innerMeters.length; j++) {
        //         const value = innerMeters[j];
        //         if (value === null || typeof value !== 'number') {
        //             return new ConflictException('Ошибки в показаниях счетчиков');
        //         }
        //     }
        // }
        return null
    }

    async checkErors(metricsWithAdresses: Meter_readings[], excel_document: Excel_document): Promise<Meter_readings[]> {
        let errors: Error_row[] = []
        let validData: Meter_readings[] = []

        for (let i = 0; i < metricsWithAdresses.length; i++) {
            const metric = metricsWithAdresses[i]
            const address = metric.address

            if (address.city == null || address.street == null || address.house == null || address.appartment == null) {
                const error: Error_row = {
                    document_row: i + 2,
                    error_content: "Incorrect address",
                    excel_document_id: excel_document.excel_document_id
                }
                errors.push(error)
            }
            else if (metric.hot_water == null || metric.cold_water == null || typeof metric.hot_water !== 'number' || typeof metric.cold_water !== 'number') {
                const error: Error_row = {
                    document_row: i + 2,
                    error_content: "Incorrect meter readings",
                    excel_document_id: excel_document.excel_document_id
                }
                errors.push(error)
            }
            else
                validData.push(metric)
        }
        this.dataService.uploadErrors(errors)
        return validData
    }
}
