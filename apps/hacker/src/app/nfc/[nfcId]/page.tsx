'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { getUserIdFromNfc } from '@/actions';
import { useHacker } from '@/context/HackerContext';

interface PageProps {
  params: Promise<{ nfcId: string }>;
}

export default function NFCRedirectPage({ params }: PageProps) {
  const { nfcId } = use(params);
  const router = useRouter();
  const { profile, loading } = useHacker();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (loading) return;
    if (!profile) return;

    const processNfc = async () => {
      try {
        const hasPrivilegedAccess = profile.roles?.some(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (role: any) => role.type === 'admin' || role.type === 'volunteer',
        );

        if (hasPrivilegedAccess) {
          const response = await getUserIdFromNfc(nfcId);

          if (response && response.userId) {
            window.location.href = `https://admin-v2.hackthe6ix.com/users/${response.userId}`;
          } else {
            setError('User not found for this NFC tag.');
          }
        }
      } catch (err) {
        console.error(err);
        setError('Failed to process NFC data.');
      }
    };

    processNfc();
  }, [profile, loading, nfcId, router]);

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return <div>VIEW OTHER PARTICIPANTS SOCIALS IN PROGRESS</div>;
}
