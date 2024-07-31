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
import { PurchaseTableComponent } from './purchase/purchase-table/purchase-table.component';
import { TableModule } from 'primeng/table';
import { PurchaseModule } from './purchase/purchase.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    ToastModule,
    ProductModule,
    PurchaseModule,
    UserModule,
  ],
  exports: [UserModule, ProductModule, PurchaseModule]
})
export class ComponentsModule { }
