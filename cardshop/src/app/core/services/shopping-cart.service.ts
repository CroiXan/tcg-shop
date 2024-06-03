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

    addItemToShoppingCart(userId: number, cardId: number, shoppingCartId: number): [ShoppingCart,boolean]{
        const index = this.shoppingCartList.findIndex(shoppingCart => 
            shoppingCart.id === shoppingCartId &&
            shoppingCart.Status === CartStatus.Abierto);

        let selectedShoppingCart: ShoppingCart = {} as ShoppingCart;
        const selectedCardItem = this.cardItemService.getCard(cardId);
        let hasStock = false;

        if(index !== -1){
            selectedShoppingCart = this.shoppingCartList[index];
        }else{
            selectedShoppingCart = this.createShoppingcar(userId);
        }

        let cardIndex = -1;
            
        if(selectedShoppingCart.CardList !== undefined){
            cardIndex = selectedShoppingCart.CardList.findIndex(card => card.Id === cardId);
        }else{
            selectedShoppingCart.CardList = [];
        }
            
        
        if(cardIndex !== -1){
            hasStock = selectedCardItem.Quantity > selectedShoppingCart.CardList[cardIndex].Quantity;
            if(hasStock){
                selectedShoppingCart.CardList[cardIndex].Quantity += 1;
            }
            
        }else{
            hasStock = selectedCardItem.Quantity > 1;
            if(hasStock){
                let cardCopy = {...selectedCardItem};
                cardCopy.Quantity = 1;
                selectedShoppingCart.CardList.push(cardCopy);
            }
        }
        

        return [selectedShoppingCart,hasStock];
    }

    getAllShopppingCartsByUser(userId: number): ShoppingCart[]{
        return this.shoppingCartList.filter(shoppinCart => 
            shoppinCart.UserId === userId
        ) || [] as ShoppingCart[];
    }

}