import { Component, Input } from '@angular/core';
import { IProduct } from '../../../shared/interfaces/models/IProduct';
import { environment } from '../../../../environments/environment.development';
import { AuthService } from '../../../services/auth.service';

interface IProductInfo extends Omit<IProduct, 'price'> {
  price: string;
  price_dollar: string;
}

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product!: IProduct;
  productInfo!: IProductInfo;
  url: string = environment.apiUrl;
  userId?: number;

  constructor(private _authService: AuthService) {}

  ngOnInit() {    

    this.userId = this._authService.decodePayloadJWT()?.sub;

    this.productInfo = {
      ...this.product,
      price: `R$${this.product.price.toFixed(2)}`,
      price_dollar: `$${(this.product.price * 5).toFixed(2)}`,
    };
  }
}
