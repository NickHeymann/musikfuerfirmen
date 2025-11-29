"use client";

import { useEffect, useRef, useState } from "react";

const sliderContent = ["Musik", "Livebands", "Djs", "Technik"];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [letters, setLetters] = useState<string[]>([]);
  const [isHolding, setIsHolding] = useState(false);
  const [scrollPromptVisible, setScrollPromptVisible] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const slide = () => {
      const word = sliderContent[currentIndex];
      setLetters(word.split(""));
      setIsHolding(true);

      setTimeout(() => {
        setIsHolding(false);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % sliderContent.length);
        }, 350);
      }, 2650);
    };

    slide();
    const interval = setInterval(slide, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrollPromptVisible(false);
      } else {
        setScrollPromptVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollPromptClick = () => {
    const target = document.getElementById("waswirbieten");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  const openCalculator = () => {
    window.dispatchEvent(new CustomEvent("openMFFCalculator"));
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/hero-fallback.jpg"
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
        </video>
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.36)" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 text-center">
        <div
          className="slider-container text-center text-white font-bold"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          <div
            id="slider"
            className="inline-flex flex-row gap-[5px] items-center justify-center flex-wrap"
            style={{
              fontSize: "clamp(31px, 5vw, 55px)",
              letterSpacing: "1.5px"
            }}
          >
            <span className="static-text whitespace-nowrap">Deine</span>
            <div className="animated-section inline-flex items-center gap-[5px]">
              <span
                id="sliderValue"
                className={`inline-flex text-[#B2EAD8] font-bold justify-start whitespace-nowrap text-left ${
                  isHolding ? "holder-animation" : ""
                }`}
                style={{ letterSpacing: "1.5px" }}
              >
                {letters.map((letter, index) => (
                  <span
                    key={`${currentIndex}-${index}`}
                    className="inline-block animate-letter-fade"
                    style={{
                      animationDelay: `${index * 0.04 + 0.05}s`,
                    }}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </span>
                ))}
              </span>
              <span className="static-text whitespace-nowrap">für Firmenevents!</span>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <button
            onClick={openCalculator}
            className="mff-open-calculator-btn inline-block mx-auto px-12 py-[18px] bg-white text-[#292929] rounded-[50px] text-lg font-medium cursor-pointer transition-all duration-300 hover:bg-[#B2EAD8] hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Unverbindliches Angebot anfragen
          </button>
        </div>

        <ul
          className="mff-btn-features max-w-[600px] mx-auto mt-[60px] px-4 md:pl-[140px] list-none flex flex-col items-center"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          <li
            className="w-full max-w-[600px] grid grid-cols-[20px_1fr] gap-x-3 text-white font-light my-[3px] opacity-0 animate-feature-text"
            style={{
              fontSize: "calc(14px + 2pt)",
              animationDelay: "0.3s",
              animationFillMode: "forwards"
            }}
          >
            <span
              className="text-[#B2EAD8] font-bold text-xl flex items-center justify-center opacity-0 scale-0 animate-check-pop"
              style={{ animationDelay: "0s", animationFillMode: "forwards" }}
            >
              ✔
            </span>
            <span>100% unverbindlich</span>
          </li>
          <li
            className="w-full max-w-[600px] grid grid-cols-[20px_1fr] gap-x-3 text-white font-light my-[3px] opacity-0 animate-feature-text"
            style={{
              fontSize: "calc(14px + 2pt)",
              animationDelay: "0.9s",
              animationFillMode: "forwards"
            }}
          >
            <span
              className="text-[#B2EAD8] font-bold text-xl flex items-center justify-center opacity-0 scale-0 animate-check-pop"
              style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
            >
              ✔
            </span>
            <span>Antwort in 24h</span>
          </li>
          <li
            className="w-full max-w-[600px] grid grid-cols-[20px_1fr] gap-x-3 text-white font-light my-[3px] opacity-0 animate-feature-text"
            style={{
              fontSize: "calc(14px + 2pt)",
              animationDelay: "1.5s",
              animationFillMode: "forwards"
            }}
          >
            <span
              className="text-[#B2EAD8] font-bold text-xl flex items-center justify-center opacity-0 scale-0 animate-check-pop"
              style={{ animationDelay: "1.2s", animationFillMode: "forwards" }}
            >
              ✔
            </span>
            <span>Kostenloses Erstgespräch</span>
          </li>
        </ul>
      </div>

      <div
        className={`scroll-prompt fixed bottom-8 left-1/2 -translate-x-1/2 cursor-pointer z-20 transition-opacity duration-300 ${
          scrollPromptVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleScrollPromptClick}
      >
        <div className="scroll-prompt-arrow-container flex flex-col items-center animate-scroll-bounce">
          <div className="scroll-prompt-arrow">
            <div className="w-9 h-9 border-r-[6px] border-b-[6px] border-white/60 rotate-45" />
          </div>
          <div className="scroll-prompt-arrow -mt-3">
            <div className="w-9 h-9 border-r-[6px] border-b-[6px] border-white/60 rotate-45" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes letterFade {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-letter-fade {
          animation: letterFade 0.35s forwards;
          opacity: 0;
        }

        @keyframes holderAnimation {
          0% { opacity: 1; }
          88% { opacity: 1; }
          100% { opacity: 0; }
        }

        .holder-animation {
          animation: holderAnimation 3s;
        }

        @keyframes popInCheck {
          0% {
            opacity: 0;
            transform: scale(0) rotate(-180deg);
          }
          70% {
            transform: scale(1.2) rotate(10deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        .animate-check-pop {
          animation: popInCheck 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }

        @keyframes fadeInText {
          0% {
            opacity: 0;
            transform: translateX(-10px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-feature-text {
          animation: fadeInText 0.6s ease-out forwards;
        }

        @keyframes scrollBounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(20px);
          }
        }

        .animate-scroll-bounce {
          animation: scrollBounce 1.5s infinite;
        }
      `}</style>
    </section>
  );
}
