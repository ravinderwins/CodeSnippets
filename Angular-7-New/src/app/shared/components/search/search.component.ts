import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  url: string;
  constructor(private _fb: FormBuilder, ) { }

  ngOnInit() {
    this.searchForm = this._fb.group({
      Search: [""]
    });
  }

  keyDownFunction(event) {     
    if (event.keyCode == 13) {
      this.openurl();
    }  
  }
 
  openurl()
  {
    this.url = "https://www.youtube.com/channel/UC08KojraAOTFF1AypEUUNGw/search?query=" + this.searchForm.value.Search
    window.open(this.url)
  }
}
