import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
}
