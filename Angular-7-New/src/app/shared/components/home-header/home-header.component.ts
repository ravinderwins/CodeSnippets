import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

//services
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})

export class HomeHeaderComponent implements OnInit {
  windowScrolled: boolean;
  
  constructor(
    private _commonService: CommonService,
   
 
    @Inject(DOCUMENT) private document: Document) { }
   @HostListener("window:scroll", [])
  
  onWindowScroll() {
      if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
          this.windowScrolled = true;
      } 
     else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
          this.windowScrolled = false;
      }
  }

  

  ngOnInit() {
  }

}
