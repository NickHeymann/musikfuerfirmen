"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { navLinks, siteConfig } from "@/config/site";

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY + 5) {
        setIsVisible(false);
        setIsMobileMenuOpen(false);
      } else if (currentScrollY < lastScrollY - 5) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isAnchor: boolean) => {
    if (!isAnchor) {
      setIsMobileMenuOpen(false);
      return; // Normale Navigation für externe Links
    }

    e.preventDefault();
    const targetId = href.replace("/#", "");
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", href);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        id="header"
        className={`fixed top-0 left-0 right-0 z-[9999] transition-transform duration-300 ease-in-out ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="header-inner max-w-[1500px] mx-auto px-[4vw]">
          <div className="flex items-center justify-between h-[78px]">
            <div className="header-title">
              <Link
                href="/"
                className="text-base font-semibold text-black hover:opacity-70 transition-opacity duration-200"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                musikfürfirmen.de
              </Link>
            </div>

            <nav className="header-nav hidden md:flex items-center gap-8">
              {navLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, item.isAnchor)}
                  className="text-sm font-normal text-black hover:opacity-70 transition-opacity duration-200"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="header-burger md:hidden p-2"
              aria-label={isMobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
            >
              <div className="burger-box w-6 flex flex-col gap-[6px]">
                <span
                  className={`w-full h-[1px] bg-black transform transition-all duration-300 origin-center ${
                    isMobileMenuOpen ? "rotate-45 translate-y-[3.5px]" : ""
                  }`}
                />
                <span
                  className={`w-full h-[1px] bg-black transform transition-all duration-300 origin-center ${
                    isMobileMenuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        <div className="h-[1px]" style={{ backgroundColor: "#e5e7eb" }} />
      </header>

      <div
        className={`fixed inset-0 z-[9998] md:hidden transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/20"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        <nav
          className={`absolute top-[78px] left-0 right-0 bg-white shadow-lg transform transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ backgroundColor: "#ffffff" }}
        >
          <div className="py-4 px-6">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href, item.isAnchor)}
                className="block py-4 text-base font-normal text-black hover:opacity-70 transition-opacity"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </div>

      <div className="h-[78px]" />
    </>
  );
}
