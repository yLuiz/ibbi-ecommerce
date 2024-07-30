import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { AuthService } from '../../../services/auth.service';
import { IProduct } from '../../../shared/interfaces/models/IProduct';

interface IProductInfo extends Omit<IProduct, 'price'> {
  price: string;
  price_dollar: string;
}

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() product!: IProduct;
  productInfo!: IProductInfo;
  url: string = environment.apiUrl;
  userId?: number;

  constructor(
    private _authService: AuthService,
    private _router: Router,
  ) {}
  
  goToPurchase() {
    this._router.navigate([`/newpurchase/${this.product.id}`]);
  }

  ngOnInit() {
    this.userId = this._authService.decodePayloadJWT()?.sub;

    this.productInfo = {
      ...this.product,
      price: `R$${this.product.price.toFixed(2).replace('.', ',')}`,
      price_dollar: `$${(this.product.price * 5).toFixed(2)}`,
    };
  }
}
