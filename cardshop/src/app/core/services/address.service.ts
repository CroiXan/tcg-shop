import { Injectable } from '@angular/core';
import { Address } from '../models/address.model';

@Injectable({
    providedIn: 'root'
})

export class AddressService{

    addressList: Address[] = [
        {
            id: 1,
            UserId: 1,
            Name: 'Av Testing',
            Number: 123,
            Region: 'Metropolitana',
            Commune: 'Santiago',
        },
        {
            id: 2,
            UserId: 2,
            Name: 'Av Framework',
            Number: 123,
            Region: 'Valparaiso',
            Commune: 'Valparaiso'
        }
    ];

    createAddress(userId: number, name: string, number: number, region: string, Commune: string){

    }

    updateAddress(updateAddress: Address):boolean{
        return false;
    }

    getAddressByUser(userId: number): Address[]{
        return this.addressList.filter(address => address.UserId === userId) || [] as Address[];
    }
}