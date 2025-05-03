import { Main } from "@/components/craft";
import Hero from "@/components/hero";
import Feature from "@/components/features";
import Navbar from "@/components/navbar";
import Footer from "@/components/footers";
import CTA from "@/components/cta";


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
