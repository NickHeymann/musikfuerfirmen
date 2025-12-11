"use client";

/**
 * TrustBar Component
 * Displays social proof metrics (events, rating, years in business)
 * Positioned below hero section for credibility boost
 */

import { StarIcon, CalendarIcon, AwardIcon } from "./icons";

export default function TrustBar() {
  return (
    <div className="trust-bar">
      <div className="trust-container">
        <div className="trust-item">
          <CalendarIcon className="trust-icon" />
          <div className="trust-content">
            <div className="trust-number">500+</div>
            <div className="trust-label">Erfolgreiche Events</div>
          </div>
        </div>

        <div className="trust-divider"></div>

        <div className="trust-item">
          <StarIcon className="trust-icon filled" />
          <div className="trust-content">
            <div className="trust-number">4.9★</div>
            <div className="trust-label">Durchschnittliche Bewertung</div>
          </div>
        </div>

        <div className="trust-divider"></div>

        <div className="trust-item">
          <AwardIcon className="trust-icon" />
          <div className="trust-content">
            <div className="trust-number">Seit 2019</div>
            <div className="trust-label">Eure Experten für Firmenevents</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .trust-bar {
          background: linear-gradient(135deg, #f8f9fa 0%, #fff 100%);
          padding: 32px 20px;
          border-bottom: 1px solid #e9ecef;
        }

        .trust-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-around;
          align-items: center;
          gap: 40px;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .trust-icon {
          width: 48px;
          height: 48px;
          color: #2DD4A8;
          flex-shrink: 0;
        }

        .trust-icon.filled {
          fill: #2DD4A8;
        }

        .trust-content {
          display: flex;
          flex-direction: column;
        }

        .trust-number {
          font-size: 28px;
          font-weight: 700;
          color: #2DD4A8;
          line-height: 1.2;
          font-family: "Poppins", sans-serif;
        }

        .trust-label {
          font-size: 13px;
          color: #6c757d;
          font-weight: 500;
          line-height: 1.3;
        }

        .trust-divider {
          width: 1px;
          height: 50px;
          background: linear-gradient(to bottom, transparent, #dee2e6, transparent);
        }

        /* Tablet */
        @media (max-width: 1024px) {
          .trust-container {
            gap: 24px;
          }

          .trust-item {
            gap: 12px;
          }

          .trust-icon {
            width: 40px;
            height: 40px;
          }

          .trust-number {
            font-size: 24px;
          }

          .trust-label {
            font-size: 12px;
          }
        }

        /* Mobile */
        @media (max-width: 768px) {
          .trust-bar {
            padding: 24px 16px;
          }

          .trust-container {
            flex-direction: column;
            gap: 20px;
          }

          .trust-divider {
            display: none;
          }

          .trust-item {
            width: 100%;
            justify-content: center;
          }

          .trust-number {
            font-size: 22px;
          }

          .trust-label {
            font-size: 11px;
            text-align: left;
          }
        }

        /* Small Mobile */
        @media (max-width: 480px) {
          .trust-icon {
            width: 36px;
            height: 36px;
          }

          .trust-number {
            font-size: 20px;
          }
        }
      `}</style>
    </div>
  );
}
