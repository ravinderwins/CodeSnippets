import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SignupRoutingModule,
  ],
  declarations: [SignupComponent]
})
export class SignupModule { }
