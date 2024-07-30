import { IProduct } from "./IProduct";
import { IUser } from "./IUser";

interface IProductInPurchase extends Omit<IProduct, 'category' | 'seller'> {
    category_id: number;
    seller_id: number;
}

interface IUserInPurchase extends Omit<IUser, 'created_at' | 'updated_at'> {}

export interface IPurchase {
  id: number;
  quantity: number;
  total_price: number;
  observation: string;
  seller_id: number;
  client_id: number;
  product_id: number;
  created_at: Date;
  client: IUserInPurchase;
  seller: IUserInPurchase;
  product: IProductInPurchase;
}

export interface IPurchaseCreated extends Omit<IPurchase, 'client' | 'seller' | 'product'>{}