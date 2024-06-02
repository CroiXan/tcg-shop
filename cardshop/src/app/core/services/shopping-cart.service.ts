import { Injectable } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart.model';
import { CartStatus } from '../enum/cart-status.enum';

@Injectable({
    providedIn: 'root'
})

export class ShoppingCartService {

    shoppingCartList: ShoppingCart[] = [];

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

    getLastShoppingCart(){

    }

}