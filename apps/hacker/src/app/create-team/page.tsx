'use client';

import { useEffect, useState } from 'react';
import { Button, Typography } from '@hackthe6ix/ui';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import {
  clearStoredTeamId,
  getApiErrorMessage,
  getCurrentUserId,
  getStoredTeamId,
  getTeamDetails,
  getUserProfile,
  isUuid,
  leaveOrRemoveTeamMember,
  TeamDetails,
} from '@/client';

const CreateTeamPage = () => {
  const router = useRouter();
  const [team, setTeam] = useState<TeamDetails | null>(null);
  const [copied, setCopied] = useState(false);
  const [isFadingCopied, setIsFadingCopied] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [isLeavingTeam, setIsLeavingTeam] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [memberNames, setMemberNames] = useState<Record<string, string>>({});
  const [currentMemberUserId, setCurrentMemberUserId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    const loadTeamDetails = async () => {
      const teamId = getStoredTeamId();
      if (!teamId) {
        setErrorMessage('No team code was found. Create or join a team first.');
        return;
      }

      try {
        const teamDetails = await getTeamDetails(teamId);
        setTeam(teamDetails);
        const memberProfiles = await Promise.allSettled(
          teamDetails.members.map((member) => getUserProfile(member.userId)),
        );

        const { names, currentUserId } = memberProfiles.reduce<{
          names: Record<string, string>;
          currentUserId: string | null;
        }>(
          (result, profileResult) => {
            if (profileResult.status !== 'fulfilled') return result;

            const fullName = [
              profileResult.value.firstName,
              profileResult.value.lastName,
            ]
              .filter(Boolean)
              .join(' ');

            result.names[profileResult.value.userId] =
              fullName || profileResult.value.email;
            result.currentUserId = profileResult.value.userId;
            return result;
          },
          { names: {}, currentUserId: null },
        );
        setMemberNames(names);
        setCurrentMemberUserId(currentUserId);
      } catch {
        setErrorMessage('Unable to load your team details.');
      }
    };

    void loadTeamDetails();
  }, []);

  const handleCopyTeamCode = async () => {
    if (!team) return;

    await navigator.clipboard.writeText(team.teamId);
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

  const handleLeaveTeam = async () => {
    if (!team) return;

    const tokenUserId = getCurrentUserId();
    const userId =
      isUuid(currentMemberUserId) ? currentMemberUserId
      : isUuid(tokenUserId) ? tokenUserId
      : team.members.length === 1 && isUuid(team.members[0].userId) ?
        team.members[0].userId
      : isUuid(team.teamLeaderId) ? team.teamLeaderId
      : null;
    if (!userId) {
      setErrorMessage('Unable to identify the current user.');
      return;
    }

    try {
      setIsLeavingTeam(true);
      setErrorMessage('');
      await leaveOrRemoveTeamMember(team.teamId, userId);
      clearStoredTeamId();
      router.push('/team-formation');
    } catch (error) {
      setErrorMessage(
        getApiErrorMessage(error, 'Unable to leave this team right now.'),
      );
      setIsLeavingTeam(false);
    }
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
          Your team has been created!
        </Typography>

        {team ?
          <>
            <div className="group mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
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
                className="transition-[text-shadow] group-hover:[text-shadow:0_0_18px_rgba(246,189,85,0.8)] group-focus-within:[text-shadow:0_0_18px_rgba(246,189,85,0.8)]"
              >
                {team.teamId}
              </Typography>
              <div
                className="relative flex items-center"
                onMouseLeave={handleCopyMouseLeave}
              >
                <button
                  type="button"
                  aria-label={copied ? 'Team code copied' : 'Copy team code'}
                  title={copied ? 'Copied' : 'Copy team code'}
                  className="rounded p-1 transition-[filter,opacity] hover:opacity-70 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.75)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  onClick={handleCopyTeamCode}
                >
                  <Image
                    src="/clipboard_icon.png"
                    alt=""
                    width={30}
                    height={30}
                  />
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
                Members ({team.members.length}/4)
              </Typography>
              <div className="mt-2 flex flex-col gap-1">
                {team.members.map((member) => (
                  <Typography
                    key={member.userId}
                    as="p"
                    textSize="paragraph-sm"
                    textWeight="regular"
                    textColor="text-white"
                    className="md:text-lg"
                  >
                    {memberNames[member.userId] || member.userId}
                  </Typography>
                ))}
              </div>
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
          </>
        : <div className="mt-10 flex flex-col items-center gap-4">
            <Typography
              as="p"
              textSize="paragraph-sm"
              textWeight="bold"
              textColor="text-white"
            >
              {errorMessage || 'Loading team details...'}
            </Typography>
            {errorMessage && (
              <Button as={Link} href="/team-formation">
                Back to team formation
              </Button>
            )}
          </div>
        }

        {team && errorMessage && (
          <Typography
            as="p"
            textSize="paragraph-sm"
            textWeight="bold"
            textColor="text-error-500"
            className="mt-6"
          >
            {errorMessage}
          </Typography>
        )}
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
                disabled={isLeavingTeam}
                className="rounded-full border-error-500 bg-error-500 px-5 py-2 text-white hover:border-error-600 hover:bg-error-600"
                onClick={handleLeaveTeam}
              >
                {isLeavingTeam ? 'Leaving...' : 'Leave team'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CreateTeamPage;
