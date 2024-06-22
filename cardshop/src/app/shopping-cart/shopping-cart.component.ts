import { Component } from '@angular/core';
import { ShoppingCart } from '../core/models/shopping-cart.model';
import { AuthService } from '../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

/**
 * @description
 * Componente para mostrar contenido de carrito de compras
 */
@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent {
  /**
   * Varieble que contiene el carrito de compras actual
   */
  currentShoppingCart: ShoppingCart = {} as ShoppingCart;
  /**
   * Valor de precio total del carro de compras
   */
  total: number = 0;
  /**
   * Booleano que indica si el carrito tine items
   */
  hasItems: boolean = false;

  /**
   * Constructor dcon dependencias a funciones de sesion
   * @param authService Manejo de sesion
   * @param router Manejo de redirecciones
   */
  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  /**
   * Iniciacion de variable de carrito de compras actual del cliente logueado.
   * se calcula el precio del total del carrito
   */
  ngOnInit(): void {
    this.authService.getCurrentShoppingCart().subscribe(shoppingCart => {
      let calcTotal = 0;
      this.currentShoppingCart = shoppingCart;
      if(this.currentShoppingCart.CardList !== undefined){
        this.currentShoppingCart.CardList.forEach(card => {
          this.hasItems = true;
          calcTotal += (card.Price * card.Quantity);
        });
      }
      this.total = calcTotal;
    });
  }

  /**
   * Funcion para simular pago, redirige a mock pasarela de pago
   */
  buy(){
    if(this.authService.getUser().id === undefined){
      alert('Necesita Ingresar al sitio para realizar la compra');
      this.router.navigate(['/login']);
    }
    this.router.navigate(['/pago']);
  }
}
