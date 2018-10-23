import { TaskRoutingModule } from "./task-routing.module";
import { TaskComponent } from "./task.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ModalModule } from "ngx-bootstrap";
import { ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { ToastrModule } from "ng6-toastr-notifications";

@NgModule({
  imports: [
    CommonModule,
    TaskRoutingModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot()
  ],
  declarations: [TaskComponent]
})
export class TaskModule {}
