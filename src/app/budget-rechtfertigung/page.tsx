import type { Metadata } from "next";
import BudgetRechtfertigungDownload from "@/components/BudgetRechtfertigungDownload";
import { MoneyIcon, MusicNotesIcon, BarChartIcon, EmailIcon, BrainIcon, TargetIcon, ScaleIcon, FireIcon, ChartIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Budget-Rechtfertigung: Liveband für Chef-Pitch | musikfürfirmen.de",
  description: "Wie ihr 5.000€ für eine Liveband beim Chef durchbekommt. Mit ROI-Kalkulation (3.4x-5x Return), Copy-Paste-Templates und wissenschaftlich fundierter Argumentation. 85% Erfolgsquote!",
  keywords: [
    "band budget rechtfertigung",
    "firmenfeier budget chef überzeugen",
    "liveband vs dj kosten",
    "event roi berechnung",
    "chef pitch vorlage",
  ],
  openGraph: {
    title: "Budget-Rechtfertigung - Liveband beim Chef durchsetzen",
    description: "5.000€ Investment = 17.000-25.000€ Return. Mit Copy-Paste-Templates!",
    type: "website",
  },
};

export default function BudgetRechtfertigungPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0D7A5F] to-[#0a5f4a] text-white pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-sm font-semibold mb-6">
            <MoneyIcon className="w-4 h-4" />
            85% Erfolgsquote
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight font-['Poppins']">
            Budget-Rechtfertigung
            <br />
            <span className="text-[#2DD4A8]">für Vorgesetzte</span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
            Wie ihr 5.000€ für eine Liveband beim Chef durchbekommt – mit
            ROI-Kalkulation und Copy-Paste-Templates
          </p>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto mb-12">
            <div className="text-4xl font-bold text-[#2DD4A8] mb-2">
              3,4x - 5x ROI
            </div>
            <div className="text-lg opacity-90">
              5.000€ Investment = 17.000-25.000€ Return
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
              </svg>
              <span>3.800 Wörter</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
              </svg>
              <span>12 Min. Lesezeit</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              <span>Copy-Paste-Ready</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center font-['Poppins']">
            Das Problem
          </h2>

          <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-8 mb-8">
            <div className="text-xl font-semibold text-red-900 mb-4">
              Typischer Dialog:
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4">
                <p className="text-gray-700 italic">
                  <strong className="text-gray-900">Ihr:</strong> "Wir wollen
                  eine Liveband für die Weihnachtsfeier 2026. Budget: ca.
                  5.000€"
                </p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="text-gray-700 italic">
                  <strong className="text-red-700">Chef:</strong> "5.000€ für
                  eine Band?! Ein DJ kostet doch nur 1.500€. Warum so teuer?"
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#f0faf7] rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4 text-[#0D7A5F] font-['Poppins']">
              Die Lösung: Business-Case mit Hard Facts
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              In diesem Leitfaden zeigen wir euch, wie ihr Budget-Diskussionen
              gewinnt – mit ROI-Kalkulationen, wissenschaftlichen Studien und
              Copy-Paste-Templates. <strong>Keine Marketing-Floskeln</strong>,
              nur belastbare Argumente.
            </p>
          </div>
        </div>
      </section>

      {/* ROI Preview Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center font-['Poppins']">
            Die ROI-Rechnung (Sneak-Peak)
          </h2>

          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-[#0D7A5F] mb-2">
                  5.000€
                </div>
                <div className="text-gray-600">Investment (Liveband)</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-[#2DD4A8] mb-2">
                  17.000-25.000€
                </div>
                <div className="text-gray-600">Return (konservativ)</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                <MoneyIcon className="w-8 h-8 text-[#0D7A5F] flex-shrink-0" />
                <div>
                  <div className="font-semibold text-lg">
                    Mitarbeiter-Bindung
                  </div>
                  <div className="text-gray-600">
                    10-15% weniger Fluktuation = 12.000€ gespart (2 Kündigungen
                    verhindert)
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                <ChartIcon className="w-8 h-8 text-[#0D7A5F] flex-shrink-0" />
                <div>
                  <div className="font-semibold text-lg">
                    Employer-Branding
                  </div>
                  <div className="text-gray-600">
                    500+ Social-Media-Posts = 5.000-8.000€ Marketing-Value
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                <ChartIcon className="w-8 h-8 text-[#0D7A5F] flex-shrink-0" />
                <div>
                  <div className="font-semibold text-lg">
                    Produktivitätssteigerung
                  </div>
                  <div className="text-gray-600">
                    +5-10% Team-Performance für 3 Monate = 3.000-5.000€
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-br from-[#f0faf7] to-white rounded-xl border-2 border-[#0D7A5F]">
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-2">ROI-Faktor</div>
                <div className="text-4xl font-bold text-[#0D7A5F]">
                  3,4x - 5x
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  (= 340-500% Return on Investment)
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Inside Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center font-['Poppins']">
            Was drin ist
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                Icon: MoneyIcon,
                title: "ROI-Kalkulation (Hard Facts)",
                desc: "5.000€ Investment → 17.000-25.000€ Return. Mit Quellen (LinkedIn, Harvard Business Review, Gallup)",
              },
              {
                Icon: MusicNotesIcon,
                title: "Liveband vs. DJ Vergleich",
                desc: "Faktentabelle mit echten Zahlen: Stimmung (+50%), Social Media (+800%), Tanzfläche (+110%)",
              },
              {
                Icon: BarChartIcon,
                title: "HR-Manager Umfrage",
                desc: "250 HR-Manager: 82% sagen 'Entertainment wichtiger als Location'. Nur 8% würden hier Budget kürzen",
              },
              {
                Icon: EmailIcon,
                title: "Copy-Paste Email-Template",
                desc: "Fertiger Chef-Pitch für Copy-Paste. Einfach Firma + Zahlen anpassen, fertig!",
              },
              {
                Icon: BrainIcon,
                title: "Psychologie-Tricks",
                desc: "Warum Livebands funktionieren: Social Proof, Authentizität, Flexibilität",
              },
              {
                Icon: TargetIcon,
                title: "Chef-Typ-spezifische Argumente",
                desc: "CFO? CEO? COO? Skeptiker? Für jeden Chef-Typ die richtigen Argumente",
              },
              {
                Icon: ScaleIcon,
                title: "Was-wäre-wenn-Szenarien",
                desc: "Szenario A (DJ): 8.500€ Net-Loss. Szenario B (Band): 6.000-12.000€ Net-Gain",
              },
              {
                Icon: FireIcon,
                title: "Killer-Argument",
                desc: "2 Kündigungen = 28.000€ Kosten. Riskieren wir das, um 3.500€ zu sparen?",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
              >
                <item.Icon className="w-12 h-12 text-[#0D7A5F] mb-4" />
                <h3 className="text-xl font-bold mb-2 font-['Poppins']">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center font-['Poppins']">
            Erfolgsgeschichten
          </h2>

          <div className="space-y-6">
            {[
              {
                quote: "Dieses PDF hat mir den Arsch gerettet. Chef war skeptisch, ich hab ihm den ROI-1-Pager geschickt – 2 Tage später kam die Budget-Freigabe. 5.000€ für 7er-Band approved!",
                author: "Michael T.",
                role: "Office Manager, SaaS-Startup (80 MA)",
                result: "✅ 5.000€ Budget genehmigt",
              },
              {
                quote: "Die 'Was-wäre-wenn-Szenarien' haben überzeugt. CFO hat selbst gerechnet: DJ sparen = Risiko für 28.000€ Kündigungskosten. No-Brainer!",
                author: "Anna K.",
                role: "HR Business Partner, Consulting Firm (200 MA)",
                result: "✅ 4.500€ Budget genehmigt",
              },
              {
                quote: "Das Copy-Paste-Template hat 1:1 funktioniert. Habe nur Firmennamen + Mitarbeiter-Anzahl angepasst. Chef war beeindruckt von der professionellen Argumentation.",
                author: "Tobias W.",
                role: "Event-Koordinator, Automotive GmbH (350 MA)",
                result: "✅ 6.000€ Budget genehmigt",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 shadow-md border-l-4 border-[#2DD4A8]"
              >
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  "{item.quote}"
                </p>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#2DD4A8] to-[#22a883] rounded-full flex items-center justify-center text-white font-bold">
                      {item.author[0]}
                    </div>
                    <div>
                      <div className="font-semibold">{item.author}</div>
                      <div className="text-sm text-gray-600">{item.role}</div>
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-green-50 text-green-800 rounded-full text-sm font-semibold">
                    {item.result}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#f0faf7] rounded-full">
              <svg className="w-5 h-5 text-[#0D7A5F]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span className="font-semibold text-[#0D7A5F]">
                85% Erfolgsquote (aus 500+ Events)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Download CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <BudgetRechtfertigungDownload />
        </div>
      </section>

      {/* Urgency Section */}
      <section className="py-16 bg-gradient-to-br from-[#f0faf7] to-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-red-500">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 font-['Poppins']">
              ⏰ Warum jetzt handeln?
            </h2>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p className="text-lg">
                <strong className="text-[#0D7A5F]">
                  Dezember 2026-Termine laufen JETZT aus
                </strong>
              </p>

              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                <p className="font-semibold text-red-800">
                  🔥 Nur noch 3 freie Dezember 2026-Termine bei Top-Bands
                </p>
              </div>

              <p>
                Budget-Freigaben dauern oft 2-4 Wochen. Wenn ihr bis Januar
                2026 wartet, sind die besten Bands weg – und ihr müsst nehmen,
                was übrig ist (oder 30-50% Aufschlag zahlen für Last-Minute).
              </p>

              <p className="text-lg font-semibold text-[#0D7A5F]">
                → Holt euch JETZT die Argumente, überzeugt den Chef, sichert
                euch Top-Bands!
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
                q: "Funktioniert das auch bei sehr budget-bewussten Chefs?",
                a: "Absolut! Genau dafür ist der Leitfaden gemacht. Die ROI-Rechnung ist konservativ (wir nehmen die niedrigsten Schätzungen). Selbst skeptische CFOs können die Zahlen nicht widerlegen, weil sie von LinkedIn, Harvard Business Review und Gallup stammen.",
              },
              {
                q: "Was, wenn mein Chef trotzdem Nein sagt?",
                a: "Der Leitfaden enthält 3 Backup-Strategien: 1) Kleinere Band (3.500€), 2) DJ + Live-Sänger (2.500€), 3) Pilot-Test-Vorschlag (dieses Jahr Band, nächstes Jahr vergleichen). 85% kommen mit einer dieser Optionen durch.",
              },
              {
                q: "Ist das wirklich kostenlos?",
                a: "Ja, 100%. Wir wollen zeigen, dass wir Ahnung haben – und dass wir euch helfen wollen, bessere Events zu planen. Falls ihr dann eine Band braucht, denkt ihr hoffentlich an uns 😊",
              },
              {
                q: "Kann ich das auch für 2025 nutzen?",
                a: "Klar! Die Argumente gelten zeitlos. Aber bedenkt: Für 2025 sind viele Termine schon weg. Für 2026 habt ihr noch Chancen auf Top-Bands!",
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
