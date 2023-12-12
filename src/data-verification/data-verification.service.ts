import { ConflictException, Injectable } from '@nestjs/common';
import { DataService } from 'src/data/data.service';
import { DataRow } from 'src/file/entities/dataRow.entitie';
import { Meter_readings } from 'utils/globalTypes';
import { ErrorRow } from './errorRow.entitie';
import { Address } from 'src/address/address.entitie';
import { error } from 'console';

@Injectable()
export class DataVerificationService {
    constructor(private readonly dataService: DataService) { }

    async verifyDocument(data: DataRow[]) {
        const validData: DataRow[] = []
        const errors: ErrorRow[] = []

        for (let i = 0; i < data.length; i++) {
            const result = this.validateRow(data[i], i + 2)
            if (result == null)
                validData.push(data[i])
            else
                errors.push(result)
        }
        return { validData, errors }
    }

    validateRow(data: DataRow, row: number) {
        const errorRow: ErrorRow = { document_row: row, error_content: null }
        const isAddressValid = this.validateAddress(data.address)
        const isMeterReadingsValid = this.validateMeterReadings(data)
        if (!isAddressValid)
            errorRow.error_content ? errorRow.error_content += ', Неверный адрес' : errorRow.error_content = 'Невенрный адрес'
        if (!isMeterReadingsValid)
            errorRow.error_content ? errorRow.error_content += ', Неверный формат показаний счетчиков' : errorRow.error_content = 'Неверный формат показаний счетчиков'

        if (errorRow.error_content != null)
            return errorRow
        else
            return null

    }

    validateAddress(address: Address) {
        if (address.city == null || address.street == null || address.house == null || address.appartment == null)
            return false
        return true
    }

    validateMeterReadings(data: DataRow) {
        if (data.hotWater == null || data.coldWater == null)
            return false
        return true
    }
}

