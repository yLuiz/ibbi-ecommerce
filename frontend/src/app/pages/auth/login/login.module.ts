import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { LoginComponent } from './login.component';
import { MessageService } from 'primeng/api';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        PasswordModule,
        ReactiveFormsModule,
        FormsModule,
        ToastModule
    ],
    providers: [MessageService],
    declarations: [LoginComponent],
    exports: [LoginComponent]
})
export class LoginModule { }
