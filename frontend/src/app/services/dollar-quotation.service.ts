import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICurrencyRates } from '../shared/interfaces/api/ICurrencyRates';

interface IQuotationSaved {
  quotation: number,
  lastUpdate: Date,
}

@Injectable({
  providedIn: 'root',
})
export class DollarQuotationService {
  api = 'https://economia.awesomeapi.com.br/json/last/USD';

  constructor(private _http: HttpClient) {}

  getDollarQuotation() {
    return this._http.get<ICurrencyRates>(this.api);
  }

  getSavedQuotation(): IQuotationSaved | null {
   try {
    let quotationSaved = JSON.parse(localStorage.getItem('USDBRL')!) as IQuotationSaved;
    quotationSaved = {
      lastUpdate: new Date(quotationSaved.lastUpdate),
      quotation: Number(quotationSaved.quotation),
    }

    return quotationSaved;
   }
   catch (error) {
     return null;
   }
  }

  setQuotation(quotation: number) {
    localStorage.setItem('USDBRL', JSON.stringify({
      quotation: Number(quotation).toFixed(2),
      lastUpdate: new Date(),
    }));

  }
}
