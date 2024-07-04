import { Component } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CardItem } from '../core/models/carditem.model';
import { onlyNumbersValidator } from '../core/validators/validators';
import { CardsService } from '../core/services/api/cards.service';

/**
 * @description
 * Componente para formulario para editar cartas del catalogo
 */
@Component({
  selector: 'app-card-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './card-detail.component.html',
  styleUrl: './card-detail.component.css'
})
export class CardDetailComponent {
  /**
   * Fromulario para editar carta del catalogo
   */
  cardForm!: FormGroup;
  /**
   * Variable para mensaje de resultado de submit
   */
  submitText: string = '';
  /**
   * Variable para item de carta selecionada
   */
  selectedCard: CardItem = {} as CardItem;

  /**
   * Contructor con dependencias a la capa service
   * @param authService Manejo de sesion
   * @param router Manejo de redirecciones
   * @param cardItemService Funciones de manejo de cartas
   */
  constructor(
    private authService: AuthService,
    private router: Router,
    private cardsService: CardsService
  ){}

  /**
   * Iniciacion de Formulario de editar cartas
   * Iniciacion de valores de carta selecionada
   */
  ngOnInit(): void {

    this.selectedCard = this.authService.getSelectedCardForManage();

    if(this.selectedCard.Id === undefined){
      this.submitText = 'Agregar Carta';
    }else{
      this.submitText = 'Actualizar Carta';
    }

    this.cardForm = new FormGroup({
      CardName: new FormControl( this.selectedCard.CardName || '', [
        Validators.required
      ]),
      Quantity: new FormControl( this.selectedCard.Quantity || '', [
        Validators.required,
        onlyNumbersValidator()
      ]),
      SetCode: new FormControl( this.selectedCard.SetCode || '', [
        Validators.required
      ]),
      SetName: new FormControl( this.selectedCard.SetName || '', [
        Validators.required
      ]),
      CardNumber: new FormControl( this.selectedCard.CardNumber || '', [
        Validators.required,
        onlyNumbersValidator()
      ]),
      Condition: new FormControl( this.selectedCard.Condition || '', [
        Validators.required
      ]),
      Price: new FormControl( this.selectedCard.Price || '', [
        Validators.required,
        onlyNumbersValidator()
      ]),
      Image: new FormControl( this.selectedCard.Image || '', [
        Validators.required
      ]),
      CardType: new FormControl( this.selectedCard.CardType || '', [
        Validators.required
      ]),
      ManaValue: new FormControl( this.selectedCard.ManaValue || '', [
        Validators.required
      ]),
      CardText: new FormControl( this.selectedCard.CardText || '', [
        Validators.required
      ]),
    });
  }

  get CardName (){
    return this.cardForm.get('CardName')
  }

  get Quantity (){
    return this.cardForm.get('Quantity')
  }

  get SetCode (){
    return this.cardForm.get('SetCode')
  }

  get SetName (){
    return this.cardForm.get('SetName')
  }

  get CardNumber (){
    return this.cardForm.get('CardNumber')
  }

  get Condition (){
    return this.cardForm.get('Condition')
  }

  get Price (){
    return this.cardForm.get('Price')
  }

  get Image (){
    return this.cardForm.get('Image')
  }

  get CardType (){
    return this.cardForm.get('CardType')
  }

  get ManaValue (){
    return this.cardForm.get('ManaValue')
  }
  
  get CardText (){
    return this.cardForm.get('CardText')
  }

  /**
   * Accion de submit de formulario para editar cartas
   */
  onSubmit(): void {
    this.selectedCard.CreatedBy = 
      this.selectedCard.CreatedBy ? this.selectedCard.CreatedBy : this.authService.getUser().id;
    this.selectedCard.CardName = this.cardForm.get('CardName')?.value;
    this.selectedCard.Quantity = this.cardForm.get('Quantity')?.value;
    this.selectedCard.SetCode = this.cardForm.get('SetCode')?.value;
    this.selectedCard.SetName = this.cardForm.get('SetName')?.value;
    this.selectedCard.CardNumber = this.cardForm.get('CardNumber')?.value;
    this.selectedCard.Condition = this.cardForm.get('Condition')?.value;
    this.selectedCard.Price = this.cardForm.get('Price')?.value;
    this.selectedCard.Image = this.cardForm.get('Image')?.value;
    this.selectedCard.CardType = this.cardForm.get('CardType')?.value;
    this.selectedCard.ManaValue = this.cardForm.get('ManaValue')?.value;
    this.selectedCard.CardText = this.cardForm.get('CardText')?.value;

    this.cardsService.createOrUpdateCardItem(this.selectedCard,
      result => {
        if(result){
          alert(this.submitText + ' con éxito');
        }else{
          alert(this.submitText + ' con error');
        }
      }
    )

  }

}
