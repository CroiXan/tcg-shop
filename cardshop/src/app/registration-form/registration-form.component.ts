import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
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
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
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
