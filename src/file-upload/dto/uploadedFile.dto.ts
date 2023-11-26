import { Excel_document, Meter_readings } from "utils/globalTypes"

export type uploadedFileDTO = {
    document: Excel_document
    meter_readings: Meter_readings[]
}