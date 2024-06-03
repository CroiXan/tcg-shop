import { Component } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { ShoppingCart } from '../core/models/shopping-cart.model';
import { OrderDetailComponent } from '../order-detail/order-detail.component';
import { CartStatus } from '../core/enum/cart-status.enum';

@Component({
  selector: 'app-order-finish',
  standalone: true,
  imports: [
    OrderDetailComponent
  ],
  templateUrl: './order-finish.component.html',
  styleUrl: './order-finish.component.css'
})
export class OrderFinishComponent {

  currentShoppingCart: ShoppingCart = {} as ShoppingCart;

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

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
