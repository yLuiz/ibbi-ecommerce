import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { IAuthResponse } from '../shared/interfaces/api/IAuthResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _http: HttpClient
  ) { }

  login(email: string, password: string): Observable<IAuthResponse> {
    return this._http.post<IAuthResponse>(`${environment.apiUrl}/auth/`, { email, password });
  }

  logout() {
    localStorage.clear();
  }

  getToken() {
    return localStorage.getItem('token');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

}
