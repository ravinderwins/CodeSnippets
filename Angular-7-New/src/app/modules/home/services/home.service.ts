import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseUrl } from '../../../config/urls.config'


@Injectable()
export class HomeService {
    api = BaseUrl.baseApiUrl;

    constructor(private http: HttpClient) {

    }
    
    login(data) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post<any>(this.api + 'users/login', data, { headers });
    }

    register(data) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post<any>(this.api + 'users/register', data, { headers });
    }
    
    contactUs(data) {       
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post<any>(this.api + 'contactus', data, { headers });
    }

    forgotpassword(data){
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post<any>(this.api + 'forgotpassword', data, { headers });  
    }  

    resetPassword(data){
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post<any>(this.api + 'resetpassword', data, { headers });  
    } 
    
}



