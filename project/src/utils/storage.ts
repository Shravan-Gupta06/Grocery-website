import { User, CartItem, Order } from '../types';

// Local Storage Keys
const USERS_KEY = 'groco_users';
const CURRENT_USER_KEY = 'groco_current_user';
const CART_KEY = 'groco_cart';
const ORDERS_KEY = 'groco_orders';

// User Functions
export const getUsers = (): User[] => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

export const saveUser = (user: User): void => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const setCurrentUser = (user: User): void => {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};

export const removeCurrentUser = (): void => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const findUserByEmail = (email: string): User | undefined => {
  const users = getUsers();
  return users.find(user => user.email === email);
};

// Cart Functions
export const getCart = (): CartItem[] => {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
};

export const saveCart = (cart: CartItem[]): void => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const clearCart = (): void => {
  localStorage.setItem(CART_KEY, JSON.stringify([]));
};

// Order Functions
export const getOrders = (): Order[] => {
  const orders = localStorage.getItem(ORDERS_KEY);
  return orders ? JSON.parse(orders) : [];
};

export const getUserOrders = (userId: string): Order[] => {
  const orders = getOrders();
  return orders.filter(order => order.userId === userId);
};

export const saveOrder = (order: Order): void => {
  const orders = getOrders();
  orders.push(order);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
};