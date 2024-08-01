export interface ICreatePurchase {
  product_id: number;
  client_id: number;
  observation: string | null;
  quantity: number;
  total_price: number;
}
