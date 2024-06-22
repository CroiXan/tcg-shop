import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';

/**
 * @description
 * Componente de pantalla de Mock de proceso de pago
 */
@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {

  /**
   * Booleano para indicar si se ha realizado el pago
   */
  isPaymentSuccess: boolean = false;

  /**
   * Contructor de componente con dependencias a funciones de sesion
   * @param authService Manejo de informacion de sesion
   * @param router Manejo de redirecciones
   */
  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  /**
   * Iniciacion de componente donde se verifica que exista un carrito de compras activo en la sesion.
   * Tempo de espera de 4 segundos para simular proceso de pago.
   */
  ngOnInit() {

    this.authService.getCurrentShoppingCart().subscribe(shoppingCart => {
      if(shoppingCart.id === undefined || shoppingCart.id === 0){
        alert('ha ocurrido un error');
        this.router.navigate(['/']);
      }
    });

    setTimeout(() => {
      this.isPaymentSuccess = true;
      this.redirect();
    }, 4000);

  }

  /**
   * Acion de simulacion de pago, espera de 4 segundos antes de redirigir a pantalla de finalizacion de carrito
   */
  redirect() {
    setTimeout(() => {
      this.router.navigate(['/orden-realizada']);
    }, 4000);
  }

}
