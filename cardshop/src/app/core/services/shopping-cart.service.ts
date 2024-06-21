import { Injectable } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart.model';
import { CartStatus } from '../enum/cart-status.enum';
import { CardItemService } from './cartitem.service';

/**
 * @description
 * Mock de funciones para manejo de carros de compra.
 */
@Injectable({
    providedIn: 'root'
})

export class ShoppingCartService {

    /**
     * Mock para menejar los carritos de compras del sitio
     */
    shoppingCartList: ShoppingCart[] = [];

    constructor(private cardItemService: CardItemService){}

    /**
     * Funcion para crear un carrito de compras dado un usuario especifico.
     * @param userId Identificador de usuario
     * @returns objeto de carrito de compras
     */
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

    /**
     * Funcion para actualizar carrito de compras
     * @param updatedShoppingCart Carrito de compras con valores actualizados
     * @returns booleano indicando si se logro actualizar el carrito de compras
     */
    updateShoppingCart(updatedShoppingCart: ShoppingCart): boolean{
        const index = this.shoppingCartList.findIndex(shoppingCart => shoppingCart.id === updatedShoppingCart.id);
        if(index !== -1){
            this.shoppingCartList[index] = updatedShoppingCart;
            return true;
        }
        return false;
    }

    /**
     * Funcion para agregar una carta al carrito de compras.
     * @param userId Identificador de usuario
     * @param cardId Identificador de carta a agregar al carrito
     * @param shoppingCartId Identificador de carrito de compras actual
     * @returns tupla de item de carrito actualizado y booleano que indica si hay stock
     */
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
            console.log(selectedCardItem.Quantity)
            console.log(selectedShoppingCart.CardList[cardIndex].Quantity)
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

    /**
     * Funcion para obtener los carritos de compra realizados dado un usuario especifico.
     * @param userId identificador de usuario
     * @returns Listado de carritos de compra realizadas por el usuario.
     */
    getAllShopppingCartsByUser(userId: number): ShoppingCart[]{
        return this.shoppingCartList.filter(shoppinCart => 
            shoppinCart.UserId === userId
        ) || [] as ShoppingCart[];
    }

}