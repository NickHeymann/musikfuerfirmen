"use client";

import { useState, useRef, useEffect } from "react";

interface TeamMember {
  name: string;
  role: string;
  roleSecondLine: string;
  image: string;
  bioTitle: string;
  bioText: string;
  imageClass: string;
  position: "left" | "right";
}

const team: TeamMember[] = [
  {
    name: "Jonas Glamann",
    role: "Direkter Kontakt vor Ort",
    roleSecondLine: "Koordination von Band + Technik, Gitarrist",
    image: "/images/team/jonas.png",
    bioTitle: "Der Kreative",
    bioText: "Hi, ich bin Jonas. Ich bin euer direkter Kontakt vor Ort. Mit 7 Jahren habe ich angefangen Gitarre zu spielen und stehe seitdem auf der Bühne. Ich bin selbst Teil der Band und koordiniere diese, sowie alles rund um Technik. Ich halte die Abläufe zusammen.\n\nVor Musikfürfirmen.de habe ich selbst in vielen Coverbands gespielt. Parallel dazu habe ich als Techniker Bands wie Revolverheld und Adel Tawil auf Tour begleitet. Ich bin dadurch mit beiden Seiten von Events vertraut und weiß genau, wie ich mit allen Beteiligten kommunizieren muss.",
    imageClass: "img1",
    position: "left",
  },
  {
    name: "Nick Heymann",
    role: "Marketingspezialist",
    roleSecondLine: "Ansprechpartner und Videograf",
    image: "/images/team/nick.png",
    bioTitle: "Der Macher",
    bioText: "Hi, ich bin Nick. Ich bin euer allgemeiner Ansprechpartner und kümmere ich mich um das Marketing und den visuellen Auftritt bei Musikfürfirmen.de.\n\nNach meinem Musikstudium habe ich mich als Videograf und Marketingberater selbständig gemacht. Meine Videos von verschiedenen Events sammelten über 100 Millionen Aufrufe auf Social Media.\n\nAuf Wunsch begleite ich euer Event videographisch und liefere Material für interne Kommunikation oder Socials und eure Website.",
    imageClass: "img2",
    position: "right",
  },
];

function PersonCard({ member, index }: { member: TeamMember; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [bioPosition, setBioPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isHovered && containerRef.current && bioRef.current) {
      const bioRect = bioRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const topBuffer = 100;
      const bottomBuffer = 100;

      const visibleAreaTop = topBuffer;
      const visibleAreaBottom = viewportHeight - bottomBuffer;
      const visibleAreaCenter = (visibleAreaTop + visibleAreaBottom) / 2;

      const bioHeight = bioRect.height;
      const bioCenterCurrent = bioRect.top + (bioHeight / 2);

      const offset = visibleAreaCenter - bioCenterCurrent;
      setBioPosition(offset);
    }
  }, [isHovered]);

  return (
    <div className={`person flex items-start relative person-${member.position}`}>
      <div className="person-content flex flex-col items-center w-[340px] relative">
        <div
          ref={containerRef}
          className="container1 rounded-full h-[400px] w-[400px] mb-[-39px] cursor-pointer"
          style={{
            transform: isHovered ? 'scale(0.66)' : 'scale(0.60)',
            transition: 'transform 250ms cubic-bezier(0.4, 0, 0.2, 1)',
            WebkitTapHighlightColor: 'transparent',
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className="container-inner relative"
            style={{
              clipPath: 'path("M 390,400 C 390,504.9341 304.9341,590 200,590 95.065898,590 10,504.9341 10,400 V 10 H 200 390 Z")',
              transformOrigin: '50%',
              top: '-200px',
            }}
          >
            <div
              className="circle absolute rounded-full pointer-events-none"
              style={{
                backgroundColor: '#D4F4E8',
                height: '380px',
                width: '380px',
                left: '10px',
                top: '210px',
              }}
            />
            <img
              src={member.image}
              alt={member.name}
              className={`img pointer-events-none relative ${member.imageClass}`}
              style={{
                transform: isHovered ? 'translateY(0) scale(1.2)' : 'translateY(20px) scale(1.15)',
                transformOrigin: '50% bottom',
                transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                ...(index === 0 ? { left: '22px', top: '174px', width: '340px' } : { left: '-6px', top: '160px', width: '444px' }),
              }}
            />
          </div>
        </div>

        <div
          ref={bioRef}
          className={`bio-text absolute hidden xl:block w-[280px] bg-gradient-to-br from-white to-[#f8f8f8]
            p-[25px] rounded-[15px] shadow-[0_10px_30px_rgba(0,0,0,0.1)] pointer-events-none z-10
            ${member.position === 'left' ? 'right-full mr-[30px]' : 'left-full ml-[30px]'}`}
          style={{
            top: bioPosition,
            opacity: isHovered ? 1 : 0,
            transform: isHovered
              ? 'translateX(0)'
              : member.position === 'left' ? 'translateX(20px)' : 'translateX(-20px)',
            transition: isHovered
              ? 'opacity 400ms cubic-bezier(0.4, 0, 0.2, 1) 300ms, transform 400ms cubic-bezier(0.4, 0, 0.2, 1) 300ms'
              : 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1), transform 200ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <h3 className="text-lg font-semibold text-[#404245] m-0 mb-3">
            {member.bioTitle}
          </h3>
          <p className="text-sm leading-[1.6] text-[#404245] m-0 whitespace-pre-line">
            {member.bioText}
          </p>
        </div>

        <div className="divider bg-[#BAD6EB] h-[1px] w-[160px] mb-4" />

        <div className="name text-[#404245] text-4xl font-semibold mt-0 mb-[14px] text-center">
          {member.name}
        </div>

        <div className="title text-[#333] text-base text-center font-light min-h-[40px] leading-[1.6]">
          {member.role}
          <br />
          {member.roleSecondLine}
        </div>
      </div>
    </div>
  );
}

export default function TeamSection() {
  return (
    <div
      className="body1 flex flex-wrap justify-center items-start gap-5 py-10 px-5 bg-white"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {team.map((member, index) => (
        <PersonCard key={member.name} member={member} index={index} />
      ))}
    </div>
  );
}
