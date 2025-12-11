"use client";

/**
 * Testimonials Component
 * Displays customer testimonials with slider functionality
 * Addresses critical CVR blocker: lack of social proof
 */

import { useState, useEffect } from "react";
import { StarIcon } from "./icons";

const testimonials = [
  {
    name: "Sandra Müller",
    company: "Marketing Direktorin, Tech Solutions GmbH",
    image: "/images/testimonials/avatar-1.jpg",
    rating: 5,
    quote: "Die Band war der absolute Höhepunkt unserer Firmenfeier! Von der Planung bis zur Durchführung lief alles perfekt. Unsere 200 Gäste waren begeistert, und die Tanzfläche war die ganze Nacht voll. Absolute Empfehlung!",
  },
  {
    name: "Michael Schmidt",
    company: "CEO, Schmidt & Partner",
    image: "/images/testimonials/avatar-2.jpg",
    rating: 5,
    quote: "Professionell, zuverlässig und mit einem unglaublichen Gespür für die richtige Musik. Das Team hat unseren Event zu etwas ganz Besonderem gemacht. Die Technik war top, und die Band hat alle Altersgruppen begeistert.",
  },
  {
    name: "Julia Wagner",
    company: "HR-Leiterin, Innovate AG",
    image: "/images/testimonials/avatar-3.jpg",
    rating: 5,
    quote: "Endlich mal eine Event-Agentur, die mitdenkt! Vom ersten Beratungsgespräch bis zum letzten Ton lief alles reibungslos. Das Preis-Leistungs-Verhältnis ist hervorragend. Wir werden definitiv wieder buchen!",
  },
  {
    name: "Thomas Becker",
    company: "Operations Manager, LogistikPro",
    image: "/images/testimonials/avatar-4.jpg",
    rating: 5,
    quote: "Wir hatten nur 2 Wochen Vorlaufzeit für unsere Weihnachtsfeier. Das Team hat trotzdem alles möglich gemacht und einen unvergesslichen Abend organisiert. Rundum-sorglos-Paket trifft es perfekt!",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <h2 className="testimonials-title">Was unsere Kunden sagen</h2>
          <p className="testimonials-subtitle">
            Über 500 zufriedene Firmen vertrauen auf unsere Expertise
          </p>
        </div>

        <div className="slider-container">
          <button
            onClick={prevSlide}
            className="slider-button prev"
            aria-label="Previous testimonial"
          >
            ‹
          </button>

          <div className="testimonial-card">
            <div className="stars">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <StarIcon key={i} className="star-icon filled" />
              ))}
            </div>

            <blockquote className="quote">
              "{testimonials[currentIndex].quote}"
            </blockquote>

            <div className="author">
              <div className="author-avatar">
                <div className="avatar-placeholder">
                  {testimonials[currentIndex].name.charAt(0)}
                </div>
              </div>
              <div className="author-info">
                <div className="author-name">{testimonials[currentIndex].name}</div>
                <div className="author-company">{testimonials[currentIndex].company}</div>
              </div>
            </div>
          </div>

          <button
            onClick={nextSlide}
            className="slider-button next"
            aria-label="Next testimonial"
          >
            ›
          </button>
        </div>

        <div className="slider-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .testimonials-section {
          background: linear-gradient(to bottom, #fff 0%, #f8f9fa 100%);
          padding: 80px 20px;
        }

        .testimonials-container {
          max-width: 1100px;
          margin: 0 auto;
        }

        .testimonials-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .testimonials-title {
          font-size: 42px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 16px;
          font-family: "Poppins", sans-serif;
        }

        .testimonials-subtitle {
          font-size: 18px;
          color: #6c757d;
          max-width: 600px;
          margin: 0 auto;
        }

        .slider-container {
          position: relative;
          display: flex;
          align-items: center;
          gap: 24px;
          margin-bottom: 40px;
        }

        .testimonial-card {
          background: #fff;
          border-radius: 20px;
          padding: 48px 40px;
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.08);
          flex: 1;
          min-height: 320px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .stars {
          display: flex;
          gap: 4px;
          margin-bottom: 24px;
        }

        .star-icon {
          width: 20px;
          height: 20px;
          color: #FFB800;
        }

        .star-icon.filled {
          fill: #FFB800;
        }

        .quote {
          font-size: 18px;
          line-height: 1.7;
          color: #333;
          font-style: italic;
          margin: 0 0 32px;
          flex-grow: 1;
        }

        .author {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .author-avatar {
          flex-shrink: 0;
        }

        .avatar-placeholder {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, #2DD4A8 0%, #22a883 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: 600;
          font-family: "Poppins", sans-serif;
        }

        .author-info {
          flex: 1;
        }

        .author-name {
          font-size: 17px;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 4px;
          font-family: "Poppins", sans-serif;
        }

        .author-company {
          font-size: 14px;
          color: #6c757d;
        }

        .slider-button {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #fff;
          border: 2px solid #e9ecef;
          color: #495057;
          font-size: 32px;
          font-weight: 300;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .slider-button:hover {
          background: #2DD4A8;
          border-color: #2DD4A8;
          color: white;
          transform: scale(1.1);
        }

        .slider-dots {
          display: flex;
          justify-content: center;
          gap: 12px;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #dee2e6;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dot.active {
          background: #2DD4A8;
          transform: scale(1.3);
        }

        .dot:hover {
          background: #22a883;
        }

        /* Tablet */
        @media (max-width: 1024px) {
          .testimonials-title {
            font-size: 36px;
          }

          .testimonial-card {
            padding: 40px 32px;
            min-height: 300px;
          }

          .quote {
            font-size: 17px;
          }
        }

        /* Mobile */
        @media (max-width: 768px) {
          .testimonials-section {
            padding: 60px 16px;
          }

          .testimonials-title {
            font-size: 28px;
          }

          .testimonials-subtitle {
            font-size: 16px;
          }

          .slider-container {
            flex-direction: column;
            gap: 20px;
          }

          .slider-button {
            display: none;
          }

          .testimonial-card {
            padding: 32px 24px;
            min-height: auto;
          }

          .quote {
            font-size: 16px;
            margin-bottom: 24px;
          }

          .author-name {
            font-size: 16px;
          }

          .author-company {
            font-size: 13px;
          }
        }

        /* Small Mobile */
        @media (max-width: 480px) {
          .testimonials-title {
            font-size: 24px;
          }

          .quote {
            font-size: 15px;
          }

          .avatar-placeholder {
            width: 48px;
            height: 48px;
            font-size: 20px;
          }
        }
      `}</style>
    </section>
  );
}
