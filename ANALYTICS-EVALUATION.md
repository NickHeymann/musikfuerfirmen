# Analytics-Evaluation: Custom Tool vs. Google Analytics

**Datum**: 11. Dezember 2025
**Status**: Analyse abgeschlossen, Empfehlung am Ende

---

## 1. Aktuelle Situation

### **Was ist bereits implementiert?**

#### ✅ Google Analytics (gtag) - Placeholder
- **Implementiert in**:
  - `src/components/EventPlannerDownload.tsx:43-48`
  - `src/components/BudgetRechtfertigungDownload.tsx`
  - `src/components/EmailCaptureModal.tsx`

- **Code-Beispiel**:
```typescript
if (typeof window !== "undefined" && (window as any).gtag) {
  (window as any).gtag("event", "lead_capture", {
    event_category: "conversion",
    event_label: "event_planner_2026",
    value: 20,
  });
}
```

- **Problem**: gtag ist nur als Placeholder im Code, **NICHT aktiv im HTML `<head>`**
- **Status**: 🔴 Nicht funktional (kein GA4-Tracking-Code im `<head>`)

#### ✅ Lead Tracking API
- **Datei**: `src/app/api/leads/capture/route.ts`
- **Funktionalität**:
  - Speichert Leads in JSON-Datei (`data/leads.json`)
  - Lead-Scoring (0-100 Punkte)
  - Stage-Klassifizierung (cold/warm/hot/burning)
  - Aktivitäts-Tracking (z.B. Budget-Rechner verwendet)

- **Was funktioniert**:
  - ✅ Lead-Daten erfassen (Email, Name, Firma, Quelle)
  - ✅ Lead-Score berechnen
  - ✅ Duplicate-Detection (gleiche Email)
  - ✅ Aktivitäts-Historie

- **Was FEHLT**:
  - ❌ Keyword-Tracking (woher kamen sie?)
  - ❌ Referrer-Tracking (von welcher Website?)
  - ❌ Device-Detection (Mobile/Desktop)
  - ❌ UTM-Parameter-Tracking
  - ❌ Session-Tracking (welche Seiten besucht?)
  - ❌ Conversion-Funnel-Analyse

---

## 2. Custom Analytics Tool (kathrin-analytics)

### **Auf Hetzner Server verfügbar**
- **Location**: `/opt/apps/kathrin-analytics/` (laut CLAUDE.md)
- **Status**: ⚠️ Separate App, nicht in musikfürfirmen-Codebase integriert

### **Vermutete Funktionalität** (basierend auf Deployment)
Da kathrin-analytics eine separate Next.js-App ist, vermutlich:
- Custom Analytics Dashboard
- Event-Tracking-API
- Session-Recording (optional)
- Heatmaps (optional)

### **Integration-Aufwand**:
1. Analytics-JavaScript-SDK von kathrin-analytics in musikfürfirmen einbinden
2. Tracking-Events senden (Page Views, Clicks, Conversions)
3. API-Endpoint für Analytics-Data
4. Dashboard-Zugriff für Analyse

**Geschätzter Aufwand**: 4-6 Stunden (SDK-Integration + Event-Tracking)

---

## 3. Vergleich: Custom Analytics vs. Google Analytics 4

| Feature | Custom Analytics (kathrin-analytics) | Google Analytics 4 | Gewinner |
|---------|--------------------------------------|-------------------|----------|
| **Setup-Zeit** | 4-6h (SDK-Integration) | 30 Min. (Tracking-Code) | 🏆 GA4 |
| **Keyword-Tracking** | ⚠️ Schwierig (braucht Search Console Integration) | ✅ Via Search Console Integration | 🏆 GA4 |
| **Referrer-Tracking** | ✅ Möglich (document.referrer) | ✅ Automatisch | 🤝 Beide |
| **Device-Detection** | ✅ Möglich (User-Agent) | ✅ Automatisch (inkl. Modelle) | 🏆 GA4 |
| **UTM-Parameter** | ✅ Manuell tracken | ✅ Automatisch | 🏆 GA4 |
| **Traffic-Quellen** | ⚠️ Manuell implementieren | ✅ Automatisch (Organic/Paid/Social/Direct) | 🏆 GA4 |
| **Session-Tracking** | ✅ Custom (Cookie/LocalStorage) | ✅ Automatisch | 🏆 GA4 |
| **Conversion-Funnel** | ⚠️ Manuell bauen | ✅ Vordefinierte Reports | 🏆 GA4 |
| **Real-Time Data** | ✅ Möglich (wenn gebaut) | ✅ Out-of-the-box | 🤝 Beide |
| **DSGVO-Konformität** | ✅ Full Control (EU-Server) | ⚠️ Kritisch (US-Server) | 🏆 Custom |
| **Daten-Ownership** | ✅ 100% bei dir | ❌ Bei Google | 🏆 Custom |
| **Kosten** | 💰 Hetzner-Kosten (bereits da) | 💰 Free (bis 10M Events/Monat) | 🤝 Beide |
| **Machine Learning** | ❌ Nicht verfügbar | ✅ Predictive Metrics | 🏆 GA4 |
| **Export-Optionen** | ✅ Volle Kontrolle (API, DB) | ⚠️ Limitiert (BigQuery ab Pro) | 🏆 Custom |
| **Dashboard-Qualität** | ⚠️ Custom UI (zeit-intensiv) | ✅ Professionelle UI | 🏆 GA4 |

---

## 4. Was kannst du mit den Tools tracken?

### **Deine Fragen:**
> "kann ich auch mit meinem tool analysieren durch welche keywords die leute auf meine seite kommen, aus welchen quellen, ob von mobile, desktop etc."

#### **A) Keywords (Suchbegriffe)**

**Custom Analytics (kathrin-analytics):**
- ❌ **NICHT direkt möglich**
- Grund: Google verschlüsselt Suchbegriffe (HTTPS), `document.referrer` zeigt nur "google.com", nicht das Keyword
- **Workaround**: Google Search Console API integrieren (zusätzlicher Aufwand: 2-3h)

**Google Analytics 4:**
- ✅ **Ja, via Search Console Integration**
- Setup: GA4 + Search Console verknüpfen (5 Min.)
- Du siehst: Keywords, Impressions, Klicks, Position

**🏆 Gewinner: Google Analytics 4** (deutlich einfacher)

---

#### **B) Traffic-Quellen (woher kommen User?)**

**Custom Analytics (kathrin-analytics):**
- ✅ **Ja, mit Implementierung**
- **Was du tracken musst**:
  ```typescript
  {
    source: document.referrer || "direct",
    utmSource: new URLSearchParams(window.location.search).get("utm_source"),
    utmMedium: new URLSearchParams(window.location.search).get("utm_medium"),
    utmCampaign: new URLSearchParams(window.location.search).get("utm_campaign"),
  }
  ```
- **Klassifizierung** (Google/Facebook/Direct) musst du manuell machen
- **Aufwand**: 2-3 Stunden

**Google Analytics 4:**
- ✅ **Ja, automatisch**
- Kategorien: Organic Search, Direct, Referral, Social, Paid Search, Email
- Keine Implementierung nötig

**🏆 Gewinner: Google Analytics 4** (zero config)

---

#### **C) Device-Detection (Mobile vs. Desktop)**

**Custom Analytics (kathrin-analytics):**
- ✅ **Ja, mit User-Agent-Parsing**
- **Code-Beispiel**:
  ```typescript
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const deviceType = isMobile ? "mobile" : "desktop";
  ```
- **Limitation**: Tablets nicht präzise erkannt, keine Modell-Infos
- **Aufwand**: 30 Minuten

**Google Analytics 4:**
- ✅ **Ja, automatisch**
- Details: Device-Category (Mobile/Desktop/Tablet), OS, Browser, Screen-Resolution, Device-Model
- Vordefinierte Reports

**🏆 Gewinner: Google Analytics 4** (mehr Details)

---

#### **D) Weitere wichtige Metriken**

| Metrik | Custom Analytics | Google Analytics 4 |
|--------|-----------------|-------------------|
| Page Views | ✅ Manuell (1h) | ✅ Automatisch |
| Session-Dauer | ⚠️ Complex (3-4h) | ✅ Automatisch |
| Bounce-Rate | ⚠️ Complex (2-3h) | ✅ Automatisch |
| Conversion-Rate | ✅ Manuell (2h) | ✅ Automatisch |
| Geo-Location | ⚠️ IP-Lookup nötig (GeoIP DB) | ✅ Automatisch |
| User-Flows | ⚠️ Complex (5-8h) | ✅ Automatisch |

---

## 5. Empfehlung

### **Hybrides Setup (Beste Lösung)**

```
┌─────────────────────────────────────────────────────┐
│  Frontend (musikfürfirmen.de)                       │
│                                                     │
│  ┌──────────────────┐    ┌───────────────────┐    │
│  │ Google Analytics │    │ Custom Lead API   │    │
│  │ (Behavior-Data)  │    │ (Lead-Data)       │    │
│  └──────────────────┘    └───────────────────┘    │
│           │                        │                │
└───────────┼────────────────────────┼────────────────┘
            │                        │
            ▼                        ▼
    ┌──────────────┐        ┌────────────────┐
    │ GA4 Dashboard│        │ PostgreSQL     │
    │ (Traffic)    │        │ (CRM-Data)     │
    └──────────────┘        └────────────────┘
```

#### **Aufteilung:**

**Google Analytics 4 für:**
- ✅ Keywords (via Search Console)
- ✅ Traffic-Quellen (Organic/Paid/Social)
- ✅ Device-Detection (Mobile/Desktop/Tablet)
- ✅ Session-Tracking (welche Seiten besucht?)
- ✅ Geo-Location (Stadt/Land)
- ✅ User-Flows (Journey durch Website)

**Custom Lead-API für:**
- ✅ Lead-Daten (Email, Name, Firma)
- ✅ Lead-Scoring (Hot/Warm/Cold)
- ✅ CRM-Integration (später: PostgreSQL, n8n)
- ✅ Aktivitäts-Tracking (Download, Calculator-Usage)

---

### **Warum Hybrid?**

1. **GA4 macht 80% der Arbeit** (Traffic-Analytics)
2. **Custom API macht 20% der Arbeit** (Lead-Tracking)
3. **Beste aus beiden Welten**: Analytics + CRM
4. **DSGVO**: GA4 für anonyme Daten, Custom API für personenbezogene Daten

---

## 6. Setup-Anleitung

### **Schritt 1: Google Analytics 4 Setup (30 Min.)**

#### 1.1 GA4-Property erstellen
```
1. https://analytics.google.com → "Property erstellen"
2. Name: "musikfürfirmen.de"
3. Zeitzone: Germany (GMT+1)
4. Währung: EUR
5. Industrie: "Arts & Entertainment"
```

#### 1.2 Web Data Stream erstellen
```
1. Admin → Data Streams → "Add stream" → Web
2. URL: https://musikfuerfirmen.de
3. Stream-Name: "Main Website"
4. Enhanced Measurement: ✅ ENABLED (automatisches Event-Tracking)
```

#### 1.3 Measurement ID kopieren
```
→ Erhältst Measurement ID: G-XXXXXXXXXX
```

#### 1.4 Tracking-Code in Next.js einbauen

**Datei**: `src/app/layout.tsx`

```tsx
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <head>
        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
```

**Datei**: `.env.production`
```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

#### 1.5 Search Console Integration (für Keywords)
```
1. https://search.google.com/search-console
2. Property hinzufügen: musikfürfirmen.de
3. Verifizieren (via DNS oder HTML-Tag)
4. GA4 → Admin → Product Links → Search Console → Link erstellen
```

**Dauer**: Keyword-Daten erscheinen nach 24-48h

---

### **Schritt 2: Custom Events tracken**

Für spezifische Conversions (Lead-Capture, PDF-Download):

**Datei**: `src/utils/analytics.ts` (NEU erstellen)

```typescript
export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", eventName, eventParams);
  }
};

export const trackLeadCapture = (leadScore: number, source: string) => {
  trackEvent("lead_capture", {
    event_category: "conversion",
    event_label: source,
    value: leadScore,
  });
};

export const trackPDFDownload = (pdfName: string) => {
  trackEvent("pdf_download", {
    event_category: "engagement",
    event_label: pdfName,
  });
};
```

**Verwendung** (z.B. in `EventPlannerDownload.tsx`):

```typescript
import { trackLeadCapture } from "@/utils/analytics";

// Nach erfolgreichem Lead-Capture:
trackLeadCapture(20, "event_planner_2026");
```

---

### **Schritt 3: Lead-API erweitern (für Custom Analytics)**

Falls du später Custom Analytics (kathrin-analytics) integrieren willst:

**Datei**: `src/app/api/leads/capture/route.ts`

Erweitern um:

```typescript
// NEUE Felder
const lead = {
  id: crypto.randomUUID(),
  ...data,
  createdAt: new Date().toISOString(),

  // Analytics-Daten
  source: {
    referrer: request.headers.get("referer") || "direct",
    utmSource: data.utmSource || null,
    utmMedium: data.utmMedium || null,
    utmCampaign: data.utmCampaign || null,
  },
  device: {
    type: data.deviceType || "unknown", // "mobile" | "desktop" | "tablet"
    userAgent: request.headers.get("user-agent") || "",
  },
  geo: {
    ip: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "",
    // Optional: IP → Location via GeoIP2
  },
};
```

**Frontend**: UTM-Parameter + Device-Type mitsenden

```typescript
const urlParams = new URLSearchParams(window.location.search);
const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

const response = await fetch("/api/leads/capture", {
  method: "POST",
  body: JSON.stringify({
    ...formData,
    utmSource: urlParams.get("utm_source"),
    utmMedium: urlParams.get("utm_medium"),
    utmCampaign: urlParams.get("utm_campaign"),
    deviceType: isMobile ? "mobile" : "desktop",
  }),
});
```

**Aufwand**: 1-2 Stunden

---

## 7. Kosten-Vergleich

| Lösung | Setup-Zeit | Monatliche Kosten | Maintenance |
|--------|-----------|------------------|-------------|
| **Nur Custom Analytics** | 8-12h | 0€ (Hetzner inkl.) | 2-4h/Monat |
| **Nur Google Analytics 4** | 30 Min. | 0€ (Free Tier) | 0h/Monat |
| **Hybrid (Empfohlen)** | 2h | 0€ | 0h/Monat |

**Google Analytics Free Tier:**
- 10 Millionen Events/Monat (weit mehr als ihr braucht)
- Unlimited Properties
- Alle Features (außer BigQuery Export)

---

## 8. DSGVO-Konformität

### **Google Analytics 4:**
⚠️ **Kritisch**: Daten werden in USA gespeichert (Schrems II-Urteil)

**Lösung**: Anonymisierung + Datenschutzerklärung

```typescript
gtag('config', 'G-XXXXXXXXXX', {
  'anonymize_ip': true,
  'allow_ad_personalization_signals': false,
  'allow_google_signals': false,
});
```

**Zusätzlich**:
- Cookie-Banner mit Opt-In (z.B. via Cookiebot)
- Datenschutzerklärung anpassen (Google Analytics erwähnen)
- AVV mit Google abschließen (kostenlos via GA4-Admin)

### **Custom Analytics:**
✅ **DSGVO-konform**: Daten bleiben auf EU-Server (Hetzner Deutschland)

---

## 9. Fazit & Next Steps

### **TL;DR:**

**Für Traffic-Analytics (Keywords, Quellen, Devices):**
→ 🏆 **Google Analytics 4** (Setup: 30 Min., Zero Maintenance)

**Für Lead-Tracking (CRM-Daten):**
→ 🏆 **Custom Lead-API** (bereits implementiert, nur erweitern)

**Kombination = Perfekt!**

---

### **Empfohlene Action Items:**

1. ✅ **GA4 Setup (30 Min.)**
   - Property erstellen
   - Tracking-Code in `layout.tsx`
   - Search Console verknüpfen (für Keywords)

2. ✅ **Custom Events (1h)**
   - `utils/analytics.ts` erstellen
   - Lead-Capture Events tracken
   - PDF-Download Events tracken

3. ⏳ **Optional: Lead-API erweitern (2h)**
   - UTM-Parameter tracken
   - Device-Type tracken
   - Referrer tracken

4. ⏳ **Optional: kathrin-analytics Integration (4-6h)**
   - Falls du Custom Dashboard willst
   - SDK von kathrin-analytics einbinden
   - Events parallel zu GA4 senden

---

### **Meine Empfehlung:**

**Start with Google Analytics 4** (30 Min. Setup)
→ Du bekommst sofort:
- ✅ Keywords (via Search Console)
- ✅ Traffic-Quellen
- ✅ Device-Detection
- ✅ Geo-Location
- ✅ User-Flows

**Custom Lead-API erweitern** (2h) für CRM-Daten

**kathrin-analytics später integrieren**, falls du Custom Dashboard brauchst.

---

**Status**: ✅ Evaluation abgeschlossen
**Nächster Schritt**: GA4-Setup (siehe Schritt 1)
