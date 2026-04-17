import AboutStats from './_about_stats';
import FAQ from './_faq_questions';
import Hero from './_hero';
import Projects from './_past_projects';
import Sponsors from './_sponsors';

export default function Home() {
  return (
    <main className="max-w-screen overflow-x-hidden">
      <Hero />
      <AboutStats />
      <Sponsors />
      <Projects />
      <FAQ />
    </main>
  );
}
