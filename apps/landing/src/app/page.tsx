import AboutStats from './_about_stats/page';
import FAQ from './_faq_questions/page';
import Hero from './_hero/page';
import Projects from './_past_projects/page';
import Sponsors from './_sponsors/page';
import Team from './_team/page';

export default function Home() {
  return (
    <main className="max-w-screen overflow-x-hidden">
      <Hero />
      <AboutStats />
      <Sponsors />
      <Projects />
      <FAQ />
      <Team />
    </main>
  );
}
