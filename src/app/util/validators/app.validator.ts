import { FormControl, FormGroup } from '@angular/forms';

export function emailValidator(control: FormControl) {
  const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
  if (control.value && !emailRegex.test(control.value)) {
    return { invalidEmail: true };
  }
}

export function matchingPasswords( passwordKey: string, passwordConfirmationKey: string ) {
  return (group: FormGroup) => {
    const password = group.controls[passwordKey];
    const passwordConfirmation = group.controls[passwordConfirmationKey];
    if (password.value !== passwordConfirmation.value) {
      return passwordConfirmation.setErrors({ mismatchedPasswords: true });
    }
  };
}

export function documentValidator(control: FormControl) {
  if (control.value) {
    const document: string = control.value.replace(/(\.|\/|\-)/g, "");
    if (document.length == 14) {
      return cnpjValidator(control);
    } else {
      return { invalidDocument: true };
    }
  }
}

export function cnpjValidator(control: FormControl) {
  if (control.value) {
    const cnpj: string = control.value.replace(/(\.|\/|\-)/g, "");
    if (cnpj.length != 14) {
      return { invalidCNPJ: true };
    }

    if (
      cnpj == "00000000000000" ||
      cnpj == "11111111111111" ||
      cnpj == "22222222222222" ||
      cnpj == "33333333333333" ||
      cnpj == "44444444444444" ||
      cnpj == "55555555555555" ||
      cnpj == "66666666666666" ||
      cnpj == "77777777777777" ||
      cnpj == "88888888888888" ||
      cnpj == "99999999999999"
    ) {
      return { invalidCNPJ: true };
    }

    let size = cnpj.length - 2;
    let numbers = cnpj.substring(0, size);
    let digits = cnpj.substring(size);
    let sum = 0;
    let position = size - 7;
    for (let i = size; i >= 1; i--) {
      sum += +numbers.charAt(size - i) * position--;
      if (position < 2) position = 9;
    }
    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result != +digits.charAt(0)) {
      return { invalidCNPJ: true };
    }

    size = size + 1;
    numbers = cnpj.substring(0, size);
    sum = 0;
    position = size - 7;
    for (let i = size; i >= 1; i--) {
      sum += +numbers.charAt(size - i) * position--;
      if (position < 2) position = 9;
    }
    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result != +digits.charAt(1)) {
      return { invalidCNPJ: true };
    }
  }
}
