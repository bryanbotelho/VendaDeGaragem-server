

export interface CreateSale {
  product_id: number;
  order_number: number;
  trasaction_id: string;
  original_price: number;
  discount_price: number;
  final_price: number;
  payment_method: string;
  payment_status: string;
  buyer_id: string;
  seller_id: string;
  sale_date: Date;
    
}
