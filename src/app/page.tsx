import Hero from "@/components/Hero";
import ServiceCards from "@/components/ServiceCards";
import ProcessSteps from "@/components/ProcessSteps";
import TeamSection from "@/components/TeamSection";
import FAQ from "@/components/FAQ";
import LogoAnimation from "@/components/LogoAnimation";

export default function Home() {
  return (
    <>
      <Hero />

      <section id="waswirbieten" className="bg-white overflow-visible">
        <ServiceCards />
      </section>

      <section id="service" className="py-0 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mt-[43px] mb-[60px]">
            <h2
              className="text-[3rem] font-semibold text-[#1a1a1a] mb-[10px]"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Musik und Technik? Läuft.
            </h2>
            <p
              className="text-[1.5rem] font-normal text-[#1a1a1a] max-w-[600px] mx-auto mb-2"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Von uns geplant. Von euch gefeiert.
            </p>
          </div>
          <ProcessSteps />
        </div>
      </section>

      <section id="wir" className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="text-center mt-[63px] px-5"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <h2 className="text-[3rem] font-semibold text-[#1a1a1a] m-0">
              Moin aus Hamburg!
            </h2>
          </div>
          <TeamSection />
        </div>
      </section>

      <section id="faq" className="bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-center text-[3rem] font-semibold mb-[120px] tracking-[-1px] text-black mt-[-12px]"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            FAQ
          </h2>
          <FAQ />
        </div>
      </section>

      <section className="py-[92px] pb-[77px] bg-white relative z-[1]">
        <LogoAnimation />
      </section>
    </>
  );
}
