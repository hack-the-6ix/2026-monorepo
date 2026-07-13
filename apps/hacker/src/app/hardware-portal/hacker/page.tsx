import { RoleGuard } from '@/hardware-portal/components/RoleGuard';
import { CatalogPage } from '@/hardware-portal/pages/hacker/CatalogPage';

export default function Page() {
  return (
    <RoleGuard allow={['requester']}>
      <CatalogPage />
    </RoleGuard>
  );
}
