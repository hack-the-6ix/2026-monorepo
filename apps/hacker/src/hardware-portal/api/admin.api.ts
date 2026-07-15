import type {
  CreateItemRequest,
  Item,
  Order,
  OrderState,
  PaginatedOrders,
  UpdateItemRequest,
} from '../types';
import { get, post, postForm } from './client';

export const adminApi = {
  getItems(): Promise<Item[]> {
    return get<Item[]>('/admin/items');
  },

  getOrders(): Promise<Order[]> {
    return get<Order[]>('/admin/orders');
  },

  getOrdersByStatus(status: OrderState): Promise<Order[]> {
    return get<Order[]>(`/admin/orders/status/${status}`);
  },

  getAllOrdersPaginated(page = 1, limit = 20): Promise<PaginatedOrders> {
    return get<PaginatedOrders>(
      `/admin/all-orders?page=${page}&limit=${limit}`,
    );
  },

  uploadImage(file: File): Promise<{ url: string }> {
    const form = new FormData();
    form.append('file', file);
    return postForm<{ url: string }>('/admin/upload-image', form);
  },

  createItem(data: CreateItemRequest): Promise<Item> {
    return post<Item>('/admin/create-item', data);
  },

  updateItem(data: UpdateItemRequest): Promise<Item> {
    return post<Item>('/admin/update-item', data);
  },

  deleteItem(id: number): Promise<{ success: true }> {
    return post<{ success: true }>('/admin/delete-item', { id });
  },

  changeOrderStatus(orderId: number, newState: OrderState): Promise<Order> {
    return post<Order>('/admin/change-order-status', { orderId, newState });
  },

  orderPickedUp(orderId: number): Promise<Order> {
    return post<Order>('/admin/order-picked-up', { orderId });
  },
};
