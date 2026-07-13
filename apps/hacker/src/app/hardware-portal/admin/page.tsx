import { RoleGuard } from '@/hardware-portal/components/RoleGuard';
import ItemsPage from '@/hardware-portal/pages/admin/ItemsPage';

export default function Page() {
  return (
    <RoleGuard allow={['admin']}>
      <ItemsPage />
    </RoleGuard>
  );
}
