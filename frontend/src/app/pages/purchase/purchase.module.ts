import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseComponent } from './purchase.component';
import { NewPurchaseComponent } from './new-purchase/new-purchase.component';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';



@NgModule({
  declarations: [
    PurchaseComponent,
    NewPurchaseComponent
  ],
  imports: [
    CommonModule,
    ToastModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    TagModule
  ],
})
export class PurchaseModule { }
