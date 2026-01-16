export type Product = {
  id: string;
  name: string;
  price: number;
  final_price: number;
  thumbnail: string;
  images: string[];
  description: string;
  category: string;
  product_type?: string;
  discount: boolean;
  is_active: boolean;
  quantity: number;
  attributes?: Record<string, any>;
  attribute?: string;
};
