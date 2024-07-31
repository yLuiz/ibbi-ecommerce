import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { IErrorResponse } from '../../../shared/interfaces/api/IErrorResponse';
import { AuthService } from '../../../services/auth.service';
import { ToastSeverity } from '../../../shared/types/ToastSeverity';
import { UserService } from '../../../services/user.service';
import { ICreateUser } from '../../../shared/interfaces/models/ICreateUser';
import { Router } from '@angular/router';

interface IAuthRequest {
    email: string;
    password: string;
}

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
    isLoading: boolean = false;
    private _loginSubscription?: Subscription;

    constructor(
        private _authService: AuthService,
        private _userService: UserService,
        private _messageService: MessageService,
        private _router: Router
    ) {}

    register(newUser: ICreateUser) {
        this.isLoading = true;

        this._loginSubscription = this._userService.register(newUser)
            .subscribe({
                next: (response) => {
                    this._messageService.add({ key: 'register-tst', severity: ToastSeverity.SUCCESS, summary: 'Sucesso', detail: 'Cadastro efetuado com sucesso.' });
                    this._authenticate({
                        email: newUser.email,
                        password: newUser.password
                    });

                },
                error: (response:  IErrorResponse) => {
                    console.error(response);

                    const errorMessage = typeof response.error.message === 'string' ? response.error.message : response.error.message.at(-1);

                    this._messageService.add({ key: 'register-tst', severity: 'error', summary: 'Erro', detail: errorMessage });
                    this.isLoading = false;
                }
            })
        
        this._loginSubscription.add();
    }

    private _authenticate({ email, password }: IAuthRequest) {
        this._authService.login(email, password)
           .subscribe({
                next: (response) => {
                    this._authService.setToken(response.access_token);
                    setTimeout(() => {
                        this._router.navigate(['/']);
                    }, 1000);

                    // Login success
                },
                error: (response: IErrorResponse) => {
                    console.error(response);
                    const errorMessage = typeof response.error.message === 'string' ? response.error.message : response.error.message.at(-1);

                    this._messageService.add({ key: 'register-tst', severity: 'error', summary: 'Erro', detail: errorMessage });
                }
            })
    }


    ngOnInit(): void {
        
    }
    
    ngOnDestroy(): void {
        this._loginSubscription?.unsubscribe();
    }
}
