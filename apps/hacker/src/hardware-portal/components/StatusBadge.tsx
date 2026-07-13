import type { OrderState } from '../types';

const statusConfig: Record<OrderState, { label: string; className: string }> = {
  RESERVED: {
    label: 'Reserved',
    className: 'bg-yellow-100 text-yellow-800',
  },
  PENDING: {
    label: 'Pending',
    className: 'bg-orange-100 text-orange-800',
  },
  READY: {
    label: 'Ready',
    className: 'bg-blue-100 text-blue-800',
  },
  PICKED_UP: {
    label: 'Picked Up',
    className: 'bg-green-100 text-green-800',
  },
  RETURNED: {
    label: 'Returned',
    className: 'bg-gray-100 text-gray-800',
  },
  CANCELLED: {
    label: 'Cancelled',
    className: 'bg-red-100 text-red-800',
  },
};

export function StatusBadge({ status }: { status: OrderState }) {
  const config = statusConfig[status];
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full px-3 py-1 text-body font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}
