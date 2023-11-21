import { Injectable } from '@nestjs/common';
import { Address } from 'utils/globalTypes';
import axios from 'axios';



@Injectable()
export class AddressService {

    async parseAddresses(addresses: string[]): Promise<Address[]> {
        const parseAddresses: Address[] = []

        addresses.forEach(element => {
            parseAddresses.push(this.addressNormalization(element))
        });
        
        return parseAddresses
        
    }

    addressNormalization(address: string): Address {
        const result= {} as Address

        // Регулярные выражения для разбора адреса
        const regionRegex = /(?:обл(?:асть)?)?\s*([^\d,]+)/i;
        const cityRegex = /г(?:ород)?\.\s*([^\d,]+)/i;
        const streetRegex = /ул(?:ица)?\.\s*([^\d,]+)/i;
        const houseRegex = /д(?:ом)?\.\s*([\d/]+)/i;
        const apartmentRegex = /кв(?:артира)?\.\s*([\dа-я/]+)/i;

        // Применение регулярных выражений к адресу
        const regionMatch = address.match(regionRegex);
        const cityMatch = address.match(cityRegex);
        const streetMatch = address.match(streetRegex);
        const houseMatch = address.match(houseRegex);
        const apartmentMatch = address.match(apartmentRegex);

        // Заполнение объекта результатами парсинга
        if (regionMatch) regionMatch[1].trim();
        if (cityMatch) result.city = cityMatch[1].trim();
        if (streetMatch) result.street = streetMatch[1].trim();
        if (houseMatch) result.house = houseMatch[1].trim();
        if (apartmentMatch) result.appartment = apartmentMatch[1].trim();

        return result
    }

}
