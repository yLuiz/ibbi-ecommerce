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
            key: 'tst',
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
            key: 'tst',
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

    // Aqui utilizei o type generico "any".
    // Pois o typescript não permitiu fazer calculo com tipo data, mesmo que o JS permita.
    const now = new Date();
    // const diffTime = Math.abs((<any>quotation?.lastUpdate) - now);
    const diffTime = Math.abs(
      quotation!.lastUpdate.getMilliseconds() - now.getMilliseconds()
    );
    const diffMin = Math.floor(diffTime / 60000);

    if (diffMin > 10) this.getDollarQuotation();
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
        error: (error) => console.error(error),
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
