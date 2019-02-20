import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {CookieService} from 'ngx-cookie-service'

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

//Components
import { HomeHeaderComponent } from './components/home-header/home-header.component';
import { HomeFooterComponent } from './components/home-footer/home-footer.component';
import { LoginComponent } from '../modules/home/components/login/login.component'
import { RegisterComponent } from '../modules/home/components/register/register.component';
import { ScrollTopComponent } from './components/scroll-top/scroll-top.component';
import { SafePipe } from './filters/safe.pipe';
import { SearchComponent } from './components/search/search.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';


@NgModule({
  declarations: [
    HomeHeaderComponent,
    HomeFooterComponent,
    LoginComponent,
    RegisterComponent,
    ScrollTopComponent,
    SafePipe,
    SearchComponent,
    NavMenuComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,

    
    AngularFontAwesomeModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
  ],
  exports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HomeHeaderComponent,
    HomeFooterComponent,
    LoginComponent,
    RegisterComponent,
    SafePipe
  ],
  providers:[
    CookieService
  ]
})
export class SharedModule { }
