import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

/**
 * Funcion para validar que campo solo tenga letras en FormControl.
 * @returns onlyLetters
 */
export function onlyLettersValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = !/(^[a-zA-Z]*$)/g.test(control.value);
      return forbidden ? {onlyLetters: {value: control.value}} : null;
    };
}

/**
 * Funcion para validar formato de contrasena en FormControl.
 * Que tenga un numero, una letra mayuscula, una minuscula y un simbolo.
 * @returns passwordFromat
 */
export function passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])((?=.*\W)|(?=.*_))^[^ ]+$/g.test(control.value);
      return forbidden ? {passwordFromat: {value: control.value}} : null;
    };
}

/**
 * Funcion para validar que ambas contrasenas ingresadas sean las mismas en FormControl.
 * @param field1 contrasena
 * @param field2 contrasena repetida
 * @returns notSamePassword
 */
export function samePasswordValidator(field1: string, field2: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get(field1)?.value;
      const confirmPassword = control.get(field2)?.value;
      const forbidden = password && confirmPassword && password !== confirmPassword;
      return forbidden ? {notSamePassword: {value: control.value}} : null;
    };
}

/**
 * Funcion para validar con regex que el campo ingresado solo contega numeros en FormControl.
 * @returns onlyNumbers
 */
export function onlyNumbersValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = !/^\d+$/g.test(control.value);
      return forbidden ? {onlyNumbers: {value: control.value}} : null;
    };
}