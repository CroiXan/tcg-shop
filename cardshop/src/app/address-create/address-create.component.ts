import { Component } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';


@Component({
  selector: 'app-address-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './address-create.component.html',
  styleUrl: './address-create.component.css'
})
export class AddressCreateComponent {

  addressForm!: FormGroup;

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.addressForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
      ]),
      number: new FormControl('', [
        Validators.required,
      ]),
      region: new FormControl('', [
        Validators.required,
      ]),
      commune: new FormControl('', [
        Validators.required,
      ])
    });
  }

  get name(){
    return this.addressForm.get('name');
  }

  get number(){
    return this.addressForm.get('number');
  }

  get region(){
    return this.addressForm.get('region');
  }

  get commune(){
    return this.addressForm.get('commune');
  }

  onSubmit(){
    
  }

}
