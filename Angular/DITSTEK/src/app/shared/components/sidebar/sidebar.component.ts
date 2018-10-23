import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  records: any = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.records = JSON.parse(localStorage.getItem("loginDetails"));
  }
  signOut() {
    debugger;
    localStorage.removeItem("loginDetails");
    this.router.navigate(["/login"]);
  }
}
