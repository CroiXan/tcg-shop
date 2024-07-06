import { Injectable } from '@angular/core';
import { Address } from '../models/address.model';

/**
 * @description
 * Funciones Mock para manejar la informacion de direccion de entrega de los usuarios.
 */
@Injectable({
    providedIn: 'root'
})

export class AddressService{

    /**
     * Mock de Direcciones de netrga de los usuario representado en un listado del Objeto Address.
     */
    addressList: Address[] = [
        {
            id: 1,
            UserId: 1,
            Name: 'Av Testing',
            Number: 123,
            AddressName: "",
            Region: 'Metropolitana',
            Commune: 'Santiago',
        },
        {
            id: 2,
            UserId: 2,
            Name: 'Av Framework',
            Number: 123,
            AddressName: "",
            Region: 'Valparaiso',
            Commune: 'Valparaiso'
        }
    ];

    /**
     * Funcion Mock para crear Direcciones de entrega.
     * El id creado es el correlativo segun el los items del listado addressList.
     * @param userId Idenificador de Usuario
     * @param name Nombre de direccion
     * @param number Numero de direccion
     * @param region Region de direccion
     * @param Commune Comuna de direccion
     */
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

    /**
     * Funcion para modificar direcciones
     * @param updateAddress Objeto de direccion con valores actualizado.
     * @returns booleano que indica si se logro realizar la actualizacion.
     */
    updateAddress(updateAddress: Address):boolean{
        return false;
    }

    /**
     * Funcion que obtiene las dirreciones dado un id de usuario.
     * @param userId identificador de usuario
     * @returns Listado de direcciones de usuario.
     */
    getAddressByUser(userId: number): Address[]{
        return this.addressList.filter(address => address.UserId === userId) || [] as Address[];
    }
}