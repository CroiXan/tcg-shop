import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass, CommonModule} from '@angular/common';
import { onlyLettersValidator, passwordValidator, samePasswordValidator } from '../core/validators/validators';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { UserApiService } from '../core/services/api/user-api.service';

/**
 * @description
 * Componente con pantalla de formulario de registro
 */
@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    CommonModule
  ],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.css'
})
export class RegistrationFormComponent {
  /**
   * formulario de registro
   */
  registrationForm!: FormGroup;

  /**
   * Constructor con dependencias a capa service
   * @param userService Manejo de informacion de usuario
   * @param authService Manejo de sesion
   * @param router Manejo de redirecciones
   */
  constructor(
    private authService: AuthService,
    private router: Router,
    private userApiService: UserApiService
  ){}

  /**
   * Inciacion de formulario de registro definiendo validaciones de cada campo
   */
  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        onlyLettersValidator(),
        Validators.minLength(5),
        Validators.maxLength(50)
      ]),
      lastName: new FormControl('', [
        Validators.required,
        onlyLettersValidator(),
        Validators.minLength(5),
        Validators.maxLength(50)
      ]),
      username: new FormControl('', [
        Validators.required,
        onlyLettersValidator(),
        Validators.minLength(5),
        Validators.maxLength(20)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        passwordValidator(),
        Validators.minLength(8),
        Validators.maxLength(16)
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        passwordValidator(),
        Validators.minLength(8),
        Validators.maxLength(16)
      ])
    },{
      validators: samePasswordValidator('password','confirmPassword')
    });
  }

  get firstName(){
    return this.registrationForm.get('firstName');
  }

  get lastName(){
    return this.registrationForm.get('lastName');
  }

  get username(){
    return this.registrationForm.get('username');
  }

  get email(){
    return this.registrationForm.get('email');
  }

  get password(){
    return this.registrationForm.get('password');
  }

  get confirmPassword(){
    return this.registrationForm.get('confirmPassword');
  }

  /**
   * Accion submit de formulario
   */
  onSubmit(): void {
    if (this.registrationForm.valid) {
      this.userApiService.createUser(
        this.registrationForm.get('username')?.value,
        this.registrationForm.get('firstName')?.value,
        this.registrationForm.get('lastName')?.value,
        this.registrationForm.get('password')?.value,
        this.registrationForm.get('email')?.value,
        result => {
          if(result){
            alert('Se ha registrado con exito');
            this.authService.login(
              this.registrationForm.get('username')?.value,
              this.registrationForm.get('password')?.value,
              result => {
                if (result) {
                  this.router.navigate(['/']);
                } else {
                  alert('Error en el ingreso');
                }
              }
            );
            
          }else{
            alert('El nombre de usuario ya esta en uso');
          }
        }
      );
      
    }else{
      alert('Vuelva comprobar los campos del formulario');
    }
  }
}
