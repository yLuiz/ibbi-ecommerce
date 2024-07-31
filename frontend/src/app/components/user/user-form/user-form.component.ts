import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICreateUser } from '../../../shared/interfaces/models/ICreateUser';
import { IUser } from '../../../shared/interfaces/models/IUser';
import { MessageService } from 'primeng/api';
import { ToastSeverity } from '../../../shared/types/ToastSeverity';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent {
  @Input() user?: IUser;
  @Output() onSubmit: EventEmitter<ICreateUser> = new EventEmitter();
  
  userForm!: FormGroup;
  @Input() isLoading: boolean = false;

  constructor(
    private _messageService: MessageService
  ) {
    this.userForm = new FormGroup({
      name: new FormControl(this.user?.name || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
      ]),
      email: new FormControl(this.user?.email || '', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(255),
      ]),
      confirmedPassword: new FormControl('', [Validators.required]),
    });
  }

  handleSubmit(): void {

    if (this.password?.value !== this.confirmedPassword?.value) {
      this._messageService.add({
        key: 'userform-tst',
        severity: ToastSeverity.ERROR,
        summary: 'Formulário inválido',
        detail: 'As senhas não coincidem.',
      })

      return;
    }

    const newUser: ICreateUser = {
      name: this.name?.value,
      email: this.email?.value,
      password: this.password?.value,
    };

    this.onSubmit.emit(newUser);
  }

  get name() {
    return this.userForm.get('name');
  }

  get email() {
    return this.userForm.get('email');
  }

  get password() {
    return this.userForm.get('password');
  }

  get confirmedPassword() {
    return this.userForm.get('confirmedPassword');
  }
}
