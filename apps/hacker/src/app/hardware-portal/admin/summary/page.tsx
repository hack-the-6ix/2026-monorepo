import { RoleGuard } from '@/hardware-portal/components/RoleGuard';
import SummaryPage from '@/hardware-portal/pages/admin/SummaryPage';

export default function Page() {
  return (
    <RoleGuard allow={['admin', 'staff']}>
      <SummaryPage />
    </RoleGuard>
  );
}
