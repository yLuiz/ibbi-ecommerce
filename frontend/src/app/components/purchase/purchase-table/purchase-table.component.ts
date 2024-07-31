import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';
import { IPurchase } from '../../../shared/interfaces/models/IPurchase';


@Component({
  selector: 'app-purchase-table',
  templateUrl: './purchase-table.component.html',
  styleUrl: './purchase-table.component.scss'
})
export class PurchaseTableComponent {
  @Input() purchases: IPurchase[] = [];
  @Input() totalPurchases?: number = 0;
  @Input() isLoadingData = true;
  @Output() handlePageChange: EventEmitter<PaginatorState> = new EventEmitter();

  first: number = 0;

  rows: number = 10;


  onPageChange(event: PaginatorState) {
    this.first = event.first!;
    this.handlePageChange.emit(event);
  }
}
