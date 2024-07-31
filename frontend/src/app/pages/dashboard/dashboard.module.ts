import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    ChartModule,
    TableModule
  ]
})
export class DashboardModule { }
