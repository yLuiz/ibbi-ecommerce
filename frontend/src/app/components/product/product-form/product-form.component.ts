import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICreateProduct } from '../../../shared/interfaces/models/ICreateProduct';
import { IProduct } from '../../../shared/interfaces/models/IProduct';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
  @Input() product?: IProduct;
  @Output() onSubmit: EventEmitter<ICreateProduct> = new EventEmitter();
  @Output() onBack: EventEmitter<'back'> = new EventEmitter();

  
  productForm!: FormGroup;
  @Input() isLoading: boolean = false;

  constructor() {
    this.productForm = new FormGroup({
      name: new FormControl(this.product?.name || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
      ]),
      description: new FormControl(this.product?.description || '', [Validators.required]),
    });
  }

  backToList() {
    this.onBack.emit('back');
  }

  handleSubmit(): void {
    const newProduct: ICreateProduct = {
      name: this.description?.value,
      description: this.description?.value,
      category_id: 1,
      price: 10,
      stock: 100,
      seller_id: 1,
    };

    this.onSubmit.emit(newProduct);
  }


  get name() {
    return this.productForm.get('name');
  }

  get description() {
    return this.productForm.get('description');
  }
}
