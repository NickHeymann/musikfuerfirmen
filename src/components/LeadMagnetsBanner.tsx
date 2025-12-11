"use client";

/**
 * LeadMagnetsBanner Component
 * Promotes the two main lead magnets on the homepage
 * High-converting CTA section with value propositions
 */

export default function LeadMagnetsBanner() {
  return (
    <section className="py-16 bg-gradient-to-br from-[#f0faf7] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4 text-[#1a1a1a]"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Kostenlose Event-Planner für 2026
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Über 2.500 Event-Planner nutzen bereits unsere Leitfäden
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Lead Magnet 1: Event-Planner-2026 */}
          <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-[#0D7A5F]">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#2DD4A8] to-[#22a883] rounded-xl flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3
                  className="text-2xl font-bold mb-2"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Event-Planner 2026
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <span>📄 6.500 Wörter</span>
                  <span>•</span>
                  <span>⏱️ 15 Min.</span>
                  <span>•</span>
                  <span className="text-[#0D7A5F] font-semibold">
                    Kostenlos
                  </span>
                </div>
              </div>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Der ultimative Leitfaden für perfekte Firmenevents 2026.
              Mit 12-Monats-Zeitplan, Budget-Breakdown, GEMA-Checkliste und
              Copy-Paste-Vorlagen.
            </p>

            <ul className="space-y-2 mb-6">
              {[
                "Top 10 Pain Points + Lösungen",
                "12-Monats-Timeline für 2026",
                "70-20-10 Musik-Formel",
                "Budget-Breakdown (100-200 Gäste)",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-700">
                  <svg
                    className="w-5 h-5 text-[#0D7A5F] flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <a
              href="/event-planner-2026"
              className="block w-full bg-gradient-to-br from-[#2DD4A8] to-[#22a883] text-white py-3 rounded-xl font-semibold text-center hover:from-[#22a883] hover:to-[#1d8c6d] hover:shadow-lg transition-all"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Jetzt kostenlos downloaden
            </a>
          </div>

          {/* Lead Magnet 2: Budget-Rechtfertigung */}
          <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-[#0D7A5F]">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#2DD4A8] to-[#22a883] rounded-xl flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3
                  className="text-2xl font-bold mb-2"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Budget-Rechtfertigung
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <span>📄 3.800 Wörter</span>
                  <span>•</span>
                  <span>✅ 85% Erfolgsquote</span>
                  <span>•</span>
                  <span className="text-[#0D7A5F] font-semibold">
                    Kostenlos
                  </span>
                </div>
              </div>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Wie ihr 5.000€ für eine Liveband beim Chef durchbekommt. Mit
              ROI-Kalkulation (3,4x-5x Return) und Copy-Paste-Templates.
            </p>

            <ul className="space-y-2 mb-6">
              {[
                "ROI-Kalkulation (Hard Facts)",
                "Liveband vs. DJ Vergleich",
                "Copy-Paste Chef-Pitch",
                "Chef-Typ-spezifische Argumente",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-700">
                  <svg
                    className="w-5 h-5 text-[#0D7A5F] flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <a
              href="/budget-rechtfertigung"
              className="block w-full bg-gradient-to-br from-[#2DD4A8] to-[#22a883] text-white py-3 rounded-xl font-semibold text-center hover:from-[#22a883] hover:to-[#1d8c6d] hover:shadow-lg transition-all"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Jetzt kostenlos downloaden
            </a>
          </div>
        </div>

        {/* Trust Signal */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-md">
            <svg
              className="w-5 h-5 text-[#0D7A5F]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-semibold text-gray-700">
              Über 2.500 Downloads • 500+ Events Erfahrung • DSGVO-konform
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
