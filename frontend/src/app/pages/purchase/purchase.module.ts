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
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  declarations: [
    PurchaseComponent,
    NewPurchaseComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ToastModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    TableModule,
    TabViewModule,
    TagModule,
  ]
})
export class PurchaseModule { }
