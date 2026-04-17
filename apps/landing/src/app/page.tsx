import RadishScroll from '@/components/RadishScroll';
import AboutStats from './_about_stats';
import FAQ from './_faq_questions';
import Hero from './_hero';
import Projects from './_past_projects';
import Sponsors from './_sponsors';
import Team from './_team';

export default function Home() {
  return (
    <main className="max-w-screen overflow-x-hidden bg-[#12102F]">
      <div className="hidden min-[1050px]:block">
        <RadishScroll />
      </div>

      <Hero />
      <AboutStats />
      <Sponsors />
      <Projects />
      <FAQ />
      <Team />
    </main>
  );
}
