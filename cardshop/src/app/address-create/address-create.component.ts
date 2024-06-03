import { Component } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { onlyLettersValidator, onlyNumbersValidator } from '../core/validators/validators';


@Component({
  selector: 'app-address-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    CommonModule
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
        onlyNumbersValidator()
      ]),
      region: new FormControl('', [
        Validators.required,
        onlyLettersValidator()
      ]),
      commune: new FormControl('', [
        Validators.required,
        onlyLettersValidator()
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
    this.authService.createAddress(this.addressForm.get('name')?.value,this.addressForm.get('number')?.value,this.addressForm.get('region')?.value,this.addressForm.get('commune')?.value);
    alert('Dirección agregada');
  }

}
