import { Injectable } from '@nestjs/common';
import { DataService } from 'src/data/data.service';
import { Address } from './address.entitie';

@Injectable()
export class AddressService {
    constructor(private readonly dataService: DataService) { }

    // async parseAddresses(addresses: string[]) {
    //     // const parseAddresses: Address[] = []

    //     // addresses.forEach(element => {
    //     //     parseAddresses.push(this.addressNormalization(element))
    //     // });

    //     // return parseAddresses

    // }

    addressNormalization(address: string) {
        const result = {} as Address

        // Регулярные выражения для разбора адреса
        const regionRegex = /(?:обл(?:асть)?)?\s*([^\d,]+)/i;
        const cityRegex = /г(?:ород)?\.\s*([^\d,]+)/i;
        const streetRegex = /ул(?:ица)?\.\s*([^\d,]+)/i;
        const houseRegex = /д(?:ом)?\.\s*([\d/]+)/i;
        const apartmentRegex = /кв(?:артира)?\.\s*([\dа-я/]+)/i;

        const regionMatch = address.match(regionRegex);
        const cityMatch = address.match(cityRegex);
        const streetMatch = address.match(streetRegex);
        const houseMatch = address.match(houseRegex);
        const apartmentMatch = address.match(apartmentRegex);

        if (regionMatch) regionMatch[1].trim();
        if (cityMatch) result.city = cityMatch[1].trim();
        if (streetMatch) result.street = streetMatch[1].trim();
        if (houseMatch) result.house = houseMatch[1].trim();
        if (apartmentMatch) result.appartment = apartmentMatch[1].trim();

        return result

    }

}
