import { ConflictException, Injectable } from '@nestjs/common';
import { Address, Meter_readings, Error_row, Excel_document } from 'utils/globalTypes';

@Injectable()
export class DataVerificationService {

    async verifyDocument(addresses: Address[], meters: any[][]) {
        if (addresses.length != meters.length) {
            return new ConflictException('Количество адресоов и записей не совпадает')
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
            else
                validData.push(metric)
        }
        return validData
    }
}
