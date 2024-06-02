import { Component } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';


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
        only_LettersValidator()
      ]),
      commune: new FormControl('', [
        Validators.required,
        only_LettersValidator()
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

export function only_LettersValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = !/(^[a-zA-Z]*$)/g.test(control.value);
    return forbidden ? {onlyletters: {value: control.value}} : null;
  };
}

export function onlyNumbersValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = !/^\d+$/g.test(control.value);
    return forbidden ? {onlynumbers: {value: control.value}} : null;
  };
}
