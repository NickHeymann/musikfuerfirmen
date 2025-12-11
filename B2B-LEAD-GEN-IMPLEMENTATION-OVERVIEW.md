# B2B Lead Generation - Implementation Overview
## musikfürfirmen.de - Komplette Strategie & Code

---

## 📚 Dokumente (bereits erstellt)

1. **`B2B-KEYWORD-STRATEGY.md`** - Keyword-Recherche für alle Lead Magnets
2. **`B2B-LEAD-GEN-BEST-PRACTICES.md`** - Psychologische Trigger, Automation, Growth Hacks
3. **`CRM-SYSTEM-ARCHITECTURE.md`** - Komplettes CRM-System mit Lead Scoring & AI

---

## 🎯 Strategische Highlights

### **Expected Impact (mit vollem System)**
- **Conversion Rate**: 0.6% → 3.9% (+450%)
- **Lead Capture Rate**: 12% → 22% (+83%)
- **Revenue**: 525.000€/Monat (bei 5k Traffic, 3% CVR, 3.500€ AOV)

### **Keywords (Top Opportunities)**
- **High-Intent**: "firmenband buchen hamburg" (210/mo), "liveband firmenevent kosten" (170/mo)
- **Mid-Intent**: "firmenfeier planen checkliste" (590/mo), "firmenevent budget berechnen" (260/mo)
- **Low-Intent**: "weihnachtsfeier firma ideen" (8.100/mo saisonal!)

### **Best Practices Summary**
- **Scarcity**: "Nur noch 3 Termine im Dezember"
- **Social Proof**: 5 Arten nutzen (Expert, Celebrity, User, Crowds, Friends)
- **Multi-Step-Forms**: 22-35% Completion (vs. 8-12% bei Single-Step)
- **AI-Enrichment**: LinkedIn + Clearbit + Claude für Lead Qualification
- **Email-Sequences**: 4-7 Tage Nurturing-Flows (15-40% Conversion)

### **CRM-Architektur**
- **Lead Scoring**: 0-100 Punkte, automatisch Stage-Updates (Cold/Warm/Hot/Burning)
- **Encryption**: AES-256 für DSGVO-Compliance
- **AI-Analysis**: Claude analysiert Lead-Intent & gibt Next-Best-Action
- **Email-Automation**: Behavioral Triggers (Cart-Abandonment, Content-Engagement, Seasonal-Urgency)

---

## 🚀 Implementation Roadmap

### **Phase 1: Quick Wins (Woche 1-2)** - JETZT!

#### **1.1 Lead Magnet #1: Budget-Kalkulator + Email-Gate**
**Status**: ✅ IN PROGRESS
**Files**:
- `/src/app/budget-rechner/page.tsx` - Calculator Landing Page
- `/src/components/BudgetCalculator.tsx` - Calculator Component
- `/src/components/EmailCaptureModal.tsx` - Email-Gate Modal
- `/src/app/api/leads/capture/route.ts` - Lead-Capture-API
- `/src/app/api/leads/pdf/route.ts` - PDF-Generation

**Features**:
- Multi-Step-Form (Guest Count → Event Type → Budget → Email)
- Personalisiertes PDF mit Breakdown
- Lead-Capture mit Source-Attribution
- Basic Lead-Scoring (+25 Punkte)

**Expected Impact**: 525 Leads/Monat, 42 SQLs, 6 Customers

---

#### **1.2 Lead Magnet #2: Firmenfeier-Planungs-Checkliste**
**Status**: ⏳ PENDING
**Files**:
- `/src/app/checkliste/page.tsx` - Landing Page
- `/public/downloads/firmenfeier-checkliste-2025.pdf` - Pre-Generated PDF
- `/src/app/api/leads/download/route.ts` - Download-Tracking

**Content** (PDF, 3 Seiten):
1. **6-Monats-Timeline**
   - 6 Monate vorher: Location buchen, Budget festlegen
   - 4 Monate: Entertainment anfragen, Catering
   - 2 Monate: GEMA-Anmeldung, Einladungen
   - 1 Monat: Finaler Ablauf, Technik-Check
   - 1 Woche: Reminder, Last-Minute-Checks
2. **Budget-Breakdown**
   - Location: 30-40%
   - Catering: 30-35%
   - Entertainment: 20-25%
   - Deko/Sonstiges: 10-15%
3. **Vendor-Checklisten**
   - Was Location bieten muss (Technik-Anforderungen)
   - Catering-Checkliste (Allergien, Getränke-Kalkulation)
   - Entertainment-Checkliste (Repertoire, Setup-Zeit)

**Expected Impact**: 900 Leads/Monat, 27 SQLs, 2.7 Customers

---

#### **1.3 Lead Magnet #3: Event-Typ-Finder (Quiz)**
**Status**: ⏳ PENDING
**Files**:
- `/src/app/event-finder/page.tsx` - Quiz Landing Page
- `/src/components/EventQuiz.tsx` - Interactive Quiz
- `/src/app/event-finder/ergebnis/page.tsx` - Personalisierte Ergebnisseite

**Quiz-Fragen** (8 Fragen):
1. Wie viele Gäste? (50-100 / 100-200 / 200+)
2. Altersgruppen? (20-35 / 35-50 / 50+ / Mix)
3. Event-Typ? (Weihnachtsfeier / Sommerfest / Jubiläum / Team-Event)
4. Budget? (<3k / 3-7k / 7k+)
5. Location? (Indoor / Outdoor / beides möglich)
6. Musik-Präferenz? (Charts / Rock/Pop / Jazz/Lounge / Mix)
7. Event-Stimmung? (Dinner-Atmosphäre / Party / Mix)
8. Wichtigste Priorität? (Budget / Qualität / Flexibilität)

**Ergebnisse** (4 Typen):
- **Typ A: "Die Profis"** → 7er-Band, Premium-Paket (Charts + Rock, flexibel)
- **Typ B: "Die Pragmatischen"** → 5er-Band, Standard-Paket (solide Repertoire)
- **Typ C: "Die Budget-Bewussten"** → DJ + Sänger, Starter-Paket
- **Typ D: "Die Stilsicheren"** → Jazz-Trio oder Lounge-Band, elegantes Setup

**Expected Impact**: 450 Leads/Monat, 54 SQLs, 10.8 Customers (höchste Conversion!)

---

#### **1.4 Social Proof Upgrades**
**Status**: ⏳ PENDING
**Files**:
- `/src/components/RealTimeSocialProof.tsx` - "Firma X hat gerade angefragt"
- `/src/components/ScarcityBar.tsx` - "Nur noch X Termine im Dezember"

**Implementation**:
```typescript
// Real-Time Social Proof (simulated)
const recentBookings = [
  { company: 'Tech Solutions GmbH', location: 'Hamburg', time: '12 Minuten' },
  { company: 'LogistikPro', location: 'Lübeck', time: '34 Minuten' },
  { company: 'Innovate AG', location: 'Hamburg', time: '1 Stunde' },
];

// Rotate every 8 seconds
useEffect(() => {
  const interval = setInterval(() => {
    setCurrentIndex((prev) => (prev + 1) % recentBookings.length);
  }, 8000);
  return () => clearInterval(interval);
}, []);
```

---

### **Phase 2: Backend Foundation (Woche 3-4)**

#### **2.1 Database Setup (PostgreSQL)**
**Status**: ⏳ PENDING
**Files**:
- `/prisma/schema.prisma` - Prisma Schema
- `/prisma/migrations/` - DB Migrations
- `/src/lib/db.ts` - Database Client

**Commands**:
```bash
# Install Prisma
npm install @prisma/client prisma

# Init Prisma
npx prisma init

# Apply schema.prisma (aus CRM-SYSTEM-ARCHITECTURE.md)
npx prisma db push

# Generate Prisma Client
npx prisma generate
```

---

#### **2.2 Lead Scoring Engine**
**Status**: ⏳ PENDING
**Files**:
- `/src/lib/lead-scoring.ts` - Scoring-Logik (siehe CRM-Doc)
- `/src/app/api/leads/score/route.ts` - Scoring-API
- `/src/app/api/leads/activity/route.ts` - Activity-Tracking-API

**Scoring Rules** (Top 5):
1. Budget-Kalkulator: +25 Punkte
2. Telefon geklickt: +30 Punkte
3. Formular 50% ausgefüllt: +35 Punkte
4. Preis-Liste runtergeladen: +30 Punkte
5. Quiz abgeschlossen: +20 Punkte

---

#### **2.3 Email-Automation (Resend.com)**
**Status**: ⏳ PENDING
**Files**:
- `/src/lib/email/sequences.ts` - Email-Sequenz-Setup
- `/src/lib/email/sender.ts` - Email-Sending-Logik
- `/src/cron/email-queue.ts` - Cron-Job für Scheduled-Emails
- `/src/lib/email/templates/` - Email-Templates (React Email)

**Sequenzen** (Top 2):
1. **Checkliste-Download** (4 Emails: Tag 0, 3, 7, 14)
2. **Calculator-Nutzung** (3 Emails: Tag 0, 2, 5) - HIGHEST PRIORITY

---

### **Phase 3: AI & Enrichment (Woche 5-6)**

#### **3.1 AI-Powered Lead Analysis**
**Status**: ⏳ PENDING
**Files**:
- `/src/lib/enrichment/ai-analysis.ts` - Claude-Integration (siehe CRM-Doc)
- `/src/app/api/leads/[id]/ai-analysis/route.ts` - API Endpoint

**Claude Prompt**:
```
Analyze this B2B lead:
- Activities: [budget_calculator, quiz, case_study_viewed]
- Company: Tech Solutions GmbH (200+ employees, IT-Industry)
- Role: HR Manager
- Pages: [/preise, /referenzen, /ueber-uns]

Return JSON:
{
  "intent_level": "high",
  "buying_signals": [...],
  "recommended_approach": "...",
  "next_best_action": "..."
}
```

---

#### **3.2 Company Enrichment (Clearbit)**
**Status**: ⏳ PENDING
**Files**:
- `/src/lib/enrichment/clearbit.ts` - Clearbit-API-Integration
- `/src/lib/enrichment/linkedin.ts` - ProxyCurl (LinkedIn-Enrichment)

**Data Enriched**:
- Company name, employee count, revenue range
- Industry, location
- LinkedIn URLs (company + person)
- Decision-maker role detection

---

### **Phase 4: Admin Dashboard (Woche 7-8)**

#### **4.1 Lead-Management-Dashboard**
**Status**: ⏳ PENDING
**Files**:
- `/src/app/admin/leads/page.tsx` - Lead-Liste
- `/src/app/admin/leads/[id]/page.tsx` - Lead-Detail-View
- `/src/app/admin/dashboard/page.tsx` - KPI-Overview

**Features**:
- Filter nach Stage, Score, Source
- Activity-Timeline pro Lead
- AI-Insights-Button (Claude-Analyse on-demand)
- Email-History
- Notes & Manual-Score-Adjustments

---

#### **4.2 Analytics & Reporting**
**Status**: ⏳ PENDING
**Files**:
- `/src/app/admin/analytics/page.tsx` - Analytics-Dashboard
- `/src/lib/analytics/funnel.ts` - Funnel-Metrics
- `/src/lib/analytics/attribution.ts` - Source-Attribution

**Metrics**:
- Lead-Capture-Rate (pro Source)
- Lead-to-SQL-Conversion
- SQL-to-Customer-Conversion
- Revenue-Attribution (welche Quelle bringt $$)

---

## 🔥 Quick Wins (nächste 48h)

### **1. Budget-Kalkulator + Email-Gate** (3-4h)
- [ ] EmailCaptureModal Component
- [ ] API: `/api/leads/capture`
- [ ] API: `/api/leads/pdf` (PDF-Generation mit Puppeteer/PDFKit)
- [ ] Lead-Scoring (+25 Punkte)

### **2. Exit-Intent-Modal Update** (1h)
- [ ] Bereits vorhanden, aber Lead Magnet ändern zu "Checkliste 2025"

### **3. Scarcity-Bar** (1h)
- [ ] "Nur noch X Termine im Dezember" (Live-Count oder hardcoded)
- [ ] Sticky-Bar, erscheint nach 3 Sekunden

### **4. Social-Proof-Notification** (2h)
- [ ] "Firma X hat gerade angefragt (vor Y Minuten)"
- [ ] Rotate alle 8 Sekunden
- [ ] Bottom-left, slide-in Animation

---

## 📦 Dependencies (neu installieren)

```bash
# Database
npm install @prisma/client prisma

# Email
npm install resend react-email @react-email/components

# PDF-Generation
npm install puppeteer pdf-lib jspdf

# AI
npm install @anthropic-ai/sdk

# Encryption
# (Node.js crypto built-in)

# Analytics
npm install @vercel/analytics posthog-js

# Cron
npm install node-cron
```

---

## 🎯 Success Metrics (Week 1)

| Metric | Target | How to Measure |
|--------|--------|----------------|
| **Budget-Calc Leads** | 50-100 | Database: `SELECT COUNT(*) FROM leads WHERE source = 'budget_calculator'` |
| **Email-Capture-Rate** | 30-40% | Calculator-Starts vs. Email-Submits |
| **Lead-Score Avg** | 35+ | `SELECT AVG(lead_score) FROM leads WHERE created_at > NOW() - INTERVAL '7 days'` |
| **Hot-Lead-Rate** | 10-15% | `SELECT COUNT(*) FROM leads WHERE stage IN ('hot', 'burning')` |

---

## 💡 Next Steps (nach Implementation)

1. **A/B-Testing**: Test verschiedene Headlines/CTAs
2. **SEO-Content**: Blog-Posts für Mid-Funnel-Keywords
3. **Paid Ads**: Google Ads Kampagne #1 (High-Intent)
4. **Referral-System**: "Empfehlt uns → 200€ Gutschein"
5. **Webinars**: "Firmenfeier planen in 2025" (Lead-Gen-Event)

---

**Status**: ✅ Strategie & Architektur komplett dokumentiert
**Next**: 🚀 Implementation startet JETZT mit Budget-Kalkulator + Email-Gate
