import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { IErrorResponse } from '../../../interfaces/api/IErrorResponse';
import { AuthService } from '../../../services/auth.service';

enum ToastSeverity {
    SUCCESS = 'success',
    ERROR = 'error',
    WARN = 'warn',
    INFO = 'info'
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    loginForm!: FormGroup;
    isLoading: boolean = false;
    private _loginSubscription?: Subscription;

    constructor(
        private _authService: AuthService,
        private _messageService: MessageService
    ) {
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required])
        })
    }

    valCheck: string[] = ['remember'];

    signIn() {
        console.log({
            email: this.email?.value,
            password: this.password?.value
        });        

        this.isLoading = true;

        this._loginSubscription = this._authService.login(this.email?.value, this.password?.value)
            .subscribe({
                next: (response) => {
                    console.log(response);
                    this._messageService.add({ key: 'tst', severity: ToastSeverity.SUCCESS, summary: 'Sucesso', detail: 'Login efetuado com sucesso.' });

                },
                error: (response:  IErrorResponse) => {
                    console.error(response);

                    const errorMessage = typeof response.error.message === 'string' ? response.error.message : response.error.message.at(-1);

                    this._messageService.add({ key: 'tst', severity: 'error', summary: 'Erro', detail: errorMessage });
                }
            })
        
        this._loginSubscription.add(() => this.isLoading = false);
    }

    handleSubmit() {}

    get email() {
        return this.loginForm.get('email');
    }

    get password() {
        return this.loginForm.get('password');
    }

    ngOnInit(): void {
        
    }
    
    ngOnDestroy(): void {
        this._loginSubscription?.unsubscribe();
    }
}
