import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { IResponseEntity } from '../shared/interfaces/api/IResponseEntity';
import { ICategory } from '../shared/interfaces/models/ICategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private _http: HttpClient
  ) { }

  listAll() {
    return this._http.get<IResponseEntity<ICategory[]>>(`${environment.apiUrl}/category`); // Replace with actual API endpoint
  }
}
