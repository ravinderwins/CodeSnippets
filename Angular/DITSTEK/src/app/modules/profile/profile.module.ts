import { OrderrByPipe } from "./../orderByPipe";
import { WorkComponent } from "./../work/work.component";
import { EducationComponent } from "./../education/education.component";
import { EmergencyContactComponent } from "./../emergency-contact/emergency-contact.component";
import { ContactComponent } from "./../contact/contact.component";
import { ProfileRoutingModule } from "./profile-routing.module";
import { ProfileComponent } from "./profile.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { BasicInformationComponent } from "../basic-information/basic-information.component";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { ReactiveFormsModule } from "@angular/forms";
import { ModalModule } from "ngx-bootstrap";
import { ToastrModule } from "ng6-toastr-notifications";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot()
  ],
  declarations: [
    ProfileComponent,
    BasicInformationComponent,
    ContactComponent,
    EmergencyContactComponent,
    EducationComponent,
    WorkComponent,
    OrderrByPipe
  ]
})
export class ProfileModule {}
