import { Component } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(private authService: AuthService,private router: Router){}

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

  get username(){
    return this.loginForm.get('username');
  }

  get password(){
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    if( this.authService.login(this.loginForm.get('username')?.value,this.loginForm.get('password')?.value) ){
      alert('Se ha logueado');
      this.router.navigate(['/']);
    }else{
      alert('Usuario o Contraseña incorretos');
    }
  }

}