import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { CardItem } from '../core/models/carditem.model';
import { CardItemService } from '../core/services/cartitem.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-manage',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './card-manage.component.html',
  styleUrl: './card-manage.component.css'
})
export class CardManageComponent {

  cardList: CardItem[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private cardItemService: CardItemService
  ){}

  ngOnInit(): void {
    this.cardList = this.cardItemService.getCardsList();
  }

  setSelecetedCard(card: CardItem){
    this.authService.setSelectedCardForManage(card);
    this.goToDetail();
  }

  goToDetail(){
    if(this.authService.getUser().id === undefined || 
      this.authService.getUser().Role != 'admin'){
      alert('No puede ingresar a esta funcion');
      this.router.navigate(['/login']);
    }else{
      this.router.navigate(['/card-detail']);
    }
  }
  
}
