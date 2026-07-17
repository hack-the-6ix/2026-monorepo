import type { Item, Order, ReserveOrderRequest } from '../types';
import { get, post } from './client';

export const userApi = {
  getItems(): Promise<Item[]> {
    return get<Item[]>('/user/items');
  },

  getCurrentOrder(): Promise<Order | null> {
    return get<Order | null>('/user/current-order');
  },

  getPastOrders(): Promise<Order[]> {
    return get<Order[]>('/user/past-orders');
  },

  reserveOrder(items: ReserveOrderRequest['items']): Promise<Order> {
    return post<Order>('/user/reserve-order', { items });
  },

  addToReservation(itemId: number, quantity: number): Promise<Order> {
    return post<Order>('/user/add-to-reservation', { itemId, quantity });
  },

  removeFromReservation(itemId: number, quantity: number): Promise<Order> {
    return post<Order>('/user/remove-from-reservation', { itemId, quantity });
  },

  cancelOrder(orderId: number): Promise<Order> {
    return post<Order>('/user/cancel-order', { orderId });
  },

  checkoutCart(): Promise<Order> {
    return post<Order>('/user/checkout');
  },
};
