import About from "@/components/About";
import Capabilities from "@/components/Capabilities";
import Contact from "@/components/Contact";
import DigitalTwin from "@/components/DigitalTwin";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Journey from "@/components/Journey";
import Marquee from "@/components/Marquee";
import Nav from "@/components/Nav";
import TwinSection from "@/components/TwinSection";
import Work from "@/components/Work";
import { profile } from "@/lib/data";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.fullName,
  jobTitle: profile.role,
  email: profile.email,
  address: { "@type": "PostalAddress", addressLocality: "Curitiba", addressCountry: "BR" },
  url: "http://localhost:3000",
  sameAs: [profile.linkedin, profile.github],
  worksFor: { "@type": "Organization", name: "Dig Insights" },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <div className="shell"><div className="rule" /></div>
        <Journey />
        <div className="shell"><div className="rule" /></div>
        <Capabilities />
        <div className="shell"><div className="rule" /></div>
        <Work />
        <div className="shell"><div className="rule" /></div>
        <TwinSection />
        <Contact />
      </main>
      <Footer />
      <DigitalTwin />
    </>
  );
}
