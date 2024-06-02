import { Component } from '@angular/core';
import { ShoppingCart } from '../core/models/shopping-cart.model';
import { AuthService } from '../core/services/auth.service';
import { CommonModule } from '@angular/common';

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

  currentShoppingCart: ShoppingCart = {} as ShoppingCart;
  total: number = 0;

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.authService.getCurrentShoppingCart().subscribe(shoppingCart => {
      let calcTotal = 0;
      this.currentShoppingCart = shoppingCart;
      this.currentShoppingCart.CardList.forEach(card => {
        calcTotal += (card.Price * card.Quantity);
    });
      this.total = calcTotal;
    });
  }

}
