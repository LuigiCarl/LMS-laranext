import { Main } from "@/components/craft";
import Hero from "@/components/landingui/hero";
import Feature from "@/components/landingui/features";
import Navbar from "@/components/landingui/navbar";
import Footer from "@/components/landingui/footers";
import CTA from "@/components/landingui/cta";


export default function Home() {
  return (
    <Main>
      <Navbar />
      <Hero />
      <Feature />
      <CTA />
      <Footer />     
    </Main>
  );
}
