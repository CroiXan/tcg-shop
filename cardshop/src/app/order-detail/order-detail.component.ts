import { Component, Input } from '@angular/core';
import { ShoppingCart } from '../core/models/shopping-cart.model';
import { CommonModule } from '@angular/common';
import { CardItem } from '../core/models/carditem.model';

/**
 * @description
 * Componente para mostrar detalle de un carrito de compras selecionado
 */
@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})
export class OrderDetailComponent {
  /**
   * Valor de entrada del carrito selecionado
   */
  @Input() currentShoppingCart: ShoppingCart;
  /**
   * Bolleano de entrada para indicar si se debe mostrar las imagenes de las cartas del carrito
   */
  @Input() showImage: boolean = false;
  /**
   * Precio total de compra del carro
   */
  total: number = 0;

  /**
   * Constructor con iniciacion de objeto de carrito de compras
   */
  constructor(){
    this.currentShoppingCart = {} as ShoppingCart;
  }

  /**
   * Funcion para calcular precio total de la compra
   * @param cardList Listado de cartas del carrito selecionado
   * @returns Precio total del carrito de compras
   */
  calcTotal(cardList: CardItem[]): number{
    let calcTotal = 0;
    if(cardList !== undefined){
      cardList.forEach(card => {
        calcTotal += (card.Price * card.Quantity);
      });
    }
    return calcTotal;
  }
  
}
