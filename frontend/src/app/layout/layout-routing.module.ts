import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from '../pages/products/products.component';
import { AuthGuard } from '../guards/auth.guard';
import { NewPurchaseComponent } from '../pages/purchase/new-purchase/new-purchase.component';


const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'newpurchase/:id',
    component: NewPurchaseComponent,
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
