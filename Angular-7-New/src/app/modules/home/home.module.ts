import { NgModule } from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';
//import { CommonModule } from '@angular/common';  


// Modules
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
//import {ReactiveFormsModule,FormsModule} from '@angular/forms';


// Components
import { HomeComponent } from './components/home/home.component';
import { HomeLayoutComponent } from './components/home-layout/home-layout.component';

// Service
import { HomeService } from './services/home.service';
import { HomeSliderComponent } from './components/home-slider/home-slider.component';


@NgModule({
  imports: [
    SharedModule,
    CarouselModule,
    HomeRoutingModule,

  ],
  declarations: [
    HomeComponent,
    HomeLayoutComponent,
    HomeSliderComponent

  ],
  providers:[
    HomeService
  ]
  
})
export class HomeModule { }
