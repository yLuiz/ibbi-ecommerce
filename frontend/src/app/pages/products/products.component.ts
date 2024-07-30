import { Component } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { IProductFilter } from '../../shared/interfaces/api/IProductFilter';
import { ICategory } from '../../shared/interfaces/models/ICategory';
import { ICreateProduct } from '../../shared/interfaces/models/ICreateProduct';
import { IProduct } from '../../shared/interfaces/models/IProduct';

export interface IProductFormSubmit {
  productJSON: ICreateProduct,
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
  }

  search() {
    const categoryIds = this.selectedCategories.map((category) => category.id);

    let filters = categoryIds.length
      ? {
          categories: categoryIds.join(','),
        } as IProductFilter
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

    console.log(newProduct);


    this._productService.create(productJSON)
      .subscribe({
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
          })


        },
        error: (error) => console.error(error),
      })


    
  }
}
