import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../core/services/user.service';

/**
 * @description
 * Componente para iniciar recuperacion de contrasena
 */
@Component({
  selector: 'app-password-recovery',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './password-recovery.component.html',
  styleUrl: './password-recovery.component.css'
})
export class PasswordRecoveryComponent {
  /**
   * Fromulario para recuperar contrasena
   */
  recoverPassForm!: FormGroup;

  /**
   * Contructor con dependencia a funciones de manejo de ususario
   * @param router Manejo de redirecciones
   * @param userServie Funciones de informacion de ususario
   */
  constructor(private router: Router, private userServie: UserService){}

  /**
   * Iniciacion de formulario de recuperacion de contrasena
   */
  ngOnInit(): void {
    this.recoverPassForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ])
    });
  }

  get email(){
    return this.recoverPassForm.get('email');
  }

  /**
   * Accion de submit de formulario de recuperar contrasena
   */
  onSubmit() {
    alert('Se ha enviado Email de recuperacion');

    if(this.userServie.checkEmail(this.email?.value)){
      this.router.navigate(['/']);
    }

  }

}
