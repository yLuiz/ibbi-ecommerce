import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../services/auth.service';
import { IProduct } from '../../../shared/interfaces/models/IProduct';
import { DollarQuotationService } from '../../../services/dollar-quotation.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastSeverity } from '../../../shared/types/ToastSeverity';
import { ProductService } from '../../../services/product.service';
import { IErrorResponse } from '../../../shared/interfaces/api/IErrorResponse';

interface IProductInfo extends Omit<IProduct, 'price'> {
  price: string;
  price_dollar: string;
}

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() product!: IProduct;
  @Output() onDelete = new EventEmitter<number>();
  productInfo!: IProductInfo;
  url: string = environment.apiUrl;
  userId?: number;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _dollarQuotationService: DollarQuotationService,
    private _productService: ProductService,
    private _messageService: MessageService,
    private _confirmationService: ConfirmationService
  ) {}

  goToPurchase() {
    this._router.navigate([`/newpurchase/${this.product.id}`]);
  }

  opentDeleteDialog(event: Event) {
    this._confirmationService.confirm({
      key: `${this.product.id}${this.product.name}`,
      target: event.target as EventTarget,
      message: `Deseja mesmo deletar ${this.product.name}?`,
      header: 'Deletar produto',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      acceptLabel: 'Sim',
      rejectLabel: 'Cancelar',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.delete()
      },
      reject: () => {},
    });
  }

  delete() {
    this._productService.delete(this.product.id).subscribe({
      next: () => {
        this._messageService.add({
          key: 'product-tst',
          severity: ToastSeverity.SUCCESS,
          summary: 'Sucesso',
          detail: 'Produto deletado com sucesso.',
        });

        this.onDelete.emit(this.product.id);

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
    });
  }

  update() {
    this._messageService.add({
      key: 'product-tst',
      severity: ToastSeverity.WARN,
      summary: 'Funcionalidade ainda não implementada.',
    });
  }

  ngOnInit() {
    const dollar =
      this._dollarQuotationService.getSavedQuotation()?.quotation || 1;

    this.userId = this._authService.decodePayloadJWT()?.sub;

    this.productInfo = {
      ...this.product,
      price: `R$${this.product.price.toFixed(2).replace('.', ',')}`,
      price_dollar: `$${(this.product.price / dollar).toFixed(2)}`,
    };
  }
}
