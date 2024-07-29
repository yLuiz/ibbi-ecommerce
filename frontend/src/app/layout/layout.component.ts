import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  constructor(
    private _authService: AuthService, 
    private _messageService: MessageService,
    private _router: Router
  ) {}


  logout() {
    this._authService.logout();
    this._messageService.add({ severity: 'success', summary: 'Logout', detail: 'Sessão finalizada.' });
    this._router.navigate(['/auth']);
  }
}
