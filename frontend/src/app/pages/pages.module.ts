import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { PurchaseModule } from './purchase/purchase.module';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthModule,
    ProductsModule,
    PurchaseModule
  ],
})
export class PagesModule { }
