import { Component, OnInit, TemplateRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import {Router} from "@angular/router";
import { HomeService } from '../../services/home.service';
import { ValidatorService } from 'src/app/shared/services/validator.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [HomeService]
})
export class RegisterComponent implements OnInit {
  @Output() headerEmitter = new EventEmitter();

  registrationForm: FormGroup;
  disable:boolean;

  constructor(private fb: FormBuilder,
    private registrationservice: HomeService,
    private _validatorService: ValidatorService,
    private _localStorageService: LocalStorageService,
    private router:Router
  ) { }

  formErrors = {
    FullName: '',
    Email: '',
    Password: ''
  }
  validationMesssage = {
    FullName: {
      required: 'Full name is required'
    },
    Email: {
      required: 'Email is required',
      email: 'Pleae enter correct email'
    },
    Password: {
      required: 'Password is required',
      minlength:'Password must be greater than 8 characters' 
    }
  }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      FullName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required,Validators.minLength(8)]]
    });
  }

  LogValidationError(): void {
    this._validatorService.LogValidationService(this.registrationForm, this.formErrors, this.validationMesssage);
  }

  onSubmit() {
    if (this.registrationForm.valid) {
     this.disable=true;           
      this.registrationservice.register(this.registrationForm.value).subscribe(
        response => {
          const data = response.data;
          this._localStorageService.storeAuthToken(data.token);
          this._localStorageService.storeUserDetail(data.user);          
          this.closeRegisterModal();
          this.headerEmitter.emit({ action: "CHECK_LOGGEDIN_STATUS" });
          //this.router.navigate(['/profile'])
      },
        errors => {
          this.disable=false;  
          const error = errors.error;
         
        })
    } else {
        this._validatorService.markAsTouched(this.registrationForm);
        this._validatorService.LogValidationService(this.registrationForm, this.formErrors, this.validationMesssage);
    }
  }

  closeRegisterModal() {
    this.headerEmitter.emit({ action: "CLOSE_MODAL" });
  }

  openLoginModal() {
    this.headerEmitter.emit({ action: "OPEN_LOGIN_MODAL" });
  }
}