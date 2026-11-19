import { StructuredData } from '../components/StructuredData';
import { About } from '../sections/About';
import { Contact } from '../sections/Contact';
import { FAQ } from '../sections/FAQ';
import { Hero } from '../sections/Hero';
import { HowItWorks } from '../sections/HowItWorks';
import { Selection } from '../sections/Selection';
import { Services } from '../sections/Services';
import { Testimonials } from '../sections/Testimonials';
import { TrustCards } from '../sections/TrustCards';
import { Vacation } from '../sections/Vacation';

export function Home() {
  return (
    <main id="inicio">
      <StructuredData />
      <Hero />
      <TrustCards />
      <HowItWorks />
      <Services />
      <Selection />
      <Vacation />
      <Testimonials />
      <About />
      <FAQ />
      <Contact />
    </main>
  );
}
