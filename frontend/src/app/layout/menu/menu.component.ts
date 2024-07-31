import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../services/layout.service';

interface IMenuModel {
    label: string;
    icon?: string;
    separator?: string;
    items: IMenuItem[];
}

interface IMenuItem {
    label: string, 
    icon: string, 
    routerLink?: string[], 
    routerLinkActiveOptions?: { paths: string, queryParams: string, matrixParams: string, fragment: string },
    target?: string,
    badge?: string,
    url?: string[],
    items?: IMenuItem[],
}

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

    model: IMenuModel[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Menu',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-chart-pie', routerLink: ['/dashboard'] },
                    { label: 'Produtos', icon: 'pi pi-fw pi-objects-column', routerLink: ['/products'] },

                ]
            },
        ];
    }
}
