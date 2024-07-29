import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { LayoutRoutingModule } from './layout-routing.module';
import { ComponentsModule } from '../components/components.module';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { TopbarComponent } from './topbar/topbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MenuComponent } from './menu/menu.component';
import { MenuitemComponent } from './menuitem/menuitem.component';
import { LayoutService } from './services/layout.service';
import { MenuService } from './services/menu.service';
import { MenuModule }from 'primeng/menu';



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
    ComponentsModule,
    RouterModule,
    LayoutRoutingModule,
    ButtonModule,
    MenuModule
  ],
  providers: [MessageService, LayoutService, MenuService]
})
export class LayoutModule { }
