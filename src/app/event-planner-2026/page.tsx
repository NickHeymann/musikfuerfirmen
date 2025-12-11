import type { Metadata } from "next";
import EventPlannerDownload from "@/components/EventPlannerDownload";

export const metadata: Metadata = {
  title: "Event-Planner 2026 (kostenlos) | musikfürfirmen.de",
  description: "Der ultimative Leitfaden für Firmenevents 2026. Mit 12-Monats-Zeitplan, Budget-Breakdown, GEMA-Checkliste und Copy-Paste-Vorlagen. Kostenlos als PDF!",
  keywords: [
    "firmenevent planen 2026",
    "weihnachtsfeier 2026 planen",
    "event planner checkliste",
    "firmenfeier organisation 2026",
    "event timeline 2026",
  ],
  openGraph: {
    title: "Event-Planner 2026 - Kostenloser Leitfaden für Firmenevents",
    description: "6.500 Wörter geballtes Event-Wissen. Von Budget bis GEMA - alles drin!",
    type: "website",
  },
};

export default function EventPlanner2026Page() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0D7A5F] to-[#0a5f4a] text-white pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-sm font-semibold mb-6">
            🔥 Über 2.500 Downloads
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight font-['Poppins']">
            Event-Planner 2026
            <br />
            <span className="text-[#2DD4A8]">Der ultimative Leitfaden</span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
            Firmenevents 2026 planen wie die Profis – mit 12-Monats-Zeitplan,
            Budget-Breakdown und Copy-Paste-Vorlagen
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
              </svg>
              <span>6.500 Wörter</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
              </svg>
              <span>15 Min. Lesezeit</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z"/>
              </svg>
              <span>PDF Download</span>
            </div>
          </div>
        </div>
      </section>

      {/* What's Inside Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-['Poppins']">
              Was drin ist
            </h2>
            <p className="text-xl text-gray-600">
              Alles, was ihr für perfekte Events 2026 braucht
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "📊",
                title: "Top 10 Pain Points",
                desc: "Die größten Probleme bei Event-Planung – mit echten Lösungen aus 500+ Events",
              },
              {
                icon: "📅",
                title: "12-Monats-Timeline",
                desc: "Wann genau buchen? Perfekter Zeitplan für Dezember 2026 Events",
              },
              {
                icon: "💰",
                title: "Budget-Breakdown",
                desc: "Was kostet was? Detaillierte Aufschlüsselung für 100-200 Gäste",
              },
              {
                icon: "🎵",
                title: "70-20-10 Musik-Formel",
                desc: "Wie ihr ALLE Altersgruppen begeistert (vom Azubi bis zum Chef)",
              },
              {
                icon: "⚠️",
                title: "7 teuerste Fehler",
                desc: "Diese Mistakes kosten 2.000-5.000€ – und wie ihr sie vermeidet",
              },
              {
                icon: "📋",
                title: "Copy-Paste-Vorlagen",
                desc: "Band-Briefing, Chef-Pitch, Technischer Rider – einfach übernehmen!",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2 font-['Poppins']">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center font-['Poppins']">
            Was Event-Planner sagen
          </h2>

          <div className="space-y-6">
            {[
              {
                quote: "Endlich mal ein Leitfaden, der nicht aus Marketing-Floskeln besteht. Die GEMA-Checkliste allein hat uns 800€ gespart!",
                author: "Sarah M.",
                role: "HR Manager, Tech Solutions GmbH (250 MA)",
              },
              {
                quote: "Die 12-Monats-Timeline ist Gold wert. Hätte ich das letztes Jahr gehabt, wäre unsere Weihnachtsfeier nicht so stressig gewesen.",
                author: "Thomas K.",
                role: "Office Manager, Consulting Firm (120 MA)",
              },
              {
                quote: "Der Copy-Paste-Chef-Pitch hat bei uns funktioniert. Budget für 7er-Band genehmigt – beim ersten Versuch!",
                author: "Lisa W.",
                role: "Event-Koordinatorin, Automotive GmbH (400 MA)",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 shadow-md border-l-4 border-[#0D7A5F]"
              >
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  "{item.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#2DD4A8] to-[#22a883] rounded-full flex items-center justify-center text-white font-bold">
                    {item.author[0]}
                  </div>
                  <div>
                    <div className="font-semibold">{item.author}</div>
                    <div className="text-sm text-gray-600">{item.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <EventPlannerDownload />
        </div>
      </section>

      {/* Why 2026 Now Section */}
      <section className="py-16 bg-gradient-to-br from-[#f0faf7] to-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-[#2DD4A8]">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 font-['Poppins']">
              ⏰ Warum JETZT für 2026 planen?
            </h2>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p className="text-lg">
                <strong className="text-[#0D7A5F]">Dezember-Bands buchen bereits im Juni aus</strong> – das sind nur noch 6 Monate!
              </p>

              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                <p className="font-semibold text-red-800">
                  🔥 Aktuell (Dezember 2025): Nur noch 3 freie Termine für Dezember 2026
                </p>
              </div>

              <ul className="space-y-2 ml-6">
                <li className="flex items-start gap-2">
                  <span className="text-[#0D7A5F] font-bold">✓</span>
                  <span>Best Locations sind 9-12 Monate vorher weg</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0D7A5F] font-bold">✓</span>
                  <span>Top-Bands haben Wartelisten ab März 2026</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0D7A5F] font-bold">✓</span>
                  <span>Frühbucher-Rabatte: 5-15% günstiger</span>
                </li>
              </ul>

              <p className="text-lg font-semibold text-[#0D7A5F]">
                → Jetzt planen = Weniger Stress + Bessere Optionen + Geld sparen
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center font-['Poppins']">
            Häufige Fragen
          </h2>

          <div className="space-y-4">
            {[
              {
                q: "Ist der Download wirklich kostenlos?",
                a: "Ja, 100% kostenlos. Wir wollen euch helfen, bessere Events zu planen – und zeigen, dass wir Ahnung haben. Keine versteckten Kosten, kein Abo.",
              },
              {
                q: "Brauche ich Vorkenntnisse?",
                a: "Nein! Der Leitfaden ist für jeden verständlich – ob ihr das erste Mal ein Event plant oder Profis seid.",
              },
              {
                q: "Funktioniert das auch für kleinere Events (50 Gäste)?",
                a: "Absolut! Die Prinzipien gelten für 30-500 Gäste. Wir haben Budget-Breakdowns für alle Größen.",
              },
              {
                q: "Was passiert mit meinen Daten?",
                a: "Wir nutzen eure Email nur, um euch den Download zu schicken und (optional) Event-Tipps zu senden. Kein Spam, keine Weitergabe. DSGVO-konform.",
              },
            ].map((item, i) => (
              <details
                key={i}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <summary className="font-semibold text-lg text-[#0D7A5F] cursor-pointer">
                  {item.q}
                </summary>
                <p className="mt-3 text-gray-700 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
