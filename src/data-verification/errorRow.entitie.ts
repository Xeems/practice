import { Address } from "src/address/address.entitie"
import { ExcelFile } from "src/file/entities/excelFile.entitie"

export type ErrorRow = {
    error_id?: number
    address?: Address
    error_content: string
    file_id?: number
    file?: ExcelFile
    document_row: number
}