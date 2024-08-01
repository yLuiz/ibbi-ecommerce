import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICreateProduct } from '../../../shared/interfaces/models/ICreateProduct';
import { IProduct } from '../../../shared/interfaces/models/IProduct';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICategory } from '../../../shared/interfaces/models/ICategory';
import { CategoryService } from '../../../services/category.service';
import { AuthService } from '../../../services/auth.service';
import { IProductFormSubmit } from '../../../pages/products/products.component';
import { FileUploadEvent } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { ToastSeverity } from '../../../shared/types/ToastSeverity';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent {
  @Input() product?: IProduct;
  @Output() onSubmit: EventEmitter<IProductFormSubmit> = new EventEmitter();
  @Output() onBack: EventEmitter<'back'> = new EventEmitter();

  productImage?: File;
  pathImage?: string;

  constructor(
    private _categoriesService: CategoryService,
    private _authService: AuthService,
    private _messageService: MessageService
  ) {
    this.productForm = new FormGroup({
      name: new FormControl(this.product?.name || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
      ]),
      description: new FormControl(this.product?.description || '', [
        Validators.required,
      ]),
      category: new FormControl(this.product?.category || '', [
        Validators.required,
      ]),
      price: new FormControl(this.product?.description || '', [
        Validators.required,
      ]),
      stock: new FormControl(this.product?.description || '', [
        Validators.required,
      ]),
    });
  }

  categories: ICategory[] = [];

  productForm!: FormGroup;
  @Input() isLoading: boolean = false;

  backToList() {
    this.onBack.emit('back');
  }

  onUpload(event: Event) {
    const files = (<HTMLInputElement>event.target).files;
    this.productImage = files ? files[0] : undefined;

    this.pathImage = URL.createObjectURL(this.productImage as File);
  }

  handleSubmit(): void {
    const tokenPayload = this._authService.decodePayloadJWT();

    const newProduct: ICreateProduct = {
      name: this.description?.value,
      description: this.description?.value,
      category_id: this.category?.value,
      price: +this.price?.value,
      stock: +this.stock?.value,
      seller_id: tokenPayload!.sub,
    };

    const isValidImage = this.productImage?.type.split('/')[0] === 'image';

    if (!this.productImage || !isValidImage) {
      this._messageService.add({
        key: 'productform-tst',
        severity: ToastSeverity.ERROR,
        summary: 'Formulário inválido.',
        detail: 'Por favor, envie uma imagem.',
      });

      return;
    }

    this.onSubmit.emit({
      productJSON: newProduct,
      image: this.productImage,
    });
  }

  ngOnInit() {
    this._categoriesService.listAll().subscribe((categories) => {
      this.categories = [...categories.content];
    });
  }

  get name() {
    return this.productForm.get('name');
  }

  get description() {
    return this.productForm.get('description');
  }

  get category() {
    return this.productForm.get('category');
  }

  get price() {
    return this.productForm.get('price');
  }

  get stock() {
    return this.productForm.get('stock');
  }
}
