import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModule } from './auth/login/login.module';
import { AuthModule } from './auth/auth.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthModule
  ],
})
export class PagesModule { }
