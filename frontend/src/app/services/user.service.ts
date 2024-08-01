import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { IResponseEntity } from '../shared/interfaces/api/IResponseEntity';
import { ICreateUser } from '../shared/interfaces/models/ICreateUser';
import { IUser } from '../shared/interfaces/models/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _http: HttpClient
  ) { }

  register(userPayload: ICreateUser) {
    return this._http.post<IResponseEntity<IUser>>(`${environment.apiUrl}/user/`, userPayload);
  }

  update(userPayload: any) {

  }
}
