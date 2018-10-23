import { emergencycontact } from "./../emergecycontact";
import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalService } from "ngx-bootstrap/modal";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { ApiService } from "./../../shared/services/api.service";
import { APIURLS } from "./../../config/api_url";
import { Router } from "@angular/router";
import { ToastrManager } from "ng6-toastr-notifications";
@Component({
  selector: "app-emergency-contact",
  templateUrl: "./emergency-contact.component.html",
  styleUrls: ["./emergency-contact.component.css"],
  providers: [ApiService]
})
export class EmergencyContactComponent implements OnInit {
  _ContactIndex: number = -1;
  modalRef: BsModalRef;
  isDesc: boolean = false;
  column: string = "CategoryName";
  direction: number;
  emergencycontactarray: emergencycontact[] = new Array();
  records: any = [];
  UserBasicInformationId: -1;
  emergency: emergencycontact;
  UserEmergencyContactId: number = -1;
  test: any = [];

  constructor(
    private modalService: BsModalService,
    private _ApiService: ApiService,
    private router: Router,
    private toastr: ToastrManager
  ) {}

  ngOnInit() {
    this.getEmergencyContacts();
    this.fillDropdowns();
  }

  public getEmergencyContacts() {
    debugger;
    this.records = JSON.parse(localStorage.getItem("loginDetails"));
    this.UserBasicInformationId = this.records.UserDetail.UserBasicInformationId;
    var GetEmergencyContactRequest: any = {};
    GetEmergencyContactRequest.UserBasicInformationId = this.UserBasicInformationId;
    this._ApiService
      .post(APIURLS.GET_EMERGENCY_CONTACT_API, GetEmergencyContactRequest)
      .subscribe(data => {
        this.emergencycontactarray = data;
      });
  }

  openModal(template: TemplateRef<any>, emergencycontact: any, index: number) {
    debugger;
    if (emergencycontact == 0) {
      this.emergency = {
        Name: "",
        Relation: null,
        Occupation: null,
        ContactNumber: null,
        UserEmergencyContactId: null,
        UserBasicInformationId: null
      };
    } else {
      this.emergency = {
        Name: emergencycontact.Name,
        Relation: emergencycontact.Relation,
        Occupation: emergencycontact.Occupation,
        ContactNumber: emergencycontact.ContactNumber,
        UserEmergencyContactId: emergencycontact.UserEmergencyContactId,
        UserBasicInformationId: emergencycontact.UserBasicInformationId
      };
    }
    this._ContactIndex = index;
    this.modalRef = this.modalService.show(template);
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

  saveEmergencyContact(emergency: emergencycontact) {
    debugger;

    this.records = JSON.parse(localStorage.getItem("loginDetails"));
    this.UserBasicInformationId = this.records.UserDetail.UserBasicInformationId;
    emergency.UserBasicInformationId = this.UserBasicInformationId;
    this._ApiService
      .post(APIURLS.SAVE_EMERGENCY_CONTACTS_API, emergency)
      .subscribe((response: any) => {
        debugger;
        if (response.Success == true) {
          this.emergency = response.GetEmergencyContactResponse;
          if (emergency.UserEmergencyContactId == null) {
            const newEmergencyContact = Object.assign({}, this.emergency);
            this.emergencycontactarray.push(newEmergencyContact);
          } else {
            debugger;
            let updatedEmergencyContact = Object.assign({}, emergency);
            this.emergencycontactarray[
              this._ContactIndex
            ] = updatedEmergencyContact;
          }
          this.toastr.successToastr("Success", response.Message);
          this.modalRef.hide();
        } else {
          this.toastr.errorToastr("Error", response.Message);
        }
      });
  }

  deleteRecord() {
    debugger;
    if (this._ContactIndex < 0) return false;
    var DeleteEmergencyContact: any = {};
    DeleteEmergencyContact.UserEmergencyContactId = this.UserEmergencyContactId;
    this._ApiService
      .post(APIURLS.DELETE_EMERGENCY_CONTACT_API, DeleteEmergencyContact)
      .subscribe((response: any) => {
        debugger;
        if (response.Success == true) {
          this.toastr.successToastr("Success", response.Message);
          this.emergencycontactarray.splice(this._ContactIndex, 1);
          this.modalRef.hide();
        } else {
          this.toastr.errorToastr("Error", response.Message);
        }
      });
  }

  openConfirmationModal(
    template: TemplateRef<any>,
    index: number,
    UserEmergencyContactId: number
  ) {
    debugger;
    this._ContactIndex = index;
    this.UserEmergencyContactId = UserEmergencyContactId;
    this.modalRef = this.modalService.show(template);
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
