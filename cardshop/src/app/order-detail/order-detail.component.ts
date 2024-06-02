import { Component, Input } from '@angular/core';
import { ShoppingCart } from '../core/models/shopping-cart.model';
import { CommonModule } from '@angular/common';

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
  @Input() currentShoppingCart: ShoppingCart;
  total: number = 0;

  constructor(){
    this.currentShoppingCart = {} as ShoppingCart;
  }

  ngOnChanges(): void {
    let calcTotal = 0;
    if(this.currentShoppingCart.CardList !== undefined){
      this.currentShoppingCart.CardList.forEach(card => {
        calcTotal += (card.Price * card.Quantity);
      });
    }
  }
  
}
