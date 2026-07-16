import NfcSocialProfile from '@/components/nfc/NfcSocialProfile';

interface PageProps {
  params: Promise<{ nfcId: string }>;
}

export default async function PublicNfcPage({ params }: PageProps) {
  const { nfcId } = await params;

  return <NfcSocialProfile nfcId={nfcId} />;
}
