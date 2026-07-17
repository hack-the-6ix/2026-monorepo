'use client';

import { useEffect, useState } from 'react';
import { Button, Typography } from '@hackthe6ix/ui';
import Image from 'next/image';

import {
  getUserCheckIns,
  hackathonCheckInEventId,
  seasonCode,
} from '@/actions';
import { useHacker } from '@/context/HackerContext';
import { glassPanelClass } from '@/lib/styles';

export default function VolunteerDashboard() {
  const { displayName, profile } = useHacker();
  const [qrLoadFailed, setQrLoadFailed] = useState(false);
  const [isCheckedInHackathon, setIsCheckedInHackathon] = useState(false);

  useEffect(() => {
    if (!profile?.userId) return;

    let cancelled = false;

    const loadCheckIns = async () => {
      try {
        const response = await getUserCheckIns(profile.userId, seasonCode);
        if (cancelled) return;

        const checkIns = Array.isArray(response) ? response : response.data;
        const checkedIn = (checkIns ?? []).some(
          (checkIn) => checkIn.eventId === hackathonCheckInEventId,
        );
        setIsCheckedInHackathon(checkedIn);
      } catch (err) {
        console.error('Failed to load check-in status', err);
      }
    };

    void loadCheckIns();

    return () => {
      cancelled = true;
    };
  }, [profile?.userId]);

  const qrCodeSrc =
    profile?.userId ?
      `/api/ht6/users/${encodeURIComponent(profile.userId)}/qr`
    : null;

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-8 space-y-4">
      <Typography
        as="p"
        textSize="subtitle-sm"
        textWeight="bold"
        textColor="text-white"
        className="mt-6 md:mt-32"
      >
        Welcome, {displayName}!
      </Typography>
      <Typography
        as="h1"
        textSize="heading-lg"
        textWeight="bold"
        textColor="text-white"
      >
        <span className="text-primary-300">Volunteer</span> Dashboard
      </Typography>
      <Typography
        as="p"
        textSize="paragraph-lg"
        textWeight="regular"
        textColor="text-white"
        className="max-w-xs md:max-w-none"
      >
        Thanks for volunteering at Hack the 6ix 2026! Check back here for
        schedules, tasks, and volunteer resources.
      </Typography>
      <div className="flex flex-col gap-4 md:flex-row md:gap-5 mt-2">
        <Button
          as="a"
          target="_blank"
          href="https://admin-v2.hackthe6ix.com/users"
        >
          Event Check In and User Information
        </Button>
        <Button as="a" href="/?tab=event">
          Event Schedule
        </Button>
      </div>
      <div className={`${glassPanelClass} px-8 pt-8 pb-6 my-5`}>
        <div className="mb-4 flex items-center gap-2">
          <Typography
            as="h2"
            textSize="paragraph-lg"
            textWeight="semi-bold"
            textColor="text-white"
          >
            Participant Code
          </Typography>
        </div>

        <div className="flex flex-col gap-5 pt-2">
          <div className="rounded-2xl bg-white">
            {qrCodeSrc && !qrLoadFailed ?
              <Image
                src={qrCodeSrc}
                alt="Participant QR code"
                width={250}
                height={250}
                unoptimized
                className="aspect-square w-full rounded-xl border border-black/20 object-cover"
                onError={(e) => {
                  setQrLoadFailed(true);
                  console.log(e);
                }}
              />
            : <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-black/20 bg-[linear-gradient(0deg,rgba(0,0,0,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.09)_1px,transparent_1px)] bg-size-[16px_16px]">
                <div className="absolute inset-0 m-auto h-12 w-12 rounded-xl bg-[#65f4d4] shadow-[0_0_20px_rgba(101,244,212,0.75)]" />
                <div className="absolute inset-0 m-auto flex h-12 w-12 items-center justify-center text-sm font-black text-[#112031]">
                  ht6
                </div>
              </div>
            }
          </div>
          <div className="flex justify-center">
            {isCheckedInHackathon ?
              <div className="inline-flex items-center gap-2.5 rounded-full border-2 border-[#3fe7a4] bg-[#3e7f7a] px-2.5 py-1.5 text-[15px] font-semibold text-white">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1ee38e] text-[11px] font-black text-[#0b1f1b]">
                  ✓
                </span>
                Checked in
              </div>
            : <div className="inline-flex items-center gap-2.5 rounded-full border-2 border-[#ff6d73] bg-[#9e3f44] px-2.5 py-1.5 text-[15px] font-semibold text-white">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ff6d73] text-[11px] font-black text-[#5c1a1e]">
                  !
                </span>
                Not checked in
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
