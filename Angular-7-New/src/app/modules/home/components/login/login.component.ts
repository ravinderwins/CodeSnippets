import {
  Component,
  OnInit,
  TemplateRef,
  EventEmitter,
  Output
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators, NgModel } from "@angular/forms";
import { CookieService } from "ngx-cookie-service"

//Config message
import { CustomMessage } from "src/app/config/message.config";

//Services
import { HomeService } from "../../services/home.service";
import { ValidatorService } from "src/app/shared/services/validator.service";
import { LocalStorageService } from "src/app/shared/services/local-storage.service";
import { EncryptDecryptService } from "src/app/shared/services/encryptdecrypt.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  providers: [CustomMessage]
})
export class LoginComponent implements OnInit {
  @Output() headerEmitter = new EventEmitter();

  loginForm: FormGroup;
  returnUrl: string;
  errorMessage: string;
  constructor(
    private _fb: FormBuilder,
    private _homeService: HomeService,
    private _router: Router,
    private _localStorageService: LocalStorageService,
    private _validatorService: ValidatorService,
    private _custommessage: CustomMessage,
    private _activatedRoute: ActivatedRoute,
    private _cookieservice: CookieService,
    private _encryptdecryptService: EncryptDecryptService
  ) { }

  formErrors = {
    Email: "",
    Password: "",
    Remember: ""
  };

  validationMesssage = {
    Email: {
      required: "Email is required",
      email: "Pleae enter correct Email"
    },
    Password: {
      required: "Password is required"
    }
  };

  ngOnInit() {
    this.loginForm = this._fb.group({
      Email: ["", [Validators.required, Validators.email]],
      Password: ["", Validators.required],
      Remember: [""]
    });
    this._localStorageService.logout();
    this.returnUrl =
      this._activatedRoute.snapshot.queryParams["returnUrl"] || "/";

  }

  LogValidationError(): void {
    this._validatorService.LogValidationService(
      this.loginForm,
      this.formErrors,
      this.validationMesssage
    );
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loginForm.disable  ();
      this._homeService.login(this.loginForm.value).subscribe(
        response => {
          const data = response.data;
          this._localStorageService.storeAuthToken(data.token);
          this._localStorageService.storeUserDetail(data.user);
          this.closeLoginModal();
          this.headerEmitter.emit({ action: "CHECK_LOGGEDIN_STATUS" });

          if (this.loginForm.value.Remember) {
            let encryptUname = this._encryptdecryptService.encryptstring(this.loginForm.value.Email);
            let encryptPwd = this._encryptdecryptService.encryptstring(this.loginForm.value.Password);
            let encryptedString = this._encryptdecryptService.encryptstring(encryptUname + ':' + encryptPwd);
            this._cookieservice.set('JACKFRUIT-LOGIN', encryptedString, 15);
          }
          // this._router.navigateByUrl(this.returnUrl);
        },
        errors => {
          debugger;
          const error = errors.error.error;
          this.errorMessage = error.message;
          console.log(this._custommessage.errormessage.InvalidCredentials)
        }
      );
    } else {
      this._validatorService.markAsTouched(this.loginForm);
      this._validatorService.LogValidationService(this.loginForm, this.formErrors, this.validationMesssage);
    }
  }

  closeLoginModal() {
    this.headerEmitter.emit({ action: "CLOSE_MODAL" });
  }

  openRegisterModal() {
    this.headerEmitter.emit({ action: "OPEN_REGISTER_MODAL" });
  }
}
