export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  unit: string;
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  address: Address;
  paymentMethod: string;
  status: string;
  date: string;
}

export interface Address {
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
}