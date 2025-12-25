import { Hero } from "@/components/sections/Hero";
import { TrustedBrands } from "@/components/sections/TrustedBrands";
import { USP } from "@/components/sections/USP";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { Portfolio } from "@/components/sections/Portfolio";
import { Manufaktur } from "@/components/sections/Manufaktur";
import { Services } from "@/components/sections/Services";
import { Franchise } from "@/components/sections/Franchise";
import { Newsletter } from "@/components/sections/Newsletter";
import { Pricing } from "@/components/sections/Pricing";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { TopNav } from "@/components/TopNav";

const Index = () => {
  return (
    <div className="min-h-screen">
      <TopNav />
      <Hero />
      <TrustedBrands />
      <USP />
      <ProductGrid />
      <Portfolio />
      <Manufaktur />
      <Services />
      <Franchise />
      <Newsletter />
      <Pricing />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
