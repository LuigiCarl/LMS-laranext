import { Main } from "@/components/craft";
import Hero from "@/components/hero";
import Feature from "@/components/features";
import { Breadcrumbs } from "@/components/breadcrumbs";
import Footer from "@/components/footers";
import CTA from "@/components/cta";


export default function Home() {
  return (
    <Main>
      <Breadcrumbs />
      <Hero />
      <Feature />
      <CTA />
      <Footer />
      
    </Main>
  );
}
