import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { PurchaseModule } from './purchase/purchase.module';
import { DashboardModule } from './dashboard/dashboard.module';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthModule,
    ProductsModule,
    PurchaseModule,
    DashboardModule
  ],
})
export class PagesModule { }
