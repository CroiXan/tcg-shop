import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecoveryService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 8c91f5c5-305e-4ac9-86b7-bd01e3634afe' 
    })
  }

  private url = 'https://firebasestorage.googleapis.com/v0/b/mtg-shop-d23a4.appspot.com/o/recovery.json?alt=media&token=3fa8f2c2-2089-4013-bfaf-237a30543693';

  constructor(private http: HttpClient) { }
}
