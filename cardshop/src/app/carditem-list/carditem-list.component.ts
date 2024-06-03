import { Component } from '@angular/core';
import { CardItem } from '../core/models/carditem.model';
import { CardItemService } from '../core/services/cartitem.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-carditem-list',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './carditem-list.component.html',
  styleUrl: './carditem-list.component.css'
})
export class CarditemListComponent {

  carditemList: CardItem[] = [];

  constructor(
    private route: ActivatedRoute, 
    private cardItemService: CardItemService, 
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const categoria = params.get('categoria') || '';
      const search = params.get('search') || '';
      if (categoria !== '' || search !== '') {
        this.carditemList = this.cardItemService.getCardListWithFilters(categoria,search);
      }else{
        this.carditemList = this.cardItemService.getCardsList();
      }
    });
  }

  addItem(cardId: number, cardName: string){
    const result = this.authService.addItemToShoppingCart(cardId);
    if(result){
      alert('Se ha agregado '+cardName+' al carrito');
    }else{
      alert('No hay suficiente stock para '+cardName);
    }
  }

}
