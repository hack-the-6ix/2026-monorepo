'use client';

import { FormEvent, useEffect, useState } from 'react';
import { Button, Input, Typography } from '@hackthe6ix/ui';
import Image from 'next/image';

import {
  createTeam,
  getTeamDetails,
  joinTeam,
  leaveOrRemoveTeamMember,
  TeamDetails,
  TeamMember,
} from '@/actions';
import { getApiErrorMessage } from '@/client';
import { useHacker } from '@/context/HackerContext';

const getMemberDisplayName = (member: TeamMember) => {
  const fullName = [member.firstName, member.lastName]
    .filter(Boolean)
    .join(' ');

  return fullName || member.userId;
};

function JoinForm({
  firstName,
  onTeamChange,
}: {
  firstName: string | null;
  onTeamChange: () => void;
}) {
  const [teamCode, setTeamCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isJoiningTeam, setIsJoiningTeam] = useState(false);
  const [isCreatingTeam, setIsCreatingTeam] = useState(false);

  const handleJoinTeam = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTeamCode = teamCode.trim();
    if (!trimmedTeamCode) {
      setErrorMessage('Please enter a team code.');
      return;
    }

    try {
      setIsJoiningTeam(true);
      setErrorMessage('');
      await joinTeam(trimmedTeamCode);
      onTeamChange();
    } catch (error) {
      setErrorMessage(
        getApiErrorMessage(
          error,
          'Unable to join that team. Please check the team code.',
        ),
      );
    } finally {
      setIsJoiningTeam(false);
    }
  };

  const handleCreateTeam = async () => {
    try {
      setIsCreatingTeam(true);
      setErrorMessage('');
      await createTeam({ teamName: 'Untitled Team' });
      onTeamChange();
    } catch (error) {
      setErrorMessage(
        getApiErrorMessage(
          error,
          'Unable to create a team right now. Please try again.',
        ),
      );
      setIsCreatingTeam(false);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center px-8 py-20 text-center text-white">
      <div className="mx-auto flex w-full max-w-md flex-col items-center md:max-w-5xl">
        <Typography
          as="p"
          textSize="subtitle-sm"
          textWeight="bold"
          textColor="text-white"
          className="mb-4"
        >
          Hi {firstName || 'there'}!
        </Typography>

        <Typography
          as="h1"
          textSize="heading-lg"
          textWeight="bold"
          textColor="text-white"
          className="max-w-5xl text-4xl leading-tight md:text-5xl"
        >
          You are currently a solo hacker.
        </Typography>

        <Typography
          as="p"
          textSize="paragraph-lg"
          textWeight="regular"
          textColor="text-white"
          className="mt-5 max-w-md leading-snug md:max-w-4xl"
        >
          Don&apos;t have a team? No worries! You can create your own team and
          invite your friends, join a team, or continue solo. You can change
          this at any point before{' '}
          <span className="text-[#F6BD55]">June 26th at 11:59 PM ET.</span>
        </Typography>

        <form
          className="mt-12 flex w-full max-w-md flex-col items-stretch gap-6 md:mt-8 md:max-w-xl md:flex-row md:items-end md:justify-center md:gap-4"
          onSubmit={handleJoinTeam}
        >
          <div className="w-full md:max-w-64">
            <Typography
              as="label"
              htmlFor="team-code--input"
              textSize="paragraph-sm"
              textWeight="semi-bold"
              textColor="text-white"
              className="mb-1 block pl-3 text-left text-white"
            >
              Team code<span className="text-error-500">*</span>
            </Typography>
            <Input
              id="team-code"
              name="team-code"
              label="Team code"
              hideLabel
              required
              input={{
                placeholder: 'ie. ABCDEFG',
                autoComplete: 'off',
                className: 'placeholder:text-white',
                value: teamCode,
                onChange: (event) => {
                  setTeamCode(event.target.value);
                },
              }}
              className="w-full"
              inputBoxClassName="border-transparent bg-[#3C3564] px-5 py-3 text-white"
            />
          </div>

          <Button
            type="submit"
            disabled={isJoiningTeam || isCreatingTeam}
            className="w-full rounded-full border-primary-500 bg-primary-500 px-6 py-3 text-white hover:border-primary-600 hover:bg-primary-600 md:w-auto md:min-w-32"
          >
            {isJoiningTeam ? 'Joining...' : 'Join team'}
          </Button>
        </form>

        {errorMessage && (
          <Typography
            as="p"
            textSize="paragraph-sm"
            textWeight="bold"
            textColor="text-error-500"
            className="mt-4"
          >
            {errorMessage}
          </Typography>
        )}

        <div className="mt-6 flex w-full max-w-md flex-wrap items-center justify-center gap-x-2 gap-y-1">
          <Typography
            as="span"
            textSize="paragraph-sm"
            textWeight="bold"
            textColor="text-white"
          >
            Don&apos;t have a team code?
          </Typography>
          <button
            className="px-1 text-[#F6BD55] underline underline-offset-2"
            disabled={isCreatingTeam || isJoiningTeam}
            onClick={(event) => {
              event.preventDefault();
              if (!isCreatingTeam && !isJoiningTeam) {
                void handleCreateTeam();
              }
            }}
          >
            {isCreatingTeam ? 'Creating...' : 'Create a team'}
          </button>
        </div>

        <Typography
          as="p"
          textSize="paragraph-lg"
          textWeight="regular"
          textColor="text-white"
          className="mt-26 max-w-md leading-snug text-white/55 md:hidden"
        >
          Applications are reviewed individually and your team&apos;s
          application has no bearing on your admission decision. The team you
          join on the dashboard is non-binding and doesn&apos;t have to be the
          team you ultimately hack with. Official teams are finalized on Devpost
          during the event.
        </Typography>

        <Typography
          as="p"
          textSize="label"
          textWeight="regular"
          textColor="text-white"
          className="mt-28 hidden max-w-3xl leading-relaxed md:block"
        >
          Applications are reviewed individually and your team&apos;s
          application has no bearing on your admission decision. The team you
          join on the dashboard is non-binding and doesn&apos;t have to be the
          team you ultimately hack with. Official teams are finalized on Devpost
          during the event.
        </Typography>
      </div>
    </section>
  );
}

function TeamDetailsView({
  team,
  userId,
  onLeave,
}: {
  team: TeamDetails;
  userId: string;
  onLeave: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const [isFadingCopied, setIsFadingCopied] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [isLeavingTeam, setIsLeavingTeam] = useState(false);
  const [leaveError, setLeaveError] = useState('');

  const handleCopyTeamCode = async () => {
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
    try {
      setIsLeavingTeam(true);
      setLeaveError('');
      await leaveOrRemoveTeamMember(team.teamId, userId);
      onLeave();
    } catch (error) {
      setLeaveError(
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
          Your Team
        </Typography>

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
                {getMemberDisplayName(member)}
              </Typography>
            ))}
          </div>
        </div>

        {leaveError && (
          <Typography
            as="p"
            textSize="paragraph-sm"
            textWeight="bold"
            textColor="text-error-500"
            className="mt-6"
          >
            {leaveError}
          </Typography>
        )}

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
}

export default function TeamDashboard() {
  const { hackerRole, profile, loading, refresh } = useHacker();
  const [team, setTeam] = useState<TeamDetails | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [firstName, setFirstName] = useState<string | null>(null);

  useEffect(() => {
    if (loading) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFirstName(profile?.firstName || profile?.email || 'Bestie');

    const teamId = hackerRole?.teamId;
    if (!teamId) {
      setTeam(null);
      setErrorMessage('');
      return;
    }

    const loadTeam = async () => {
      try {
        const details = await getTeamDetails(teamId);
        setTeam(details);
        setErrorMessage('');
      } catch {
        setErrorMessage('Unable to load your team details.');
      }
    };

    void loadTeam();
  }, [loading, hackerRole, profile]);

  const handleTeamChange = () => {
    void refresh();
  };

  if (loading) return null;

  if (errorMessage && !team) {
    return (
      <section className="flex min-h-screen items-center justify-center px-6 py-20 text-center text-white">
        <div className="flex flex-col items-center gap-4">
          <Typography
            as="p"
            textSize="paragraph-sm"
            textWeight="bold"
            textColor="text-white"
          >
            {errorMessage}
          </Typography>
        </div>
      </section>
    );
  }

  if (team) {
    return (
      <TeamDetailsView
        team={team}
        userId={profile?.userId ?? ''}
        onLeave={handleTeamChange}
      />
    );
  }

  return <JoinForm firstName={firstName} onTeamChange={handleTeamChange} />;
}
