import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function onlyLettersValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = !/(^[a-zA-Z]*$)/g.test(control.value);
      return forbidden ? {onlyLetters: {value: control.value}} : null;
    };
}
  
export function passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])((?=.*\W)|(?=.*_))^[^ ]+$/g.test(control.value);
      return forbidden ? {passwordFromat: {value: control.value}} : null;
    };
}
  
export function samePasswordValidator(field1: string, field2: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get(field1)?.value;
      const confirmPassword = control.get(field2)?.value;
      const forbidden = password && confirmPassword && password !== confirmPassword;
      console.log( password + ' || ' + confirmPassword);
      return forbidden ? {notSamePassword: {value: confirmPassword}} : null;
    };
}

export function onlyNumbersValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = !/^\d+$/g.test(control.value);
      return forbidden ? {onlyNumbers: {value: control.value}} : null;
    };
}