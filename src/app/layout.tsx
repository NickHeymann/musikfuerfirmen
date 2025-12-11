import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ModalProvider from "@/components/ModalProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://musikfuerfirmen.de"),
  title: {
    default: "musikfürfirmen.de | Livebands, DJs & Technik für Firmenevents",
    template: "%s | musikfürfirmen.de",
  },
  description:
    "Professionelle Livebands, DJs und Veranstaltungstechnik für unvergessliche Firmenevents in Hamburg und deutschlandweit. Rundum-sorglos-Paket mit persönlicher Betreuung. Angebot innerhalb von 24h.",
  keywords: [
    "Liveband buchen",
    "Firmenevent Musik",
    "DJ Firmenfeier",
    "Eventband Hamburg",
    "Partyband buchen",
    "Coverband Firmenevent",
    "Weihnachtsfeier Band",
    "Sommerfest Musik",
    "Gala Band",
    "Veranstaltungstechnik",
    "Event DJ",
    "Firmenfeier Hamburg",
  ],
  authors: [{ name: "Nick Heymann", url: "https://musikfuerfirmen.de" }],
  creator: "musikfürfirmen.de",
  publisher: "musikfürfirmen.de",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://musikfuerfirmen.de",
    siteName: "musikfürfirmen.de",
    title: "musikfürfirmen.de | Livebands, DJs & Technik für Firmenevents",
    description:
      "Professionelle Livebands, DJs und Technik für unvergessliche Firmenevents. Rundum-sorglos-Paket aus Hamburg.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "musikfürfirmen.de - Deine Musik für Firmenevents",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "musikfürfirmen.de | Livebands, DJs & Technik für Firmenevents",
    description:
      "Professionelle Livebands, DJs und Technik für unvergessliche Firmenevents.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://musikfuerfirmen.de",
  },
  category: "Entertainment",
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://musikfuerfirmen.de/#business",
      name: "musikfürfirmen.de",
      alternateName: "Musik für Firmen",
      description:
        "Professionelle Livebands, DJs und Veranstaltungstechnik für unvergessliche Firmenevents in Hamburg und deutschlandweit.",
      url: "https://musikfuerfirmen.de",
      telephone: "+491741699553",
      email: "kontakt@musikfuerfirmen.de",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Hamburg",
        addressCountry: "DE",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 53.5511,
        longitude: 9.9937,
      },
      areaServed: {
        "@type": "Country",
        name: "Deutschland",
      },
      serviceType: [
        "Liveband für Firmenevents",
        "DJ für Firmenfeiern",
        "Veranstaltungstechnik",
        "Event-Entertainment",
      ],
      priceRange: "€€-€€€",
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      founder: {
        "@type": "Person",
        name: "Nick Heymann",
        jobTitle: "Gründer & Projektleitung",
      },
      sameAs: [],
    },
    {
      "@type": "WebSite",
      "@id": "https://musikfuerfirmen.de/#website",
      url: "https://musikfuerfirmen.de",
      name: "musikfürfirmen.de",
      description: "Deine Musik für Firmenevents",
      publisher: {
        "@id": "https://musikfuerfirmen.de/#business",
      },
      inLanguage: "de-DE",
    },
    {
      "@type": "Service",
      "@id": "https://musikfuerfirmen.de/#service-liveband",
      name: "Liveband für Firmenevents",
      description:
        "Professionelle Livebands von Jazz bis Rock für Firmenevents jeder Größe.",
      provider: {
        "@id": "https://musikfuerfirmen.de/#business",
      },
      serviceType: "Entertainment Service",
      areaServed: "Deutschland",
    },
    {
      "@type": "Service",
      "@id": "https://musikfuerfirmen.de/#service-dj",
      name: "DJ für Firmenfeiern",
      description:
        "Erfahrene DJs mit professionellem Equipment für unvergessliche Firmenfeiern.",
      provider: {
        "@id": "https://musikfuerfirmen.de/#business",
      },
      serviceType: "Entertainment Service",
      areaServed: "Deutschland",
    },
    {
      "@type": "FAQPage",
      "@id": "https://musikfuerfirmen.de/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "Sind Anfragen verbindlich?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Nein, Anfragen sind komplett unverbindlich und werden innerhalb von 24 Stunden beantwortet. Gerne bieten wir dir auch ein kostenloses Erstgespräch an.",
          },
        },
        {
          "@type": "Question",
          name: "Wie läuft eine Anfrage bei euch ab?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "In nur drei Schritten: 1) Klick auf 'Unverbindliches Angebot anfragen' 2) Fülle das Formular mit den wichtigsten Infos zu deinem Event aus 3) Drücke auf Absenden. Innerhalb von 24 Stunden hast du dein individuelles Angebot im Postfach.",
          },
        },
        {
          "@type": "Question",
          name: "Kann ich Songwünsche nennen?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Auf jeden Fall! Unsere Bands haben zwar ein festes Repertoire, freuen sich aber über besondere Songwünsche. Erwähne sie einfach im Erstgespräch, so bleibt genug Zeit für die Vorbereitung.",
          },
        },
        {
          "@type": "Question",
          name: "Kann man euch deutschlandweit buchen?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Absolut! Egal wo in Deutschland dein Event stattfindet, du kannst auf uns zählen. Um Anfahrt, Logistik und Unterkunft kümmern wir uns.",
          },
        },
        {
          "@type": "Question",
          name: "Was passiert, wenn die Sängerin/Sänger krank wird?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Keine Sorge, dafür sind wir vorbereitet! Für alle unsere Künstler:innen haben wir erfahrene Ersatzleute parat, die kurzfristig einspringen können. Sollte es dazu kommen, melden wir uns natürlich sofort bei dir.",
          },
        },
        {
          "@type": "Question",
          name: "Muss ich mich noch um irgendetwas kümmern?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Nein! Wir nehmen dir alles ab, was mit Musik zu tun hat: von der Auswahl der passenden Künstler:innen über Equipment und Technik bis hin zu Anfahrt und Übernachtung. Du kannst dich entspannt auf dein Event freuen.",
          },
        },
        {
          "@type": "Question",
          name: "Warum sollte ich nicht alles über eine Eventagentur buchen?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Gute Frage! Bei den meisten Eventagenturen läuft Musik eher nebenbei. Ob die Band gut ist, wird dann zur Glückssache. Wir sehen das anders: Musik prägt die Stimmung und bleibt in Erinnerung. Deshalb geben wir ihr die Aufmerksamkeit, die sie verdient.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={poppins.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <ModalProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </ModalProvider>
      </body>
    </html>
  );
}
