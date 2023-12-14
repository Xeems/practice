import { Address } from "../../address/address.entitie"

export type DataRow = {
    address: Address
    hotWater: number
    coldWater: number
    date: Date

    documentId?: number
}