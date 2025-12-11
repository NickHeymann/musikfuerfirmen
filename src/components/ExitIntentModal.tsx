"use client";

/**
 * ExitIntentModal Component
 * Shows a modal with lead magnet when user is about to leave the page
 * Only shows once per session
 * Offers free Event-Planner PDF download
 */

import { useState, useEffect } from "react";
import { CloseIcon } from "./icons";

export default function ExitIntentModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Check if modal was already shown in this session
    const hasSeenModal = sessionStorage.getItem("exitIntentShown");
    if (hasSeenModal) return;

    let exitIntentTriggered = false;

    const handleMouseLeave = (e: MouseEvent) => {
      // Detect mouse leaving from top of viewport
      if (e.clientY <= 10 && !exitIntentTriggered) {
        exitIntentTriggered = true;
        setIsVisible(true);
        sessionStorage.setItem("exitIntentShown", "true");
      }
    };

    // Add listener after 5 seconds (give user time to engage with content)
    const timeout = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call (in production, this would send to your email service)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSubmitted(true);
    setIsSubmitting(false);

    // Auto-close after 3 seconds
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };

  if (!isVisible) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={handleClose} aria-label="Close modal">
          <CloseIcon />
        </button>

        {!submitted ? (
          <>
            <div className="modal-icon">📋</div>

            <h2 className="modal-title">Wartet! Nehmt euren kostenlosen Event-Planer mit</h2>

            <p className="modal-description">
              Bevor ihr geht: Ladet euch unseren <strong>Event-Planner PDF</strong> herunter
              (Wert: 49€) – komplett kostenlos! Checklisten, Budgetrechner und Profi-Tipps
              für eure perfekte Firmenfeier.
            </p>

            <form onSubmit={handleSubmit} className="email-form">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="eure@firma-email.de"
                required
                className="email-input"
              />

              <button type="submit" disabled={isSubmitting} className="submit-button">
                {isSubmitting ? "Wird gesendet..." : "Kostenlos herunterladen"}
              </button>
            </form>

            <p className="privacy-note">
              🔒 Wir respektieren eure Privatsphäre. Keine Spam-Mails, versprochen.
            </p>
          </>
        ) : (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h3 className="success-title">Perfekt! Check eure E-Mails</h3>
            <p className="success-text">
              Wir haben euch den Event-Planner gerade zugeschickt.
              Viel Erfolg bei eurem nächsten Event! 🎉
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          padding: 20px;
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .modal-content {
          background: white;
          border-radius: 20px;
          padding: 48px 40px;
          max-width: 560px;
          width: 100%;
          position: relative;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .close-button {
          position: absolute;
          top: 16px;
          right: 16px;
          background: transparent;
          border: none;
          cursor: pointer;
          color: #6c757d;
          transition: all 0.2s ease;
          padding: 8px;
        }

        .close-button:hover {
          color: #1a1a1a;
          transform: rotate(90deg);
        }

        .modal-icon {
          font-size: 64px;
          text-align: center;
          margin-bottom: 24px;
        }

        .modal-title {
          font-size: 28px;
          font-weight: 700;
          color: #1a1a1a;
          text-align: center;
          margin-bottom: 16px;
          font-family: "Poppins", sans-serif;
          line-height: 1.3;
        }

        .modal-description {
          font-size: 16px;
          color: #495057;
          text-align: center;
          line-height: 1.6;
          margin-bottom: 32px;
        }

        .modal-description strong {
          color: #2DD4A8;
          font-weight: 600;
        }

        .email-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 16px;
        }

        .email-input {
          padding: 16px 20px;
          border: 2px solid #e9ecef;
          border-radius: 12px;
          font-size: 16px;
          font-family: "Poppins", sans-serif;
          transition: all 0.2s ease;
        }

        .email-input:focus {
          outline: none;
          border-color: #2DD4A8;
          box-shadow: 0 0 0 4px rgba(45, 212, 168, 0.1);
        }

        .submit-button {
          padding: 16px 32px;
          background: linear-gradient(135deg, #2DD4A8 0%, #22a883 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 17px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: "Poppins", sans-serif;
        }

        .submit-button:hover:not(:disabled) {
          background: linear-gradient(135deg, #22a883 0%, #1d8c6d 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(45, 212, 168, 0.3);
        }

        .submit-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .privacy-note {
          text-align: center;
          font-size: 13px;
          color: #6c757d;
        }

        .success-message {
          text-align: center;
          padding: 20px 0;
        }

        .success-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #2DD4A8 0%, #22a883 100%);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 48px;
          font-weight: 700;
          margin: 0 auto 24px;
          animation: scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes scaleIn {
          from {
            transform: scale(0) rotate(-180deg);
          }
          to {
            transform: scale(1) rotate(0deg);
          }
        }

        .success-title {
          font-size: 24px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 12px;
          font-family: "Poppins", sans-serif;
        }

        .success-text {
          font-size: 16px;
          color: #495057;
          line-height: 1.6;
        }

        /* Mobile */
        @media (max-width: 640px) {
          .modal-content {
            padding: 36px 24px;
          }

          .modal-title {
            font-size: 22px;
          }

          .modal-description {
            font-size: 15px;
          }

          .modal-icon {
            font-size: 48px;
          }

          .email-input,
          .submit-button {
            font-size: 15px;
          }
        }
      `}</style>
    </div>
  );
}
