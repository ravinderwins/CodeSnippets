import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {

  LOCALSTORAGE_TOKEN_KEY: string = 'AuthToken';
  LOCALSTORAGE_USER_DETAIL_KEY: string = 'UserDetails';

  constructor() { }

  storeAuthToken(token) {
    localStorage.setItem(this.LOCALSTORAGE_TOKEN_KEY, token);
  }

  removeAuthToken() {
    localStorage.removeItem(this.LOCALSTORAGE_TOKEN_KEY);
  }

  getAuthorizationToken() {
    return localStorage.getItem(this.LOCALSTORAGE_TOKEN_KEY)
  }

  isAuthenticated(): boolean {
    if(localStorage.getItem(this.LOCALSTORAGE_TOKEN_KEY)) {
      return true;
    }
    return false;
  }

  storeUserDetail(data) {
    localStorage.setItem(this.LOCALSTORAGE_USER_DETAIL_KEY, JSON.stringify(data));
  }

  getUserDetail() {
    let userDetailData = localStorage.getItem(this.LOCALSTORAGE_USER_DETAIL_KEY);
    
    if(userDetailData)
      return JSON.parse(userDetailData);
    
    return null;
  }

  logout() {
    localStorage.removeItem(this.LOCALSTORAGE_TOKEN_KEY);
    localStorage.removeItem(this.LOCALSTORAGE_USER_DETAIL_KEY);
  }

}
