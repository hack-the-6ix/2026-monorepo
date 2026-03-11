import Section from '../components/Section';
import AboutStats from './about_stats/page';
import FAQ from './faq_questions/page';
import Hero from './hero/page';
import Projects from './past_projects/page';
import Sponsors from './sponsors/page';
import Team from './team/page';

export default function Home() {
  const colors = {
    navy: '#12102F',
    purple: '#423994',
    teal: '#0D7F75',
    gold: '#D68D05',
    orange: '#BA6600',
    footer: '#BD375C',
  };

  return (
    <main className="max-w-screen overflow-x-hidden">
      <Section id="hero" baseColor={colors.navy}>
        <Hero />
      </Section>

      <Section id="about" baseColor={colors.navy} nextColor={colors.purple}>
        <AboutStats />
      </Section>

      <Section id="sponsors" baseColor={colors.purple} nextColor={colors.teal}>
        <Sponsors />
      </Section>

      <Section id="projects" baseColor={colors.teal} nextColor={colors.gold}>
        <Projects />
      </Section>

      <Section id="faq" baseColor={colors.gold} nextColor={colors.orange}>
        <FAQ />
      </Section>

      <Section id="team" baseColor={colors.orange} nextColor={colors.footer}>
        <Team />
      </Section>
    </main>
  );
}
