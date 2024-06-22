import { Component } from '@angular/core';
import { CardItem } from '../core/models/carditem.model';
import { CardItemService } from '../core/services/cartitem.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../core/services/auth.service';

/**
 * @description
 * Componente para mostrar catalogo de cartas.
 */
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
  /**
   * Listado de cartas a mostrar en el catalogo
   */
  carditemList: CardItem[] = [];

  /**
   * Constructor con dependencias a capa service
   * @param route Manejo de redirecciones
   * @param cardItemService Manejo de catalogo de cartas
   * @param authService Manejo de sesion
   */
  constructor(
    private route: ActivatedRoute, 
    private cardItemService: CardItemService, 
    private authService: AuthService
  ) {}

  /**
   * Iniciacion de componente.
   * Se obtiene parametros de url:
   *  -categoria = tipo de carta
   *  -search = nombre de carta
   * Se obtiene listado de carta segun filtros o se trae el catalogo completo a mostrar.
   */
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

  /**
   * Accion para agregar una carta seleccionada a al carrito de compras
   * @param cardId Identificador de carta
   * @param cardName Nombre de carta
   */
  addItem(cardId: number, cardName: string){
    const result = this.authService.addItemToShoppingCart(cardId);
    if(result){
      alert('Se ha agregado '+cardName+' al carrito');
    }else{
      alert('No hay suficiente stock para '+cardName);
    }
  }

}
