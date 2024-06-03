import { Component } from '@angular/core';
import { ShoppingCart } from '../core/models/shopping-cart.model';
import { AuthService } from '../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
  hasItems: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

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

  buy(){
    this.router.navigate(['/pago']);
  }
}
