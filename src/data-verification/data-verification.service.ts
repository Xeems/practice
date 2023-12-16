import { ConflictException, Injectable } from '@nestjs/common';
import { DataService } from 'src/data/data.service';
import { DataRow } from 'src/file/entities/dataRow.entitie';
import { ErrorRow } from './errorRow.entitie';
import { Address } from 'src/address/address.entitie';

@Injectable()
export class DataVerificationService {
    constructor(private readonly dataService: DataService) { }

    async verifyDocument(data: DataRow[]) {
        const validData: DataRow[] = []
        const errors: ErrorRow[] = []

        for (let i = 0; i < data.length; i++) {
            const result = await this.validateRow(data[i], i + 2)
            if (result == null)
                validData.push(data[i])
            else
                errors.push(result)
        }
        return { validData, errors }
    }

    async validateRow(data: DataRow, row: number) {
        const errorRow: ErrorRow = { document_row: row, error_content: null }
        const validAddress = await this.validateAddress(data.address)
        const isMeterReadingsValid = this.validateMeterReadings(data)
        if (validAddress == false)
            errorRow.error_content ? errorRow.error_content += ', Неверный адрес' : errorRow.error_content = 'Невенрный адрес'
        else
            data.address = validAddress

        if (!isMeterReadingsValid)
            errorRow.error_content ? errorRow.error_content += ', Неверный формат показаний счетчиков' : errorRow.error_content = 'Неверный формат показаний счетчиков'

        if (errorRow.error_content === null) {
            if (!this.validatePreviousReadings(data))
                errorRow.error_content == 'показания счеткика меньше чем в предыдущий раз'
        }

        if (errorRow.error_content != null)
            return errorRow
        else
            return null

    }

    async validateAddress(address: Address) {
        if (address.city == null || address.street == null || address.house == null || address.appartment == null)
            return false
        else {
            const result = await this.dataService.uploadAddress(address)
            return result
        }
    }

    validateMeterReadings(data: DataRow) {
        if (data.hotWater == null || data.coldWater == null)
            return false
        return true
    }

    async validatePreviousReadings(data: DataRow) {
        const previousResult = await this.dataService.getPreviosuReadig(data.address?.address_id)
        if (previousResult) {
            if (data.date !== previousResult.date)
                if (previousResult.cold_water >= data.coldWater || previousResult.hot_water >= data.hotWater)
                    return false
        }


        return true
    }
}

