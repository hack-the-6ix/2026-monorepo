import RadishScroll from '@/components/RadishScroll';
import AboutStats from './_about_stats';
import FAQ from './_faq_questions';
import Hero from './_hero';
import Projects from './_past_projects';
import Sponsors from './_sponsors';
import Team from './_team';

export default function Home() {
  return (
    <main className="max-w-screen overflow-x-hidden">
      <div className="hidden md:block">
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
