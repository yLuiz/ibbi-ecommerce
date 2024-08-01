import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from '../pages/products/products.component';
import { AuthGuard } from '../guards/auth.guard';
import { NewPurchaseComponent } from '../pages/purchase/new-purchase/new-purchase.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { PurchaseComponent } from '../pages/purchase/purchase.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'purchases',
    component: PurchaseComponent
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
