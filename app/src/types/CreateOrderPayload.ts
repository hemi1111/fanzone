export interface OrderProducts {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export interface CreateOrderPayload {
  name: string;
  user_email: string;
  phone: string;
  products: OrderProducts[];
  total: number;
  city: string;
  address: string;
  notes?: string;
}
