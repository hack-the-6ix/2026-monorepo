'use client';

import { ReactNode, use, useEffect, useState } from 'react';
import { AiOutlineLink } from 'react-icons/ai';
import { FaDiscord, FaInstagram, FaLinkedin } from 'react-icons/fa6';
import { MdAccountCircle } from 'react-icons/md';
import { Button, Typography } from '@hackthe6ix/ui';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { getSocialsFormFromNfc, getUserIdFromNfc } from '@/actions';
import { useHacker } from '@/context/HackerContext';
import { characterAssets, ht6iAssets } from './assets';

interface PageProps {
  params: Promise<{ nfcId: string }>;
}

const glassPanelClass =
  'rounded-[32px] border border-white/50 bg-[linear-gradient(293deg,rgba(255,255,255,0.20)_3.25%,rgba(153,153,153,0.20)_100%)] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]';

function SocialButton({
  icon,
  label,
  link,
}: {
  icon: ReactNode;
  label: string;
  link: string;
}) {
  return (
    <div className="rounded-4xl w-full border border-white/30 bg-[linear-gradient(293deg,rgba(255,255,255,0.40)_3.25%,rgba(16,219,255,0.40)_100%)]">
      <a
        href={link}
        target="_blank"
        className="flex items-center justify-between w-full py-3 px-6"
      >
        <div className="flex flex-row items-center gap-3">
          {icon}
          <Typography
            textSize="paragraph-sm"
            textWeight="semi-bold"
            textColor="text-white"
            className="text-base truncate max-w-57"
          >
            {label}
          </Typography>
        </div>
        <AiOutlineLink size={20} className="text-primary-200" />
      </a>
    </div>
  );
}

export default function NFCRedirectPage({ params }: PageProps) {
  const { nfcId } = use(params);
  const router = useRouter();
  const { profile, loading } = useHacker();
  const [socials, setSocials] = useState<Record<string, string> | null>(null);
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

    const getSocials = async () => {
      try {
        const response = await getSocialsFormFromNfc('S26', nfcId);

        if (response) {
          setSocials(response.responseJson);
        } else {
          setError('User not found for this NFC tag.');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to get socials');
      }
    };

    processNfc();
    getSocials();
  }, [profile, loading, nfcId, router]);

  if (loading || !socials)
    return (
      <div className="text-white w-full h-full text-center items-center">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="text-red-500  w-full h-full text-center items-center">
        {error}
      </div>
    );

  const body = (socials.characterBody as string) || 'turnip';
  const accessory = socials.characterAccessory as string;
  const characterKey = accessory ? `${body}_${accessory}` : body;
  const selectedCharacterImage =
    characterAssets[characterKey as keyof typeof characterAssets];

  const hackerTypeMap: Record<string, string> = {
    VIBE: 'vibecoder',
    TINK: 'tinkerer',
    HOME: 'workfromhome',
    LEBR0N: 'lebron',
    'WING-S': 'redbull',
    '0PEN2W0RK': 'linkedin',
  };
  const typeValue = socials.hackerType as string;
  const assetKey = hackerTypeMap[typeValue];
  const selectedHt6iImage = ht6iAssets[assetKey as keyof typeof ht6iAssets];

  return (
    <div className="flex flex-col items-center mt-5 mb-15 md:mt-30">
      <div
        className={`${glassPanelClass} flex flex-col w-[90%] md:w-[70%] p-4 m-5 gap-7`}
      >
        <div className="flex flex-col items-center gap-3 w-full">
          {/* Name */}
          {socials.fullName ?
            <div className="flex flex-col gap-1 w-full text-center">
              <Typography
                textColor="text-white"
                textSize="paragraph-sm"
                textWeight="semi-bold"
              >
                Hi! I’m...
              </Typography>
              <Typography
                textColor="text-white"
                textSize="subtitle-lg"
                textWeight="semi-bold"
                className="break-words text-center leading-tight"
              >
                {socials.fullName}
              </Typography>
            </div>
          : <Typography
              textColor="text-white"
              textSize="paragraph-sm"
              textWeight="semi-bold"
              className="w-full text-center"
            >
              Heya!
            </Typography>
          }
          {/* Images */}
          <div className="flex flex-row w-full justify-center items-end">
            {selectedHt6iImage && (
              <Image
                src={selectedHt6iImage}
                height={100}
                alt="ht6i"
                className="relative z-10"
              />
            )}
            <Image
              src={selectedCharacterImage}
              height={180}
              alt="character"
              className={`${selectedHt6iImage && '-ml-15'} relative`}
            />
          </div>
          {selectedHt6iImage && (
            <Button
              as="a"
              href="https://ht6i.vercel.app/types"
              target="_blank"
              kind="tertiary"
              className="px-4.5 py-1.5 bg-[linear-gradient(293deg,rgba(255,255,255,0.20)_3.25%,rgba(153,153,153,0.20)_100%)]"
            >
              <Typography
                textSize="label"
                textWeight="medium"
                textColor="text-white"
              >
                HT6I: <strong>{socials.hackerType}</strong>
              </Typography>
            </Button>
          )}
        </div>

        <div className="flex flex-col items-center gap-3 w-full">
          {socials.instagram && (
            <SocialButton
              icon={<FaInstagram size={20} className="text-primary-200" />}
              label={`@${socials.instagram}`}
              link={`https://instagram.com/${socials.instagram}`}
            />
          )}
          {socials.discord && (
            <SocialButton
              icon={<FaDiscord size={20} className="text-primary-200" />}
              label={`@${socials.discord}`}
              link="#"
            />
          )}
          {socials.linkedin && (
            <SocialButton
              icon={<FaLinkedin size={20} className="text-primary-200" />}
              label={socials.linkedin.replace(/^(https?:\/\/)?(www\.)?/, '')}
              link={socials.linkedin}
            />
          )}
          {socials.portfolio && (
            <SocialButton
              icon={<MdAccountCircle size={20} className="text-primary-200" />}
              label={socials.portfolio.replace(/^(https?:\/\/)?(www\.)?/, '')}
              link={socials.portfolio}
            />
          )}
        </div>
      </div>
      <Typography
        textSize="label"
        textWeight="medium"
        textColor="text-white"
        className="italic"
      >
        Screenshot this information to save it!
      </Typography>
    </div>
  );
}
