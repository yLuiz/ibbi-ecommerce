import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { LayoutRoutingModule } from './layout-routing.module';
import { ComponentsModule } from '../components/components.module';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';



@NgModule({
  declarations: [
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule,
    LayoutRoutingModule,
    ButtonModule,
  ],
  providers: [MessageService]
})
export class LayoutModule { }
