import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from '../../models/address.model';
import { Observable } from 'rxjs';

/**
 * @description
 * Clase con Funciones de API de direcciones de usuario
 */
@Injectable({
  providedIn: 'root'
})
export class AddressApiService {

  /**
   * Headers para invocacion de API POST
   */
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer f569de63-cd07-4d62-8f1e-7d2f8df26b56' 
    })
  }

  /**
   * Enpoint de API de Informacion de Direcciones
   */
  private url = 'https://firebasestorage.googleapis.com/v0/b/mtg-shop-d23a4.appspot.com/o/address.json?alt=media&token=177adff0-9ba2-4243-b2f9-00ce0410a300';

  /**
   * Constructor con dependencias a libreria HTTP
   * @param http Libreria HTTP
   */
  constructor(private http: HttpClient) { }

  /**
   * Funcion de Metodo GET de API de direcciones
   * @returns Observable con listado de direcciones
   */
  getAddress(): Observable<Address[]>{
    return this.http.get<Address[]>(this.url);
  }

  /**
   * Funcion de Metodo POST de API de direcciones
   * @param addressList Listado modificado de direcciones
   * @returns Retorna Observable de llamado Post de API
   */
  editAddressJson(addressList: Address[]): Observable<any>{
    return this.http.post(this.url,addressList,this.httpOptions);
  }

  /**
   * Funcion para crear una direccion
   * @param userId Id de usuario
   * @param name Nombre de direccion
   * @param number Numero de direccion
   * @param region Region
   * @param Commune Comuna
   */
  createAddress(
    userId: number, 
    name: string, 
    number: number, 
    region: string, 
    Commune: string){

      let newAddress = {} as Address;

      this.getAddress().subscribe(
        response => {
          const newId = response.reduce((maxId, user) => {
            return Math.max(maxId, user.id);
          }, 0) + 1;
    
          newAddress.id=newId;
          newAddress.UserId = userId;
          newAddress.Name = name;
          newAddress.Number = number;
          newAddress.Region = region;
          newAddress.Commune = Commune;
          
          
          response.push(newAddress);

          this.editAddressJson(response).subscribe();
        },
        error => {

        }
      );
      
  }

  /**
   * Funcion para obtener listado de direcciones de un usuario especifico
   * @param userId Id de usuario
   * @param callback Funcion que retorna listado de direcciones del usuario
   */
  getAddressByUser(userId: number, callback: (result: Address[]) => void) {
    this.getAddress().subscribe(
      result => {
        let userAddress = result.filter(address => address.UserId === userId) || [] as Address[]
        callback(userAddress);
      },
      error => {
        callback([] as Address[]);
      }
    );
  }

}
