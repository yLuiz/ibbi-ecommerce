import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICreateUser } from '../../../shared/interfaces/models/ICreateUser';
import { IUser } from '../../../shared/interfaces/models/IUser';

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

  constructor() {
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
