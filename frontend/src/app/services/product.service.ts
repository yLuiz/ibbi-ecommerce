import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { IResponseEntity } from '../shared/interfaces/api/IResponseEntity';
import { IProduct } from '../shared/interfaces/models/IProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private _http: HttpClient
  ) { }

  create(newProduct: FormData) {}
  listAll(pagination?: any, filters?: any) {
    return this._http.get<IResponseEntity<IProduct[]>>(`${environment.apiUrl}/product/?nostock=false`, { params: {
      ...pagination,
      ...filters
    } });
  }
  listById(id: number) {}

  listByUser(id: number, pagination: any, filters: any) {}

  update(id: number, productUpdated: any) {}

  delete(id: number) {}
}
