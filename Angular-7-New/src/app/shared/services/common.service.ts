import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseUrl } from '../../config/urls.config'

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  api = BaseUrl.baseApiUrl;

  constructor(private http: HttpClient) { }

  getHomeSlidesData(){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(this.api + 'users/getConfigurationTableValue',  { headers });
  }
}