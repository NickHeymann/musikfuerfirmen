"use client";

import { useState, useRef, useEffect } from "react";

interface FAQItem {
  question: string;
  answer: string;
  hasLink?: boolean;
}

const faqItems: FAQItem[] = [
  {
    question: "Sind Anfragen verbindlich?",
    answer: "Nein, Anfragen sind komplett unverbindlich und werden innerhalb von 24 Stunden beantwortet. Gerne bieten wir dir auch ein kostenloses Erstgespräch an.",
  },
  {
    question: "Wie läuft eine Anfrage bei euch ab?",
    answer: `In nur drei Schritten:

1) Klick auf "Unverbindliches Angebot anfragen"
2) Fülle das Formular mit den wichtigsten Infos zu deinem Event aus
3) Drücke auf Absenden.

Innerhalb von 24 Stunden hast du dein individuelles Angebot im Postfach.`,
    hasLink: true,
  },
  {
    question: "Kann ich Songwünsche nennen?",
    answer: "Auf jeden Fall! Unsere Bands haben zwar ein festes Repertoire, freuen sich aber über besondere Songwünsche. Erwähne sie einfach im Erstgespräch, so bleibt genug Zeit für die Vorbereitung.",
  },
  {
    question: "Kann man euch deutschlandweit buchen?",
    answer: "Absolut! Egal wo in Deutschland dein Event stattfindet, du kannst auf uns zählen. Um Anfahrt, Logistik und Unterkunft kümmern wir uns.",
  },
  {
    question: "Was passiert, wenn die Sängerin/Sänger krank wird?",
    answer: "Keine Sorge, dafür sind wir vorbereitet! Für alle unsere Künstler:innen haben wir erfahrene Ersatzleute parat, die kurzfristig einspringen können. Sollte es dazu kommen, melden wir uns natürlich sofort bei dir.",
  },
  {
    question: "Muss ich mich noch um irgendetwas kümmern?",
    answer: "Nein! Wir nehmen dir alles ab, was mit Musik zu tun hat: von der Auswahl der passenden Künstler:innen über Equipment und Technik bis hin zu Anfahrt und Übernachtung. Du kannst dich entspannt auf dein Event freuen.",
  },
  {
    question: "Warum sollte ich nicht alles über eine Eventagentur buchen?",
    answer: "Gute Frage! Bei den meisten Eventagenturen läuft Musik eher nebenbei. Ob die Band gut ist, wird dann zur Glückssache. Wir sehen das anders: Musik prägt die Stimmung und bleibt in Erinnerung. Deshalb geben wir ihr die Aufmerksamkeit, die sie verdient.",
  },
];

function FAQItemComponent({ item, isActive, onToggle }: { item: FAQItem; isActive: boolean; onToggle: () => void }) {
  const answerRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState("0px");

  useEffect(() => {
    if (isActive && answerRef.current) {
      setMaxHeight(`${answerRef.current.scrollHeight}px`);
    } else {
      setMaxHeight("0px");
    }
  }, [isActive]);

  // Handle window resize to recalculate height
  useEffect(() => {
    const handleResize = () => {
      if (isActive && answerRef.current) {
        setMaxHeight(`${answerRef.current.scrollHeight}px`);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isActive]);

  const openCalculator = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.dispatchEvent(new CustomEvent("openMFFCalculator"));
  };

  // Replace the link text with a clickable span
  const renderAnswer = (text: string, hasLink?: boolean) => {
    if (hasLink) {
      const parts = text.split('"Unverbindliches Angebot anfragen"');
      return (
        <>
          {parts[0]}
          <span
            onClick={openCalculator}
            className="text-[#7dc9b1] cursor-pointer underline hover:text-[#5eb89d] transition-colors"
          >
Unverbindliches Angebot anfragen
          </span>
          {parts[1]}
        </>
      );
    }
    return text;
  };

  return (
    <div className="faq-item border-b border-[#e0e0e0]">
      <button
        onClick={onToggle}
        className="faq-question w-full bg-transparent border-none outline-none text-left text-[1.25rem] font-semibold text-black cursor-pointer flex justify-between items-center py-[30px] transition-opacity duration-300 hover:opacity-70"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        <span className="pr-4">{item.question}</span>
        <span
          className="icon text-2xl font-light min-w-[30px] text-center ml-5 transition-transform duration-300"
          style={{ transform: isActive ? 'rotate(45deg)' : 'rotate(0deg)' }}
        >
          +
        </span>
      </button>
      <div
        ref={answerRef}
        className="faq-answer overflow-hidden transition-[max-height] duration-400 ease-out"
        style={{ maxHeight }}
      >
        <p className="pb-[30px] text-base leading-[1.6] font-light text-[#333] whitespace-pre-line">
          {renderAnswer(item.answer, item.hasLink)}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      className="faq-section max-w-[900px] mx-auto px-5"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="faq-container border-t border-[#e0e0e0]">
        {faqItems.map((item, index) => (
          <FAQItemComponent
            key={index}
            item={item}
            isActive={activeIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
    </section>
  );
}
