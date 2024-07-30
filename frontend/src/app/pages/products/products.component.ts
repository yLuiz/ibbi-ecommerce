import { Component } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ICreateProduct } from '../../shared/interfaces/models/ICreateProduct';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../shared/interfaces/models/IProduct';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  constructor(private _productService: ProductService) {}
  
  isAddingNewProduct = false;

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

  cities!: any[];

  selectedCities!: any[];

  products: IProduct[] = [];

  ngOnInit() {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];

    this._productService
      .listAll()
      .subscribe({
        next: (response) => {
          console.log(response);
          this.products = [...response.content];
        },
        error: (error) => console.error(error),
      })
      .add();
  }

  createProduct(image: File, id: number) {
    const newProduct: ICreateProduct = {
      name: 'Test Product',
      description: 'Test Product Description',
      price: 100,
      stock: 100,
      category_id: 1,
      seller_id: 1,
    };

    const formData = new FormData();

    formData.append('image', image);
    formData.append('id', String(id));

    let headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data',
    });
  }
}
