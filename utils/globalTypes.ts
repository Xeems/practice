
export type Address = {
    address_id?: number
    city: string
    street: string
    house: string
    appartment: string
    meter_readings?: Meter_readings[]	
}

export type Meter_readings = {
    meter_readings_id?: number
    excel_document_id?: number
    address_id: number
    address?: Address
    hot_water: number
    cold_water: number
}

export type Excel_document = {
    excel_document_id: number
    document_name: string
    upload_date: Date
    meter_readings?: Meter_readings[]
    erors?: Error[]
}

export type Error_row = {
    error_id?: number
    address?: Address
    error_content: string
    excel_document_id?: number
    excel_document?: Excel_document
    document_row: number
}