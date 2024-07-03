import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CardItem } from '../../models/carditem.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 832767d2-6c98-4c19-8749-373d73475912' 
    })
  }

  private url = 'https://firebasestorage.googleapis.com/v0/b/mtg-shop-d23a4.appspot.com/o/cards.json?alt=media&token=3ee7efb3-ba94-4a4b-93b4-09b9b7597d35';

  constructor(private http: HttpClient) { }

  getAllCards(): Observable<CardItem[]>{
    return this.http.get<CardItem[]>(this.url);
  }

}
