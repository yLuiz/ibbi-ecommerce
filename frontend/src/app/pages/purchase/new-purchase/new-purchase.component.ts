import { Component, Input } from '@angular/core';
import { IProduct } from '../../../shared/interfaces/models/IProduct';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PurchaseService } from '../../../services/purchase.service';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from 'primeng/api';
import { ToastSeverity } from '../../../shared/types/ToastSeverity';
import { IErrorResponse } from '../../../shared/interfaces/api/IErrorResponse';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { DollarQuotationService } from '../../../services/dollar-quotation.service';

enum QuantityStatusMessage {
  GOOD = 'Quantidade disponível.',
  LOW = 'Quantidade próxima do limite.',
  EXACTLY_LOW = 'Quantidade máxima do estoque.',
  OUT_OF_STOCK = 'Não há estoque para esta quantidade',
}

interface IQuantityStatus {
  severity: 'success' | 'warning' | 'danger';
  message: QuantityStatusMessage;
}

@Component({
  selector: 'app-new-purchase',
  templateUrl: './new-purchase.component.html',
  styleUrl: './new-purchase.component.scss',
})
export class NewPurchaseComponent {
  product?: IProduct;
  userId?: number;
  url: string;

  isLoading = false;

  totalPrice = 0;
  dollar = 1;

  status: IQuantityStatus = {
    severity: 'success',
    message: QuantityStatusMessage.GOOD,
  };

  constructor(
    private _productService: ProductService,
    private _purchaseService: PurchaseService,
    private _authService: AuthService,
    private _messageService: MessageService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _dollarQuotationService: DollarQuotationService
  ) {
    this.purchaseForm = new FormGroup({
      quantity: new FormControl(1, [Validators.required, Validators.min(1)]),
      observation: new FormControl('', [Validators.minLength(3)]),
    });

    this.url = environment.apiUrl;
  }

  purchaseForm!: FormGroup;

  buy() {
    if (!this.product) return;

    this.isLoading = true;

    this._purchaseService
      .create({
        client_id: this.userId!,
        product_id: this.product.id,
        quantity: this.quantity?.value,
        observation: this.observation?.value.trim(),
        total_price: this.totalPrice,
      })
      .subscribe({
        next: (response) => {
          this._messageService.add({
            key: 'purchase-toast',
            severity: ToastSeverity.SUCCESS,
            summary: 'Sucesso',
            detail: response.message[0],
          });

          setTimeout(() => {
            this.isLoading = false;
            this._router.navigate(['/products/']);
          }, 500);
        },
        error: (response: IErrorResponse) => {
          const errorMessage =
            typeof response.error.message === 'string'
              ? response.error.message
              : response.error.message[0];

          this._messageService.add({
            key: 'purchase-toast',
            severity: ToastSeverity.ERROR,
            summary: 'Erro',
            detail: errorMessage || 'Não foi possível realizar a compra',
          });

          this.isLoading = false;
        },
      })
      .add();
  }

  back() {
    this._router.navigate(['/products']);
  }

  ngOnInit() {
    let id: number;

    this._route.params.subscribe((res) => {
      id = (<{ id: number }>res).id;
    });

    this.userId = this._authService.decodePayloadJWT()?.sub;

    this._productService.listById(id!).subscribe({
      next: (response) => {
        this.product = { ...response.content };

        this.totalPrice = this.product!.price;
      },
      error: (response: IErrorResponse) => {
        console.error('Error:', response);
      },
    });

    this.quantity?.valueChanges.subscribe((value) => {
      this.totalPrice = this.product!.price * value;

      this.status = this.getStatus(value);

      this.purchaseForm.patchValue({
        total_price: this.product!.price * value,
      });

      this.purchaseForm.updateValueAndValidity();
    });

    this.dollar = this._dollarQuotationService.getSavedQuotation()?.quotation || 1;

  }

  getStatus(value: number): IQuantityStatus {
    if (value > this.product!.stock) {
      return {
        message: QuantityStatusMessage.OUT_OF_STOCK,
        severity: 'danger',
      };
    } else if (this.product!.stock === value) {
      return {
        message: QuantityStatusMessage.EXACTLY_LOW,
        severity: 'warning',
      };
    } else if (this.product!.stock - value <= 5) {
      return {
        message: QuantityStatusMessage.LOW,
        severity: 'warning',
      };
    }

    return {
      message: QuantityStatusMessage.GOOD,
      severity: 'success',
    };
  }

  get quantity() {
    return this.purchaseForm.get('quantity');
  }

  get observation() {
    return this.purchaseForm.get('observation');
  }
}
