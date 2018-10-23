import { NgForm } from "@angular/forms";
import { education } from "./../education";
import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalService } from "ngx-bootstrap/modal";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { ApiService } from "./../../shared/services/api.service";
import { APIURLS } from "./../../config/api_url";
import { Router } from "@angular/router";
import { ToastrManager } from "ng6-toastr-notifications";

@Component({
  selector: "app-education",
  templateUrl: "./education.component.html",
  styleUrls: ["./education.component.css"],
  providers: [ApiService]
})
export class EducationComponent implements OnInit {
  modalRef: BsModalRef;
  _ContactIndex: number = -1;
  educationarray: education[] = new Array();
  isDesc: boolean = false;
  column: string = "CategoryName";
  direction: number;
  education: education;
  message: string;
  records: any = [];
  UserBasicInformationId: number;
  _UserEducationDetailId: number = -1;
  test: any = [];

  constructor(
    private modalService: BsModalService,
    private _ApiService: ApiService,
    private router: Router,
    private toastr: ToastrManager
  ) {}

  ngOnInit() {
    this.getEducation();
    this.fillDropdowns();
  }
  openModal(template: TemplateRef<any>, education: any, index: number) {
    debugger;
    if (education == 0) {
      this.education = {
        qualificationtype: null,
        institutename: "",
        course: null,
        passoutyear: null,
        percentage: null,
        currentlystudying: false,
        EducationDetailId: null
      };
    } else {
      this.education = {
        qualificationtype: education.qualificationtype,
        institutename: education.institutename,
        course: education.course,
        passoutyear: education.passoutyear,
        percentage: education.percentage,
        currentlystudying: education.currentlyStudying,
        EducationDetailId: education.EducationDetailId
      };
    }
    this._ContactIndex = index;
    this.modalRef = this.modalService.show(template);
  }

  createYearsRange() {
    var items: number[] = [];
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();

    for (let year = currentYear; year >= 1970; --year) {
      items.push(year);
    }
    return items;
  }
  saveEducation(education) {
    debugger;
    // this.educationarray.push(form);
    // this.modalRef.hide();
    this.records = JSON.parse(localStorage.getItem("loginDetails"));
    this.UserBasicInformationId = this.records.UserDetail.UserBasicInformationId;
    education.UserBasicInformationId = this.UserBasicInformationId;
    this._ApiService
      .post(APIURLS.SAVE_EDUCATION_API, education)
      .subscribe((response: any) => {
        debugger;
        if (response.Success == true) {
          this.education = response.GetEducationResponse;
          if (education.EducationDetailId == null) {
            const newEducation = Object.assign({}, this.education);
            this.educationarray.push(newEducation);
          } else {
            let updatedEducation = Object.assign({}, education);
            this.educationarray[this._ContactIndex] = updatedEducation;
          }
          this.toastr.successToastr("Success", response.Message);
          this.modalRef.hide();
        } else {
          this.toastr.errorToastr("Error", response.Message);
        }
      });
  }
  public getEducation() {
    debugger;
    this.records = JSON.parse(localStorage.getItem("loginDetails"));
    this.UserBasicInformationId = this.records.UserDetail.UserBasicInformationId;
    var GetEducationRequest: any = {};
    GetEducationRequest.UserBasicInformationId = this.UserBasicInformationId;
    this._ApiService
      .post(APIURLS.GET_EDUCATION_API, GetEducationRequest)
      .subscribe(data => {
        this.educationarray = data;
      });
  }
  openConfirmationModal(
    template: TemplateRef<any>,
    index: number,
    EducationDetailId: number
  ) {
    debugger;
    this._ContactIndex = index;
    this._UserEducationDetailId = EducationDetailId;
    this.modalRef = this.modalService.show(template);
  }

  deleteRecord() {
    debugger;
    if (this._ContactIndex < 0) return false;
    var DeleteEducation: any = {};
    DeleteEducation.EducationDetailId = this._UserEducationDetailId;
    this._ApiService
      .post(APIURLS.DELETE_EDUCATION_API, DeleteEducation)
      .subscribe((response: any) => {
        debugger;
        if (response.Success == true) {
          this.toastr.successToastr("Success", response.Message);
          this.educationarray.splice(this._ContactIndex, 1);
          this.modalRef.hide();
        } else {
          this.toastr.errorToastr("Error", response.Message);
        }
      });
  }

  _keyPress(event: any) {
    debugger;
    const pattern = /((\d+)((\.\d{1,2})?))$/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  sort(property) {
    debugger;
    this.isDesc = !this.isDesc; //change the direction
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }

  public fillDropdowns() {
    this.records = JSON.parse(localStorage.getItem("loginDetails"));
    this._ApiService.post(APIURLS.FILL_DROPDOWNS_API).subscribe(data => {
      debugger;
      this.test = data.Result;
    });
  }
}
