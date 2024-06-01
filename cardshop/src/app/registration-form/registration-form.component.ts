import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.css'
})
export class RegistrationFormComponent {
  registrationForm!: FormGroup;

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        onlyLettersValidator()
      ]),
      lastName: new FormControl('', [
        Validators.required,
        onlyLettersValidator()
      ]),
      username: new FormControl('', [
        Validators.required,
        onlyLettersValidator()
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        passwordValidator()
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        passwordValidator()
      ])
    },{
      validators: samePasswordValidator('password','confirmPassword')
    });
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      alert('Se ha registrado con exito');
      console.log(this.registrationForm.value);
      this.userService.createUser(
        this.registrationForm.get('username')?.value,
        this.registrationForm.get('firstName')?.value,
        this.registrationForm.get('lastName')?.value,
        this.registrationForm.get('password')?.value,
        this.registrationForm.get('email')?.value
      );
    }else{
      alert('Vuelva comprobar los campos del formulario');
    }
  }
}

export function onlyLettersValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = !/(^[a-zA-Z]*$)/g.test(control.value);
    return forbidden ? {onlyLetters: {value: control.value}} : null;
  };
}

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])((?=.*\W)|(?=.*_))^[^ ]+$/g.test(control.value);
    return forbidden ? {passwordFromat: {value: control.value}} : null;
  };
}

export function samePasswordValidator(field1: string, field2: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get(field1)?.value;
    const confirmPassword = control.get(field2)?.value;
    const forbidden = password && confirmPassword && password !== confirmPassword;
    console.log( password + ' || ' + confirmPassword);
    return forbidden ? {notSamePassword: {value: confirmPassword}} : null;
  };
}