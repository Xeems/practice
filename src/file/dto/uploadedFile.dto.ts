import { Error_row, Excel_document, Meter_readings } from "utils/globalTypes"

export type uploadedFileDTO = {
    document: Excel_document
    meter_readings: Meter_readings[]
    errors: Error_row[]
}