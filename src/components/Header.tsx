"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { navLinks } from "@/config/site";

export default function Header() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null);

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
      e.preventDefault();
      setIsMobileMenuOpen(false);
      router.push(href);
      return;
    }

    e.preventDefault();
    const targetId = href.replace("/#", "");

    // Check if we're on the main page
    const isOnMainPage = window.location.pathname === "/";

    if (isOnMainPage) {
      // On main page - just scroll
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.pushState(null, "", `/${href.replace("/", "")}`);
      }
    } else {
      // On other page - navigate to main page with anchor
      window.location.href = `/#${targetId}`;
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
        <div className="header-inner w-full px-[80px]">
          <div className="flex items-center justify-between h-[108px]">
            <div className="header-title">
              <Link
                href="/"
                className="text-[32px] font-medium text-black hover:opacity-70 transition-opacity duration-200"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                musikfürfirmen.de
              </Link>
            </div>

            <nav className="header-nav hidden md:flex items-center gap-14">
              {navLinks.map((item) => {
                // Item with dropdown
                if (item.children && item.children.length > 0) {
                  return (
                    <div
                      key={item.label}
                      className="relative"
                      onMouseEnter={() => setOpenDropdown(item.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <button
                        className="text-[17px] font-light text-black hover:opacity-70 transition-opacity duration-200 flex items-center gap-1"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        {item.label}
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>

                      {/* Dropdown Menu */}
                      <div
                        className={`absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 transition-all duration-200 ${
                          openDropdown === item.label
                            ? "opacity-100 visible translate-y-0"
                            : "opacity-0 invisible -translate-y-2 pointer-events-none"
                        }`}
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-3 text-[15px] font-light text-black hover:bg-[#f0faf7] hover:text-[#0D7A5F] transition-all"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                            onClick={() => setOpenDropdown(null)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }

                // Regular item
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href, item.isAnchor)}
                    className="text-[17px] font-light text-black hover:opacity-70 transition-opacity duration-200"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {item.label}
                  </a>
                );
              })}
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

      {/* Mobile Menu */}
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
          className={`absolute top-[108px] left-0 right-0 bg-white shadow-lg transform transition-transform duration-300 max-h-[calc(100vh-108px)] overflow-y-auto ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ backgroundColor: "#ffffff" }}
        >
          <div className="py-4 px-6">
            {navLinks.map((item) => {
              // Item with dropdown (mobile accordion)
              if (item.children && item.children.length > 0) {
                return (
                  <div key={item.label} className="border-b border-gray-100">
                    <button
                      onClick={() =>
                        setMobileOpenDropdown(
                          mobileOpenDropdown === item.label ? null : item.label
                        )
                      }
                      className="w-full flex items-center justify-between py-4 text-base font-normal text-black hover:opacity-70 transition-opacity"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {item.label}
                      <svg
                        className={`w-5 h-5 transition-transform duration-200 ${
                          mobileOpenDropdown === item.label ? "rotate-180" : ""
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                    {/* Mobile Dropdown Content */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        mobileOpenDropdown === item.label
                          ? "max-h-96 pb-2"
                          : "max-h-0"
                      }`}
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setMobileOpenDropdown(null);
                          }}
                          className="block py-3 pl-4 text-sm font-light text-gray-700 hover:text-[#0D7A5F] transition-colors"
                          style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              // Regular item
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, item.isAnchor)}
                  className="block py-4 text-base font-normal text-black hover:opacity-70 transition-opacity border-b border-gray-100"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </nav>
      </div>

      <div className="h-[108px]" />
    </>
  );
}
