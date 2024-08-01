import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { ComponentsModule } from '../components/components.module';
import { LayoutComponent } from './layout.component';
import { MenuComponent } from './menu/menu.component';
import { MenuitemComponent } from './menuitem/menuitem.component';
import { LayoutService } from './services/layout.service';
import { MenuService } from './services/menu.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { ToastModule } from 'primeng/toast';



@NgModule({
  declarations: [
    LayoutComponent,
    TopbarComponent,
    SidebarComponent,
    MenuComponent,
    MenuitemComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    MenuModule,
    ToastModule,
    LayoutRoutingModule,
  ],
  providers: [MessageService, LayoutService, MenuService]
})
export class LayoutModule { }
