import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModule } from './login/login.module';
import { ServicesModule } from '../../services/services.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ServicesModule,
    LoginModule
  ]
})
export class AuthModule { }
