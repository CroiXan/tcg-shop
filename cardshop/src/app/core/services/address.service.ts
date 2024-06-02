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
        let newAddress = {} as Address;
        const newId = this.addressList.reduce((maxId, user) => {
            return Math.max(maxId, user.id);
        }, 0) + 1;

        newAddress.id=newId;
        newAddress.UserId = userId;
        newAddress.Name = name;
        newAddress.Number = number;
        newAddress.Region = region;
        newAddress.Commune = Commune;

        this.addressList.push(newAddress);
    }

    updateAddress(updateAddress: Address):boolean{
        return false;
    }

    getAddressByUser(userId: number): Address[]{
        return this.addressList.filter(address => address.UserId === userId) || [] as Address[];
    }
}