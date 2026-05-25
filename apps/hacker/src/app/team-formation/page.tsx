import { Button, HyperLink, Input, Typography } from '@hackthe6ix/ui';
import Link from 'next/link';

const TeamFormationPage = () => {
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
          Hi Michael!
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
          <span className=" text-[#F6BD55]">---- at 11:59PM EST.</span>
        </Typography>

        <form className="mt-12 flex w-full max-w-md flex-col items-stretch gap-6 md:mt-8 md:max-w-xl md:flex-row md:items-end md:justify-center md:gap-4">
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
              }}
              className="w-full"
              inputBoxClassName="border-transparent bg-[#3C3564] px-5 py-3 text-white"
            />
          </div>

          <Button
            as={Link}
            href="/team"
            className="w-full rounded-full border-primary-500 bg-primary-500 px-6 py-3 text-white hover:border-primary-600 hover:bg-primary-600 md:w-auto md:min-w-32"
          >
            Join team
          </Button>
        </form>

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
          >
            Create a team
          </HyperLink>
        </div>

        <Typography
          as="p"
          textSize="paragraph-lg"
          textWeight="regular"
          textColor="text-white"
          className="mt-26 max-w-md leading-snug text-white/55 md:hidden"
        >
          Please note that team formation is non-committal and primarily used
          for admission for application period. We cannot guarantee that
          everyone on a team will be granted admission to Hack the 6ix. Official
          hacking teams are determined by the teams submitted to the Hack the
          6ix on Devpost on the weekend of the event.
        </Typography>

        <Typography
          as="p"
          textSize="label"
          textWeight="regular"
          textColor="text-white"
          className="mt-28 hidden max-w-3xl leading-relaxed md:block"
        >
          Please note that team formation is non-committal and primarily used
          for admission for application period. We cannot guarantee that
          everyone on a team will be granted admission to Hack the 6ix. Official
          hacking teams are determined by the teams submitted to the Hack the
          6ix on Devpost on the weekend of the event.
        </Typography>
      </div>
    </section>
  );
};

export default TeamFormationPage;
