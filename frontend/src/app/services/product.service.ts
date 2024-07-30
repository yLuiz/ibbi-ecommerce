import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { IResponseEntity } from '../shared/interfaces/api/IResponseEntity';
import { IProduct } from '../shared/interfaces/models/IProduct';
import { IProductFilter } from '../shared/interfaces/api/IProductFilter';
import { ICreateProduct } from '../shared/interfaces/models/ICreateProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private _http: HttpClient
  ) { }

  create(newProduct: ICreateProduct) {
    return this._http.post<IResponseEntity<IProduct>>(`${environment.apiUrl}/product/`, newProduct);
  }

  uploadImage(body: FormData) {
    
    const [id, image] = [body.get('id'), body.get('image')];
    body.delete('id');

    console.log(id);
    console.log(image);

    if (!id || !image) {
      throw new Error('Image and Product Id is required!');
    }

    return this._http.patch<IResponseEntity<IProduct>>(`${environment.apiUrl}/product/${+id}`, body);

  }
  listAll(pagination?: any, filters?: IProductFilter) {
    if (!filters?.categories) {
      delete filters?.categories;
    }
    

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
