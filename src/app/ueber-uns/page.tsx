import type { Metadata } from "next";
import Link from "next/link";
import TeamMemberCard from "@/components/TeamMemberCard";

export const metadata: Metadata = {
  title: "Über Uns",
  description:
    "Lerne das Team hinter musikfürfirmen.de kennen. Jonas und Nick bringen zusammen über 20 Jahre Erfahrung in Musik, Events und Marketing mit.",
  openGraph: {
    title: "Über Uns | musikfürfirmen.de",
    description:
      "Lerne das Team hinter musikfürfirmen.de kennen. Jonas und Nick bringen zusammen über 20 Jahre Erfahrung in Musik, Events und Marketing mit.",
  },
};

export default function UeberUnsPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section - Kompakt */}
      <section className="pt-16 pb-8 md:pt-24 md:pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            className="text-4xl md:text-5xl font-semibold text-[#1a1a1a] mb-4"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Zwei Musiker. Eine Mission.
          </h1>
          <p
            className="text-xl text-[#666] max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Euer Firmenevent verdient Musik, die in Erinnerung bleibt.
          </p>
        </div>
      </section>

      {/* Stats Section - Sofortige Glaubwürdigkeit */}
      <section className="py-12 md:py-16 bg-[#f9f9f9]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div
                className="text-4xl md:text-5xl font-bold text-[#0D7A5F] mb-2"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                20+
              </div>
              <p className="text-sm text-[#666]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Jahre Bühnenerfahrung
              </p>
            </div>
            <div className="text-center">
              <div
                className="text-4xl md:text-5xl font-bold text-[#0D7A5F] mb-2"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                500+
              </div>
              <p className="text-sm text-[#666]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Events gespielt
              </p>
            </div>
            <div className="text-center">
              <div
                className="text-4xl md:text-5xl font-bold text-[#0D7A5F] mb-2"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                100M+
              </div>
              <p className="text-sm text-[#666]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Video-Aufrufe
              </p>
            </div>
            <div className="text-center">
              <div
                className="text-4xl md:text-5xl font-bold text-[#0D7A5F] mb-2"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                24h
              </div>
              <p className="text-sm text-[#666]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Antwortzeit
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section - Warum wir das machen */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-2xl md:text-3xl font-semibold text-[#1a1a1a] mb-8 text-center"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Warum wir das machen
          </h2>
          <div className="space-y-6 text-[#444]" style={{ fontFamily: "'Poppins', sans-serif" }}>
            <p className="text-lg leading-relaxed">
              Wir haben es selbst erlebt: Du organisierst ein Firmenevent, buchst eine Band über
              irgendeinen Katalog - und hoffst einfach, dass es gut wird.
            </p>
            <p className="text-lg leading-relaxed">
              <strong>Manchmal wird es das. Oft nicht.</strong>
            </p>
            <p className="text-lg leading-relaxed">
              Weil Musik bei den meisten Agenturen nebenbei läuft. Weil niemand checkt, ob die
              Band zum Anlass passt. Weil am Ende keiner verantwortlich ist, wenn etwas schiefgeht.
            </p>
            <p className="text-lg leading-relaxed">
              Bei uns ist das anders. Wir stehen selbst auf der Bühne. Wir kennen jeden Künstler
              persönlich. Und wir sind vor Ort, wenn es darauf ankommt.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section - Nebeneinander */}
      <section className="py-16 md:py-20 bg-[#f9f9f9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-2xl md:text-3xl font-semibold text-[#1a1a1a] mb-12 text-center"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Das Team
          </h2>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            <TeamMemberCard
              name="Jonas Glamann"
              title="Der Kreative"
              subtitle="Euer Kontakt vor Ort"
              image="/images/team/jonas.png"
              bio="Mit 7 Jahren die erste Gitarre, seitdem auf der Bühne. Als Tour-Techniker war ich mit Revolverheld und Adel Tawil unterwegs. Heute koordiniere ich Band und Technik - und spiele selbst mit."
              tags={["Gitarrist", "Tour-Techniker", "Koordination"]}
              stats={[
                { value: "17+", label: "Jahre Bühne" },
                { value: "500+", label: "Gigs gespielt" },
              ]}
              timeline={[
                { year: "2002", title: "Die ersten Akkorde", description: "Mit 7 Jahren die erste Gitarre in der Hand", image: "/images/timeline/jonas-kindheit.jpg" },
                { year: "2010", title: "Erste Banderfahrung", description: "Auftritte mit Schulbands und lokalen Projekten", image: "/images/timeline/jonas-jugend.jpg" },
                { year: "2016", title: "Tour-Techniker", description: "Auf Tour mit Revolverheld, Adel Tawil u.a.", image: "/images/timeline/jonas-tour.jpg" },
                { year: "2020", title: "Coverband-Profi", description: "Hunderte Events mit mehreren Coverbands", image: "/images/timeline/jonas-coverband.jpg" },
                { year: "2024", title: "musikfürfirmen.de", description: "Gründung - Musik und Technik aus einer Hand", image: "/images/timeline/jonas-heute.jpg" },
              ]}
            />
            <TeamMemberCard
              name="Nick Heymann"
              title="Der Macher"
              subtitle="Euer Ansprechpartner"
              image="/images/team/nick.png"
              bio="Nach dem Musikstudium habe ich mich als Videograf selbständig gemacht. Meine Event-Videos haben über 100 Millionen Aufrufe gesammelt. Heute kümmere ich mich um alles, was ihr seht - und höre zu, was ihr braucht."
              tags={["Videograf", "Marketing", "Musikstudium"]}
              stats={[
                { value: "100M+", label: "Video-Aufrufe" },
                { value: "50+", label: "Firmen beraten" },
              ]}
              timeline={[
                { year: "1998", title: "Musik im Blut", description: "Aufgewachsen mit Musik und Instrumenten", image: "/images/timeline/nick-kindheit.jpg" },
                { year: "2012", title: "Videografie entdeckt", description: "Die erste Kamera - Beginn einer Reise", image: "/images/timeline/nick-jugend.jpg" },
                { year: "2018", title: "Musikstudium", description: "Professionelle Ausbildung in Musik und Medien", image: "/images/timeline/nick-studium.jpg" },
                { year: "2021", title: "Viral auf Social Media", description: "100+ Millionen Aufrufe auf Social Media", image: "/images/timeline/nick-viral.jpg" },
                { year: "2024", title: "musikfürfirmen.de", description: "Marketing und visuelle Identität", image: "/images/timeline/nick-heute.jpg" },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Was uns unterscheidet */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-2xl md:text-3xl font-semibold text-[#1a1a1a] mb-12 text-center"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Was uns unterscheidet
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#D4F4E8] flex items-center justify-center">
                <svg className="w-7 h-7 text-[#0D7A5F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3
                className="text-lg font-semibold text-[#1a1a1a] mb-2"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Persönlich
              </h3>
              <p className="text-[#666] text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Kein Callcenter, keine Katalog-Auswahl. Ihr sprecht direkt mit uns.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#D4F4E8] flex items-center justify-center">
                <svg className="w-7 h-7 text-[#0D7A5F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3
                className="text-lg font-semibold text-[#1a1a1a] mb-2"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Abgesichert
              </h3>
              <p className="text-[#666] text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Ausfallgarantie, Haftpflicht, Ersatzkünstler - wir denken an alles.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#D4F4E8] flex items-center justify-center">
                <svg className="w-7 h-7 text-[#0D7A5F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3
                className="text-lg font-semibold text-[#1a1a1a] mb-2"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Vor Ort
              </h3>
              <p className="text-[#666] text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Jonas ist Teil der Band. Wenn etwas ist, sind wir da.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-[#0D7A5F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-2xl md:text-3xl font-semibold text-white mb-4"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Lass uns reden
          </h2>
          <p
            className="text-lg text-white/80 mb-8 max-w-xl mx-auto"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Erzähl uns von deinem Event - unverbindlich und kostenlos.
            Innerhalb von 24 Stunden hast du unser Angebot.
          </p>
          <Link
            href="/#hero"
            className="inline-block px-8 py-4 bg-white text-[#0D7A5F] font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Jetzt anfragen
          </Link>
        </div>
      </section>
    </div>
  );
}
