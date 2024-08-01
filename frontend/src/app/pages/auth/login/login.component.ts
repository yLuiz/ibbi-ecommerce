import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { IErrorResponse } from '../../../shared/interfaces/api/IErrorResponse';
import { AuthService } from '../../../services/auth.service';
import { ToastSeverity } from '../../../shared/types/ToastSeverity';
import { Router } from '@angular/router';
import { DollarQuotationService } from '../../../services/dollar-quotation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  isLoading: boolean = false;
  private _loginSubscription?: Subscription;

  constructor(
    private _authService: AuthService,
    private _messageService: MessageService,
    private _dollarQuotationService: DollarQuotationService, // Assume DollarQuotationService is a service responsible for fetching the dollar quotation
    private _router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  signIn() {
    this.isLoading = true;

    this._loginSubscription = this._authService
      .login(this.email?.value, this.password?.value)
      .subscribe({
        next: (response) => {
          this._messageService.add({
            key: 'login-tst',
            severity: ToastSeverity.SUCCESS,
            summary: 'Sucesso',
            detail: 'Login efetuado com sucesso.',
          });
          this._authService.setToken(response.access_token);
          this.loginForm.disable();

          this.getDollarQuotation();

          setTimeout(() => {
            this._router.navigate(['/']);
          }, 1000);
        },
        error: (response: IErrorResponse) => {
          console.error(response);

          const errorMessage =
            typeof response.error.message === 'string'
              ? response.error.message
              : response.error.message.at(0);

          this._messageService.add({
            key: 'login-tst',
            severity: 'error',
            summary: 'Erro',
            detail: errorMessage,
          });
        },
      });

    this._loginSubscription.add(() => (this.isLoading = false));
  }

  updateQuotation() {
    const quotation = this._dollarQuotationService.getSavedQuotation();

    if (!quotation) {
      this.getDollarQuotation();
      return;
    }

    const now = new Date();
    const diffTime = Math.abs(
      quotation!.lastUpdate.getMilliseconds() - now.getMilliseconds()
    );
    const diffMin = Math.floor(diffTime / 60000);

    if (diffMin > 10) this.getDollarQuotation();
  }

  forgotPassword() {
    this._messageService.add({
      severity: ToastSeverity.WARN,
      summary: 'Funcionalidade ainda não implementada.',
      key: 'login-tst',
    });
  }

  getDollarQuotation() {
    this._dollarQuotationService
      .getDollarQuotation()
      .subscribe({
        next: (response) => {
          this._dollarQuotationService.setQuotation(
            Number(response.USDBRL.high)
          );
        },
        error: (response: IErrorResponse) => {
          console.error(response);
          const errorMessage =
            typeof response.error.message === 'string'
              ? response.error.message
              : response.error.message.at(-1);

          this._messageService.add({
            key: 'product-tst',
            severity: 'error',
            summary: 'Erro',
            detail: errorMessage,
          });
        },
      })
      .add();
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._loginSubscription?.unsubscribe();
  }
}
