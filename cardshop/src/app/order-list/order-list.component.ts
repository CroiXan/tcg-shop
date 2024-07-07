import { Component } from '@angular/core';
import { ShoppingCartService } from '../core/services/shopping-cart.service';
import { AuthService } from '../core/services/auth.service';
import { ShoppingCart } from '../core/models/shopping-cart.model';
import { CommonModule } from '@angular/common';
import { CardItem } from '../core/models/carditem.model';
import { OrderDetailComponent } from '../order-detail/order-detail.component';
import { ShoppingCartApiService } from '../core/services/api/shopping-cart-api.service';

/**
 * @description
 * Componente para listar los carritos de compra realizados por el usuario logueado
 */
@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [
    CommonModule,
    OrderDetailComponent
  ],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent {
  /**
   * Listado de carritos de compra realizados por el usuario activo
   */
  orderList: ShoppingCart[] = [];
  /**
   * Carrito de compras seleccionado
   */
  selectedOrder: ShoppingCart = {} as ShoppingCart;
  /**
   * Booleano para mostrar card con informacion del carrito de compras seleccionado
   */
  isSelected: boolean = false;

  /**
   * Constructor con dependencias a capa service
   * @param shoppingCartService Manejo de carrito de compras 
   * @param authService Manejo de sesion
   */
  constructor(
    private authService: AuthService,
    private shoppingCartApiService: ShoppingCartApiService
  ){}

  /**
   * Iniciacion de id usuario actual y sus respectivos carritos de compra realizados.
   */
  ngOnInit(): void {
    this.isSelected = false;
    const userId = this.authService.getUser().id;
    
    this.shoppingCartApiService.getAllShopppingCartsByUser(
      userId,
      result => {
        this.orderList = result
      }
    );
    
  }

  /**
   * Accion que setea carrito de compras seleccionado
   * @param selected Carrito de compras selecionado
   */
  selectForDetail(selected: ShoppingCart){
    this.selectedOrder = selected;
    this.isSelected = true;
  }

  /**
   * Funcion para aclcular el total de la compra del carrito de compras
   * @param cardList Listado de cartas del carrito de compras
   * @returns Valor total de la compra
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

  /**
   * Funcion para sumar el total de cartas de un carrito de compras
   * @param cardList Listado de cartas de un carrito de compras
   * @returns total de cartas del carrito de compras
   */
  calcQuantity(cardList: CardItem[]): number{
    let calcQuantity = 0;
    if(cardList !== undefined){
      cardList.forEach(card => {
        calcQuantity += card.Quantity;
      });
    }
    return calcQuantity;
  }

}
