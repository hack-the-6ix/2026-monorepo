'use client';

import { useState } from 'react';
import { Button, Typography } from '@hackthe6ix/ui';
import Image from 'next/image';

const teamCode = 'banana-monkey-apple-cat';

const TeamPage = () => {
  const [copied, setCopied] = useState(false);
  const [isFadingCopied, setIsFadingCopied] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);

  const handleCopyTeamCode = async () => {
    await navigator.clipboard.writeText(teamCode);
    setCopied(true);
    setIsFadingCopied(false);
  };

  const handleCopyMouseLeave = () => {
    if (!copied) return;

    setIsFadingCopied(true);
    window.setTimeout(() => {
      setCopied(false);
      setIsFadingCopied(false);
    }, 200);
  };

  return (
    <section className="flex min-h-screen items-center justify-center px-6 py-20 text-center text-white">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center">
        <Typography
          as="h1"
          textSize="heading-lg"
          textWeight="bold"
          textColor="text-white"
          className="text-4xl leading-tight md:text-5xl"
        >
          Your Team
        </Typography>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          <Typography
            as="span"
            textSize="subtitle-sm"
            textWeight="bold"
            textColor="text-white"
          >
            Team code:
          </Typography>
          <Typography
            as="span"
            textSize="subtitle-sm"
            textWeight="bold"
            textColor="text-[#F6BD55]"
          >
            {teamCode}
          </Typography>
          <div
            className="relative flex items-center"
            onMouseLeave={handleCopyMouseLeave}
          >
            <button
              type="button"
              aria-label={copied ? 'Team code copied' : 'Copy team code'}
              title={copied ? 'Copied' : 'Copy team code'}
              className="rounded p-1 transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              onClick={handleCopyTeamCode}
            >
              <Image src="/clipboard_icon.png" alt="" width={30} height={30} />
            </button>
            {copied && (
              <Typography
                as="span"
                textSize="paragraph-sm"
                textWeight="bold"
                textColor="text-white"
                className={`absolute bottom-full left-1/2 mb-1 -translate-x-1/2 whitespace-nowrap text-white/80 transition-opacity duration-400 ${
                  isFadingCopied ? 'opacity-0' : 'opacity-100'
                }`}
              >
                Copied!
              </Typography>
            )}
          </div>
        </div>

        <div className="mt-20">
          <Typography
            as="h2"
            textSize="subtitle-lg"
            textWeight="bold"
            textColor="text-white"
            className="text-2xl md:text-3xl"
          >
            Members (1/4)
          </Typography>
          <Typography
            as="p"
            textSize="paragraph-sm"
            textWeight="regular"
            textColor="text-white"
            className="mt-2 md:text-lg"
          >
            Michael Ng
          </Typography>
        </div>

        <div className="mt-36 flex w-full max-w-4xl flex-col items-start">
          <div className="h-px w-full bg-white/50" />
          <Button
            kind="secondary"
            destructive
            onClick={() => {
              setIsLeaveModalOpen(true);
            }}
            className="mt-4 w-full rounded-full border-2 border-error-500 px-6 py-2.5 text-error-500 hover:border-error-600 hover:text-error-600 md:w-auto"
          >
            Leave team
          </Button>
        </div>
      </div>

      {isLeaveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/15 px-6 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-[#0D0A33] px-8 py-7 text-center shadow-2xl">
            <Typography
              as="h2"
              textSize="subtitle-sm"
              textWeight="bold"
              textColor="text-white"
              className="text-white/35"
            >
              Leave this team?
            </Typography>
            <Typography
              as="p"
              textSize="paragraph-sm"
              textWeight="bold"
              textColor="text-white"
              className="mt-4"
            >
              You will not be able to rejoin this team unless you have the team
              code.
            </Typography>

            <div className="mt-6 flex items-center justify-center gap-4">
              <Button
                kind="secondary"
                className="rounded-full border-white px-5 py-2 text-white hover:border-white hover:text-white"
                onClick={() => {
                  setIsLeaveModalOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                destructive
                className="rounded-full border-error-500 bg-error-500 px-5 py-2 text-white hover:border-error-600 hover:bg-error-600"
              >
                Leave team
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TeamPage;
