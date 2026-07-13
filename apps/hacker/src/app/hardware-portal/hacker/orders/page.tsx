import { RoleGuard } from '@/hardware-portal/components/RoleGuard';
import { OrdersPage } from '@/hardware-portal/pages/hacker/OrdersPage';

export default function Page() {
  return (
    <RoleGuard allow={['requester']}>
      <OrdersPage />
    </RoleGuard>
  );
}
