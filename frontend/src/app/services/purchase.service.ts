import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IResponseEntity } from '../shared/interfaces/api/IResponseEntity';
import { ICreatePurchase } from '../shared/interfaces/models/ICreatePurchase';
import { IPurchase, IPurchaseCreated } from '../shared/interfaces/models/IPurchase';
import { IPagination } from '../shared/interfaces/api/IPagination';
import { IPurchaseFilter } from '../shared/interfaces/api/IPurchaseFilter';
import { ITopProduct } from '../shared/interfaces/models/IProduct';
import { ISalesByCategory } from '../shared/interfaces/models/ICategory';
import io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(
    private _http: HttpClient,
  ) { }

  private socket = io(environment.socketUrl);

  create(newPurchase: ICreatePurchase) {
    return this._http.post<IResponseEntity<IPurchaseCreated>>(`${environment.apiUrl}/purchase`, newPurchase);
  }

  listPurchase(pagination?: IPagination, filters?: IPurchaseFilter) {
    return this._http.get<IResponseEntity<IPurchase[]>>(`${environment.apiUrl}/purchase`, {
      params: {
        ...pagination,
        ...filters,
      }
    });
  }

  listPurchaseBySeller(id: number, pagination?: IPagination) {
    return this._http.get<IResponseEntity<IPurchase[]>>(`${environment.apiUrl}/purchase`, {
      params: {
        ...pagination,
        seller: id
      }
    });
  }

  listPurchaseByClient(id: number, pagination?: IPagination) {
    return this._http.get<IResponseEntity<IPurchase[]>>(`${environment.apiUrl}/purchase`, {
      params: {
        ...pagination,
        client: id
      }
    });
  }

  listTop10Products() {
    return this._http.get<IResponseEntity<ITopProduct[]>>(`${environment.apiUrl}/purchase/topproducts`);
  }

  listPurchaseGroupByCategory() {
    return this._http.get<IResponseEntity<ISalesByCategory[]>>(`${environment.apiUrl}/purchase/category`);
  }


  listenNewPurchase() {
    return new Observable<IPurchaseCreated>((observer) => {
      this.socket.on('new-purchase', (event: { message: string, purchase: IPurchaseCreated}) => {
        observer.next(event.purchase);
      });
    });
    
  }
}
