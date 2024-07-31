import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    
    component: RegisterComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
