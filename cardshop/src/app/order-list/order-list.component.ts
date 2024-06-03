import { Component } from '@angular/core';
import { ShoppingCartService } from '../core/services/shopping-cart.service';
import { AuthService } from '../core/services/auth.service';
import { ShoppingCart } from '../core/models/shopping-cart.model';
import { CommonModule } from '@angular/common';
import { CardItem } from '../core/models/carditem.model';
import { OrderDetailComponent } from '../order-detail/order-detail.component';

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

  orderList: ShoppingCart[] = [];
  selectedOrder: ShoppingCart = {} as ShoppingCart;
  isSelected: boolean = false;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private authService: AuthService
  ){}

  ngOnInit(): void {
    this.isSelected = false;
    const userId = this.authService.getUser().id;
    this.orderList = this.shoppingCartService.getAllShopppingCartsByUser(userId);
  }

  selectForDetail(selected: ShoppingCart){
    this.selectedOrder = selected;
    this.isSelected = true;
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
