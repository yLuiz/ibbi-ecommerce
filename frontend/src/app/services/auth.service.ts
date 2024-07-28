import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { IAuthReponse } from '../interfaces/api/IAuthResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _http: HttpClient
  ) { }

  login(email: string, password: string): Observable<IAuthReponse> {
    return this._http.post<IAuthReponse>(`${environment.apiUrl}/auth/`, { email, password });
  }

}
