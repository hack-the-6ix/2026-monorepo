export type OrderState =
  | 'RESERVED'
  | 'PENDING'
  | 'READY'
  | 'PICKED_UP'
  | 'RETURNED'
  | 'CANCELLED';

export interface User {
  id: string;
  cognitoId: string;
  email: string;
  adminStatus: 'USER' | 'READ_ADMIN' | 'ADMIN';
  createdAt?: string;
  updatedAt?: string;
}

export interface Item {
  id: number;
  name: string;
  imageUrl: string | null;
  initialQuantity: number;
  availableQuantity?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface OrderItem {
  id: number;
  orderId: number;
  itemId: number;
  quantity: number;
  item: Item;
}

export interface Order {
  id: number;
  initiatorUserId: string;
  state: OrderState;
  orderNumber?: number | null;
  notes: string | null;
  idHeld: string | null;
  orderItems: OrderItem[];
  initiator?: User;
  pickedUpAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface PaginatedOrders {
  total: number;
  page: number;
  limit: number;
  orders: Order[];
}

export interface ApiError {
  error: string;
}

export interface ReserveOrderRequest {
  items: Array<{ itemId: number; quantity: number }>;
}

export interface CreateItemRequest {
  name: string;
  imageUrl?: string;
  initialQuantity: number;
}

export interface UpdateItemRequest {
  id: number;
  name?: string;
  imageUrl?: string | null;
  initialQuantity?: number;
}

export interface ChangeOrderStatusRequest {
  orderId: number;
  newState: OrderState;
}

export interface OrderPickedUpRequest {
  orderId: number;
  heldId: string;
}
