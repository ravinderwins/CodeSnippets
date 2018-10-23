import { ApiService } from "./../../shared/services/api.service";
import { APIURLS } from "./../../config/api_url";
import { Component, OnInit } from "@angular/core";
import { ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ToastrManager } from "ng6-toastr-notifications";
import { Router } from "@angular/router";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  providers: [ApiService]
})
export class LoginComponent implements OnInit {
  @ViewChild("myloader")
  input;

  records: Array<any>;
  constructor(
    private _ApiService: ApiService,
    private toastr: ToastrManager,
    private router: Router
  ) {}

  ngOnInit() {
    const body = document.getElementsByTagName("body")[0];
    body.classList.add("login-page");
  }
  onsubmit(formdata) {
    this._ApiService
      .post(APIURLS.LOG_IN_API, formdata)
      .subscribe((response: any) => {
        this.records = response;
        if (response.Success == true) {
          this.toastr.successToastr("", "Successfully logged In");
          localStorage.setItem("loginDetails", JSON.stringify(response));
          this.router.navigate(["/dashboard"]);
        } else {
          this.toastr.errorToastr("Error", response.Message, { maxShown: 1 });
        }
      });
  }
}
