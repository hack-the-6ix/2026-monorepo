'use client';

import { FormEvent, useEffect, useState } from 'react';
import { Button, HyperLink, Input, Typography } from '@hackthe6ix/ui';
import { useRouter } from 'next/navigation';

import { createTeam, joinTeam } from '@/actions';
import { getApiErrorMessage } from '@/client';
import { useHacker } from '@/context/HackerContext';

const TeamFormationPage = () => {
  const router = useRouter();
  const [teamCode, setTeamCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isJoiningTeam, setIsJoiningTeam] = useState(false);
  const [isCreatingTeam, setIsCreatingTeam] = useState(false);
  const [firstName, setFirstName] = useState<string | null>(null);
  const { hackerRole, profile, loading, refresh } = useHacker();

  useEffect(() => {
    if (loading) return;
    if (hackerRole?.teamId) {
      router.push('/team');
    }
    const loadCurrentUserName = async () => {
      try {
        setFirstName(profile?.firstName || profile?.email || 'Bestie');
      } catch {
        setFirstName(null);
      }
    };

    void loadCurrentUserName();
  }, [hackerRole, profile, loading, router]);

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
      await refresh();
      router.push('/team');
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
      await refresh();
      router.push('/create-team');
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
    <section className="flex min-h-screen items-center justify-center px-8 py-20 text-center text-white md:px-6">
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
          <span className=" text-[#F6BD55]">June 26th at 11:59 PM ET.</span>
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
          <HyperLink
            href="/create-team"
            className="px-1 text-[#F6BD55] underline underline-offset-2"
            onClick={(event) => {
              event.preventDefault();
              if (!isCreatingTeam && !isJoiningTeam) {
                void handleCreateTeam();
              }
            }}
          >
            {isCreatingTeam ? 'Creating...' : 'Create a team'}
          </HyperLink>
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
};

export default TeamFormationPage;
