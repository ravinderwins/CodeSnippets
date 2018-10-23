import { task } from "./../task";
import { selectedcity } from "./../selectedcity";
import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalService } from "ngx-bootstrap/modal";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { NgSelectModule, NgOption } from "@ng-select/ng-select";
import { ApiService } from "./../../shared/services/api.service";
import { APIURLS } from "./../../config/api_url";
import { Router } from "@angular/router";
import { BsDatepickerConfig } from "ngx-bootstrap/datepicker";
import { ToastrManager } from "ng6-toastr-notifications";

@Component({
  selector: "app-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.css"],
  providers: [ApiService]
})
export class TaskComponent implements OnInit {
  datePickerConfig: Partial<BsDatepickerConfig>;
  taskform: FormGroup;
  modalRef: BsModalRef;
  _ContactIndex: number = -1;
  isDesc: boolean = false;
  column: string = "CategoryName";
  direction: number;
  message: string;
  records: any = [];
  UserBasicInformationId: number;
  _TaskId: number = -1;
  test: any = [];
  selectedCity: any = [];
  array: any = [];
  dropdown: any = [];
  task: task;
  taskarray: task[] = new Array();
  baseResponse: any = [];
  myFiles: string[] = [];
  file: any = [];
  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private _ApiService: ApiService,
    private router: Router,
    private toastr: ToastrManager
  ) {}

  ngOnInit() {
    this.taskform = this.formBuilder.group({
      Name: ["", Validators.required],
      Subject: "",
      Status: "",
      PredecessorTask: "",
      Priority: "",
      ScheduleStartDateTime: "",
      AssignedBy: ["", Validators.required],
      ScheduleEndDateTime: "",
      Description: ["", Validators.required],
      // nationality: "",
      files: "",
      itemRows: this.formBuilder.array([this.initItemRows()])
    });
    this.fillDropdowns();
    this.getAllTasks();
  }
  openModal(template: TemplateRef<any>, task: any) {
    debugger;
    if (task == 0) {
      this.taskform = this.formBuilder.group({
        Name: ["", Validators.required],
        Subject: "",
        Status: "",
        PredecessorTask: "",
        Priority: "",
        ScheduleStartDateTime: "",
        AssignedBy: ["", Validators.required],
        ScheduleEndDateTime: "",
        Description: ["", Validators.required],
        // nationality: "",
        files: "",
        itemRows: this.formBuilder.array([this.initItemRows()])
      });
    } else {
      this.taskform.setValue({
        Name: [task.Name, Validators.required],
        Subject: task.Subject,
        Status: task.Status,
        PredecessorTask: task.PredecessorTask,
        Priority: task.Priority,
        ScheduleStartDateTime: task.ScheduleStartDateTime,
        AssignedBy: task.AssignedBy,
        ScheduleEndDateTime: task.ScheduleEndDateTime,
        //Category: task.Category,
        files: "",
        Description: [task.Description, Validators.required]
      });
    }
    this.modalRef = this.modalService.show(template);
  }

  initItemRows() {
    return this.formBuilder.control({
      Checklist: ["", Validators.required]
    });
  }

  addNewRow() {
    const control = <FormArray>this.taskform.controls["itemRows"];
    control.push(this.initItemRows());
  }

  deleteRow(index: number) {
    const control = <FormArray>this.taskform.controls["itemRows"];
    control.removeAt(index);
  }

  saveTask(task) {
    this.records = JSON.parse(localStorage.getItem("loginDetails"));
    this.UserBasicInformationId = this.records.UserDetail.UserBasicInformationId;
    debugger;
    const frmData = new FormData();
    for (var i = 0; i < this.myFiles.length; i++) {
      frmData.append("fileUpload", this.myFiles[i]);
    }
    // frmData.append(
    //   "data",
    //   new Blob([JSON.stringify(task)], { type: "application/json" })
    // );
    const mData = JSON.stringify(task);
    frmData.append("data", mData);

    this._ApiService
      .post(APIURLS.SAVE_TASK_API, frmData)
      .subscribe((response: any) => {
        if (response.Success == true) {
          debugger;
          this.baseResponse = response;
          if (this.baseResponse.Success == true) {
            this.toastr.successToastr("Success", response.Message);
            this.modalRef.hide();
          }
        } else {
          this.toastr.errorToastr("Error", response.Message);
        }
      });
  }

  public fillDropdowns() {
    this._ApiService.post(APIURLS.FILL_DROPDOWNS_API).subscribe(data => {
      this.dropdown = data.Result;
      this.array = data.Result.NationalityList;
      for (let i = 0; i < this.array.length; i++) {
        this.test = {
          id: this.array[i].GlobalCodeId,
          name: this.array[i].CodeName
        };
        this.selectedCity.push(this.test);
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

  public getAllTasks() {
    debugger;
    this.records = JSON.parse(localStorage.getItem("loginDetails"));
    this.UserBasicInformationId = this.records.UserDetail.UserBasicInformationId;
    var GetEducationRequest: any = {};
    GetEducationRequest.UserBasicInformationId = this.UserBasicInformationId;
    this._ApiService
      .post(APIURLS.GET_ALL_TASKS_API, GetEducationRequest)
      .subscribe(data => {
        debugger;
        this.taskarray = data;
      });
  }

  public testselect(test) {
    debugger;
    console.log();
  }

  getFileDetails(e) {
    debugger;
    for (var i = 0; i < e.target.files.length; i++) {
      this.myFiles.push(e.target.files[i]);
    }
  }
}
