import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('theme-red');
    body.classList.remove('login-page');
    body.classList.remove('signup-page');
  }
}


