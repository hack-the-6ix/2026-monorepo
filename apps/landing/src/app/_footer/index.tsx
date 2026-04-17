import { Typography } from '@hackthe6ix/ui';

import Bunnies from './bunnies';
import Cat from './cat';
import { Details } from './details';

export default function Footer() {
  return (
    <footer className="footer">
      <Cat />
      <div className="drop-shadow-[0_-0.25rem_0.125rem] drop-shadow-black/5">
        <div className="bg-linear-to-b from-footer-floor-from to-footer-floor-to flex justify-center md:-mt-62 -mt-31 md:pt-62 pt-31 footer-clip">
          <div className="flex flex-col min-w-1 max-w-content m-auto">
            <div className="px-content-padding">
              <Typography textSize="heading-sm" textColor="text-white" as="h2">
                Meet The <span className="text-warning-400">Team</span>!
              </Typography>
            </div>
            <Bunnies />
            <Details />
          </div>
        </div>
      </div>
    </footer>
  );
}
