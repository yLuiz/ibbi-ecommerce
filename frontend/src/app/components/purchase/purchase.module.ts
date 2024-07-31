import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { PurchaseTableComponent } from './purchase-table/purchase-table.component';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressSpinnerModule } from 'primeng/progressspinner';


@NgModule({
  declarations: [PurchaseTableComponent],
  imports: [
    CommonModule,
    TableModule,
    PaginatorModule,
    ProgressSpinnerModule
  ],
  exports: [PurchaseTableComponent]
})
export class PurchaseModule { }
