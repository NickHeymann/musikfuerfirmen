"use client";

/**
 * EmailCaptureModal Component
 * Lead-gate for budget calculator results
 * Captures email + basic info before showing results
 */

import { useState } from "react";

interface EmailCaptureModalProps {
  onClose: () => void;
  onSuccess: () => void;
  calculatorData: {
    guestCount: number;
    eventType: string;
    location: string;
  };
  budget: {
    min: number;
    max: number;
    base: number;
  };
}

export default function EmailCaptureModal({
  onClose,
  onSuccess,
  calculatorData,
  budget,
}: EmailCaptureModalProps) {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    companyName: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
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
          calculatorData,
          budget,
          source: "budget_calculator",
          leadScore: 25, // Budget-Calculator = +25 Punkte
        }),
      });

      if (!response.ok) {
        throw new Error("Lead-Capture fehlgeschlagen");
      }

      const data = await response.json();

      // Track analytics
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "lead_capture", {
          event_category: "conversion",
          event_label: "budget_calculator",
          value: budget.base,
        });
      }

      // Success!
      onSuccess();
    } catch (err) {
      setError("Etwas ist schiefgelaufen. Bitte versucht es nochmal.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
          aria-label="Schließen"
        >
          ×
        </button>

        <div className="text-center mb-6">
          <div className="text-5xl mb-4">💌</div>
          <h2 className="text-2xl font-bold mb-2">
            Fast geschafft!
          </h2>
          <p className="text-gray-600">
            Gebt eure Email an, um euer personalisiertes Angebot zu erhalten
            (inklusive PDF mit Breakdown & nächsten Schritten).
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
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0D7A5F] focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="firstName" className="block text-sm font-semibold mb-1">
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
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0D7A5F] focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="companyName" className="block text-sm font-semibold mb-1">
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
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0D7A5F] focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-semibold mb-1">
              Telefon (optional)
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="+49 170 123 4567"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0D7A5F] focus:outline-none"
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-800 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#0D7A5F] text-white py-4 rounded-xl font-bold hover:bg-[#0a5f4a] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isSubmitting ? "Sende..." : "Angebot per Email erhalten"}
          </button>

          <p className="text-xs text-gray-500 text-center">
            🔒 Wir respektieren eure Privatsphäre. Keine Spam-Mails, versprochen.
            <br />
            <a href="/datenschutz" className="underline">
              Datenschutzerklärung
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
