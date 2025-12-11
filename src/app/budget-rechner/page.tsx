/**
 * Budget-Rechner Landing Page
 * SEO-optimized page for "firmenevent budget berechnen"
 * High-converting lead magnet page
 */

import BudgetCalculator from "@/components/BudgetCalculator";

export const metadata = {
  title: "Event-Budget-Rechner | musikfürfirmen.de",
  description:
    "Berechnet in 2 Minuten euer individuelles Event-Budget. Kostenloser Kalkulator für Firmenfeiern, Sommerfeste & Weihnachtsfeiern. Inklusive PDF-Angebot!",
  keywords: [
    "firmenevent budget berechnen",
    "firmenfeier kosten rechner",
    "event budget kalkulator",
    "was kostet firmenfeier",
  ],
};

export default function BudgetRechnerPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0D7A5F] to-[#0a5f4a] text-white pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Was kostet eure Firmenfeier?
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Berechnet in 2 Minuten euer individuelles Event-Budget
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-sm md:text-base">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>100% kostenlos</span>
            </div>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Personalisiertes PDF</span>
            </div>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Keine Verpflichtung</span>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <BudgetCalculator />
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-[#0D7A5F] mb-2">
                500+
              </div>
              <div className="text-sm md:text-base text-gray-600">
                Events organisiert
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-[#0D7A5F] mb-2">
                4.9★
              </div>
              <div className="text-sm md:text-base text-gray-600">
                Durchschnittsbewertung
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-[#0D7A5F] mb-2">
                98%
              </div>
              <div className="text-sm md:text-base text-gray-600">
                Kundenzufriedenheit
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Häufige Fragen zum Budget-Rechner
          </h2>

          <div className="space-y-4">
            {[
              {
                q: "Ist der Rechner wirklich kostenlos?",
                a: "Ja! Ihr bekommt ein personalisiertes Budget-Angebot komplett kostenlos und unverbindlich. Kein Kleingedrucktes, versprochen.",
              },
              {
                q: "Was ist im Budget enthalten?",
                a: "Liveband (5-7 Personen), professionelle Technik (Sound + Licht), GEMA-Gebühren, Versicherung und Anfahrt. Alles aus einer Hand!",
              },
              {
                q: "Wie genau ist die Kalkulation?",
                a: "Sehr genau! Unsere Preise basieren auf 500+ realen Events. Das PDF enthält eine detaillierte Breakdown und was ihr genau bekommt.",
              },
              {
                q: "Was passiert nach der Berechnung?",
                a: "Ihr bekommt sofort euer Ergebnis + ein PDF per Email. Falls es passt, könnt ihr direkt anfragen. Kein Spam, versprochen!",
              },
            ].map((faq, index) => (
              <details
                key={index}
                className="group bg-white rounded-xl p-6 border border-gray-200"
              >
                <summary className="flex items-center justify-between cursor-pointer font-semibold text-[#1a1a1a] text-lg">
                  {faq.q}
                  <svg
                    className="w-5 h-5 text-[#0D7A5F] group-open:rotate-180 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <p className="mt-4 text-[#666] leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
