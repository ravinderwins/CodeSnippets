import { Injectable } from "@angular/core";
import { Headers, Response, URLSearchParams } from "@angular/http";
import { HttpErrorResponse, HttpRequest } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
@Injectable()
export class ApiService {
  constructor(private _http: HttpClient) {}

  private setHeaders(): Headers {
    const headersConfig = {
      "Content-Type": "application/json"
    };
    return new Headers(headersConfig);
  }

  private formatErrors(error: any) {
    return Observable.throw(error.json());
  }

  get(
    path: string,
    params: URLSearchParams = new URLSearchParams()
  ): Observable<any> {
    return this._http.get(path).pipe(catchError(this.handleError));
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this._http.post(path, body);
  }
  private handleError(errorResponse: HttpErrorResponse) {
    debugger;
    if (errorResponse.error instanceof ErrorEvent) {
      debugger;
      console.error("Client Side Error :", errorResponse.error.message);
    } else {
      console.error("Server Side Error :", errorResponse);
    }
    return throwError(
      "There is a problem with the service.We are notified & working on it. Please try again later."
    );
  }

  fileUpload(apiUrl: string, fileItem: File, extraData?: object): any {
    debugger;
    const formData: FormData = new FormData();

    // formData.append("fileItem", fileItem, fileItem.name);
    if (extraData) {
      for (let key in extraData) {
        // iterate and set other form data
        formData.append(key, extraData[key]);
      }
    }

    const req = new HttpRequest("POST", apiUrl, formData, {
      reportProgress: true // for progress data
    });
    return this._http.request(req);
  }
}
