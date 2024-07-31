import { Component, ElementRef, ViewChild } from '@angular/core';
import { LayoutService } from '../services/layout.service';
import { MenuItem, MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {
  constructor(
    public layoutService: LayoutService, 
    public el: ElementRef,
    private _authService: AuthService, 
    private _messageService: MessageService,
    public _router: Router
  ) { }

  menuItems: MenuItem[] = [];
  username = 'Usuário';

  @ViewChild('menubutton') menuButton!: ElementRef;
  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;
  @ViewChild('topbarmenu') menu!: ElementRef;

  logout() {
    this._authService.logout();
    this._messageService.add({ severity: 'success', summary: 'Logout', detail: 'Sessão finalizada.' });
    this._router.navigate(['/auth']);
  }

  ngOnInit() {

    this.username = this._authService.decodePayloadJWT()?.name || '';

    this.menuItems = [
      {
        label: 'Editar perfil', icon: 'pi pi-fw pi-user-edit', command: () => {}
      },
      {
        label: 'Sair', icon: 'pi pi-fw pi-sign-out', command: () => this.logout(),
      },
  ];
  }
}
