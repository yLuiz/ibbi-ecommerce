import { Component } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { IProductFilter } from '../../shared/interfaces/api/IProductFilter';
import { ICategory } from '../../shared/interfaces/models/ICategory';
import { ICreateProduct } from '../../shared/interfaces/models/ICreateProduct';
import { IProduct } from '../../shared/interfaces/models/IProduct';
import { DollarQuotationService } from '../../services/dollar-quotation.service';

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
    private _dollarQuotationService: DollarQuotationService
  ) {}

  isAddingNewProduct = false;
  nameOrDescription?: string;

  toggleAddProduct() {
    this.isAddingNewProduct = !this.isAddingNewProduct;
  }

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

  categories: ICategory[] = [];

  selectedCategories: ICategory[] = [];

  products: IProduct[] = [];

  ngOnInit() {
    this.getProducts();
    this.updateQuotation();
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

    // Aqui utilizei o type generico "any".
    // Pois o typescript não permitiu fazer calculo com tipo data, mesmo que o JS permita.
    const now = new Date();
    // const diffTime = Math.abs((<any>quotation?.lastUpdate) - now);
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
        error: (error) => console.error(error),
      })
      .add();
  }

  getProducts(filters?: IProductFilter) {
    this._productService
      .listAll(
        {
          skip: 0,
          take: 10,
        },
        filters
      )
      .subscribe({
        next: (response) => {
          this.products = [...response.content];
        },
        error: (error) => console.error(error),
      })
      .add();

    this._categoryService.listAll().subscribe({
      next: (response) => {
        this.categories = [...response.content];
      },
      error: (error) => console.error(error),
    });
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
          error: (error) => console.error(error),
        });
      },
      error: (error) => console.error(error),
    });
  }
}
