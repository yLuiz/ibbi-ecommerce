import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';


@NgModule({
  declarations: [ProductCardComponent, ProductFormComponent],
  imports: [
    CommonModule,
    ButtonModule,
    FormsModule,
    InputNumberModule,
    InputTextModule,
    ReactiveFormsModule,
    RouterModule,
    CardModule,
    DropdownModule,
    FileUploadModule
  ],
  exports: [ProductCardComponent, ProductFormComponent]
})
export class ProductModule { }
