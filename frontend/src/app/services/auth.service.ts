import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { IAuthResponse } from '../shared/interfaces/api/IAuthResponse';
import { ITokenPayload } from '../shared/interfaces/api/ITokenPayload';
import * as jwt_decode from 'jwt-decode';

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

  decodePayloadJWT(): ITokenPayload | null {
    try {
      return jwt_decode.jwtDecode(this.getToken() || '');
    } catch (error) {
      return null;
    }
  }

}
