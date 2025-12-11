"use client";

/**
 * PricingIndicator Component
 * Shows transparent pricing tiers to reduce friction and build trust
 * Addresses critical CVR blocker: price transparency
 */

export default function PricingIndicator() {
  const pricingTiers = [
    {
      name: "Starter",
      description: "Perfekt für kleine Events",
      price: "ab 1.500€",
      features: [
        "DJ oder Duo-Band",
        "Grundlegende Tontechnik",
        "Bis zu 4 Stunden Musik",
        "Persönliche Beratung",
      ],
      highlight: false,
    },
    {
      name: "Professional",
      description: "Für mittelgroße Firmenevents",
      price: "ab 3.500€",
      features: [
        "Live-Band (4-6 Musiker)",
        "Professionelle PA-Anlage",
        "Bis zu 6 Stunden Musik",
        "Individuelle Musikauswahl",
        "Auf Wunsch: Licht & Bühne",
      ],
      highlight: true,
    },
    {
      name: "Premium",
      description: "Das Komplettpaket für große Events",
      price: "auf Anfrage",
      features: [
        "Live-Band nach Wahl",
        "Komplette Event-Technik",
        "Unbegrenzte Spielzeit",
        "Event-Management",
        "Licht, Bühne, Sonderwünsche",
      ],
      highlight: false,
    },
  ];

  return (
    <section className="pricing-section">
      <div className="pricing-container">
        <div className="pricing-header">
          <h2 className="pricing-title">Transparente Preise. Keine Überraschungen.</h2>
          <p className="pricing-subtitle">
            Wählt das Paket, das zu eurem Event passt. Individuelle Anpassungen jederzeit möglich.
          </p>
        </div>

        <div className="pricing-grid">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`pricing-card ${tier.highlight ? "highlighted" : ""}`}
            >
              {tier.highlight && <div className="popular-badge">Beliebteste Wahl</div>}

              <div className="pricing-card-header">
                <h3 className="tier-name">{tier.name}</h3>
                <p className="tier-description">{tier.description}</p>
                <div className="tier-price">{tier.price}</div>
              </div>

              <ul className="features-list">
                {tier.features.map((feature, i) => (
                  <li key={i} className="feature-item">
                    <svg
                      className="check-icon"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#kontakt"
                className={`cta-button ${tier.highlight ? "primary" : "secondary"}`}
              >
                Jetzt anfragen
              </a>
            </div>
          ))}
        </div>

        <p className="pricing-note">
          Alle Preise verstehen sich zzgl. MwSt. Individuelle Pakete auf Anfrage.
        </p>
      </div>

      <style jsx>{`
        .pricing-section {
          background: linear-gradient(to bottom, #fff 0%, #f8f9fa 100%);
          padding: 80px 20px;
        }

        .pricing-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .pricing-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .pricing-title {
          font-size: 42px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 16px;
          font-family: "Poppins", sans-serif;
        }

        .pricing-subtitle {
          font-size: 18px;
          color: #6c757d;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          margin-bottom: 40px;
        }

        .pricing-card {
          background: #fff;
          border: 2px solid #e9ecef;
          border-radius: 16px;
          padding: 40px 30px;
          display: flex;
          flex-direction: column;
          position: relative;
          transition: all 0.3s ease;
        }

        .pricing-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
        }

        .pricing-card.highlighted {
          border-color: #2DD4A8;
          box-shadow: 0 8px 30px rgba(45, 212, 168, 0.15);
          transform: scale(1.05);
        }

        .pricing-card.highlighted:hover {
          transform: scale(1.05) translateY(-8px);
        }

        .popular-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, #2DD4A8 0%, #22a883 100%);
          color: #fff;
          padding: 6px 20px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .pricing-card-header {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 30px;
          border-bottom: 1px solid #e9ecef;
        }

        .tier-name {
          font-size: 28px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 8px;
          font-family: "Poppins", sans-serif;
        }

        .tier-description {
          font-size: 14px;
          color: #6c757d;
          margin-bottom: 20px;
        }

        .tier-price {
          font-size: 36px;
          font-weight: 700;
          color: #2DD4A8;
          font-family: "Poppins", sans-serif;
        }

        .features-list {
          list-style: none;
          padding: 0;
          margin: 0 0 30px;
          flex-grow: 1;
        }

        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 14px;
          font-size: 15px;
          color: #495057;
          line-height: 1.6;
        }

        .check-icon {
          width: 20px;
          height: 20px;
          color: #2DD4A8;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .cta-button {
          display: block;
          text-align: center;
          padding: 14px 28px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 15px;
          text-decoration: none;
          transition: all 0.2s ease;
          font-family: "Poppins", sans-serif;
        }

        .cta-button.primary {
          background: linear-gradient(135deg, #2DD4A8 0%, #22a883 100%);
          color: #fff;
        }

        .cta-button.primary:hover {
          background: linear-gradient(135deg, #22a883 0%, #1d8c6d 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(45, 212, 168, 0.3);
        }

        .cta-button.secondary {
          background: #fff;
          color: #2DD4A8;
          border: 2px solid #2DD4A8;
        }

        .cta-button.secondary:hover {
          background: #2DD4A8;
          color: #fff;
        }

        .pricing-note {
          text-align: center;
          font-size: 13px;
          color: #868e96;
          font-style: italic;
        }

        /* Tablet */
        @media (max-width: 1024px) {
          .pricing-title {
            font-size: 36px;
          }

          .pricing-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .pricing-card.highlighted {
            transform: scale(1);
          }

          .pricing-card.highlighted:hover {
            transform: translateY(-8px);
          }
        }

        /* Mobile */
        @media (max-width: 768px) {
          .pricing-section {
            padding: 60px 16px;
          }

          .pricing-title {
            font-size: 28px;
          }

          .pricing-subtitle {
            font-size: 16px;
          }

          .pricing-card {
            padding: 30px 24px;
          }

          .tier-name {
            font-size: 24px;
          }

          .tier-price {
            font-size: 30px;
          }
        }
      `}</style>
    </section>
  );
}
