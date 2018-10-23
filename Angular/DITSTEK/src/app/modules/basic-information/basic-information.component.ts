import { basicInformation } from "./../basicInformation";
import { Component, OnInit } from "@angular/core";
import { ApiService } from "./../../shared/services/api.service";
import { APIURLS } from "./../../config/api_url";
import { Router } from "@angular/router";
import { ToastrManager } from "ng6-toastr-notifications";
import { BsDatepickerConfig } from "ngx-bootstrap/datepicker";

@Component({
  selector: "app-basic-information",
  templateUrl: "./basic-information.component.html",
  styleUrls: ["./basic-information.component.css"],
  providers: [ApiService]
})
export class BasicInformationComponent implements OnInit {
  datePickerConfig: Partial<BsDatepickerConfig>;
  records: any = [];
  UserBasicInformationId: -1;
  basic: basicInformation;
  test: any = [];
  constructor(
    private _ApiService: ApiService,
    private router: Router,
    private toastr: ToastrManager
  ) {
    this.datePickerConfig = Object.assign(
      {},
      {
        dateInputFormat: "YYYY/MM/DD"
      }
    );
  }

  ngOnInit() {
    this.fillDropdowns();
    this.getBasicDetails();
  }
  saveBasicInformation(basic) {
    debugger;
    this.records = JSON.parse(localStorage.getItem("loginDetails"));
    this.UserBasicInformationId = this.records.UserDetail.UserBasicInformationId;
    basic.UserBasicInformationId = this.UserBasicInformationId;
    this._ApiService
      .post(APIURLS.SAVE_BASIC_DETAILS_API, basic)
      .subscribe((response: any) => {
        debugger;
        if (response.Success == true) {
          this.basic = response.BasicDetailResponse;

          this.toastr.successToastr("Success", response.Message);
        } else {
          this.toastr.errorToastr("Error", response.Message);
        }
      });
  }

  public getBasicDetails() {
    debugger;
    this.records = JSON.parse(localStorage.getItem("loginDetails"));
    this.UserBasicInformationId = this.records.UserDetail.UserBasicInformationId;
    var BasicInformationRequest: any = {};
    BasicInformationRequest.UserBasicInformationId = this.UserBasicInformationId;
    this._ApiService
      .post(APIURLS.GET_BASIC_DETAILS_API, BasicInformationRequest)
      .subscribe(data => {
        this.basic = data[0];
      });
  }

  public fillDropdowns() {
    this.records = JSON.parse(localStorage.getItem("loginDetails"));
    this._ApiService.post(APIURLS.FILL_DROPDOWNS_API).subscribe(data => {
      this.test = data.Result;
    });
  }
}
