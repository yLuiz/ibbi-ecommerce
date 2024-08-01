import { Component } from '@angular/core';
import { IPurchase } from '../../shared/interfaces/models/IPurchase';
import { PurchaseService } from '../../services/purchase.service';
import { IPagination } from '../../shared/interfaces/api/IPagination';
import { AuthService } from '../../services/auth.service';
import { IResponseEntity } from '../../shared/interfaces/api/IResponseEntity';
import { PaginatorState } from 'primeng/paginator';
import { IErrorResponse } from '../../shared/interfaces/api/IErrorResponse';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.scss',
})
export class PurchaseComponent {
  myPurchases: IResponseEntity<IPurchase[]> = {
    content: [],
    message: [],
    total: 0,
  };
  mySales: IResponseEntity<IPurchase[]> = {
    content: [],
    message: [],
    total: 0,
  };

  pagination: IPagination = {
    skip: 0,
    take: 10,
  };

  userId: number;
  currentTabIndex: number = 0;
  isLoading = true;

  constructor(
    private _purchaseService: PurchaseService,
    private _authService: AuthService,
    private _messageService: MessageService
  ) {
    this.userId = this._authService.decodePayloadJWT()?.sub || 0;
  }

  tabChange(index: number) {
    this.currentTabIndex = index;

    switch (index) {
      case 0:
        this.pagination.skip = 0;
        this.getMyPurchases();

        break;
      case 1:
        this.pagination.skip = 0;
        this.getMySales();
        break;
      default:
        this.myPurchases = {
          content: [],
          message: [],
          total: 0,
        };
        break;
    }
  }

  ngOnInit(): void {
    this.getMyPurchases();
  }

  onPageChange(event: PaginatorState) {
    this.pagination.skip = event.page!;

    switch (this.currentTabIndex) {
      case 0:
        this.getMyPurchases();
        break;
      case 1:
        this.getMySales();
        break;
      default:
        this.myPurchases = {
          content: [],
          message: [],
          total: 0,
        };
        break;
    }
  }

  getMyPurchases() {
    this.isLoading = true;

    this._purchaseService
      .listPurchase(this.pagination, {
        client: this.userId,
      })
      .subscribe({
        next: (response) => {
          this.myPurchases = { ...response };
        },
        error: (response: IErrorResponse) => {
          console.error(response);
          const errorMessage =
            typeof response.error.message === 'string'
              ? response.error.message
              : response.error.message.at(-1);

          this._messageService.add({
            key: 'product-tst',
            severity: 'error',
            summary: 'Erro',
            detail: errorMessage,
          });
        },
      })
      .add(() => {
        this.isLoading = false;
      });
  }

  getMySales() {
    this.isLoading = true;

    this._purchaseService
      .listPurchase(this.pagination, {
        seller: this.userId,
      })
      .subscribe({
        next: (response) => {
          this.mySales = { ...response };
        },
        error: (response: IErrorResponse) => {
          console.error(response);
          const errorMessage =
            typeof response.error.message === 'string'
              ? response.error.message
              : response.error.message.at(-1);

          this._messageService.add({
            key: 'product-tst',
            severity: 'error',
            summary: 'Erro',
            detail: errorMessage,
          });
        },
      })
      .add(() => {
        this.isLoading = false;
      });
  }
}
