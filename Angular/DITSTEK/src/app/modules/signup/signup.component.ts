import { ApiService } from './../../shared/services/api.service';
import { APIURLS } from './../../config/api_url';
import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ToastrManager } from 'ng6-toastr-notifications';
import { NgForm } from '@angular/forms';    
import { ViewChild } from '@angular/core'
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
   providers: [ApiService]

})
export class SignupComponent implements OnInit {
  @ViewChild('signupForm') public createUserForm: NgForm;

  records: Array<any>;

  constructor(
       private _ApiService:ApiService,
      private router: Router,
      // private toastr: ToastrManager
  ) { 

  }

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('signup-page');
  }

  onsubmit(formdata) {
    debugger;
     this._ApiService.post(APIURLS.SIGN_UP_API, formdata).subscribe((response: any) => {
   this.records=response;
    if (response.Success==true){
    //this.toastr.successToastr('Success',response.Message );
     this.router.navigate(['/login'])
  }
   else{
   // this.toastr.errorToastr('Error',response.Message );

   }
         });
    }

}
