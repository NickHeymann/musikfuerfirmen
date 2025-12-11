"use client";

import { useEffect, useRef, useState } from "react";
import { getAssetPath } from "@/lib/config";

export default function Hero() {
  const [scrollPromptVisible, setScrollPromptVisible] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  // Force video to play on mount (browser autoplay policies)
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // Autoplay blocked - video will show poster
      });
    }
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

  const scrollToPreise = () => {
    const target = document.getElementById("preise");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: "calc(100vh - 108px)" }}>
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster={getAssetPath("/images/hero-fallback.jpg")}
        >
          <source src={getAssetPath("/videos/hero-background.mp4")} type="video/mp4" />
        </video>
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.42)" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 text-center">
        {/* Scarcity Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/90 backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-6 animate-pulse"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          🔥 Nur noch 3 Dezember 2026-Termine verfügbar
        </div>

        <h1
          className="hero-title text-white font-bold mb-6"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Firmenevents 2026, die eure Mitarbeiter noch Monate später feiern
        </h1>

        <p
          className="hero-subtitle text-white/90 mb-12 max-w-[700px] mx-auto"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Livebands, DJs und Technik für unvergessliche Firmenevents in Hamburg und deutschlandweit.
          Über 500 Events seit 2019 – Jetzt für 2026 planen!
        </p>

        <div className="cta-buttons-container">
          <button
            onClick={openCalculator}
            className="cta-primary"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Jetzt Angebot anfragen
          </button>

          <button
            onClick={scrollToPreise}
            className="cta-secondary"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Preise ansehen
          </button>
        </div>

        <ul className="mff-btn-features">
          <li>Frühbucher-Rabatt für 2026 Events (bis zu 15%)</li>
          <li>Rundum-sorglos-Paket inkl. Technik & GEMA</li>
          <li>Angebot innerhalb von 24 Stunden</li>
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
        .hero-title {
          font-size: clamp(32px, 5vw, 58px);
          line-height: 1.15;
          letter-spacing: -0.02em;
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .hero-subtitle {
          font-size: clamp(16px, 2.5vw, 20px);
          line-height: 1.6;
          font-weight: 300;
          animation: fadeInUp 0.8s ease-out 0.2s forwards;
          opacity: 0;
        }

        .cta-buttons-container {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 40px;
          animation: fadeInUp 0.8s ease-out 0.4s forwards;
          opacity: 0;
        }

        .cta-primary {
          padding: 16px 32px;
          background: linear-gradient(135deg, #2DD4A8 0%, #22a883 100%);
          color: white;
          border: none;
          border-radius: 50px;
          font-size: 17px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(45, 212, 168, 0.3);
        }

        .cta-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 30px rgba(45, 212, 168, 0.4);
          background: linear-gradient(135deg, #22a883 0%, #1d8c6d 100%);
        }

        .cta-secondary {
          padding: 16px 32px;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 2px solid white;
          border-radius: 50px;
          font-size: 17px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .cta-secondary:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }

        .mff-btn-features {
          max-width: 450px;
          margin: 0 auto;
          padding: 0;
          list-style: none;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          font-family: 'Poppins', sans-serif;
          animation: fadeInUp 0.8s ease-out 0.6s forwards;
          opacity: 0;
        }

        .mff-btn-features li {
          width: 100%;
          display: grid;
          grid-template-columns: 24px 1fr;
          column-gap: 12px;
          font-size: 16px;
          font-weight: 400;
          color: white;
          margin: 8px 0;
          text-align: left;
        }

        .mff-btn-features li::before {
          content: '✓';
          color: #2DD4A8;
          font-weight: 700;
          font-size: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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

        @media (max-width: 768px) {
          .hero-title {
            font-size: 28px;
            margin-bottom: 16px;
          }

          .hero-subtitle {
            font-size: 15px;
            margin-bottom: 32px;
          }

          .cta-buttons-container {
            flex-direction: column;
            gap: 12px;
            margin-bottom: 32px;
          }

          .cta-primary,
          .cta-secondary {
            width: 100%;
            max-width: 320px;
            padding: 14px 24px;
            font-size: 16px;
          }

          .mff-btn-features {
            margin-top: 0;
            padding: 0 16px;
            max-width: 100%;
          }

          .mff-btn-features li {
            font-size: 14px;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 24px;
          }

          .hero-subtitle {
            font-size: 14px;
          }

          .cta-primary,
          .cta-secondary {
            font-size: 15px;
            padding: 12px 20px;
          }
        }
      `}</style>
    </section>
  );
}
