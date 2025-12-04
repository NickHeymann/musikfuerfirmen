"use client";

import { useState, useEffect, useCallback } from "react";

interface FormData {
  date: string;
  time: string;
  city: string;
  budget: string;
  guests: string;
  package: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  privacy: boolean;
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// City Autocomplete mit Photon API (kostenlos, kein API-Key)
interface CityResult {
  city: string;
  state: string;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // City Autocomplete State
  const [citySuggestions, setCitySuggestions] = useState<CityResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const [formData, setFormData] = useState<FormData>({
    date: "",
    time: "",
    city: "",
    budget: "",
    guests: "",
    package: "",
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
    privacy: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1);
        setSubmitStatus("idle");
        setErrorMessage("");
        setErrors({});
      }, 300);
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Listen for custom event to open modal
  useEffect(() => {
    const handleOpenCalculator = () => {
      // This will be handled by ModalProvider
    };
    window.addEventListener("openMFFCalculator", handleOpenCalculator);
    return () => window.removeEventListener("openMFFCalculator", handleOpenCalculator);
  }, []);

  // City Autocomplete
  const fetchCitySuggestions = useCallback(async (query: string) => {
    if (query.length < 2) {
      setCitySuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=5&lang=de&layer=city&osm_tag=place:city&osm_tag=place:town&bbox=5.87,47.27,15.04,55.06`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const germanCities = data.features
          .filter((f: { properties: { country?: string; countrycode?: string } }) =>
            f.properties.country === "Germany" || f.properties.countrycode === "DE"
          )
          .map((f: { properties: { name: string; state?: string; county?: string } }) => ({
            city: f.properties.name,
            state: f.properties.state || f.properties.county || "",
          }));

        if (germanCities.length > 0) {
          setCitySuggestions(germanCities);
          setShowSuggestions(true);
          setActiveIndex(-1);
        } else {
          setCitySuggestions([]);
          setShowSuggestions(false);
        }
      }
    } catch (error) {
      console.error("Autocomplete error:", error);
      setCitySuggestions([]);
      setShowSuggestions(false);
    }
  }, []);

  const selectCity = (city: CityResult) => {
    setFormData(prev => ({ ...prev, city: city.city }));
    setCitySuggestions([]);
    setShowSuggestions(false);
  };

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  // Validation
  const validateStep1 = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.date) {
      newErrors.date = "Bitte wählen Sie ein Datum";
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = "Das Datum liegt in der Vergangenheit";
      }
      const year = parseInt(formData.date.split("-")[0], 10);
      if (year > 9999 || year < 1000) {
        newErrors.date = "Bitte geben Sie ein gültiges Jahr ein (4 Ziffern)";
      }
    }

    if (!formData.city) {
      newErrors.city = "Bitte geben Sie eine Stadt an";
    }

    if (!formData.guests) {
      newErrors.guests = "Bitte wählen Sie eine Gästeanzahl";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    if (!formData.package) {
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Bitte gebe deinen Namen an";
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Bitte gebe eine gültige E-Mail an";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Bitte gebe eine Telefonnummer an";
    }

    if (!formData.privacy) {
      newErrors.privacy = "Bitte akzeptiere die Datenschutzerklärung";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep3()) return;

    setIsSubmitting(true);
    setErrorMessage("");

    // Package-Label für E-Mail
    const packageLabels: Record<string, string> = {
      dj: "Nur DJ",
      band: "Full Band",
      band_dj: "Full Band + DJ",
    };

    // E-Mail-Body erstellen
    const emailBody = `
Neue Anfrage von der Website

Name: ${formData.name}
Firma: ${formData.company || "-"}
E-Mail: ${formData.email}
Telefon: ${formData.phone}

Event-Details:
- Datum: ${formData.date}
- Uhrzeit: ${formData.time || "Nicht angegeben"}
- Stadt: ${formData.city}
- Gäste: ${formData.guests}
- Budget: ${formData.budget || "Nicht angegeben"}
- Paket: ${packageLabels[formData.package] || formData.package}

Nachricht:
${formData.message || "Keine Nachricht"}
    `.trim();

    // mailto-Link öffnen
    const mailtoLink = `mailto:info@musikfuerfirmen.de?subject=${encodeURIComponent(
      `Neue Anfrage: ${formData.city} am ${formData.date}`
    )}&body=${encodeURIComponent(emailBody)}`;

    window.location.href = mailtoLink;

    // Kurze Verzögerung, dann Success zeigen
    setTimeout(() => {
      setSubmitStatus("success");
      setIsSubmitting(false);
    }, 500);
  };

  const openCalcom = () => {
    window.open("https://cal.com/musikfuerfirmen.de/30min", "_blank");
  };

  // Get today's date for min attribute
  const today = new Date().toISOString().split("T")[0];
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 5);
  const maxDateStr = maxDate.toISOString().split("T")[0];

  if (!isOpen) return null;

  return (
    <div
      className={`mff-modal-overlay fixed inset-0 z-[2147483647] flex items-center justify-center p-[10px] transition-all duration-300 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      style={{ background: "rgba(0, 0, 0, 0)", backdropFilter: "blur(8px)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`mff-modal-content relative bg-white rounded-2xl max-w-[800px] w-full max-h-[90vh] min-h-[300px] overflow-y-auto shadow-[0_20px_60px_rgba(0,0,0,0.3)] transform transition-transform duration-300 ${
          isOpen ? "scale-100 translate-y-0" : "scale-90 translate-y-5"
        }`}
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 bg-black/10 border-none rounded-full w-10 h-10 flex items-center justify-center cursor-pointer z-10 transition-all duration-200 text-[#292929] hover:bg-black/20 hover:rotate-90"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Calculator Content */}
        <div id="mff-calculator" className="w-full p-4 box-border text-[#1a1a1a] leading-relaxed">
          <div className="mff-card bg-white rounded-xl p-6 md:px-[30px] relative">
            {/* Back Arrow (for step 2 and 3) */}
            {step > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="absolute top-4 left-4 bg-black/10 border-none rounded-full w-8 h-8 flex items-center justify-center cursor-pointer z-10 transition-all duration-200 text-[#292929] hover:bg-black/20 hover:-translate-x-[2px]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
            )}

            {/* Header */}
            <div className="mff-header text-center mb-6">
              <h2 className="text-[26px] font-normal m-0 mb-2 text-[#1a1a1a]">
                Deine Wünsche<br />für ein unvergessliches Event
              </h2>
              <p className="text-sm font-light text-[#666666] m-0">
                Teile uns deine Anforderungen mit und erhalten innerhalb von 24 Stunden ein unverbindliches Angebot.
              </p>
            </div>

            {/* Step 1: Event Details */}
            {step === 1 && (
              <div className="mff-step mb-4">
                <div className="mff-step-label flex items-center gap-[10px] text-[15px] font-normal mb-[14px]">
                  <span className="mff-step-number inline-flex items-center justify-center w-7 h-7 bg-[#B2EAD8] text-[#292929] rounded-full text-[13px] font-semibold">1</span>
                  <span>Event-Details</span>
                </div>

                {/* Date & Time Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[6px] mb-[6px]">
                  <div className="flex flex-col gap-[3px]">
                    <label htmlFor="mff-date" className="text-[13px] font-normal text-[#1a1a1a]">Datum *</label>
                    <input
                      type="date"
                      id="mff-date"
                      value={formData.date}
                      onChange={(e) => updateField("date", e.target.value)}
                      min={today}
                      max={maxDateStr}
                      className={`w-full p-2 px-[10px] text-sm font-light border-2 rounded-[10px] bg-white text-[#1a1a1a] transition-all duration-200 focus:outline-none focus:border-[#B2EAD8] focus:shadow-[0_0_0_4px_rgba(178,234,216,0.1)] ${errors.date ? "border-red-600" : "border-[#e0e0e0]"}`}
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    />
                    {errors.date && <span className="text-xs text-red-600 mt-1">{errors.date}</span>}
                  </div>
                  <div className="flex flex-col gap-[3px]">
                    <label htmlFor="mff-time" className="text-[13px] font-normal text-[#1a1a1a]">Startzeit Event (optional)</label>
                    <input
                      type="time"
                      id="mff-time"
                      value={formData.time}
                      onChange={(e) => updateField("time", e.target.value)}
                      className="w-full p-2 px-[10px] text-sm font-light border-2 border-[#e0e0e0] rounded-[10px] bg-white text-[#1a1a1a] transition-all duration-200 focus:outline-none focus:border-[#B2EAD8] focus:shadow-[0_0_0_4px_rgba(178,234,216,0.1)]"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    />
                  </div>
                </div>

                {/* City & Budget Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[6px] mb-[6px]">
                  <div className="flex flex-col gap-[3px] relative">
                    <label htmlFor="mff-city" className="text-[13px] font-normal text-[#1a1a1a]">Stadt *</label>
                    <input
                      type="text"
                      id="mff-city"
                      value={formData.city}
                      onChange={(e) => {
                        updateField("city", e.target.value);
                        fetchCitySuggestions(e.target.value);
                      }}
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                      placeholder="z.B. Hamburg"
                      autoComplete="off"
                      className={`w-full p-2 px-[10px] text-sm font-light border-2 rounded-[10px] bg-white text-[#1a1a1a] transition-all duration-200 focus:outline-none focus:border-[#B2EAD8] focus:shadow-[0_0_0_4px_rgba(178,234,216,0.1)] ${errors.city ? "border-red-600" : "border-[#e0e0e0]"}`}
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    />
                    {errors.city && <span className="text-xs text-red-600 mt-1">{errors.city}</span>}

                    {/* City Autocomplete Dropdown */}
                    {showSuggestions && citySuggestions.length > 0 && (
                      <div className="absolute top-full left-0 right-0 bg-white border-2 border-[#e0e0e0] border-t-0 rounded-b-xl max-h-[200px] overflow-y-auto z-[1000] shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
                        {citySuggestions.map((city, index) => (
                          <div
                            key={index}
                            onClick={() => selectCity(city)}
                            className={`p-[10px_12px] cursor-pointer text-[13px] font-light border-b border-[#f0f0f0] last:border-b-0 transition-colors duration-200 hover:bg-[#B2EAD8] ${activeIndex === index ? "bg-[#B2EAD8]" : ""}`}
                          >
                            <span className="font-normal text-[#1a1a1a]">{city.city}</span>
                            {city.state && <span className="text-xs text-[#666666] ml-2">{city.state}</span>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-[3px]">
                    <label htmlFor="mff-budget" className="text-[13px] font-normal text-[#1a1a1a]">Budget (optional)</label>
                    <input
                      type="text"
                      id="mff-budget"
                      value={formData.budget}
                      onChange={(e) => updateField("budget", e.target.value)}
                      placeholder="z.B. 5.000 €"
                      className="w-full p-2 px-[10px] text-sm font-light border-2 border-[#e0e0e0] rounded-[10px] bg-white text-[#1a1a1a] transition-all duration-200 focus:outline-none focus:border-[#B2EAD8] focus:shadow-[0_0_0_4px_rgba(178,234,216,0.1)]"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    />
                  </div>
                </div>

                {/* Guests */}
                <div className="flex flex-col gap-[3px] mb-[6px]">
                  <label htmlFor="mff-guests" className="text-[13px] font-normal text-[#1a1a1a]">Anzahl Gäste *</label>
                  <select
                    id="mff-guests"
                    value={formData.guests}
                    onChange={(e) => updateField("guests", e.target.value)}
                    className={`w-full p-2 px-[10px] text-sm font-light border-2 rounded-[10px] bg-white text-[#1a1a1a] transition-all duration-200 focus:outline-none focus:border-[#B2EAD8] focus:shadow-[0_0_0_4px_rgba(178,234,216,0.1)] ${errors.guests ? "border-red-600" : "border-[#e0e0e0]"}`}
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    <option value="">Bitte wählen...</option>
                    <option value="lt100">Unter 100</option>
                    <option value="100-300">100 - 300</option>
                    <option value="300-500">300 - 500</option>
                    <option value="gt500">&gt;500</option>
                  </select>
                  {errors.guests && <span className="text-xs text-red-600 mt-1">{errors.guests}</span>}
                </div>

                {/* Next Button */}
                <div className="grid grid-cols-1 gap-3 mt-4">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="p-[10px_20px] text-sm font-normal border-none rounded-[10px] cursor-pointer transition-all duration-200 text-center inline-flex items-center justify-center gap-[6px] bg-[#B2EAD8] text-[#292929] hover:bg-[#7dc9b1] hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Weiter
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Package Selection */}
            {step === 2 && (
              <div className="mff-step mb-4">
                <div className="mff-step-label flex items-center gap-[10px] text-[15px] font-normal mb-[14px]">
                  <span className="mff-step-number inline-flex items-center justify-center w-7 h-7 bg-[#B2EAD8] text-[#292929] rounded-full text-[13px] font-semibold">2</span>
                  <span>Was möchtest du buchen?</span>
                </div>

                <div className="grid gap-[10px]">
                  {[
                    { value: "dj", label: "Nur DJ" },
                    { value: "band", label: "Full Band" },
                    { value: "band_dj", label: "Full Band + DJ" },
                  ].map((pkg) => (
                    <label
                      key={pkg.value}
                      className={`relative flex items-center p-[14px_18px] border-2 rounded-[10px] cursor-pointer transition-all duration-200 hover:border-[#B2EAD8] hover:bg-[#f8f8f8] hover:-translate-y-[2px] hover:shadow-[0_2px_12px_rgba(0,0,0,0.08)] ${formData.package === pkg.value ? "border-[#B2EAD8] bg-[#f8f8f8]" : "border-[#e0e0e0]"}`}
                    >
                      <input
                        type="radio"
                        name="package"
                        value={pkg.value}
                        checked={formData.package === pkg.value}
                        onChange={(e) => updateField("package", e.target.value)}
                        className="absolute opacity-0"
                      />
                      <span className={`relative w-5 h-5 border-2 rounded-full mr-3 transition-all duration-200 ${formData.package === pkg.value ? "border-[#B2EAD8] bg-[#B2EAD8]" : "border-[#e0e0e0]"}`}>
                        {formData.package === pkg.value && (
                          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#292929]" />
                        )}
                      </span>
                      <span className="text-sm font-light">{pkg.label}</span>
                    </label>
                  ))}
                </div>

                {/* Next Button */}
                <div className="grid grid-cols-1 gap-3 mt-4">
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!formData.package}
                    className="p-[10px_20px] text-sm font-normal border-none rounded-[10px] cursor-pointer transition-all duration-200 text-center inline-flex items-center justify-center gap-[6px] bg-[#B2EAD8] text-[#292929] hover:bg-[#7dc9b1] hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-[#e0e0e0]"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Weiter
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Contact Details */}
            {step === 3 && submitStatus !== "success" && (
              <form
                className="mff-step mb-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <div className="mff-step-label flex items-center gap-[10px] text-[15px] font-normal mb-[14px]">
                  <span className="mff-step-number inline-flex items-center justify-center w-7 h-7 bg-[#B2EAD8] text-[#292929] rounded-full text-[13px] font-semibold">3</span>
                  <span>Deine Kontaktdaten</span>
                </div>

                {/* Name & Company Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[6px] mb-[6px]">
                  <div className="flex flex-col gap-[3px]">
                    <label htmlFor="mff-name" className="text-[13px] font-normal text-[#1a1a1a]">Name *</label>
                    <input
                      type="text"
                      id="mff-name"
                      value={formData.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      placeholder="Dein Name"
                      className={`w-full p-2 px-[10px] text-sm font-light border-2 rounded-[10px] bg-white text-[#1a1a1a] transition-all duration-200 focus:outline-none focus:border-[#B2EAD8] focus:shadow-[0_0_0_4px_rgba(178,234,216,0.1)] ${errors.name ? "border-red-600" : "border-[#e0e0e0]"}`}
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    />
                    {errors.name && <span className="text-xs text-red-600 mt-1">{errors.name}</span>}
                  </div>
                  <div className="flex flex-col gap-[3px]">
                    <label htmlFor="mff-company" className="text-[13px] font-normal text-[#1a1a1a]">Firma (optional)</label>
                    <input
                      type="text"
                      id="mff-company"
                      value={formData.company}
                      onChange={(e) => updateField("company", e.target.value)}
                      placeholder="Deine Firma"
                      className="w-full p-2 px-[10px] text-sm font-light border-2 border-[#e0e0e0] rounded-[10px] bg-white text-[#1a1a1a] transition-all duration-200 focus:outline-none focus:border-[#B2EAD8] focus:shadow-[0_0_0_4px_rgba(178,234,216,0.1)]"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    />
                  </div>
                </div>

                {/* Email & Phone Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[6px] mb-[6px]">
                  <div className="flex flex-col gap-[3px]">
                    <label htmlFor="mff-email" className="text-[13px] font-normal text-[#1a1a1a]">E-Mail *</label>
                    <input
                      type="email"
                      id="mff-email"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      placeholder="deine@email.de"
                      className={`w-full p-2 px-[10px] text-sm font-light border-2 rounded-[10px] bg-white text-[#1a1a1a] transition-all duration-200 focus:outline-none focus:border-[#B2EAD8] focus:shadow-[0_0_0_4px_rgba(178,234,216,0.1)] ${errors.email ? "border-red-600" : "border-[#e0e0e0]"}`}
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    />
                    {errors.email && <span className="text-xs text-red-600 mt-1">{errors.email}</span>}
                  </div>
                  <div className="flex flex-col gap-[3px]">
                    <label htmlFor="mff-phone" className="text-[13px] font-normal text-[#1a1a1a]">Telefon *</label>
                    <input
                      type="tel"
                      id="mff-phone"
                      value={formData.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      placeholder="+49 123 456789"
                      className={`w-full p-2 px-[10px] text-sm font-light border-2 rounded-[10px] bg-white text-[#1a1a1a] transition-all duration-200 focus:outline-none focus:border-[#B2EAD8] focus:shadow-[0_0_0_4px_rgba(178,234,216,0.1)] ${errors.phone ? "border-red-600" : "border-[#e0e0e0]"}`}
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    />
                    {errors.phone && <span className="text-xs text-red-600 mt-1">{errors.phone}</span>}
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-[3px] mb-[6px]">
                  <label htmlFor="mff-message" className="text-[13px] font-normal text-[#1a1a1a]">Nachricht (optional)</label>
                  <textarea
                    id="mff-message"
                    value={formData.message}
                    onChange={(e) => updateField("message", e.target.value)}
                    placeholder="Weitere Details zu deinem Event..."
                    className="w-full p-2 px-[10px] text-sm font-light border-2 border-[#e0e0e0] rounded-[10px] bg-white text-[#1a1a1a] transition-all duration-200 min-h-[50px] resize-y focus:outline-none focus:border-[#B2EAD8] focus:shadow-[0_0_0_4px_rgba(178,234,216,0.1)]"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  />
                </div>

                {/* Privacy Checkbox */}
                <div className="flex items-start gap-2 mt-2 p-2 bg-[#f8f8f8] rounded-lg">
                  <input
                    type="checkbox"
                    id="mff-privacy"
                    checked={formData.privacy}
                    onChange={(e) => updateField("privacy", e.target.checked)}
                    className="w-4 h-4 mt-[2px] cursor-pointer accent-[#B2EAD8]"
                  />
                  <label htmlFor="mff-privacy" className="text-[11px] font-light cursor-pointer leading-[1.4]">
                    Ich habe die <a href="/datenschutz" target="_blank" className="text-[#B2EAD8] underline font-normal hover:text-[#7dc9b1]">Datenschutzerklärung</a> gelesen und akzeptiert. *
                  </label>
                </div>
                {errors.privacy && <span className="text-xs text-red-600 mt-1 block">{errors.privacy}</span>}

                {/* Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                  <button
                    type="button"
                    onClick={openCalcom}
                    className="p-[10px_20px] text-sm font-normal rounded-[10px] cursor-pointer transition-all duration-200 text-center inline-flex items-center justify-center gap-[6px] bg-white text-[#1a1a1a] border-2 border-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white hover:-translate-y-[2px] hover:shadow-[0_2px_12px_rgba(0,0,0,0.08)]"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    📅 Gespräch buchen
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="p-[10px_20px] text-sm font-normal border-none rounded-[10px] cursor-pointer transition-all duration-200 text-center inline-flex items-center justify-center gap-[6px] bg-[#B2EAD8] text-[#292929] hover:bg-[#7dc9b1] hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-[#e0e0e0]"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="inline-block w-[18px] h-[18px] border-2 border-[rgba(41,41,41,0.3)] border-t-[#292929] rounded-full animate-spin" />
                        Wird gesendet...
                      </>
                    ) : (
                      "Anfrage absenden"
                    )}
                  </button>
                </div>

                {/* Error Message */}
                {submitStatus === "error" && (
                  <div className="bg-red-600 text-white p-[14px] rounded-[10px] text-center mt-[14px] font-normal text-sm">
                    ⚠ {errorMessage || "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut."}
                  </div>
                )}
              </form>
            )}

            {/* Success Message */}
            {submitStatus === "success" && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Anfrage gesendet!</h3>
                <p className="text-gray-600 mb-2">Vielen Dank! Wir melden uns in Kürze bei dir.</p>
                <p className="text-gray-600 mb-8">In 48 Stunden erhältst du ein detailliertes Angebot.</p>
                <button
                  onClick={onClose}
                  className="p-[10px_20px] text-sm font-normal border-none rounded-[10px] cursor-pointer bg-[#B2EAD8] text-[#292929] hover:bg-[#7dc9b1]"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Alles klar!
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
