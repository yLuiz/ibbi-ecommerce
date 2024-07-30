import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModule } from './auth/login/login.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { ComponentsModule } from '../components/components.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthModule,
    ProductsModule
  ],
})
export class PagesModule { }
