import { Component } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { CardItem } from '../core/models/carditem.model';

@Component({
  selector: 'app-card-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './card-detail.component.html',
  styleUrl: './card-detail.component.css'
})
export class CardDetailComponent {

  cardForm!: FormGroup;
  submitText: string = '';
  selectedCard: CardItem = {} as CardItem;

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

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
        Validators.required
      ]),
      SetCode: new FormControl( this.selectedCard.SetCode || '', [
        Validators.required
      ]),
      SetName: new FormControl( this.selectedCard.SetName || '', [
        Validators.required
      ]),
      CardNumber: new FormControl( this.selectedCard.CardNumber || '', [
        Validators.required
      ]),
      Condition: new FormControl( this.selectedCard.Condition || '', [
        Validators.required
      ]),
      Price: new FormControl( this.selectedCard.Price || '', [
        Validators.required
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

  onSubmit(): void {

  }

}
