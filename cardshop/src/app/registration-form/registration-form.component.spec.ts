import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationFormComponent } from './registration-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RegistrationFormComponent', () => {
  let component: RegistrationFormComponent;
  let fixture: ComponentFixture<RegistrationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RegistrationFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Inicializar variables de formulario', () => {
    expect(component.registrationForm).toBeDefined();
    expect(component.registrationForm.get('firstName')).toBeDefined();
    expect(component.registrationForm.get('lastName')).toBeDefined();
    expect(component.registrationForm.get('username')).toBeDefined();
    expect(component.registrationForm.get('email')).toBeDefined();
    expect(component.registrationForm.get('password')).toBeDefined();
    expect(component.registrationForm.get('confirmPassword')).toBeDefined();
  });

  it('Pruebas de campos obligatorios', () => {
    const firstNameControl = component.registrationForm.get('firstName');
    const lastNameControl = component.registrationForm.get('lastName');
    const emailControl = component.registrationForm.get('email');
    const usernameControl = component.registrationForm.get('username');
    const passwordControl = component.registrationForm.get('password');
    const confirmPasswordControl = component.registrationForm.get('confirmPassword');

    firstNameControl?.setValue('');
    lastNameControl?.setValue('');
    emailControl?.setValue('');
    usernameControl?.setValue('');
    passwordControl?.setValue('');
    confirmPasswordControl?.setValue('');

    expect(firstNameControl?.valid).toBeFalsy();
    expect(lastNameControl?.valid).toBeFalsy();
    expect(emailControl?.valid).toBeFalsy();
    expect(usernameControl?.valid).toBeFalsy();
    expect(passwordControl?.valid).toBeFalsy();
    expect(confirmPasswordControl?.valid).toBeFalsy();

    expect(fixture.nativeElement.querySelector('#firstName + div').textContent).toContain('Nombre es obligatorio.');
    expect(fixture.nativeElement.querySelector('#lastName + div').textContent).toContain('Apellido es obligatorio.');
    expect(fixture.nativeElement.querySelector('#email + div').textContent).toContain('Email es obligatorio.');
    expect(fixture.nativeElement.querySelector('#username + div').textContent).toContain('Nombre de Usuario es obligatorio.');
    expect(fixture.nativeElement.querySelector('#password + div').textContent).toContain('Contraseña obligatorio.');
    expect(fixture.nativeElement.querySelector('#confirmPassword + div').textContent).toContain('Confirmar Contraseña es obligatorio.');
  });

  it('Pruebas de campos de solo texto', () => {
    const firstNameControl = component.registrationForm.get('firstName');
    const lastNameControl = component.registrationForm.get('lastName');
    const usernameControl = component.registrationForm.get('username');

    firstNameControl?.setValue('Asd');
    lastNameControl?.setValue('Asd');
    usernameControl?.setValue('Asd');
    expect(firstNameControl?.hasError('minlength')).toBeTruthy();
    expect(lastNameControl?.hasError('minlength')).toBeTruthy();
    expect(usernameControl?.hasError('minlength')).toBeTruthy();

    firstNameControl?.setValue('12345');
    lastNameControl?.setValue('12345');
    usernameControl?.setValue('12345');
    expect(firstNameControl?.hasError('onlyLetters')).toBeTruthy();
    expect(lastNameControl?.hasError('onlyLetters')).toBeTruthy();
    expect(usernameControl?.hasError('onlyLetters')).toBeTruthy();
    
    firstNameControl?.setValue('NombrePrueba12');
    lastNameControl?.setValue('ApellidoPrueba12');
    usernameControl?.setValue('UserPrueba12');
    expect(firstNameControl?.hasError('onlyLetters')).toBeTruthy();
    expect(lastNameControl?.hasError('onlyLetters')).toBeTruthy();
    expect(usernameControl?.hasError('onlyLetters')).toBeTruthy();

    firstNameControl?.setValue('Nombre.Prueba1');
    lastNameControl?.setValue('Apellido,Prueba1');
    usernameControl?.setValue('User_Prueba1');
    expect(firstNameControl?.hasError('onlyLetters')).toBeTruthy();
    expect(lastNameControl?.hasError('onlyLetters')).toBeTruthy();
    expect(usernameControl?.hasError('onlyLetters')).toBeTruthy();

    firstNameControl?.setValue('Nombre.Prueba');
    lastNameControl?.setValue('Apellido,Prueba');
    usernameControl?.setValue('User_Prueba');
    expect(firstNameControl?.hasError('onlyLetters')).toBeTruthy();
    expect(lastNameControl?.hasError('onlyLetters')).toBeTruthy();
    expect(usernameControl?.hasError('onlyLetters')).toBeTruthy();

    firstNameControl?.setValue('NombrePrueba');
    lastNameControl?.setValue('ApellidoPrueba');
    usernameControl?.setValue('UserPrueba');
    expect(firstNameControl?.valid).toBeTruthy();
    expect(lastNameControl?.valid).toBeTruthy();
    expect(usernameControl?.valid).toBeTruthy();
  });
  
  it('Prueba de campo email', () => {
    const emailControl = component.registrationForm.get('email');
    
    emailControl?.setValue('email no valido');
    expect(emailControl?.hasError('email')).toBeTruthy();

    emailControl?.setValue('email@');
    expect(emailControl?.hasError('email')).toBeTruthy();

    emailControl?.setValue('@email');
    expect(emailControl?.hasError('email')).toBeTruthy();

    emailControl?.setValue('email@email.com');
    expect(emailControl?.valid).toBeTruthy();
  });

  it('Prueba de campos de contraseña', () => {
    const passwordControl = component.registrationForm.get('password');
    const confirmPasswordControl = component.registrationForm.get('confirmPassword');
    
    passwordControl?.setValue('Asd');
    confirmPasswordControl?.setValue('Asd');
    expect(passwordControl?.hasError('minlength')).toBeTruthy();
    expect(confirmPasswordControl?.hasError('minlength')).toBeTruthy();

    passwordControl?.setValue('As.1');
    confirmPasswordControl?.setValue('As.1');
    expect(passwordControl?.hasError('minlength')).toBeTruthy();
    expect(confirmPasswordControl?.hasError('minlength')).toBeTruthy();

    passwordControl?.setValue('Asdf1234');
    confirmPasswordControl?.setValue('Asdf1234');
    expect(passwordControl?.hasError('passwordFromat')).toBeTruthy();
    expect(confirmPasswordControl?.hasError('passwordFromat')).toBeTruthy();

    passwordControl?.setValue('Asdfghj.');
    confirmPasswordControl?.setValue('Asdfghj.');
    expect(passwordControl?.hasError('passwordFromat')).toBeTruthy();
    expect(confirmPasswordControl?.hasError('passwordFromat')).toBeTruthy();

    passwordControl?.setValue('Asd.1234');
    confirmPasswordControl?.setValue('Asd.4321');
    expect(component.registrationForm.hasError('notSamePassword')).toBeTruthy();

    passwordControl?.setValue('Asd.1234');
    confirmPasswordControl?.setValue('Asd.1234');
    expect(passwordControl?.valid).toBeTruthy();
    expect(confirmPasswordControl?.valid).toBeTruthy();
  });
  
});
