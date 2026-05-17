'use client';

import { useEffect, useState } from 'react';
import { Button, Typography } from '@hackthe6ix/ui';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { getApplicationReadiness } from '@/app/(application)/review/reviewConfig';
import ThankYouCandle from '@/assets/thank_you_candle.png';
import ApplicationSuccessToast from '@/components/thank-you/ApplicationSuccessToast';
import { useApplicationContext } from '@/context/ApplicationContext';

const DASHBOARD_URL =
  process.env.NEXT_PUBLIC_DASHBOARD_URL ?? 'https://2026.dash.hackthe6ix.com';

export default function ThankYouPage() {
  const router = useRouter();
  const { formData } = useApplicationContext();
  const { isReady } = getApplicationReadiness(formData);
  const [toastVisible, setToastVisible] = useState(true);

  // TODO: Gate this page on a backend "submission success" response instead of
  // client-side form readiness.
  useEffect(() => {
    if (!isReady) {
      router.replace('/review');
    }
  }, [isReady, router]);

  if (!isReady) {
    return null;
  }

  return (
    <div className="thank-you-page flex min-h-0 w-full flex-1 flex-col">
      {toastVisible && (
        <div className="thank-you-toast-wrap flex shrink-0 justify-center px-1 pt-1 md:pt-0">
          <ApplicationSuccessToast onDismiss={() => setToastVisible(false)} />
        </div>
      )}

      <div className="thank-you-hero flex min-h-0 flex-1 flex-col items-center justify-center gap-6 px-2 pb-8 text-center md:gap-8 md:pb-12">
        <Image
          src={ThankYouCandle}
          alt=""
          width={72}
          height={72}
          className="thank-you-candle h-14 w-auto md:h-18"
          priority
        />

        <Typography
          as="h1"
          textSize="heading-sm"
          textWeight="bold"
          textColor="text-white"
          className="max-w-md text-[1.75rem] leading-tight md:text-[2.5rem]"
        >
          Thanks for applying!
        </Typography>

        <Button
          as="a"
          href={DASHBOARD_URL}
          iconLeft={<ArrowRight size="inherit" className="size-3.5" />}
          className="thank-you-dashboard-button w-full max-w-xs border-primary-500 bg-primary-400 px-6 py-3 hover:border-primary-600 hover:bg-primary-500 md:w-auto md:min-w-52 md:max-w-none"
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
}
