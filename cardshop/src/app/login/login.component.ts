import { Component } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { Router, RouterModule } from '@angular/router';

/**
 * @description
 * Componente de formulario de ingreso a la aplicacion
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  /**
   * Formulario para variables de login
   */
  loginForm!: FormGroup;

  /**
   * Constructor con dependencias a funciones de sesion
   * @param authService Funciones de sesion
   * @param router Manejo de redirecciones
   */
  constructor(private authService: AuthService,private router: Router){}

  /**
   * Iniciacion de formulario de login
   */
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    });
  }

  /**
   * Get de valor username del formulario
   */
  get username(){
    return this.loginForm.get('username');
  }

  /**
   * Get de valor password del formulario
   */
  get password(){
    return this.loginForm.get('password');
  }

  /**
   * Accion de submit de formulario
   */
  onSubmit(): void {
    this.authService.login(
      this.loginForm.get('username')?.value,
      this.loginForm.get('password')?.value,
      result => {
        if( result ){
          alert('Se ha logueado');
          this.router.navigate(['/']);
        }else{
          alert('Usuario o Contraseña incorretos');
        }
      }
    )
    
  }

}