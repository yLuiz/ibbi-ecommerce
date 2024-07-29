import { Component, Input } from '@angular/core';
import { IUser } from '../../shared/interfaces/models/IUser';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  @Input() user?: IUser;

  
}
