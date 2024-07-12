import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CardItem } from '../../models/carditem.model';
import { Observable, map } from 'rxjs';

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
  
  createOrUpdateCardItem(card: CardItem,callback: (result: boolean) => void){
    this.getAllCards().subscribe(
      response => {
        let cardList = this.modifyCardItem(card,response);
        if(cardList.length == 0){
          callback(false)
          return
        }
        return this.editCardsJson(cardList).subscribe(
          response => {
            callback(true)
          },
          error => {
            callback(false)
          }
        )     
      },
      error => {
        console.error('Error a invocar cards : ' + error );
        callback(false)
      }
    );
  }
  
  modifyCardItem(card: CardItem, cardList: CardItem[]): CardItem[]{
    if(card.Id === undefined || card.Id === 0){
        const newId = cardList.reduce((maxId, card) => {
            return Math.max(maxId, card.Id);
        }, 0) + 1;
        card.Id = newId;
        cardList.push(card);
        return cardList;
    }else{
        const index = cardList.findIndex(cardItem => cardItem.Id === card.Id);
        if(index !== -1){
            cardList[index] = card;
            return cardList;
        }
    }
    return [];
  }

  editCardsJson(cardList: CardItem[]): Observable<any>{
    return this.http.post(this.url,cardList,this.httpOptions);
  }
  
  getCard(cardId: number, callback: (result: CardItem) => void){
    this.getAllCards().subscribe(
      response => {
        let resultCard:CardItem = response.find(card => card.Id === cardId ) || {} as CardItem;
        callback(resultCard);
      },
      error => {
        console.error('Error a invocar cards : ' + error );
        callback({} as CardItem);
      }
    );
  }

  getCardListWithFiltersFetch(category: string, search: string): Observable<CardItem[]> {
    return this.http.get<CardItem[]>(this.url).pipe(
      map(data => data.filter(cardItem => {

        if(category !== ''){
          return cardItem.CardType.toLowerCase().includes(category.toLowerCase())
        }
        
        if(search !== ''){
          return cardItem.CardName.toLowerCase().includes(search.toLowerCase())
        }
        return false;

      })
    ));
  }

  getCardListWithFilters(category: string, search: string, callback: (result: CardItem[]) => void) {
    this.getCardListWithFiltersFetch( category, search ).subscribe(
      response => {
        callback(response);
      }
    );
  }

}
