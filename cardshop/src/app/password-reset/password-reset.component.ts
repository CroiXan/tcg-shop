import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { passwordValidator, samePasswordValidator } from '../core/validators/validators';
import { RecoveryService } from '../core/services/api/recovery.service';

/**
 * @description
 * Componente para formulario para recuperar contrasena
 */
@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.css'
})
export class PasswordResetComponent {
  /**
   * Formulario para actualizar contrasena
   */
  updatePasswordForm!: FormGroup;
  /**
   * Variable para manejar token
   */
  localToken: string = '';

  /**
   * Constructor con dependencia a capa service
   * @param userService Manejo de Usuarios
   * @param router Manejo de redirecciones
   * @param route Manejo de parametros de entrada
   */
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recoveryService: RecoveryService
  ){}

  /**
   * Iniciacion y validacion de token
   * Iniciacion de formaulario de contrasena
   */
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const token = params.get('recovery') || '';
      this.recoveryService.checkRecovery(
        token,
        result => {
          if(result != ''){
            alert(result);
            this.router.navigate(['/']);
          }
        }
      );
      this.localToken = token;
    });
    this.updatePasswordForm = new FormGroup({
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

  get password(){
    return this.updatePasswordForm.get('password');
  }

  get confirmPassword(){
    return this.updatePasswordForm.get('confirmPassword');
  }

  /**
   * Accion submit de formulario
   */
  onSubmit(): void {
    this.recoveryService.updatePassword(
      this.localToken,
      this.password?.value,
      result => {
        if(result == ''){
          alert('Se ha actualizado la Contraseña');
          this.router.navigate(['/login']);
        }else{
          alert(result);
          this.router.navigate(['/']);
        }
      }
    );
  }

}
