import RadishScroll from '@/components/RadishScroll';
import AboutStats from './_about_stats';
import FAQ from './_faq_questions';
import Footer from './_footer';
import Hero from './_hero';
import Nav from './_nav';
import Projects from './_past_projects';
import Sponsors from './_sponsors';
import Team from './_team';

export default function Home() {
  return (
    <main className="max-w-screen overflow-x-hidden bg-[linear-gradient(to_bottom,#12102F_3%,#423994_23%,#355190_29%,#0D7F75_37%,#0A7E74_52%,#2A8B78_57%,#D68D05_60%,#BA6600_79%)]">
      <Nav />

      <div className="hidden min-[1050px]:block">
        <RadishScroll />
      </div>

      <Hero />
      <AboutStats />
      <Sponsors />
      <Projects />
      <FAQ />
      <Team />
      <Footer />
    </main>
  );
}
