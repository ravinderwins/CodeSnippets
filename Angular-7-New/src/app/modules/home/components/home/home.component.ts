import { Component, OnInit, TemplateRef, Output, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { videoUrls } from 'src/app/config/urls.config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  

  modalRef: BsModalRef;
  vedios: any = videoUrls;
  videosrc:string;
  Email:string;
  Password:string;

  styling = {    
    ignoreBackdropClick: true
  };

  constructor(private modalService: BsModalService,
) { }

  ngOnInit() {
    
  }

  openVideoModal(template: TemplateRef<any>, videokey: string) {
    this.videosrc = this.vedios[videokey];
    this.modalRef = this.modalService.show(template,
      Object.assign({}, { class: 'gray modal-xl' }, this.styling));
  }

}
