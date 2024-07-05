import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShoppingCart } from '../../models/shopping-cart.model';
import { Observable } from 'rxjs';
import { CartStatus } from '../../enum/cart-status.enum';
import { CardsService } from './cards.service';
import { CardItem } from '../../models/carditem.model';

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

  constructor(
    private http: HttpClient,
    private cardsService: CardsService
  ) { }

  getShoppingCart(): Observable<ShoppingCart[]>{
    return this.http.get<ShoppingCart[]>(this.url);
  }

  editShoppingCartJson(shoppingCartList: ShoppingCart[]): Observable<any>{
    return this.http.post(this.url,shoppingCartList,this.httpOptions);
  }

  createShoppingcar(userId: number, callback: (result: ShoppingCart) => void) {
    let newShoppingCart: ShoppingCart = {} as ShoppingCart;

    this.getShoppingCart().subscribe(
      response => {

        const newId = response.reduce((maxId, user) => {
          return Math.max(maxId, user.id);
        }, 0) + 1;

        newShoppingCart.id = newId;
        newShoppingCart.UserId = userId;
        newShoppingCart.Status = CartStatus.Abierto;

        response.push(newShoppingCart);

        this.editShoppingCartJson(response).subscribe(
          response =>{
            callback(newShoppingCart)
          },
          error => {
            callback({} as ShoppingCart)
          }
        );

      },
      error => {
        callback({} as ShoppingCart)
      }
    );
    
  }

  updateShoppingCart(updatedShoppingCart: ShoppingCart, callback: (result: boolean) => void){

    this.getShoppingCart().subscribe(
      response => {

        const index = response.findIndex(shoppingCart => shoppingCart.id === updatedShoppingCart.id);
        if(index !== -1){
            response[index] = updatedShoppingCart;
            this.editShoppingCartJson(response).subscribe(
              response =>{
                callback(true)
                return;
              },
              error => {
                callback(false)
                return;
              }
            );
            return;
        }
        callback(false)
        return;

      },
      error => {
        callback(false)
      }
    );

  }

  addItemToShoppingCart(userId: number, cardId: number, shoppingCartId: number, callback: (result: [ShoppingCart,boolean]) => void) {
    
    let selectedShoppingCart: ShoppingCart = {} as ShoppingCart;

    this.getShoppingCart().subscribe(
      response => {
        const index = response.findIndex(shoppingCart => 
          shoppingCart.id === shoppingCartId &&
          shoppingCart.Status === CartStatus.Abierto);


        this.cardsService.getCard(cardId, result => {
          const selectedCardItem = result;
          
          if(index !== -1){
              selectedShoppingCart = response[index];
              this.addCardToShoppingCart(
                index, 
                response,
                selectedShoppingCart, 
                cardId, 
                selectedCardItem, 
                ([ShoppingCart,hasStock]) => {
                  callback([ShoppingCart,hasStock]);
                }
              )
          }else{
              this.createShoppingcar(userId, 
                shoppingCartResult => {
                  this.addCardToShoppingCart(
                    index, 
                    response,
                    shoppingCartResult, 
                    cardId, 
                    selectedCardItem, 
                    ([ShoppingCart,hasStock]) => {
                      callback([ShoppingCart,hasStock]);
                    }
                  )
                }
              );
          }
  
        });
      },
      error => {
        callback([selectedShoppingCart,false]);
      }
    );
    
  }

  getAllShopppingCartsByUser(userId: number, callback: (result: ShoppingCart[]) => void) {

    this.getShoppingCart().subscribe(
      response => {
        callback(response.filter(shoppinCart => shoppinCart.UserId === userId) || [] as ShoppingCart[])
      },
      error => {
        callback([]);
      }
    );

  }

  addCardToShoppingCart(shoppingCartIndex: number, shoppingCartList: ShoppingCart[],selectedShoppingCart: ShoppingCart, cardId: number, selectedCardItem: CardItem, callback: (result: [ShoppingCart,boolean]) => void){

    let cardIndex = -1;
    let hasStock = false;
              
    if(selectedShoppingCart.CardList !== undefined){
      cardIndex = selectedShoppingCart.CardList.findIndex(card => card.Id === cardId);
    }else{
      selectedShoppingCart.CardList = [];
    }
                  
    if(cardIndex !== -1){
      hasStock = selectedCardItem.Quantity > selectedShoppingCart.CardList[cardIndex].Quantity;
      if(hasStock){
        selectedShoppingCart.CardList[cardIndex].Quantity += 1;
        if(shoppingCartIndex == -1){
          shoppingCartList.push(selectedShoppingCart);
        }else{
          shoppingCartList[shoppingCartIndex] = selectedShoppingCart;
        }
        this.editShoppingCartJson(shoppingCartList).subscribe();
      }
    }else{
      hasStock = selectedCardItem.Quantity > 1;
      if(hasStock){
        let cardCopy = {...selectedCardItem};
        cardCopy.Quantity = 1;
        selectedShoppingCart.CardList.push(cardCopy);
        if(shoppingCartIndex == -1){
          shoppingCartList.push(selectedShoppingCart);
        }else{
          shoppingCartList[shoppingCartIndex] = selectedShoppingCart;
        }
        this.editShoppingCartJson(shoppingCartList).subscribe();
      }
    }

    callback([selectedShoppingCart,hasStock]);

  }

}
