import { Component } from '@angular/core';
import { CardItem } from '../core/models/carditem.model';
import { CardItemService } from '../core/services/cartitem.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

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
  search: string = '';

  constructor(private route: ActivatedRoute, private cardItemService: CardItemService, ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const categoria = params.get('categoria');
      if (categoria !== null) {
      }else{
        this.carditemList = this.cardItemService.getCardsList();
      }
    });
  }

}
