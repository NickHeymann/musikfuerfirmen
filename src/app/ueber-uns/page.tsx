"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getAssetPath } from "@/lib/config";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  emoji?: string;
}

const jonasTimeline: TimelineEvent[] = [
  { year: "2002", title: "Erste Gitarre", description: "Mit 7 Jahren beginnt die musikalische Reise", emoji: "🎸" },
  { year: "2008", title: "Erste Bandgründung", description: "Schulband und erste Auftritte in Hamburg", emoji: "🎤" },
  { year: "2014", title: "Professionelle Bühnentechnik", description: "Ausbildung zum Veranstaltungstechniker", emoji: "🔧" },
  { year: "2016", title: "Tour-Techniker", description: "Auf Tour mit Revolverheld und Adel Tawil", emoji: "🚐" },
  { year: "2019", title: "Coverband-Karriere", description: "Hunderte Events mit verschiedenen Formationen", emoji: "🎵" },
  { year: "2024", title: "musikfürfirmen.de", description: "Gründung - Musik und Technik aus einer Hand", emoji: "🚀" },
];

const nickTimeline: TimelineEvent[] = [
  { year: "1998", title: "Musik im Blut", description: "Aufgewachsen mit Instrumenten und Melodien", emoji: "🎹" },
  { year: "2010", title: "Erste Kamera", description: "Entdeckung der Videografie und Storytelling", emoji: "📹" },
  { year: "2016", title: "Musikstudium", description: "Professionelle Ausbildung in Musik und Medien", emoji: "🎓" },
  { year: "2019", title: "Selbständigkeit", description: "Gründung als Videograf und Marketingberater", emoji: "💼" },
  { year: "2022", title: "100M+ Views", description: "Virale Event-Videos auf Social Media", emoji: "📈" },
  { year: "2024", title: "musikfürfirmen.de", description: "Marketing und visuelle Identität", emoji: "🚀" },
];

const caseStudies = [
  {
    company: "Tech Solutions GmbH",
    event: "Sommer-Firmenfest 2024",
    guests: 200,
    quote: "Die Band war der absolute Höhepunkt! Die Tanzfläche war die ganze Nacht voll.",
    challenge: "Großes Event mit diversen Altersgruppen - von Azubis bis C-Level",
    solution: "7-köpfige Coverband mit breitem Repertoire (70er bis 2020er), perfekter Mix zwischen Dinner-Musik und Party-Hits",
    result: "98% Zufriedenheit im Feedback, bereits Re-Booking für Weihnachtsfeier",
    image: "/images/case-studies/tech-solutions.jpg"
  },
  {
    company: "Hamburg Logistics Pro",
    event: "25-Jahre-Jubiläum",
    guests: 150,
    quote: "Trotz nur 2 Wochen Vorlaufzeit hat das Team einen unvergesslichen Abend organisiert.",
    challenge: "Extrem kurze Vorlaufzeit (14 Tage), Location ohne Technik",
    solution: "Komplettpaket: Band, PA-Anlage, Licht, Backline - alles aus einer Hand",
    result: "Setup in 3h fertig, Event reibungslos, CEO persönlich begeistert",
    image: "/images/case-studies/logistics-pro.jpg"
  },
  {
    company: "Innovate AG",
    event: "Weihnachtsfeier 2023",
    guests: 120,
    quote: "Das Preis-Leistungs-Verhältnis ist hervorragend. Wir buchen definitiv wieder!",
    challenge: "Budget-bewusstes Startup, aber hohe Qualitäts-Ansprüche",
    solution: "Professional-Paket mit 5-köpfiger Band, transparentes Pricing",
    result: "Innerhalb Budget geblieben, Mitarbeiter wollen jährliches Event",
    image: "/images/case-studies/innovate-ag.jpg"
  }
];

const clientLogos = [
  { name: "Tech Solutions", width: 140 },
  { name: "Hamburg Ventures", width: 160 },
  { name: "Logistics Pro", width: 130 },
  { name: "Innovate AG", width: 150 },
  { name: "Maritime Services", width: 145 },
  { name: "Digital Factory", width: 155 }
];

function Timeline({ events, color }: { events: TimelineEvent[]; color: string }) {
  return (
    <div className="relative">
      {/* Vertikale Linie */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gray-200 transform md:-translate-x-1/2" />

      {events.map((event, index) => (
        <div
          key={event.year}
          className={`relative flex items-start mb-12 last:mb-0 ${
            index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
          }`}
        >
          {/* Punkt auf der Linie mit Emoji */}
          <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 z-10">
            <div
              className="w-12 h-12 rounded-full border-4 flex items-center justify-center text-2xl"
              style={{ backgroundColor: color, borderColor: color }}
            >
              {event.emoji}
            </div>
          </div>

          {/* Content */}
          <div className={`ml-20 md:ml-0 md:w-[45%] ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"}`}>
            <div
              className="inline-block px-3 py-1 rounded-full text-sm font-semibold mb-2"
              style={{ backgroundColor: `${color}20`, color: color }}
            >
              {event.year}
            </div>
            <h4
              className="text-lg font-semibold text-[#1a1a1a] mb-1"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {event.title}
            </h4>
            <p
              className="text-[#666] text-sm"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {event.description}
            </p>
          </div>

          {/* Spacer für die andere Seite */}
          <div className="hidden md:block md:w-[45%]" />
        </div>
      ))}
    </div>
  );
}

export default function UeberUnsPage() {
  const [activeTab, setActiveTab] = useState<"jonas" | "nick">("jonas");
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  const openCalculator = () => {
    window.dispatchEvent(new CustomEvent("openMFFCalculator"));
  };

  // Sticky CTA: Show after scrolling 600px
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCTA(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-white min-h-screen" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Sticky CTA Bar */}
      <div
        className={`fixed top-0 left-0 right-0 bg-[#0D7A5F] text-white py-3 px-4 z-50 shadow-lg transition-transform duration-300 ${
          showStickyCTA ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-sm md:text-base font-medium">
            Gefällt euch, was ihr seht?
          </span>
          <button
            onClick={openCalculator}
            className="bg-white text-[#0D7A5F] px-6 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-all"
          >
            Jetzt anfragen
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-20 pb-16 md:pt-28 md:pb-20 bg-gradient-to-b from-[#f8fffe] to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#1a1a1a] mb-6">
            Zwei Musiker.<br />
            <span className="text-[#0D7A5F]">Eine Mission.</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#666] max-w-2xl mx-auto leading-relaxed font-light mb-8">
            Euer Firmenevent verdient Musik, die in Erinnerung bleibt.
          </p>

          {/* Above-the-Fold CTA */}
          <button
            onClick={openCalculator}
            className="inline-block px-10 py-4 bg-[#0D7A5F] text-white font-semibold rounded-full hover:bg-[#0a6349] transition-all hover:shadow-lg hover:-translate-y-1"
          >
            Unverbindlich anfragen
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { value: "20+", label: "Jahre Bühnenerfahrung" },
              { value: "500+", label: "Events gespielt" },
              { value: "100M+", label: "Video-Aufrufe" },
              { value: "24h", label: "Antwortzeit" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#0D7A5F] mb-1">
                  {stat.value}
                </div>
                <p className="text-sm text-[#666] font-light">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="py-12 bg-[#f9faf9]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-[#999] mb-8 font-medium uppercase tracking-wider">
            Vertrauen uns bereits
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {clientLogos.map((logo) => (
              <div
                key={logo.name}
                className="bg-white px-6 py-4 rounded-lg border border-gray-200 text-[#999] font-semibold text-sm"
                style={{ width: logo.width }}
              >
                {logo.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section - Nick's Reel */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-semibold text-[#1a1a1a] mb-4 text-center">
            100M+ Views sprechen für sich
          </h2>
          <p className="text-center text-[#666] mb-10 max-w-xl mx-auto">
            Nick's Event-Videos erreichen Millionen Menschen. Hier ein kleiner Einblick.
          </p>

          <div className="aspect-video bg-gradient-to-br from-[#D4F4E8] to-[#0D7A5F] rounded-2xl flex items-center justify-center relative overflow-hidden shadow-xl">
            {/* Placeholder for Video - Replace with actual YouTube/Vimeo embed */}
            <div className="text-center text-white">
              <div className="text-6xl mb-4">📹</div>
              <p className="text-xl font-semibold mb-2">Video-Reel kommt hier</p>
              <p className="text-sm opacity-80">YouTube/Vimeo Embed</p>
            </div>
            {/* Example:
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
              title="Event Highlights"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            */}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 md:py-28 bg-[#f9faf9]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-semibold text-[#1a1a1a] mb-10 text-center">
            Warum wir das machen
          </h2>
          <div className="space-y-6 text-[#444] text-lg leading-relaxed">
            <p>
              Wir haben es selbst erlebt: Du organisierst ein Firmenevent, buchst eine Band über
              irgendeinen Katalog – und hoffst einfach, dass es gut wird.
            </p>
            <p className="font-semibold text-[#1a1a1a]">
              Manchmal wird es das. Oft nicht.
            </p>
            <p>
              Weil Musik bei den meisten Agenturen nebenbei läuft. Weil niemand checkt, ob die
              Band zum Anlass passt. Weil am Ende keiner verantwortlich ist, wenn etwas schiefgeht.
            </p>
            <p>
              Bei uns ist das anders. Wir stehen selbst auf der Bühne. Wir kennen jeden Künstler
              persönlich. Und wir sind vor Ort, wenn es darauf ankommt.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-semibold text-[#1a1a1a] mb-4 text-center">
            Erfolgsgeschichten
          </h2>
          <p className="text-center text-[#666] mb-16 max-w-xl mx-auto">
            Von der Planung bis zum letzten Ton – so haben wir Firmenevents unvergesslich gemacht.
          </p>

          <div className="space-y-16">
            {caseStudies.map((study, index) => (
              <div
                key={study.company}
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
              >
                {/* Image Placeholder */}
                <div className="w-full md:w-1/2">
                  <div className="aspect-[4/3] bg-gradient-to-br from-[#D4F4E8] to-[#0D7A5F] rounded-2xl flex items-center justify-center shadow-lg">
                    <div className="text-white text-center">
                      <div className="text-5xl mb-2">🎉</div>
                      <p className="text-sm opacity-80">{study.company}</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full md:w-1/2">
                  <div className="inline-block px-3 py-1 bg-[#D4F4E8] text-[#0D7A5F] rounded-full text-xs font-semibold mb-3">
                    {study.guests} Gäste
                  </div>
                  <h3 className="text-2xl font-bold text-[#1a1a1a] mb-2">{study.company}</h3>
                  <p className="text-[#0D7A5F] font-medium mb-4">{study.event}</p>

                  <blockquote className="text-[#444] italic mb-6 pl-4 border-l-4 border-[#0D7A5F]">
                    "{study.quote}"
                  </blockquote>

                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-semibold text-[#1a1a1a]">Herausforderung:</span>
                      <p className="text-[#666]">{study.challenge}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-[#1a1a1a]">Unsere Lösung:</span>
                      <p className="text-[#666]">{study.solution}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-[#1a1a1a]">Ergebnis:</span>
                      <p className="text-[#666]">{study.result}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section with Photos */}
      <section className="py-20 md:py-28 bg-[#f9faf9]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-semibold text-[#1a1a1a] mb-16 text-center">
            Das Team
          </h2>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            {/* Jonas */}
            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full bg-[#D4F4E8]" />
                <Image
                  src={getAssetPath("/images/team/jonas.png")}
                  alt="Jonas Glamann"
                  fill
                  className="object-cover object-top rounded-full scale-110"
                  sizes="192px"
                />
              </div>
              <h3 className="text-2xl font-semibold text-[#1a1a1a] mb-1">Jonas Glamann</h3>
              <p className="text-[#0D7A5F] font-medium mb-1">Der Kreative</p>
              <p className="text-[#999] text-sm mb-4">Euer Kontakt vor Ort</p>
              <p className="text-[#555] text-sm leading-relaxed max-w-sm mx-auto mb-4">
                Mit 7 Jahren die erste Gitarre, seitdem auf der Bühne. Als Tour-Techniker war ich mit
                Revolverheld und Adel Tawil unterwegs. Heute koordiniere ich Band und Technik – und spiele selbst mit.
              </p>

              {/* Contact Icons */}
              <div className="flex justify-center gap-3 mb-4">
                <a
                  href="https://linkedin.com/in/jonasglamann"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-[#0D7A5F] hover:text-white hover:border-[#0D7A5F] transition-all"
                  title="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a
                  href="tel:+4917012345678"
                  className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-[#0D7A5F] hover:text-white hover:border-[#0D7A5F] transition-all"
                  title="Telefon"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/4917012345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all"
                  title="WhatsApp"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </a>
              </div>

              <div className="flex justify-center gap-2 flex-wrap">
                {["Gitarrist", "Tour-Techniker", "Koordination"].map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-white text-[#666] text-xs rounded-full border border-gray-200">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Nick */}
            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full bg-[#D4F4E8]" />
                <Image
                  src={getAssetPath("/images/team/nick.png")}
                  alt="Nick Heymann"
                  fill
                  className="object-cover object-top rounded-full scale-110"
                  sizes="192px"
                />
              </div>
              <h3 className="text-2xl font-semibold text-[#1a1a1a] mb-1">Nick Heymann</h3>
              <p className="text-[#0D7A5F] font-medium mb-1">Der Macher</p>
              <p className="text-[#999] text-sm mb-4">Euer Ansprechpartner</p>
              <p className="text-[#555] text-sm leading-relaxed max-w-sm mx-auto mb-4">
                Nach dem Musikstudium habe ich mich als Videograf selbständig gemacht. Meine Event-Videos
                haben über 100 Millionen Aufrufe gesammelt. Heute kümmere ich mich um alles, was ihr seht.
              </p>

              {/* Contact Icons */}
              <div className="flex justify-center gap-3 mb-4">
                <a
                  href="https://linkedin.com/in/nickheymann"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-[#0D7A5F] hover:text-white hover:border-[#0D7A5F] transition-all"
                  title="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a
                  href="tel:+4917087654321"
                  className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-[#0D7A5F] hover:text-white hover:border-[#0D7A5F] transition-all"
                  title="Telefon"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/4917087654321"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all"
                  title="WhatsApp"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </a>
              </div>

              <div className="flex justify-center gap-2 flex-wrap">
                {["Videograf", "Marketing", "Musikstudium"].map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-white text-[#666] text-xs rounded-full border border-gray-200">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Behind the Scenes Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-semibold text-[#1a1a1a] mb-4 text-center">
            Behind the Scenes
          </h2>
          <p className="text-center text-[#666] mb-12 max-w-xl mx-auto">
            So sieht es aus, wenn wir euer Event vorbereiten.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Soundcheck", desc: "3h vor Event-Start prüfen wir jedes Detail", emoji: "🎚️" },
              { title: "Technik-Setup", desc: "PA, Licht, Backline – alles perfekt aufeinander abgestimmt", emoji: "🔊" },
              { title: "Final Briefing", desc: "Letzte Absprachen mit Band und Veranstalter", emoji: "📋" }
            ].map((item) => (
              <div key={item.title} className="bg-[#f9faf9] rounded-xl p-6 text-center border border-gray-100">
                <div className="text-5xl mb-4">{item.emoji}</div>
                <h3 className="text-lg font-semibold text-[#1a1a1a] mb-2">{item.title}</h3>
                <p className="text-sm text-[#666] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 md:py-28 bg-[#f9faf9]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-semibold text-[#1a1a1a] mb-6 text-center">
            Unser Weg
          </h2>
          <p className="text-center text-[#666] mb-12 max-w-xl mx-auto">
            Von den ersten Akkorden bis zur Gründung von musikfürfirmen.de – so haben wir hierher gefunden.
          </p>

          {/* Tab Switcher */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setActiveTab("jonas")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === "jonas"
                    ? "bg-[#0D7A5F] text-white shadow-sm"
                    : "text-[#666] hover:text-[#1a1a1a]"
                }`}
              >
                Jonas
              </button>
              <button
                onClick={() => setActiveTab("nick")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === "nick"
                    ? "bg-[#0D7A5F] text-white shadow-sm"
                    : "text-[#666] hover:text-[#1a1a1a]"
                }`}
              >
                Nick
              </button>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative min-h-[600px]">
            <div className={`transition-opacity duration-300 ${activeTab === "jonas" ? "opacity-100" : "opacity-0 absolute inset-0 pointer-events-none"}`}>
              <Timeline events={jonasTimeline} color="#0D7A5F" />
            </div>
            <div className={`transition-opacity duration-300 ${activeTab === "nick" ? "opacity-100" : "opacity-0 absolute inset-0 pointer-events-none"}`}>
              <Timeline events={nickTimeline} color="#0D7A5F" />
            </div>
          </div>
        </div>
      </section>

      {/* Wofür stehen wir? */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-semibold text-[#1a1a1a] mb-16 text-center">
            Wofür stehen wir?
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: "Persönlich",
                description: "Kein Callcenter, keine Katalog-Auswahl. Ihr sprecht direkt mit uns – von der ersten Anfrage bis zum letzten Ton.",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: "Abgesichert",
                description: "Ausfallgarantie, Haftpflicht, Ersatzkünstler – wir denken an alles, damit ihr euch auf euer Event konzentrieren könnt.",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "Vor Ort",
                description: "Jonas ist Teil der Band. Wenn etwas ist, sind wir da – nicht am Telefon, sondern direkt bei euch.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-[#D4F4E8] flex items-center justify-center text-[#0D7A5F]">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#1a1a1a] mb-3">{item.title}</h3>
                <p className="text-[#666] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-28 bg-[#f9faf9]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-semibold text-[#1a1a1a] mb-12 text-center">
            Häufige Fragen
          </h2>

          <div className="space-y-6">
            {[
              {
                q: "Seid ihr selbst die Band?",
                a: "Jonas spielt in verschiedenen Coverbands mit. Für euer Event wählen wir die perfekte Formation aus unserem Netzwerk – abgestimmt auf euren Musikgeschmack und die Gästezahl."
              },
              {
                q: "Was passiert, wenn jemand ausfällt?",
                a: "Wir haben immer Ersatzmusiker on standby. In 5 Jahren hatten wir null Ausfälle, weil wir rechtzeitig vorplanen und ein großes Netzwerk haben."
              },
              {
                q: "Bringt ihr auch die Technik mit?",
                a: "Ja, PA-Anlage, Licht, Backline – alles dabei. Ihr braucht euch um nichts zu kümmern."
              },
              {
                q: "Wie weit im Voraus muss ich buchen?",
                a: "Idealerweise 3-6 Monate. Aber wir haben auch schon Events mit 2 Wochen Vorlauf gestemmt. Fragt einfach an!"
              }
            ].map((faq, index) => (
              <details key={index} className="group bg-white rounded-xl p-6 border border-gray-200">
                <summary className="flex items-center justify-between cursor-pointer font-semibold text-[#1a1a1a] text-lg">
                  {faq.q}
                  <svg className="w-5 h-5 text-[#0D7A5F] group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-[#666] leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-[#0D7A5F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            Lass uns reden
          </h2>
          <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto leading-relaxed">
            Erzähl uns von deinem Event – unverbindlich und kostenlos.
            Innerhalb von 24 Stunden hast du unser Angebot.
          </p>
          <button
            onClick={openCalculator}
            className="inline-block px-10 py-4 bg-white text-[#0D7A5F] font-semibold rounded-full hover:bg-gray-100 transition-all hover:shadow-lg hover:-translate-y-1"
          >
            Jetzt anfragen
          </button>
        </div>
      </section>
    </div>
  );
}
