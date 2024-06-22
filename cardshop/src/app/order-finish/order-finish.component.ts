import { Component } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { ShoppingCart } from '../core/models/shopping-cart.model';
import { OrderDetailComponent } from '../order-detail/order-detail.component';
import { CartStatus } from '../core/enum/cart-status.enum';

/**
 * Componente de pantalla de confirmacion de compra
 */
@Component({
  selector: 'app-order-finish',
  standalone: true,
  imports: [
    OrderDetailComponent,
    RouterModule
  ],
  templateUrl: './order-finish.component.html',
  styleUrl: './order-finish.component.css'
})
export class OrderFinishComponent {
  /**
   * Variable de Carrito de compras actual
   */
  currentShoppingCart: ShoppingCart = {} as ShoppingCart;

  /**
   * Constructor con dependecia a manejo de sesion.
   * @param authService Funciones de manejo de sesion
   * @param router Manejo de redirecciones
   */
  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  /**
   * Iniciacion de variable de carrito de compras
   * Validacion al inicio del flujo para confirmar que exista un carrito de compras activo
   */
  ngOnInit() {
    this.authService.getCurrentShoppingCart().subscribe(shoppingCart => {
      this.currentShoppingCart = shoppingCart;
    });
    if(this.currentShoppingCart.id === undefined || this.currentShoppingCart.id === 0){
      alert('ha ocurrido un error');
      this.router.navigate(['/']);
    }else{
      if(this.currentShoppingCart.Status === CartStatus.Abierto){
        this.authService.updateShoppingCartStatus(CartStatus.Pagado);
      }
    }
  }

}
