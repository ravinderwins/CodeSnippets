import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private httpClient: HttpClient, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (localStorage.getItem("loginDetails")) {
      return true;
    }
    this.router.navigate(["/login"], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
