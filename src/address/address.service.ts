import { Injectable } from '@nestjs/common';
import { Address } from './addressType';
import axios from 'axios';

var url = "https://cleaner.dadata.ru/api/v1/clean/address";
var token = "e7a6712d3ef72d98bc2b999c19bf842a5f110aad";
var secret = "3ad364c52d65c64add0b00fd6814e46898dfdc34";

@Injectable()
export class AddressService {

    async parseAddresses(addresses: string[]): Promise<Address[]> {

        const options = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
                'X-Secret': secret,
            },
        };

        const parseAddresses: Address[] = []

        addresses.forEach(element => {
            axios.post(url, [element], options)
                .then(response => console.log(response.data))
                .catch(error => console.log('error', error));
        });

        return parseAddresses
    }

    addressNormalization(data: any): Address {
        const address: Address = {
            city: data.city,
            street: data.street,
            house: data.house,
            appartment: data.flat
        }
        console.log(address)
        return address
    }

}
