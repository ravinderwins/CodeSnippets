import { work } from "./../work";
import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalService } from "ngx-bootstrap/modal";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { ApiService } from "./../../shared/services/api.service";
import { APIURLS } from "./../../config/api_url";
import { Router } from "@angular/router";
import { ToastrManager } from "ng6-toastr-notifications";
@Component({
  selector: "app-work",
  templateUrl: "./work.component.html",
  styleUrls: ["./work.component.css"],
  providers: [ApiService]
})
export class WorkComponent implements OnInit {
  modalRef: BsModalRef;
  isDesc: boolean = false;
  column: string = "CategoryName";
  direction: number;
  workarray: work[] = new Array();
  _ContactIndex: number = -1;
  UserBasicInformationId: -1;
  work: work;
  UserWorkDetailId: number = -1;
  records: any = [];
  test: any = [];

  constructor(
    private modalService: BsModalService,
    private _ApiService: ApiService,
    private router: Router,
    private toastr: ToastrManager
  ) {}

  ngOnInit() {
    this.getWorkDetails();
    this.fillDropdowns();
  }

  public getWorkDetails() {
    debugger;
    this.records = JSON.parse(localStorage.getItem("loginDetails"));
    this.UserBasicInformationId = this.records.UserDetail.UserBasicInformationId;
    var WorkDetailRequest: any = {};
    WorkDetailRequest.UserBasicInformationId = this.UserBasicInformationId;
    this._ApiService
      .post(APIURLS.GET_WORK_DETAILS_API, WorkDetailRequest)
      .subscribe(data => {
        this.workarray = data;
      });
  }
  openModal(template: TemplateRef<any>, work: any, index: number) {
    debugger;
    if (work == 0) {
      this.work = {
        OrganizationType: null,
        OrganisationName: "",
        Designation: "",
        StartMonth: null,
        EndMonth: null,
        StartYear: null,
        EndYear: null,
        UserWorkDetailId: null,
        UserBasicInformationId: null
      };
    } else {
      this.work = {
        OrganizationType: work.OrganizationType,
        OrganisationName: work.OrganisationName,
        Designation: work.Designation,
        StartMonth: work.StartMonth,
        EndMonth: work.EndMonth,
        StartYear: work.StartYear,
        EndYear: work.EndYear,
        UserWorkDetailId: work.UserWorkDetailId,
        UserBasicInformationId: work.UserBasicInformationId
      };
    }
    this._ContactIndex = index;
    this.modalRef = this.modalService.show(template);
  }

  createYearsRange() {
    var items: number[] = [];
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();

    for (let year = currentYear; year >= 1950; --year) {
      items.push(year);
    }
    return items;
  }

  deleteRecord() {
    debugger;
    if (this._ContactIndex < 0) return false;
    var DeleteWorkDetail: any = {};
    DeleteWorkDetail.UserWorkDetailId = this.UserWorkDetailId;
    this._ApiService
      .post(APIURLS.DELETE_WORK_API, DeleteWorkDetail)
      .subscribe((response: any) => {
        debugger;
        if (response.Success == true) {
          this.toastr.successToastr("Success", response.Message);
          this.workarray.splice(this._ContactIndex, 1);
          this.modalRef.hide();
        } else {
          this.toastr.errorToastr("Error", response.Message);
        }
      });
  }
  openConfirmationModal(
    template: TemplateRef<any>,
    index: number,
    UserWorkDetailId: number
  ) {
    debugger;
    this._ContactIndex = index;
    this.UserWorkDetailId = UserWorkDetailId;
    this.modalRef = this.modalService.show(template);
  }

  saveWork(work: work) {
    debugger;
    this.records = JSON.parse(localStorage.getItem("loginDetails"));
    this.UserBasicInformationId = this.records.UserDetail.UserBasicInformationId;
    work.UserBasicInformationId = this.UserBasicInformationId;
    this._ApiService
      .post(APIURLS.SAVE_WORK_DETAILS_API, work)
      .subscribe((response: any) => {
        debugger;
        if (response.Success == true) {
          this.work = response.GetWorkDetailResponse;
          if (work.UserWorkDetailId == null) {
            const newWorkDetail = Object.assign({}, this.work);
            this.workarray.push(newWorkDetail);
          } else {
            debugger;
            let updatedWorkDetail = Object.assign({}, work);
            this.workarray[this._ContactIndex] = updatedWorkDetail;
          }
          this.toastr.successToastr("Success", response.Message);
          this.modalRef.hide();
        } else {
          this.toastr.errorToastr("Error", response.Message);
        }
      });
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
