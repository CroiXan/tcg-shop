import { Injectable } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart.model';
import { CartStatus } from '../enum/cart-status.enum';
import { CardItemService } from './cartitem.service';

@Injectable({
    providedIn: 'root'
})

export class ShoppingCartService {

    shoppingCartList: ShoppingCart[] = [];

    constructor(private cardItemService: CardItemService){}

    createShoppingcar(userId: number): ShoppingCart{
        let newShoppingCart: ShoppingCart = {} as ShoppingCart;
        const newId = this.shoppingCartList.reduce((maxId, user) => {
            return Math.max(maxId, user.id);
        }, 0) + 1;

        newShoppingCart.id = newId;
        newShoppingCart.UserId = userId;
        newShoppingCart.Status = CartStatus.Abierto;

        this.shoppingCartList.push(newShoppingCart);
        return newShoppingCart;
    }

    updateShoppingCart(updatedShoppingCart: ShoppingCart): boolean{
        const index = this.shoppingCartList.findIndex(shoppingCart => shoppingCart.id === updatedShoppingCart.id);
        if(index !== -1){
            this.shoppingCartList[index] = updatedShoppingCart;
            return true;
        }
        return false;
    }

    addItemToShoppingCart(userId: number, cardId: number): [ShoppingCart,boolean]{
        const index = this.shoppingCartList.findIndex(shoppingCart => 
            shoppingCart.UserId === userId &&
            shoppingCart.Status === CartStatus.Abierto);

        let selectedShoppingCart: ShoppingCart = {} as ShoppingCart;
        const stockCheckResult = this.cardItemService.checkStock(cardId);

        if(index !== -1){
            selectedShoppingCart = this.shoppingCartList[index];
        }else{
            selectedShoppingCart = this.createShoppingcar(userId);
        }

        if(stockCheckResult[1]){
            let cardIndex = selectedShoppingCart.CardList.findIndex(card => card.Id === cardId);
            
            if(cardIndex !== -1){
                selectedShoppingCart.CardList[cardIndex].Quantity += 1;
            }else{
                stockCheckResult[0].Quantity = 1;
                selectedShoppingCart.CardList.push(stockCheckResult[0]);
            }
        }

        return [selectedShoppingCart,stockCheckResult[1]];
    }

    getLastShoppingCart(){

    }

}