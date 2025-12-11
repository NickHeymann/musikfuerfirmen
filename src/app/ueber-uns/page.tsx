"use client";

import { useState } from "react";
import Image from "next/image";
import { getAssetPath } from "@/lib/config";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

const jonasTimeline: TimelineEvent[] = [
  { year: "2002", title: "Erste Gitarre", description: "Mit 7 Jahren beginnt die musikalische Reise" },
  { year: "2008", title: "Erste Bandgründung", description: "Schulband und erste Auftritte in Hamburg" },
  { year: "2014", title: "Professionelle Bühnentechnik", description: "Ausbildung zum Veranstaltungstechniker" },
  { year: "2016", title: "Tour-Techniker", description: "Auf Tour mit Revolverheld und Adel Tawil" },
  { year: "2019", title: "Coverband-Karriere", description: "Hunderte Events mit verschiedenen Formationen" },
  { year: "2024", title: "musikfürfirmen.de", description: "Gründung - Musik und Technik aus einer Hand" },
];

const nickTimeline: TimelineEvent[] = [
  { year: "1998", title: "Musik im Blut", description: "Aufgewachsen mit Instrumenten und Melodien" },
  { year: "2010", title: "Erste Kamera", description: "Entdeckung der Videografie und Storytelling" },
  { year: "2016", title: "Musikstudium", description: "Professionelle Ausbildung in Musik und Medien" },
  { year: "2019", title: "Selbständigkeit", description: "Gründung als Videograf und Marketingberater" },
  { year: "2022", title: "100M+ Views", description: "Virale Event-Videos auf Social Media" },
  { year: "2024", title: "musikfürfirmen.de", description: "Marketing und visuelle Identität" },
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
          {/* Punkt auf der Linie */}
          <div
            className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full border-4 transform -translate-x-1/2 z-10"
            style={{ backgroundColor: color, borderColor: color }}
          />

          {/* Content */}
          <div className={`ml-12 md:ml-0 md:w-[45%] ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"}`}>
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

  const openCalculator = () => {
    window.dispatchEvent(new CustomEvent("openMFFCalculator"));
  };

  return (
    <div className="bg-white min-h-screen" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Hero Section */}
      <section className="pt-20 pb-16 md:pt-28 md:pb-20 bg-gradient-to-b from-[#f8fffe] to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#1a1a1a] mb-6">
            Zwei Musiker.<br />
            <span className="text-[#0D7A5F]">Eine Mission.</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#666] max-w-2xl mx-auto leading-relaxed font-light">
            Euer Firmenevent verdient Musik, die in Erinnerung bleibt.
          </p>
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

      {/* Story Section */}
      <section className="py-20 md:py-28">
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
              <p className="text-[#555] text-sm leading-relaxed max-w-sm mx-auto">
                Mit 7 Jahren die erste Gitarre, seitdem auf der Bühne. Als Tour-Techniker war ich mit
                Revolverheld und Adel Tawil unterwegs. Heute koordiniere ich Band und Technik – und spiele selbst mit.
              </p>
              <div className="flex justify-center gap-2 mt-4">
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
              <p className="text-[#555] text-sm leading-relaxed max-w-sm mx-auto">
                Nach dem Musikstudium habe ich mich als Videograf selbständig gemacht. Meine Event-Videos
                haben über 100 Millionen Aufrufe gesammelt. Heute kümmere ich mich um alles, was ihr seht.
              </p>
              <div className="flex justify-center gap-2 mt-4">
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

      {/* Timeline Section */}
      <section className="py-20 md:py-28">
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
          <div className="relative">
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
      <section className="py-20 md:py-28 bg-[#f9faf9]">
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
