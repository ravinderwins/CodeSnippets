import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  LogValidationService(group, formErrors, validationMesssage):void {
    Object.keys(group.controls).forEach((key: string) => {
      const controlConst = group.get(key);
      formErrors[key] = '';
      if (controlConst && !controlConst.valid &&
        (controlConst.touched || controlConst.dirty)) {
        const errorMessage = validationMesssage[key];
        for (const errorKey in controlConst.errors) {
          if (errorKey) {
             formErrors[key] += errorMessage[errorKey] + '';
          }
        }
      }
      if (controlConst instanceof FormGroup) {
         this.LogValidationService(controlConst, formErrors, validationMesssage);
      }
    });
  }
  markAsTouched(formData):void {
    Object.keys(formData.controls).forEach(field => {
      const control = formData.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }
  
}
