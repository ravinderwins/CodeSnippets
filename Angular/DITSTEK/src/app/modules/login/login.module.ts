import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ToastrModule } from 'ng6-toastr-notifications';

import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    RouterModule,
     ToastrModule.forRoot()
  ],
  declarations: [LoginComponent]
})
export class LoginModule{ }
