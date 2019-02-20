import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";
import { Observable } from "rxjs";

import { LocalStorageService } from "../services/local-storage.service";

@Injectable({
  providedIn: "root"
})
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private _localStorageService: LocalStorageService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // modify request
    request = request.clone({
      setHeaders: {
        Authorization: `Basic ${
          this._localStorageService.getAuthorizationToken()
        }`
      }
    });

    return next.handle(request);
  }
}
