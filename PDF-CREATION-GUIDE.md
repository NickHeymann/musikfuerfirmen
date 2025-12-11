# PDF-Erstellung: Event-Planner & Budget-Rechtfertigung

## Status
⚠️ **PDFs müssen noch erstellt werden**

Aktuell sind Placeholder-Links vorhanden:
- `/public/downloads/Event-Planner-2026.pdf`
- `/public/downloads/Budget-Rechtfertigung-2026.pdf`

---

## Content-Basis

### **1. Event-Planner-2026.pdf**
- **Quelle**: `/EVENT-PLANNER-2026-CONTENT.md`
- **Umfang**: 6.500 Wörter, ca. 15-20 Seiten
- **Sections**:
  1. Top 10 Pain Points + Lösungen
  2. 12-Monats-Timeline für 2026
  3. Budget-Breakdown (100-200 Gäste)
  4. 70-20-10 Musik-Formel
  5. 7 teuerste Fehler + Fixes
  6. Copy-Paste-Templates (Band-Briefing, Chef-Pitch, Technical Rider)

### **2. Budget-Rechtfertigung-2026.pdf**
- **Quelle**: `/BUDGET-RECHTFERTIGUNG-2026.md`
- **Umfang**: 3.800 Wörter, ca. 12-15 Seiten
- **Sections**:
  1. Das Problem (DJ vs. Liveband)
  2. ROI-Kalkulation (5.000€ → 17.000-25.000€ Return)
  3. Liveband vs. DJ Vergleich-Tabelle
  4. HR-Manager Umfrage-Results
  5. Psychologie-Tricks (Social Proof, Authentizität)
  6. Copy-Paste Chef-Email-Template
  7. Killer-Argument (Kündigungskosten)
  8. Was-wäre-wenn-Szenarien

---

## Brand-Design-Vorgaben

### **Farben** (aus `/DESIGN-SYSTEM.md`)
```
Primary: #0D7A5F (Dunkelgrün)
Accent: #2DD4A8 (Hellgrün/Türkis)
Background: #FFFFFF (Weiß)
Surface: #F9FAF9 (Off-White)
Text Primary: #1A1A1A (Schwarz)
Text Secondary: #6B7280 (Grau)
```

### **Typography**
- **Headlines**: Poppins (Bold/Semibold)
- **Body**: Poppins (Regular/Light)
- **Font-Sizes**:
  - H1: 36-48px
  - H2: 24-30px
  - H3: 18-20px
  - Body: 14-16px

### **Logo**
- **Pfad**: `/public/images/logo.svg`
- **Platzierung**: Top-left auf jeder Seite (außer Titelseite)
- **Clear Space**: Logo-Höhe × 0.5 auf allen Seiten

### **Spacing**
- **8px Grid**: Alle Abstände in Vielfachen von 8px
- **Margins**: 32-48px (A4-Ränder)
- **Section Gaps**: 24-32px

### **Design-Elemente**
- **Border-Radius**: 12-16px für Boxen/Cards
- **Shadows**: Subtile Schatten für Boxen (`0 4px 6px rgba(0, 0, 0, 0.1)`)
- **Icons**: Material Icons oder Custom SVGs in Brand-Color
- **Gradient**: `linear-gradient(135deg, #2DD4A8 0%, #22a883 100%)` für Highlights

---

## Erstellungs-Optionen

### **Option 1: Canva (Empfohlen für nicht-Entwickler)**

**Vorteile:**
- Einfach zu bedienen
- Templates verfügbar
- Export als PDF

**Schritte:**
1. Canva Account erstellen
2. "Design erstellen" → "PDF-Dokument" (A4)
3. Brand-Colors hinzufügen (#0D7A5F, #2DD4A8)
4. Poppins-Font wählen
5. Content aus `.md`-Dateien copy-pasten
6. Design mit Icons, Tabellen, Boxen
7. Export als PDF (High-Quality)
8. Speichern als `/public/downloads/Event-Planner-2026.pdf`

**Geschätzter Aufwand:** 3-4 Stunden pro PDF

---

### **Option 2: Figma (für Designer)**

**Vorteile:**
- Volle Design-Kontrolle
- Komponenten-System
- Export als PDF

**Schritte:**
1. Figma-File erstellen
2. A4-Artboards (210 × 297mm, 300 DPI = 2480 × 3508px)
3. Design-System Setup (Colors, Typography, Components)
4. Content layouten
5. Export: File → Export → PDF
6. Speichern in `/public/downloads/`

**Geschätzter Aufwand:** 4-6 Stunden pro PDF (erste), 2-3h (zweite mit Components)

---

### **Option 3: LaTeX (für Tech-Affine)**

**Vorteile:**
- Professionell
- Version-Control-freundlich
- Automatisierbar

**Schritte:**
1. Install: `brew install mactex` (macOS)
2. Template erstellen mit `scrartcl` oder `memoir` class
3. Custom Preamble mit Brand-Colors
4. Content aus `.md` → `.tex` konvertieren
5. Compile: `pdflatex document.tex`

**Beispiel-Preamble:**
```latex
\documentclass[a4paper,11pt]{scrartcl}
\usepackage[utf8]{inputenc}
\usepackage[german]{babel}
\usepackage{xcolor}
\usepackage{graphicx}
\usepackage{geometry}

% Brand Colors
\definecolor{primary}{HTML}{0D7A5F}
\definecolor{accent}{HTML}{2DD4A8}

% Geometry
\geometry{margin=2cm}

% Font (Poppins via XeLaTeX)
\usepackage{fontspec}
\setmainfont{Poppins}
```

**Geschätzter Aufwand:** 5-8 Stunden pro PDF (mit LaTeX-Kenntnissen)

---

### **Option 4: React-PDF (Programmatisch)**

**Vorteile:**
- Dynamic PDF-Generation
- Integration in Next.js möglich
- Version-Control

**Installation:**
```bash
npm install @react-pdf/renderer
```

**Beispiel-Code:**
```tsx
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Poppins' },
  h1: { fontSize: 36, color: '#0D7A5F', fontWeight: 'bold', marginBottom: 20 },
  body: { fontSize: 14, color: '#1A1A1A', lineHeight: 1.6 },
});

const EventPlannerPDF = () => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.h1}>Event-Planner 2026</Text>
      <Text style={styles.body}>Content hier...</Text>
    </Page>
  </Document>
);
```

**Geschätzter Aufwand:** 8-12 Stunden (Development + Styling)

---

## Empfehlung

**Für schnellen Start: Canva**
- Einfach, visuell, kein Code
- 3-4h pro PDF = 1 Arbeitstag für beide

**Für langfristige Skalierung: React-PDF**
- Automatische Generierung möglich
- Content-Updates einfach
- Investition lohnt sich ab 5+ PDFs

---

## Qualitätscheckliste

Vor Veröffentlichung prüfen:

- [ ] Brand-Colors korrekt (#0D7A5F, #2DD4A8)
- [ ] Poppins-Font durchgängig
- [ ] Logo auf jeder Seite (außer Titelseite)
- [ ] Alle Tabellen/Charts lesbar
- [ ] Copy-Paste-Templates formatiert (Code-Boxes)
- [ ] Seitenzahlen vorhanden
- [ ] Inhaltsverzeichnis (bei >10 Seiten)
- [ ] Links funktionieren (falls interaktiv)
- [ ] Dateigröße < 5MB
- [ ] PDF/A Standard (für Archivierung)
- [ ] Getestet auf Desktop + Mobile

---

## Quick-Win Alternative

**Falls keine Zeit für PDF-Erstellung:**

1. **Markdown → PDF-Converter nutzen**
   ```bash
   brew install pandoc
   pandoc EVENT-PLANNER-2026-CONTENT.md -o Event-Planner-2026.pdf \
     --pdf-engine=xelatex \
     --variable mainfont="Poppins" \
     --variable fontsize=11pt \
     --variable geometry:margin=2cm
   ```

2. **Pro**: 5 Minuten Aufwand
3. **Con**: Kein Custom-Design, nur Basic-Formatting

---

**Status**: ⚠️ Wartet auf PDF-Erstellung
**Next Step**: Entscheidung für Erstellungs-Methode + Umsetzung (3-8h je nach Tool)
