"use client";

/**
 * BudgetCalculator Component
 * Multi-step calculator for event budget estimation
 * Captures leads via email-gate before showing results
 */

import { useState } from "react";
import EmailCaptureModal from "./EmailCaptureModal";
import { EmailIcon } from "./icons";

interface CalculatorState {
  guestCount: number;
  eventType: string;
  location: string;
  hasFood: boolean;
  needsTech: boolean;
}

export default function BudgetCalculator() {
  const [step, setStep] = useState(1);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [calculatorState, setCalculatorState] = useState<CalculatorState>({
    guestCount: 100,
    eventType: "",
    location: "indoor",
    hasFood: false,
    needsTech: true,
  });

  const updateState = (key: keyof CalculatorState, value: any) => {
    setCalculatorState({ ...calculatorState, [key]: value });
  };

  const handleNext = () => {
    if (step === 3) {
      // Show email gate before results
      setShowEmailModal(true);
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const calculateBudget = () => {
    const { guestCount, eventType, hasFood, needsTech } = calculatorState;

    // Base price: Band + Basic Tech
    let basePrice = 3500;

    // Guest count factor
    if (guestCount <= 50) basePrice = 2500;
    else if (guestCount <= 100) basePrice = 3500;
    else if (guestCount <= 200) basePrice = 4500;
    else basePrice = 6000;

    // Event type modifier
    if (eventType === "weihnachtsfeier") basePrice *= 1.15; // Peak season
    else if (eventType === "hochzeit") basePrice *= 1.2;

    // Additional services
    if (hasFood) basePrice += guestCount * 15; // Catering estimate
    if (!needsTech) basePrice -= 800; // Tech discount if not needed

    const min = Math.floor(basePrice * 0.85);
    const max = Math.floor(basePrice * 1.15);

    return { min, max, base: Math.floor(basePrice) };
  };

  const budget = calculateBudget();

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`w-1/3 h-2 rounded-full mx-1 ${
                s <= step ? "bg-[#0D7A5F]" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-gray-500 text-center">
          Schritt {step} von 3
        </p>
      </div>

      {/* Step 1: Guest Count */}
      {step === 1 && (
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Wie viele Gäste kommen?</h2>
          <p className="text-gray-600 mb-6">
            Die Gästezahl beeinflusst Band-Größe, Technik und Location.
          </p>

          <div className="space-y-4">
            {[
              { label: "50 Gäste oder weniger", value: 50 },
              { label: "50-100 Gäste", value: 100 },
              { label: "100-200 Gäste", value: 150 },
              { label: "200+ Gäste", value: 250 },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  updateState("guestCount", option.value);
                  setStep(2);
                }}
                className={`w-full p-4 border-2 rounded-xl text-left hover:border-[#0D7A5F] hover:bg-[#f0faf7] transition-all ${
                  calculatorState.guestCount === option.value
                    ? "border-[#0D7A5F] bg-[#f0faf7]"
                    : "border-gray-200"
                }`}
              >
                <div className="font-semibold">{option.label}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Event Type */}
      {step === 2 && (
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Welche Art von Event?</h2>
          <p className="text-gray-600 mb-6">
            Event-Typ bestimmt Musik-Stil und Timing.
          </p>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Weihnachtsfeier", value: "weihnachtsfeier", emoji: "🎄" },
              { label: "Sommerfest", value: "sommerfest", emoji: "☀️" },
              { label: "Firmenjubiläum", value: "jubilaeum", emoji: "🎉" },
              { label: "Team-Event", value: "teamevent", emoji: "🤝" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => updateState("eventType", option.value)}
                className={`p-6 border-2 rounded-xl hover:border-[#0D7A5F] hover:bg-[#f0faf7] transition-all ${
                  calculatorState.eventType === option.value
                    ? "border-[#0D7A5F] bg-[#f0faf7]"
                    : "border-gray-200"
                }`}
              >
                <div className="text-3xl mb-2">{option.emoji}</div>
                <div className="font-semibold">{option.label}</div>
              </button>
            ))}
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={handleBack}
              className="px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50"
            >
              Zurück
            </button>
            <button
              onClick={handleNext}
              disabled={!calculatorState.eventType}
              className="flex-1 px-6 py-3 bg-[#0D7A5F] text-white rounded-xl hover:bg-[#0a5f4a] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Weiter
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Additional Services */}
      {step === 3 && (
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Was braucht ihr noch?</h2>
          <p className="text-gray-600 mb-6">Optionale Services für euer Event.</p>

          <div className="space-y-4 mb-6">
            <label className="flex items-start p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-[#0D7A5F] hover:bg-[#f0faf7]">
              <input
                type="checkbox"
                checked={calculatorState.hasFood}
                onChange={(e) => updateState("hasFood", e.target.checked)}
                className="mt-1 mr-3 w-5 h-5 accent-[#0D7A5F]"
              />
              <div>
                <div className="font-semibold">Catering inklusive</div>
                <div className="text-sm text-gray-500">
                  Essen & Getränke für alle Gäste
                </div>
              </div>
            </label>

            <label className="flex items-start p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-[#0D7A5F] hover:bg-[#f0faf7]">
              <input
                type="checkbox"
                checked={calculatorState.needsTech}
                onChange={(e) => updateState("needsTech", e.target.checked)}
                className="mt-1 mr-3 w-5 h-5 accent-[#0D7A5F]"
              />
              <div>
                <div className="font-semibold">Komplette Technik</div>
                <div className="text-sm text-gray-500">
                  Sound, Licht, Bühne (empfohlen!)
                </div>
              </div>
            </label>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleBack}
              className="px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50"
            >
              Zurück
            </button>
            <button
              onClick={handleNext}
              className="flex-1 px-6 py-3 bg-[#0D7A5F] text-white rounded-xl hover:bg-[#0a5f4a] font-semibold"
            >
              Budget berechnen →
            </button>
          </div>
        </div>
      )}

      {/* Email-Capture Modal */}
      {showEmailModal && (
        <EmailCaptureModal
          onClose={() => setShowEmailModal(false)}
          onSuccess={() => {
            setShowEmailModal(false);
            setStep(4);
          }}
          calculatorData={calculatorState}
          budget={budget}
        />
      )}

      {/* Step 4: Results (nur nach Email-Capture) */}
      {step === 4 && (
        <div className="bg-gradient-to-br from-[#0D7A5F] to-[#0a5f4a] p-8 rounded-2xl shadow-2xl text-white">
          <h2 className="text-3xl font-bold mb-2">Euer Budget-Ergebnis</h2>
          <p className="mb-6 opacity-90">
            Für {calculatorState.guestCount} Gäste, {calculatorState.eventType}
          </p>

          <div className="bg-white/10 rounded-xl p-6 mb-6">
            <div className="text-5xl font-bold mb-2">
              {budget.min.toLocaleString('de-DE')}€ - {budget.max.toLocaleString('de-DE')}€
            </div>
            <div className="text-lg opacity-90">
              Musik + Technik + GEMA + Anfahrt
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Liveband (5-7 Personen)</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Professionelle Technik (Sound + Licht)</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>GEMA-Gebühren & Versicherung</span>
            </div>
          </div>

          <div className="bg-white/10 rounded-xl p-4 mb-6">
            <p className="text-sm flex items-start gap-2">
              <EmailIcon className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>
                Wir haben euch ein detailliertes PDF per Email geschickt!
                <br />
                Dort findet ihr: Breakdown, Vergleich & nächste Schritte.
              </span>
            </p>
          </div>

          <button className="w-full bg-white text-[#0D7A5F] py-4 rounded-xl font-bold hover:bg-gray-100 transition-all">
            Jetzt Angebot anfragen
          </button>
        </div>
      )}
    </div>
  );
}
