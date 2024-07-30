import { ICategory } from './ICategory';
import { IUser } from './IUser';

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  sales_quantity: number;
  seller: IUser;
  path_image: string;
  category: ICategory;
  created_at: Date;
  updated_at: Date;
}

export interface ITopProduct {
  id: number;
  name: string;
  description: string;
  sales_quantity: number;
}
