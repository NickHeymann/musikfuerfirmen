import Link from "next/link";
import { siteConfig, footerLinks } from "@/config/site";

export default function Footer() {
  return (
    <footer className="bg-[#D4F4E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="text-xl font-semibold text-gray-900">
              {siteConfig.name}
            </Link>
            <p className="mt-2 text-sm text-gray-600 font-light">
              Dein Partner für Firmenevents
            </p>
          </div>

          <div>
            <h4 className="text-base font-semibold text-gray-900 mb-4">
              Kontakt
            </h4>
            <div className="space-y-2 text-sm text-gray-600 font-light">
              <p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-gray-900 transition-colors"
                >
                  {siteConfig.email}
                </a>
              </p>
              <p>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="hover:text-gray-900 transition-colors"
                >
                  {siteConfig.phone}
                </a>
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-base font-semibold text-gray-900 mb-4">Info</h4>
            <div className="space-y-2 text-sm">
              {footerLinks.info.map((link) => (
                <p key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors font-light"
                  >
                    {link.label}
                  </Link>
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200/50">
          <p className="text-sm text-gray-500 text-center font-light">
            © {new Date().getFullYear()} {siteConfig.name}. Alle Rechte
            vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}
