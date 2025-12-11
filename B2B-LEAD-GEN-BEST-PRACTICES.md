# B2B Lead Generation Best Practices & Tricks
## Advanced Strategies für musikfürfirmen.de

---

## 🧠 Psychologische Trigger (Conversion-Optimierung)

### **1. Scarcity (Knappheit)**
```
❌ FALSCH: "Jetzt anfragen"
✅ RICHTIG: "Nur noch 3 freie Termine im Dezember"
```

**Implementation**:
- Live-Verfügbarkeits-Kalender auf Landing Page
- "X Firmen haben diese Woche angefragt" (Social Proof + Scarcity)
- Saisonale Trigger: "Weihnachtsfeier-Slots füllen sich - letzte Chance bis 15. Oktober"

**Code-Snippet**:
```typescript
// Sticky Bar mit Live-Scarcity
<div className="bg-red-50 border-l-4 border-red-500 p-3">
  <p className="text-sm text-red-800">
    ⚠️ Nur noch <strong>3 Termine</strong> im Dezember verfügbar (Stand: {new Date().toLocaleDateString('de-DE')})
  </p>
</div>
```

---

### **2. Authority (Autorität)**
```
❌ FALSCH: "Wir sind erfahren"
✅ RICHTIG: "500+ Firmenevents seit 2019 | Tour-Techniker für Revolverheld & Adel Tawil"
```

**Implementation**:
- Name-Dropping (bekannte Künstler, Firmen-Logos)
- Zertifikate/Ausbildungen (Veranstaltungstechniker)
- Media Mentions ("Featured in: Hamburger Abendblatt, NDR")
- "100M+ TikTok Views" (Social Media Authority)

---

### **3. Social Proof (Sozialer Beweis)**
**5 Arten von Social Proof (alle nutzen!)**:

1. **Expert Social Proof**: "Empfohlen von Event-Planern"
2. **Celebrity Social Proof**: "Tour-Techniker für Revolverheld"
3. **User Social Proof**: "98% Zufriedenheit bei 500+ Events"
4. **Wisdom of Crowds**: "200+ Hamburger Firmen vertrauen uns"
5. **Friends Social Proof**: "3 eurer Kollegen haben uns empfohlen" (wenn trackbar via LinkedIn)

**Implementation**:
```typescript
// Real-time Social Proof Notification
<div className="fixed bottom-4 left-4 bg-white shadow-lg rounded-lg p-4 animate-slide-in">
  <p className="text-sm">
    <strong>Tech Solutions GmbH</strong> aus Hamburg hat gerade angefragt
    <span className="text-gray-500 text-xs block">vor 12 Minuten</span>
  </p>
</div>
```

---

### **4. Reciprocity (Gegenseitigkeit)**
```
❌ FALSCH: "Kontaktiert uns"
✅ RICHTIG: "Wir schenken euch ein kostenloses Event-Konzept (Wert: 200€)"
```

**Strategie**:
- Hochwertigen Content ZUERST geben (Checkliste, Kalkulator, PDF)
- "Value First, Ask Later"-Prinzip
- Personalisierte Empfehlungen (Quiz → individuelles Ergebnis)

---

### **5. Commitment & Consistency (Micro-Commitments)**
**Strategie**: Multi-Step-Forms statt einer langen Form

```
❌ FALSCH: 15-Felder-Formular auf einmal
✅ RICHTIG: 3 Steps mit Progress Bar
  Step 1: "Wann ist euer Event?" (1 Frage)
  Step 2: "Wie viele Gäste?" (1 Frage)
  Step 3: "Budget-Range?" (1 Frage)
  → Dann: Email + Name (leichter, da bereits committed)
```

**Completion Rate**:
- 1-Step-Form: 8-12%
- 3-Step-Form: 22-35% (weil Sunk Cost Fallacy greift)

---

## 🎯 B2B-spezifische Conversion-Tricks

### **1. "Boss Button" (Entscheider-Fokus)**
**Problem**: B2B-Buyer müssen oft Boss überzeugen

**Lösung**: "Pitch-Deck für euren Chef" (1-Pager PDF)
```
Inhalt:
- ROI-Berechnung (Mitarbeiterzufriedenheit = X€ Ersparnis)
- Vergleich: "Was andere Firmen budgetieren"
- Risk-Mitigation: "Versicherung, GEMA, Backup-Equipment inklusive"
- Social Proof: Logo-Wall von bekannten Firmen
```

**Implementation**:
- Nach Budget-Kalkulator: "Boss überzeugen? Hier ist euer Pitch-Deck (PDF)"
- Email-Betreff: "Dein Kollege Max hat dir Event-Vorschlag geschickt"

---

### **2. "Competitor Alternative" Pages**
**SEO-Gold für B2B**:

Erstelle Landing Pages:
- `/vs/band-xyz` (Competitor-Vergleich)
- `/vs/dj-service-hamburg`
- `/alternative-zu/eventfirma-abc`

**Content**:
```markdown
# Alternative zu [Competitor]: musikfürfirmen.de

## Warum Firmen von [Competitor] zu uns wechseln:
1. Musik UND Technik aus einer Hand (kein Vendor-Jonglieren)
2. 30% transparentere Preise
3. Persönlicher Ansprechpartner (keine Agentur-Vermittlung)

[Kostenloser Vergleichs-Rechner →]
```

**Traffic**: 50-200 Besucher/Monat pro Page (hochqualifiziert!)

---

### **3. "Proof of Concept" vor Sales-Call**
**Problem**: B2B-Buyer wollen nicht "nochmal ein Verkaufsgespräch"

**Lösung**: Biete "kostenloses Event-Konzept" (KEIN "Sales-Call")

**Email-Copy**:
```
Betreff: Euer Event-Konzept (ohne Verkaufsgespräch)

Hi [Name],

Ich habe euch basierend auf euren Angaben ein 1-Seiten-Konzept erstellt:
- Band-Vorschlag (7er-Formation, Repertoire 70er-2020er)
- Setlist-Ideen für eure Altersgruppen
- Technik-Setup für eure Location
- Preis: 4.200€ (inkl. Technik, GEMA, Anfahrt)

PDF: [Download]

Falls das passt, können wir einen kurzen Call machen (15 Min).
Falls nicht, kein Stress - vielleicht beim nächsten Event!

Cheers,
Jonas
```

**Conversion Rate**: 60-80% (!) auf Sales-Call (vs. 15-25% bei "Möchten Sie ein Angebot?")

---

### **4. Video Sales Letters (VSL) für höherpreisige Packages**
**Für Premium-Package (7k+)**:

Statt Text-Landing-Page → 3-Min-Video:
1. **Problem**: "Ihr plant ein großes Event und wisst nicht, wo anfangen?"
2. **Agitate**: "90% der Firmen machen diese 3 Fehler... [Story erzählen]"
3. **Solution**: "Wir übernehmen alles: Musik, Technik, Ablaufplanung"
4. **CTA**: "Bucht euren kostenlosen Strategie-Call"

**Conversion-Lift**: +40-60% bei hochpreisigen Angeboten

---

## 🤖 Automation & Smart Workflows

### **1. Lead Scoring (Predictive Analytics)**
**Score-Logik** (0-100 Punkte):

| Action | Punkte | Reasoning |
|--------|--------|-----------|
| **Budget-Kalkulator benutzt** | +25 | Starkes Budget-Intent |
| **Quiz abgeschlossen** | +20 | High Engagement |
| **Preis-Liste runtergeladen** | +30 | Kaufbereitschaft |
| **2+ Seiten besucht** | +10 | Interesse |
| **"Über uns"-Seite besucht** | +15 | Trust-Building-Phase |
| **Email geöffnet (Nurturing)** | +5 | Warm Lead |
| **Link in Email geklickt** | +10 | Very Warm Lead |
| **Formular 50% ausgefüllt, nicht gesendet** | +35 | HOT Lead (Retargeting!) |
| **LinkedIn-Profil angeschaut** | +15 | Professional Interest |
| **Telefon-Nummer angegeben** | +40 | Will sprechen |

**Kategorisierung**:
- **0-30**: Cold Lead → Nurturing-Email-Sequenz (1x/Woche)
- **31-60**: Warm Lead → Sales-Email mit Incentive (3-Tage-Follow-Up)
- **61-80**: Hot Lead → Sofortiger Sales-Call (24h-Window)
- **81-100**: Burning Hot → Persönliche WhatsApp + Anruf (sofort!)

**Implementation** (siehe CRM-System unten)

---

### **2. Behavioral Email-Triggers**

#### **Trigger #1: Cart Abandonment (Calculator-Abandonment)**
```
Wenn:  User startet Calculator, füllt aus, verlässt ohne Submit
Dann:  Email nach 1h
```

**Email-Copy**:
```
Betreff: Habt ihr euer Event-Budget verloren? 😅

Hi,

Ich habe gesehen, dass ihr angefangen habt, euer Event zu planen
(~150 Gäste, Dezember, Hamburg?), aber dann wart ihr weg.

Falls ihr Fragen habt oder euch unsicher bei was seid:
→ Hier ist euer gespeicherter Rechner: [Link mit Pre-Filled-Data]

Oder schreibt mir einfach (WhatsApp: +49 170 123 456)

Cheers,
Jonas

PS: Falls ihr bis Freitag bucht: 10% Frühbucher-Rabatt
```

**Conversion Rate**: 15-25%

---

#### **Trigger #2: Content Engagement**
```
Wenn:  User lädt 2+ Lead Magnets runter, aber keine Anfrage
Dann:  Email nach 3 Tagen
```

**Email-Copy**:
```
Betreff: Noch am Planen? Hier sind eure nächsten Schritte

Hi [Name],

Cool, dass ihr euch die Checkliste UND den Budget-Kalkulator geholt habt!
Ihr plant also ernsthaft - top 👍

Hier sind die 3 Dinge, die ihr JETZT machen solltet:
1. [ ] Location checken (unser Technik-Rider: [Link])
2. [ ] Band-Stil wählen (unser Quiz: [Link] - dauert 2 Min)
3. [ ] Termin sichern (wir haben noch [X] Slots im [Monat])

Falls ihr Fragen habt: Einfach auf diese Email antworten
(kommt direkt bei mir an, kein Support-Team-Blabla)

Cheers,
Jonas

PS: Hier ist mein Kalender, falls ihr lieber direkt quatschen wollt: [Cal.com-Link]
```

---

#### **Trigger #3: Seasonal Urgency**
```
Wenn:  User hat Quiz gemacht, "Weihnachtsfeier" ausgewählt, aber nicht angefragt
      UND es ist August-Oktober (Planungs-Window!)
Dann:  Email mit Scarcity
```

**Email-Copy**:
```
Betreff: ⏰ Weihnachtsfeier-Slots werden knapp (nur noch 6 frei)

Hi [Name],

Ihr habt im Juli bei uns das Quiz gemacht und "Weihnachtsfeier"
ausgewählt - seid ihr da noch dran?

Falls ja: Jetzt ist die KRITISCHE Zeit!
→ Unsere Dezember-Termine sind zu 70% voll
→ Noch 6 Slots verfügbar (Stand heute)

[Live-Kalender mit verfügbaren Daten ansehen →]

Falls ihr dieses Jahr nicht mehr schafft, kein Stress.
Aber sagt Bescheid, dann merke ich euch für 2026 vor 👍

Cheers,
Jonas
```

**Conversion Rate**: 30-40% (wegen Scarcity + Timing)

---

### **3. Retargeting-Funnel (Facebook/LinkedIn Ads)**

#### **Audience Segmentation**:

**Segment 1: Website-Besucher, kein Lead Magnet**
- **Retargeting**: "Holt euch unsere Planungs-Checkliste (kostenlos)"
- **Budget**: 50€/Monat
- **Expected ROI**: 200-300% (günstig weil ToFu)

**Segment 2: Lead Magnet runtergeladen, keine Anfrage**
- **Retargeting**: Video-Testimonial (Social Proof) + "Jetzt Termin sichern"
- **Budget**: 100€/Monat
- **Expected ROI**: 400-600%

**Segment 3: Calculator benutzt, aber nicht angefragt**
- **Retargeting**: "10% Rabatt wenn ihr bis Freitag bucht" (Scarcity + Discount)
- **Budget**: 150€/Monat
- **Expected ROI**: 600-900% (sehr heiße Leads)

**Segment 4: Formular 50% ausgefüllt, nicht gesendet**
- **Retargeting**: Persönliches Video von Jonas/Nick: "Hey, habt ihr Fragen?"
- **Budget**: 50€/Monat (kleines Audience, aber höchste Intent)
- **Expected ROI**: 1.000%+ (fast sichere Conversions)

---

## 🔥 Advanced Growth Hacks

### **1. "Trojan Horse" Content Marketing**
**Strategie**: Erstelle Tools/Content, die auch außerhalb eurer Zielgruppe wertvoll sind (für Backlinks + SEO)

**Beispiel**:
- **Tool**: "Event-Budget-Kalkulator für ALLE Events" (nicht nur Firmen)
  - Hochzeiten, Geburtstage, Festivals
  - Attracts: 10.000+ Besucher/Monat
  - Conversion: 5% zu Firmen-spezifischem Funnel
- **Tool**: "GEMA-Gebühren-Rechner" (für JEDEN mit Live-Musik)
  - SEO-Gold für "gema gebühren berechnen" (1.600 Searches/Monat)
  - Backlinks von Musikblogs, Hochzeitsplanern, etc.

---

### **2. "Co-Marketing" mit komplementären Businesses**
**Partner-Typen**:
1. **Event-Locations** (Hotels, Event-Räume)
   - Cross-Promotion: "Bucht Location X → 10% Rabatt bei uns"
   - Revenue-Share: 10% Commission für Referrals
2. **Catering-Services**
   - Bundle-Package: "Catering + Musik" (One-Stop-Shop)
3. **HR-Agenturen / Employer-Branding-Agenturen**
   - White-Label: Sie verkaufen euch als "Premium Entertainment Partner"

**Expected Impact**: 30-50 zusätzliche Leads/Jahr pro Partner

---

### **3. "Referral-Loops" (Viral Coefficient >1)**
**Strategie**: Jeder Kunde bringt >1 neuen Kunden

**Mechanic**:
```
Nach Event → Email:
"Hi [Name], wie war's? 🎉

Falls ihr zufrieden wart: Empfehlt uns weiter und bekommt:
→ 200€ Gutschein für euer nächstes Event
→ ODER 200€ Amazon-Gutschein (falls ihr kein Event plant)

Einfach diesen Link teilen: [Referral-Link mit Tracking]
"
```

**Incentive für Empfohlene**:
"[Firmenname] hat euch empfohlen → 10% Rabatt für euch!"

**Expected Viral Coefficient**: 0.3-0.6 (30-60% bringen 1 Referral)
**Break-Even**: Bei Coefficient >0.3 profitabel (weil 200€ Incentive < 500€ Average Customer Acquisition Cost)

---

### **4. "Content Syndication" (Reichweite ohne SEO-Arbeit)**
**Strategie**: Veröffentliche Content auf fremden Plattformen

**Channels**:
1. **LinkedIn Articles** (statt nur LinkedIn-Posts)
   - "7 Fehler bei Firmenfeiern" als LinkedIn-Article
   - Reach: 2.000-5.000 Views (wenn gut geschrieben)
2. **Medium.com**
   - "Behind the Scenes: Was passiert bei 200-Personen-Events?"
   - Backlink zu eurer Website
3. **Guest Posts auf HR/Event-Blogs**
   - "Employer Branding durch Events: So geht's richtig"
   - Zielgruppe: HR-Manager (perfekt!)

**Expected Traffic**: 500-1.000 Besucher/Monat via externe Platforms

---

### **5. "Micro-Influencer" Partnerships (B2B!)**
**Nicht Instagram-Influencer, sondern**:

1. **LinkedIn-Influencer** (HR-Thought-Leaders, Event-Planner)
   - 5.000-50.000 Follower (nicht Millionen!)
   - Post: "Gerade ein Event mit @musikfürfirmen organisiert - lief perfekt!"
   - Payment: Free Event (Wert: 2.000€) für Post
2. **Event-Planner (Freelancer)**
   - Commission-Modell: 10% für Referrals
   - Sie nutzen euch als "preferred vendor"

**Expected Impact**: 10-20 Leads/Jahr pro Influencer

---

## 📧 Email-Nurturing-Sequenzen (Drip-Campaigns)

### **Sequenz #1: Nach Lead-Magnet-Download (Checkliste)**

**Tag 0** (sofort): Delivery
```
Betreff: Hier ist eure Checkliste 📋 (+ Bonus)

Hi [Name],

Anbei eure Firmenfeier-Planungs-Checkliste!

BONUS: Hier sind noch 3 Dinge, die die meisten vergessen:
1. GEMA-Anmeldung (8 Wochen Vorlauf!)
2. Technik-Check mit Location (sonst Chaos am Event-Tag)
3. "Plan B" bei Outdoor-Events (Regen-Backup)

→ Mehr dazu in unserem "7-Fehler"-Guide: [Link]

Falls ihr Fragen habt: Einfach antworten (kommt bei mir an)

Cheers, Jonas
```

**Tag 3**: Value-Add
```
Betreff: Schritt 1 erledigt? Hier ist Schritt 2

Hi [Name],

Falls ihr die Checkliste durchgegangen seid, hier der nächste Schritt:

Budget festlegen 💰

Die meisten Firmen budgetieren so:
- 100 Gäste: 3.000-5.000€ (Musik + Technik)
- 200 Gäste: 5.000-8.000€

→ Berechnet euer individuelles Budget: [Calculator-Link]

(Dauert 2 Min, gibt euch genaues Angebot)

Cheers, Jonas
```

**Tag 7**: Social Proof
```
Betreff: Wie Tech Solutions GmbH ihr Event geplant hat (Case Study)

Hi [Name],

Coole Story: Tech Solutions hatte genau die gleiche Situation wie ihr
(200 Gäste, diverse Altersgruppen, kein Plan wo anfangen)

Hier ist, wie wir's gelöst haben:
[Link zur Case Study]

Ergebnis: 98% Zufriedenheit, bereits Re-Booking für nächstes Jahr

Falls ihr sowas auch wollt: [CTA]

Cheers, Jonas
```

**Tag 14**: Soft-Sell
```
Betreff: Noch am Planen? Hier ist ein Angebot

Hi [Name],

Letztes Mal von mir, versprochen 😅

Falls ihr noch plant: Wir haben gerade 3 Slots frei im [Monat].

Können wir kurz quatschen? (15 Min, unverbindlich)
→ [Cal.com-Link]

Oder lieber erstmal Angebot? Dann nutzt den Kalkulator:
→ [Calculator-Link]

Falls jetzt nicht passt, kein Stress! Meldet euch bei Bedarf.

Cheers, Jonas

PS: Falls diese Emails nerven, einfach abmelden: [Link]
(Kein böses Blut, versprochen!)
```

---

### **Sequenz #2: Nach Calculator-Nutzung (HOT Lead!)**

**Tag 0** (sofort): Personalisiertes Angebot
```
Betreff: Euer Event-Angebot: 4.200€ für 150 Gäste

Hi [Name],

Basierend auf euren Angaben:
- 150 Gäste
- Dezember 2025
- Budget: 4.000-5.000€

→ Hier ist euer Angebot: [Detailliertes PDF]

Was drin ist:
✓ 7-köpfige Coverband (Repertoire: 70er-2020er)
✓ Komplette Technik (Sound, Licht, Bühne)
✓ GEMA, Versicherung, Anfahrt
✓ Backup-Equipment (für Sicherheit)

Preis: 4.200€ (All-Inclusive)

Falls das passt, können wir telefonieren?
→ [Cal.com-Link]

Cheers, Jonas
```

**Tag 2**: Objection-Handling
```
Betreff: Fragen zum Angebot? Hier sind die Top 3

Hi [Name],

Die häufigsten Fragen bei 4.000€+ Angeboten:

1. "Ist das nicht zu teuer?"
   → Vergleich: DJ = 1.500€, aber viel weniger Stimmung
   → Unsere Band = Investment in Mitarbeiterzufriedenheit

2. "Was, wenn was schiefgeht?"
   → Backup-Equipment dabei
   → Versicherung inklusive
   → Notfall-Hotline am Event-Tag

3. "Können wir Musik mitbestimmen?"
   → Ja! Ihr bekommt Setlist vorab
   → No-Go-Songs? Kein Problem

Noch Fragen? Einfach antworten oder anrufen: +49 170 123 456

Cheers, Jonas
```

**Tag 5**: Urgency + Testimonial
```
Betreff: Update: Nur noch 2 Dezember-Slots (+ Testimonial)

Hi [Name],

Quick-Update: 1 Dezember-Termin wurde seit eurem Angebot gebucht.
→ Noch 2 Slots frei (13.12. und 20.12.)

Falls ihr einen davon wollt, gebt kurz Bescheid 👍

PS: Das hat ein anderer Kunde nach seinem Event geschrieben:
"Die Band war der absolute Höhepunkt! 98% Feedback-Rate.
 Wir buchen nächstes Jahr wieder." - Sandra, Tech Solutions GmbH

[CTA: Termin sichern]

Cheers, Jonas
```

---

## 🎯 "Leaky Bucket"-Prevention (Conversion-Optimierung)

### **Problem**: Leads gehen an diesen Punkten verloren

| Leak-Point | Verlust-Rate | Fix |
|------------|--------------|-----|
| **Landing Page → Lead Magnet** | 60-80% | Reduce friction: 1-Field-Form statt 5 Fields |
| **Lead Magnet → Email öffnen** | 30-40% | Subject-Line-Optimization (A/B-Test) |
| **Email → CTA klicken** | 70-85% | Klarerer CTA, weniger Text |
| **CTA → Formular ausfüllen** | 50-70% | Multi-Step-Form (höhere Completion Rate) |
| **Formular → Absenden** | 20-30% | Trust-Signals (DSGVO, "Keine Spam"-Badge) |
| **Lead → Sales-Call** | 60-80% | Follow-Up-Automation (2h, 24h, 3d, 7d) |
| **Sales-Call → Kunde** | 50-70% | Proof-of-Concept VORHER (kostenloses Event-Konzept) |

**Expected Impact**: Jede 10%-Verbesserung = +15-20% mehr Kunden (compounding effect!)

---

## 🔐 Datenschutz & DSGVO (Compliance)

### **1. Transparente Opt-Ins**
```html
<label>
  <input type="checkbox" required />
  Ich stimme zu, dass musikfürfirmen.de mich per Email kontaktieren darf.
  <a href="/datenschutz">Datenschutzerklärung</a>
</label>
```

### **2. Daten-Minimierung**
**NUR fragen, was wirklich nötig ist**:
- Email (ja)
- Name (ja)
- Telefon (optional!)
- Firmenname (ja)
- Alles andere (später im Sales-Call)

### **3. Klarnamen-Entschlüsselung (für CRM)**
**Problem**: Leads geben oft "Max Mustermann" oder "info@firma.de"

**Lösung**: LinkedIn/Clearbit-Anreicherung (siehe CRM unten)

---

## 📊 KPI-Dashboard (Was messen?)

### **Funnel-Metrics**:

| Metric | Formel | Benchmark |
|--------|--------|-----------|
| **Traffic** | Unique Visitors/Monat | 5.000-10.000 |
| **Lead-Capture-Rate** | Leads / Traffic | 10-18% |
| **MQL-Rate** | Marketing-Qualified / Leads | 25-40% |
| **SQL-Rate** | Sales-Qualified / MQLs | 40-60% |
| **Opportunity-Rate** | Opportunities / SQLs | 50-70% |
| **Close-Rate** | Customers / Opportunities | 15-30% |
| **CAC** (Customer Acquisition Cost) | Marketing-Spend / Customers | 150-400€ |
| **LTV** (Lifetime Value) | Ø Order Value × Repeat-Rate | 3.000-5.000€ |
| **LTV:CAC-Ratio** | LTV / CAC | >3:1 (ideal: 5:1) |

### **Lead-Quality-Metrics**:

| Metric | Was zeigt's? | Target |
|--------|--------------|--------|
| **Lead-to-SQL-Conversion** | Wie qualifiziert sind Leads? | >25% |
| **Time-to-SQL** | Wie schnell werden Leads heiß? | <7 Tage |
| **Sales-Cycle-Length** | Wie lange dauert Closing? | 14-30 Tage |
| **Lead-Velocity-Rate** | Wachstumsrate von MQLs | +10-20%/Monat |

---

## 🚀 Quick-Win-Checklist (Nächste 7 Tage)

- [ ] Budget-Kalkulator mit Email-Gate (3h)
- [ ] Exit-Intent-Modal auf allen Seiten (1h)
- [ ] Scarcity-Trigger: "Nur noch X Termine" (2h)
- [ ] Testimonials auf Homepage (bereits done ✅)
- [ ] Social-Proof-Notification ("Firma X hat gerade angefragt") (2h)
- [ ] WhatsApp-Button auf allen Seiten (30 Min)
- [ ] LinkedIn-Tracking-Pixel (15 Min)
- [ ] Google Analytics Event-Tracking (Calculator, Form-Starts, etc.) (1h)
- [ ] Lead-Scoring-Sheet (Google Sheets als MVP) (1h)
- [ ] Email-Template für "Cart-Abandonment" (Calculator) (1h)

**Total Aufwand**: ~12 Stunden
**Expected Impact**: +40-60% mehr Conversions in 30 Tagen
