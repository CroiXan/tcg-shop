import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from '../../models/address.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressApiService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer f569de63-cd07-4d62-8f1e-7d2f8df26b56' 
    })
  }

  private url = 'https://firebasestorage.googleapis.com/v0/b/mtg-shop-d23a4.appspot.com/o/address.json?alt=media&token=177adff0-9ba2-4243-b2f9-00ce0410a300';

  constructor(private http: HttpClient) { }

  getAddress(): Observable<Address[]>{
    return this.http.get<Address[]>(this.url);
  }

  editAddressJson(addressList: Address[]): Observable<any>{
    return this.http.post(this.url,addressList,this.httpOptions);
  }

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
