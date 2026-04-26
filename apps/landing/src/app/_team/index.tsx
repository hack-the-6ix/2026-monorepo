import { Typography } from '@hackthe6ix/ui';

import Bunnies from './bunnies';
import Cat from './cat';

export default function Team() {
  return (
    <section className="team flex flex-col -mb-0.5 relative">
      <div className="drop-shadow-[0_1rem_1rem] drop-shadow-black/5 z-1">
        <div className="bg-team-wall-from md:h-32 h-12 w-full team-top-clip" />
      </div>
      <div className="w-[calc(100%-var(--spacing-team-wall-bend))] inset-0 left-auto h-full bg-linear-to-r from-black/5 to-transparent to-20% absolute" />
      <Cat />
      <div className="z-30 drop-shadow-[0_-0.25rem_0.125rem] drop-shadow-black/5">
        <div className="bg-linear-to-b from-team-floor-from to-team-floor-to flex justify-center md:-mt-62 -mt-31 md:pt-62 pt-31 team-bottom-clip">
          <div className="flex flex-col min-w-1 max-w-content m-auto">
            <div className="px-content-padding">
              <Typography textSize="heading-sm" textColor="text-white" as="h2">
                Meet The <span className="text-warning-400">Team</span>!
              </Typography>
            </div>
            <Bunnies />
          </div>
        </div>
      </div>
    </section>
  );
}
