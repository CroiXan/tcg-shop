import { Component } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { User } from '../core/models/user.model';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent {

  updateForm!: FormGroup;
  currentUser: User = {} as User;

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.currentUser = this.authService.getUser();
    this.updateForm = new FormGroup({
      firstName: new FormControl(this.currentUser.FirstName, [
        Validators.required,
        onlyLettersValidator(),
        Validators.minLength(5),
        Validators.maxLength(50)
      ]),
      lastName: new FormControl(this.currentUser.LastName, [
        Validators.required,
        onlyLettersValidator(),
        Validators.minLength(5),
        Validators.maxLength(50)
      ]),
      email: new FormControl(this.currentUser.Email, [
        Validators.required,
        Validators.email
      ])
    });
  }

  get userName(){
    return this.currentUser.UserName;
  }

  get firstName(){
    return this.updateForm.get('firstName');
  }

  get lastName(){
    return this.updateForm.get('lastName');
  }

  get email(){
    return this.updateForm.get('email');
  }

  onSubmit(){
    if(this.authService.updateBasicInfo(this.updateForm.get('firstName')?.value,this.updateForm.get('lastName')?.value,this.updateForm.get('email')?.value)){
      alert('Se han actualizado los datos.');
    }else{
      alert('Error al actualizar los datos');
    }
  }

}

export function onlyLettersValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = !/(^[a-zA-Z]*$)/g.test(control.value);
    return forbidden ? {onlyLetters: {value: control.value}} : null;
  };
}
