import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartApiService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 4100aa98-8f1f-4d82-a10b-851addba1f2c' 
    })
  }

  private url = 'https://firebasestorage.googleapis.com/v0/b/mtg-shop-d23a4.appspot.com/o/shopcart.json?alt=media&token=47fa4eaf-983c-4d26-9703-7869d0269d9c';

  constructor() { }
}
