import { Component } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { User } from '../core/models/user.model';
import { AuthService } from '../core/services/auth.service';
import { onlyLettersValidator } from '../core/validators/validators';

/**
 * @description
 * Componente con formulario de edicion de usuario
 */
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
  /**
   * Formulario de edicion de usuario
   */
  updateForm!: FormGroup;
  /**
   * Variable con informacion de usuario
   */
  currentUser: User = {} as User;

  /**
   * Constructor con dependencias a funciones de sesion
   * @param authService Manejo de sesion
   */
  constructor(private authService: AuthService){}

  /**
   * Iniciacion de informacion de usuario.
   * Iniciacion de formulario de edicion de usuario
   */
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

  /**
   * Accion de submit de formulario
   */
  onSubmit(){
    this.authService.updateBasicInfo(
      this.updateForm.get('firstName')?.value,
      this.updateForm.get('lastName')?.value,
      this.updateForm.get('email')?.value,
      result => {
        if(result){
          alert('Se han actualizado los datos.');
        }else{
          alert('Error al actualizar los datos');
        }
      }
    )
  }

}
