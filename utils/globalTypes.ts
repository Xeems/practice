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
    address?: Address
    address_id: number
    hot_water: number
    cold_water: number
}