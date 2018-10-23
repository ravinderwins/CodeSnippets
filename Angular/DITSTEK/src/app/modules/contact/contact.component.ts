import { contactDetail } from "./../contactDetail";
import { Component, OnInit } from "@angular/core";
import { ApiService } from "./../../shared/services/api.service";
import { APIURLS } from "./../../config/api_url";
import { Router } from "@angular/router";
import { ToastrManager } from "ng6-toastr-notifications";
@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"],
  providers: [ApiService]
})
export class ContactComponent implements OnInit {
  records: any = [];
  UserBasicInformationId: -1;
  contact: contactDetail;
  test: any = [];
  constructor(
    private _ApiService: ApiService,
    private router: Router,
    private toastr: ToastrManager
  ) {}

  ngOnInit() {
    this.getContactDetails();
    this.fillDropdowns();
  }

  public getContactDetails() {
    debugger;
    this.records = JSON.parse(localStorage.getItem("loginDetails"));
    this.UserBasicInformationId = this.records.UserDetail.UserBasicInformationId;
    var BasicInformationRequest: any = {};
    BasicInformationRequest.UserBasicInformationId = this.UserBasicInformationId;
    this._ApiService
      .post(APIURLS.GET_CONTACT_DETAILS_API, BasicInformationRequest)
      .subscribe(data => {
        debugger;
        this.contact = data[0];
      });
  }
  updateAddrs(event) {
    debugger;
    if (event.target.checked) {
      this.contact.CorrespondenceAddress = this.contact.PermanentAddress;
      this.contact.CorrespondenceCity = this.contact.PermanentCity;
      this.contact.CorrespondenceState = this.contact.PermanentState;
      this.contact.CorrespondenceCountry = this.contact.PermanentCountry;
      this.contact.CorrespondenceZIP = this.contact.PermanentZIP;
    } else {
      this.contact.CorrespondenceAddress = null;
      this.contact.CorrespondenceCity = null;
      this.contact.CorrespondenceState = null;
      this.contact.CorrespondenceCountry = null;
      this.contact.CorrespondenceZIP = "";
    }
  }

  saveContactDetail(contact) {
    debugger;
    this.records = JSON.parse(localStorage.getItem("loginDetails"));
    this.UserBasicInformationId = this.records.UserDetail.UserBasicInformationId;
    contact.UserBasicInformationId = this.UserBasicInformationId;
    this._ApiService
      .post(APIURLS.SAVE_CONTACT_DETAILS_API, contact)
      .subscribe((response: any) => {
        debugger;
        if (response.Success == true) {
          this.contact = response.UserDetailResponse;

          this.toastr.successToastr("Success", response.Message);
        } else {
          this.toastr.errorToastr("Error", response.Message);
        }
      });
  }
  _keyPress(event: any) {
    debugger;
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  public fillDropdowns() {
    this.records = JSON.parse(localStorage.getItem("loginDetails"));
    this._ApiService.post(APIURLS.FILL_DROPDOWNS_API).subscribe(data => {
      debugger;
      this.test = data.Result;
    });
  }
}
