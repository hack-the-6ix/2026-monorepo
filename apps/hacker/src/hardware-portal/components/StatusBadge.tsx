import type { OrderState } from '../types';

const statusConfig: Record<OrderState, { label: string; className: string }> = {
  RESERVED: {
    label: 'Reserved',
    className: 'bg-yellow-100 text-yellow-800',
  },
  PENDING: {
    label: 'Pending',
    className: 'bg-hw-orange-100 text-hw-orange-800',
  },
  READY: {
    label: 'Ready',
    className: 'bg-hw-blue-100 text-hw-blue-800',
  },
  PICKED_UP: {
    label: 'Picked Up',
    className: 'bg-hw-green-100 text-hw-green-800',
  },
  RETURNED: {
    label: 'Returned',
    className: 'bg-hw-gray-100 text-hw-gray-800',
  },
  CANCELLED: {
    label: 'Cancelled',
    className: 'bg-hw-red-100 text-hw-red-800',
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
