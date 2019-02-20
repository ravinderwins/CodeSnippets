import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/modules/home/services/home.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {
  currenthref: string;
  isUserLoggedIn: boolean = false;
  fullName: string;
  modalRef: BsModalRef;
  styling = {
    ignoreBackdropClick: true
  };
  data = {
    Email: "",
    Password: ""
  }

  @ViewChild('RegisterPopupTemplate') registerPopupTemplate: ElementRef;
  @ViewChild('LoginPopupTemplate') loginPopupTemplate: ElementRef;
  @ViewChild('ForgotPasswordPopupTemplate') forgotPasswordPopupTemplate: ElementRef;

  constructor(private router: Router,
    private modalService: BsModalService,
    private _localStorageService: LocalStorageService, 
    private _cookieservice: CookieService,
    private _homeService: HomeService) { }

  ngOnInit() {
    this.currenthref = this.router.url.split('?')[0]; 
      this.userDetailsIfLoggedIn();
      }

  ngOnChange(pageurl) {
    this.currenthref = pageurl;
  }
  openModal(template: any) {
    if (this.modalRef)
      this.closeModal();

    this.modalRef = this.modalService.show(template,
      Object.assign({}, { class: 'gray modal-lg' }, this.styling)
    );
  }

  closeModal() {
    this.modalRef.hide();
  }

  logout() {
    this._localStorageService.logout();
    this.isUserLoggedIn = this._localStorageService.isAuthenticated();
    
  }

  performModalActions(event: any) {
    switch (event.action) {
      case 'CLOSE_MODAL':
        this.closeModal();
        break;

      case 'OPEN_LOGIN_MODAL':
        this.openModal(this.loginPopupTemplate);
        break;

      case 'OPEN_REGISTER_MODAL':
        this.openModal(this.registerPopupTemplate);
        break;

      case 'CHECK_LOGGEDIN_STATUS':
        this.userDetailsIfLoggedIn();
        break;
    }
  }

  userDetailsIfLoggedIn() {

    this.isUserLoggedIn = this._localStorageService.isAuthenticated();
    if (this.isUserLoggedIn) {
      let userdetails = this._localStorageService.getUserDetail();
      this.fullName = userdetails.FullName;
    }
  }
}
