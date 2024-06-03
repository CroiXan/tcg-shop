import { Component, Input } from '@angular/core';
import { ShoppingCart } from '../core/models/shopping-cart.model';
import { CommonModule } from '@angular/common';
import { CardItem } from '../core/models/carditem.model';

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
  @Input() showImage: boolean = false;
  total: number = 0;

  constructor(){
    this.currentShoppingCart = {} as ShoppingCart;
  }

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
