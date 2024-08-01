import { Component } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { IProductFilter } from '../../shared/interfaces/api/IProductFilter';
import { ICategory } from '../../shared/interfaces/models/ICategory';
import { ICreateProduct } from '../../shared/interfaces/models/ICreateProduct';
import { IProduct } from '../../shared/interfaces/models/IProduct';
import { DollarQuotationService } from '../../services/dollar-quotation.service';
import { IPagination } from '../../shared/interfaces/api/IPagination';
import { PaginatorState } from 'primeng/paginator';
import { AuthService } from '../../services/auth.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IErrorResponse } from '../../shared/interfaces/api/IErrorResponse';

export interface IProductFormSubmit {
  productJSON: ICreateProduct;
  image: File;
}

interface IFilter {
  name?: string;
  description?: string;
  category?: number[];
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  constructor(
    private _productService: ProductService,
    private _categoryService: CategoryService,
    private _dollarQuotationService: DollarQuotationService,
    private _authService: AuthService,
    private _messageService: MessageService
  ) {
    this.rows = 5;
    this.pagination = {
      skip: 0,
      take: this.rows,
    };
  }

  totalItems: number = 0;
  rows: number;
  categories: ICategory[] = [];
  selectedCategories: ICategory[] = [];
  products: IProduct[] = [];
  isAddingNewProduct = false;
  isMyProductsActive = false;
  nameOrDescription?: string;
  isLoading = true;

  items: any[] = [
    {
      label: 'Update',
      icon: 'pi pi-refresh',
    },
    {
      label: 'Delete',
      icon: 'pi pi-times',
    },
  ];

  pagination: IPagination;

  toggleAddProduct() {
    this.isAddingNewProduct = !this.isAddingNewProduct;
  }

  toggleMyProducts() {
    this.isMyProductsActive = !this.isMyProductsActive;
    this.resetFilters();
    this.getProducts();
  }

  ngOnInit() {
    this.getProducts();
    this.updateQuotation();
  }

  changePage(event: PaginatorState) {
    this.pagination.skip = event.page || 0;
    this.getProducts();
  }

  resetFilters() {
    this.selectedCategories = [];
    this.nameOrDescription = undefined;
  }

  search() {
    const categoryIds = this.selectedCategories.map((category) => category.id);

    let filters = categoryIds.length
      ? ({
          categories: categoryIds.join(','),
        } as IProductFilter)
      : undefined;

    if (this.nameOrDescription) {
      filters = {
        ...filters,
        name: this.nameOrDescription,
        description: this.nameOrDescription,
      };
    }

    return this.getProducts(filters);
  }

  updateQuotation() {
    const quotation = this._dollarQuotationService.getSavedQuotation();

    if (!quotation) {
      this.getDollarQuotation();
      return;
    }

    const now = new Date();
    const diffTime = Math.abs(
      quotation!.lastUpdate.getMilliseconds() - now.getMilliseconds()
    );
    const diffMin = Math.floor(diffTime / 60000);

    if (diffMin > 10) this.getDollarQuotation();
  }

  getDollarQuotation() {
    this._dollarQuotationService
      .getDollarQuotation()
      .subscribe({
        next: (response) => {
          this._dollarQuotationService.setQuotation(
            Number(response.USDBRL.high)
          );
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
      .add();
  }

  getProducts(filters?: IProductFilter) {
    this.isLoading = true;

    if (this.isMyProductsActive) {
      filters = {
        ...filters,
        noseller: undefined,
        seller: this._authService.decodePayloadJWT()?.sub,
      };
      delete filters.noseller;
    } else {
      filters = {
        ...filters,
        seller: undefined,
        noseller: this._authService.decodePayloadJWT()?.sub,
      };

      delete filters.seller;
    }

    this._productService
      .listAll(this.pagination, filters)
      .subscribe({
        next: (response) => {
          this.products = [...response.content];
          this.totalItems = response.total || 0;
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
      .add(() => (this.isLoading = false));

    this._categoryService
      .listAll()
      .subscribe({
        next: (response) => {
          this.categories = [...response.content];
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
      .add(() => (this.isLoading = false));
  }

  createProduct(newProduct: IProductFormSubmit) {
    const { productJSON, image } = newProduct;

    this._productService.create(productJSON).subscribe({
      next: (response) => {
        const productFormData = new FormData();
        productFormData.append('image', image);
        productFormData.append('id', String(response.content.id));

        this._productService.uploadImage(productFormData).subscribe({
          next: () => {
            this.getProducts();
            this.toggleAddProduct();
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
}
