import { Details } from './details';
import { Rating } from './rating';

export default function Footer() {
  return (
    <footer className="bg-team-floor-to py-12 px-content-padding">
      <div className="flex flex-col gap-12 min-w-1 max-w-content m-auto">
        <Rating />
        <Details />
      </div>
    </footer>
  );
}
