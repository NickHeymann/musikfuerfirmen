"use client";

/**
 * BudgetRechtfertigungDownload Component
 * Email-Capture + PDF-Download für Budget-Rechtfertigung-2026
 */

import { useState } from "react";
import { RocketIcon, MoneyIcon, CheckIcon } from "./icons";

export default function BudgetRechtfertigungDownload() {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    companyName: "",
    role: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      // Capture lead via API
      const response = await fetch("/api/leads/capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source: "budget_rechtfertigung",
          leadScore: 30, // Budget-Rechtfertigung = +30 Punkte (höher als Event-Planner)
          downloadType: "budget_rechtfertigung",
        }),
      });

      if (!response.ok) {
        throw new Error("Lead-Capture fehlgeschlagen");
      }

      // Track analytics
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "lead_capture", {
          event_category: "conversion",
          event_label: "budget_rechtfertigung",
          value: 30,
        });
      }

      // Success! Show download link
      setIsSuccess(true);

      // Trigger PDF download after 1 second
      setTimeout(() => {
        window.open("/downloads/Budget-Rechtfertigung-2026.pdf", "_blank");
      }, 1000);
    } catch (err) {
      setError("Etwas ist schiefgelaufen. Bitte versucht es nochmal.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-gradient-to-br from-[#f0faf7] to-white rounded-2xl p-8 text-center border-2 border-[#0D7A5F]">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold mb-4 font-['Poppins']">
          Perfekt! Check euer Postfach
        </h3>
        <p className="text-lg text-gray-700 mb-6">
          Wir haben euch die Budget-Rechtfertigung gerade per Email geschickt.
          <br />
          Jetzt heißt es: Chef überzeugen! 💪
        </p>

        <div className="bg-white rounded-xl p-6 mb-6 shadow-md">
          <p className="text-sm text-gray-600 mb-4">
            Download startet nicht automatisch?
          </p>
          <a
            href="/downloads/Budget-Rechtfertigung-2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-br from-[#2DD4A8] to-[#22a883] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            PDF jetzt downloaden
          </a>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg text-left mb-6">
          <p className="font-semibold text-yellow-900 mb-2">
            💡 Pro-Tipp für maximale Erfolgsquote:
          </p>
          <ul className="text-sm text-yellow-800 space-y-1">
            <li>✓ Passt Firmennamen + Zahlen im Template an</li>
            <li>✓ Sendet es 6+ Monate vor Event (nicht last-minute)</li>
            <li>✓ Habt 2-3 Alternativen parat (falls Budget zu knapp)</li>
          </ul>
        </div>

        <p className="text-sm text-gray-500 flex items-center gap-2">
          <RocketIcon className="w-4 h-4 text-[#0D7A5F] flex-shrink-0" />
          <span><strong>Bonus:</strong> Wir schicken euch in ein paar Tagen noch
          mehr Event-Tipps per Email!</span>
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#f0faf7] text-[#0D7A5F] rounded-full text-sm font-semibold mb-4">
          <MoneyIcon className="w-4 h-4" />
          85% Erfolgsquote
        </div>

        <h2 className="text-3xl font-bold mb-4 font-['Poppins']">
          Jetzt Budget-Rechtfertigung sichern
        </h2>
        <p className="text-gray-600">
          Gebt eure Email an und erhaltet die komplette Argumentation als PDF
          (3.800 Wörter, Copy-Paste-Ready)
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold mb-1">
            Email *
          </label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="max@firma.de"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0D7A5F] focus:ring-4 focus:ring-[#f0faf7] focus:outline-none transition-all"
          />
        </div>

        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-semibold mb-1"
          >
            Vorname *
          </label>
          <input
            type="text"
            id="firstName"
            required
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            placeholder="Max"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0D7A5F] focus:ring-4 focus:ring-[#f0faf7] focus:outline-none transition-all"
          />
        </div>

        <div>
          <label
            htmlFor="companyName"
            className="block text-sm font-semibold mb-1"
          >
            Firmenname (optional)
          </label>
          <input
            type="text"
            id="companyName"
            value={formData.companyName}
            onChange={(e) =>
              setFormData({ ...formData, companyName: e.target.value })
            }
            placeholder="Tech Solutions GmbH"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0D7A5F] focus:ring-4 focus:ring-[#f0faf7] focus:outline-none transition-all"
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-semibold mb-1">
            Rolle (optional)
          </label>
          <select
            id="role"
            value={formData.role}
            onChange={(e) =>
              setFormData({ ...formData, role: e.target.value })
            }
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0D7A5F] focus:ring-4 focus:ring-[#f0faf7] focus:outline-none transition-all"
          >
            <option value="">Bitte wählen...</option>
            <option value="hr">HR / People & Culture</option>
            <option value="office_manager">Office Manager</option>
            <option value="event_coordinator">Event-Koordinator/in</option>
            <option value="assistant">Assistenz der Geschäftsführung</option>
            <option value="marketing">Marketing</option>
            <option value="other">Andere</option>
          </select>
        </div>

        {error && (
          <div className="bg-red-50 text-red-800 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-br from-[#2DD4A8] to-[#22a883] text-white py-4 rounded-xl font-bold hover:from-[#22a883] hover:to-[#1d8c6d] hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          {isSubmitting ? "Sende..." : "Kostenlos downloaden"}
        </button>

        <p className="text-xs text-gray-500 text-center">
          🔒 Wir respektieren eure Privatsphäre. Keine Spam-Mails, versprochen.
          <br />
          <a href="/datenschutz" className="underline hover:text-[#0D7A5F]">
            Datenschutzerklärung
          </a>
        </p>
      </form>

      {/* Trust Signals */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex flex-wrap gap-4 justify-center text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <CheckIcon className="w-4 h-4 text-[#0D7A5F]" />
            <span>85% Erfolgsquote</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckIcon className="w-4 h-4 text-[#0D7A5F]" />
            <span>500+ Events Erfahrung</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckIcon className="w-4 h-4 text-[#0D7A5F]" />
            <span>DSGVO-konform</span>
          </div>
        </div>
      </div>

      {/* Scarcity Element */}
      <div className="mt-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
        <p className="text-sm text-red-800">
          <strong>⏰ Nur noch 3 Dezember 2026-Termine verfügbar</strong> – Holt
          euch jetzt die Argumente, bevor Top-Bands ausgebucht sind!
        </p>
      </div>
    </div>
  );
}
