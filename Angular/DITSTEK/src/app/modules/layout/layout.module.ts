import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutesModule } from './layout.routes';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './../../shared/components/header/header.component';
import { SidebarComponent } from './../../shared/components/sidebar/sidebar.component';

@NgModule({
imports: [
    CommonModule,
    LayoutRoutesModule 
  ],
  declarations: [
    LayoutComponent,
    HeaderComponent,
    SidebarComponent
  ],
  bootstrap: [LayoutComponent]
})
export class LayoutModule { }
