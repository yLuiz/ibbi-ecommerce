import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { UserFormComponent } from './user/user-form/user-form.component';
import { ProductFormComponent } from './product/product-form/product-form.component';
import { ProductCardComponent } from './product/product-card/product-card.component';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    ToastModule,
    ProductModule,
    UserModule
  ],
  exports: [UserModule, ProductModule]
})
export class ComponentsModule { }
