import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { CardItem } from '../core/models/carditem.model';
import { CommonModule } from '@angular/common';
import { CardsService } from '../core/services/api/cards.service';

/**
 * @description
 * Componente de pantalla de administracion de cartas del catalogo
 */
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
  /**
   * Listado de cartas del catalogo
   */
  cardList: CardItem[] = [];

  /**
   * Constructor con dependencias a la capa service
   * @param authService 
   * @param router Manejo de redirecciones
   * @param cardItemService Funciones de cartas del catalogo
   */
  constructor(
    private authService: AuthService,
    private router: Router,
    private cardsServcie: CardsService
  ){}

  /**
   * Iniciacion de listado de cartas del catalogo
   */
  ngOnInit(): void {
    this.cardsServcie.getAllCards().subscribe(
      response => {
        this.cardList = response;
      },
      error => {
        console.error('Error a invocar cards : ' + error );
      }
    );
  }

  /**
   * Accion para seleccionar carta en la pantalla
   * @param card 
   */
  setSelecetedCard(card: CardItem){
    this.authService.setSelectedCardForManage(card);
    this.goToDetail();
  }

  /**
   * Funcion para redireccionar a pantalla de detalle de carta
   */
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
