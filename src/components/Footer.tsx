import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row justify-center gap-16 md:gap-32">
          <div>
            <h4 className="text-base font-semibold text-black mb-6">
              Kontakt
            </h4>
            <div className="space-y-3 text-[15px] text-black font-light">
              <p>
                <a
                  href="mailto:kontakt@musikfürfirmen.de"
                  className="hover:underline transition-colors"
                >
                  kontakt@musikfürfirmen.de
                </a>
              </p>
              <p>
                <a
                  href="tel:+491741699553"
                  className="hover:underline transition-colors"
                >
                  +49 1741699553
                </a>
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-base font-semibold text-black mb-6">Info</h4>
            <div className="space-y-3 text-[15px]">
              <p>
                <Link
                  href="/ueber-uns"
                  className="text-black hover:underline transition-colors font-light"
                >
                  Über uns
                </Link>
              </p>
              <p>
                <Link
                  href="/impressum"
                  className="text-black hover:underline transition-colors font-light"
                >
                  Impressum
                </Link>
              </p>
              <p>
                <Link
                  href="/datenschutz"
                  className="text-black hover:underline transition-colors font-light"
                >
                  Datenschutz
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black py-4">
        <p className="text-sm text-white text-center font-light" style={{ fontFamily: "'Poppins', sans-serif" }}>
          © {new Date().getFullYear()} musikfürfirmen.de
        </p>
      </div>
    </footer>
  );
}
