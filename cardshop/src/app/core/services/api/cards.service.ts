import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CardItem } from '../../models/carditem.model';
import { Observable, map } from 'rxjs';

/**
 * @description
 * Clase con Funciones de API de recuperacion de contrasena
 */
@Injectable({
  providedIn: 'root'
})
export class CardsService {

  /**
   * Headers para invocacion de API POST
   */
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 832767d2-6c98-4c19-8749-373d73475912' 
    })
  }

  /**
   * Enpoint de API de Catalogo de Cartas
   */
  private url = 'https://firebasestorage.googleapis.com/v0/b/mtg-shop-d23a4.appspot.com/o/cards.json?alt=media&token=3ee7efb3-ba94-4a4b-93b4-09b9b7597d35';

  /**
   * Constructor con dependencias a libreria HTTP
   * @param http Libreria HTTP
   */
  constructor(private http: HttpClient) { }

  /**
   * Funcion de Metodo GET de API de catalogo de cartas
   * @returns Observable con listado de Items de cartas
   */
  getAllCards(): Observable<CardItem[]>{
    return this.http.get<CardItem[]>(this.url);
  }
  
  /**
   * Funcion para crear cartas en el catalogo
   * @param card Objeto de nueva Carta
   * @param callback Funcion para retornar booleano con resultado de la ejecucion
   */
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
  
  /**
   * Funcion con logica para agregar o modificar una carta en catalogo
   * @param card Carta modificada o nueva
   * @param cardList Listado de catalogo
   * @returns booleano de resultado de la funcion
   */
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

  /**
   * Funcion de Metodo POST de API de catalogo de cartas
   * @param cardList Listado modificado de cartas 
   * @returns Retorna Observable de llamado Post de API
   */
  editCardsJson(cardList: CardItem[]): Observable<any>{
    return this.http.post(this.url,cardList,this.httpOptions);
  }
  
  /**
   * Funcion para Obetenr carta de catalogo segun ID
   * @param cardId Id de carta
   * @param callback Funcion para retornar Objeto de Carta encontrada
   */
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

  /**
   * Funcion para obtener listado de cartas filtratadas
   * @param category filtro para categoria de cartas
   * @param search filtro para nombre de cartas
   * @returns Observable con listado de cartas filtradas
   */
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

  /**
   * Funcion para obtener listado de cartas filtratadas respondeiendo el resultado en una funcion callback
   * @param category filtro para categoria de cartas
   * @param search filtro para nombre de cartas
   * @param callback funcion que restorna listado de cartas filtradas
   */
  getCardListWithFilters(category: string, search: string, callback: (result: CardItem[]) => void) {
    this.getCardListWithFiltersFetch( category, search ).subscribe(
      response => {
        callback(response);
      }
    );
  }

}
