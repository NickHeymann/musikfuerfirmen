# Design-System | musikfürfirmen.de
## Brand-Identity & Component-Library

---

## 🎨 Brand-Farben (Primary Palette)

### **Primärfarben**
```css
--primary: #0D7A5F          /* Dunkelgrün (Hauptfarbe) */
--primary-dark: #0a5f4a     /* Dunkleres Grün (Hover) */
--primary-light: #f0faf7    /* Sehr helles Grün (Backgrounds) */
--primary-glow: #2DD4A8     /* Hellgrün (Akzente) */
```

### **Sekundärfarben**
```css
--background: #FFFFFF       /* Weiß (Haupthintergrund) */
--surface: #F9FAF9          /* Off-White (Sekundäre Backgrounds) */
--border: #E5E7EB          /* Hellgrau (Borders) */
--muted: #6B7280           /* Mittelgrau (Sekundärtext) */
--foreground: #1A1A1A      /* Schwarz (Haupttext) */
```

### **Functional Colors**
```css
--success: #10B981         /* Grün (Success States) */
--warning: #F59E0B         /* Orange (Warnings) */
--error: #EF4444           /* Rot (Errors) */
--info: #3B82F6            /* Blau (Info) */
```

### **Semantic Colors**
```css
--cta-primary: linear-gradient(135deg, #2DD4A8 0%, #22a883 100%)
--cta-hover: linear-gradient(135deg, #22a883 0%, #1d8c6d 100%)
--text-primary: #1A1A1A
--text-secondary: #6B7280
--text-white: #FFFFFF
```

---

## 📝 Typography

### **Font-Families**
```css
--font-primary: 'Poppins', sans-serif    /* Headlines, Buttons, Bold Text */
--font-body: system-ui, sans-serif       /* Body-Text (Fallback) */
--font-mono: 'Courier New', monospace    /* Code, Numbers */
```

### **Font-Sizes (Desktop)**
```css
--text-xs: 0.75rem      /* 12px - Fine Print */
--text-sm: 0.875rem     /* 14px - Small Text */
--text-base: 1rem       /* 16px - Body */
--text-lg: 1.125rem     /* 18px - Large Body */
--text-xl: 1.25rem      /* 20px - Small Headlines */
--text-2xl: 1.5rem      /* 24px - Subheadings */
--text-3xl: 1.875rem    /* 30px - Section Titles */
--text-4xl: 2.25rem     /* 36px - Page Headlines */
--text-5xl: 3rem        /* 48px - Hero Headlines */
--text-6xl: 3.75rem     /* 60px - Large Hero Headlines */
```

### **Font-Weights**
```css
--font-normal: 400
--font-medium: 500
--font-semibold: 600
--font-bold: 700
```

### **Line-Heights**
```css
--leading-tight: 1.25    /* Headlines */
--leading-normal: 1.5    /* Body */
--leading-relaxed: 1.75  /* Long-form Content */
```

---

## 🔲 Spacing-System (8px Grid)

```css
--spacing-1: 0.25rem    /* 4px */
--spacing-2: 0.5rem     /* 8px */
--spacing-3: 0.75rem    /* 12px */
--spacing-4: 1rem       /* 16px */
--spacing-5: 1.25rem    /* 20px */
--spacing-6: 1.5rem     /* 24px */
--spacing-8: 2rem       /* 32px */
--spacing-10: 2.5rem    /* 40px */
--spacing-12: 3rem      /* 48px */
--spacing-16: 4rem      /* 64px */
--spacing-20: 5rem      /* 80px */
--spacing-24: 6rem      /* 96px */
```

---

## 🎯 Border-Radius

```css
--radius-sm: 0.5rem      /* 8px - Small Elements */
--radius-md: 0.75rem     /* 12px - Buttons, Inputs */
--radius-lg: 1rem        /* 16px - Cards */
--radius-xl: 1.25rem     /* 20px - Large Cards */
--radius-2xl: 1.5rem     /* 24px - Modals */
--radius-full: 9999px    /* Pills, Circles */
```

---

## 🌫️ Shadows

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05)
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1)
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1)
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15)
--shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.25)
```

---

## 🔘 Component-Library

### **1. Buttons**

#### **Primary CTA**
```tsx
<button className="
  bg-gradient-to-br from-[#2DD4A8] to-[#22a883]
  text-white font-semibold
  px-8 py-4 rounded-xl
  hover:from-[#22a883] hover:to-[#1d8c6d]
  hover:shadow-xl hover:-translate-y-0.5
  transition-all duration-300
  disabled:opacity-50 disabled:cursor-not-allowed
">
  Jetzt anfragen
</button>
```

#### **Secondary CTA**
```tsx
<button className="
  bg-white text-[#0D7A5F]
  border-2 border-[#0D7A5F]
  font-semibold px-8 py-4 rounded-xl
  hover:bg-[#f0faf7]
  transition-all duration-300
">
  Mehr erfahren
</button>
```

#### **Ghost Button**
```tsx
<button className="
  text-[#0D7A5F] font-semibold
  px-6 py-3 rounded-xl
  hover:bg-[#f0faf7]
  transition-all duration-300
">
  Abbrechen
</button>
```

---

### **2. Cards**

#### **Standard Card**
```tsx
<div className="
  bg-white rounded-2xl p-8
  border border-gray-200
  shadow-lg
  hover:shadow-2xl hover:-translate-y-1
  transition-all duration-300
">
  {/* Content */}
</div>
```

#### **Feature Card (mit Icon)**
```tsx
<div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
  <div className="w-16 h-16 bg-gradient-to-br from-[#2DD4A8] to-[#22a883] rounded-full flex items-center justify-center mb-6">
    <svg className="w-8 h-8 text-white" fill="currentColor">
      {/* Icon */}
    </svg>
  </div>
  <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4">Feature Title</h3>
  <p className="text-gray-600 leading-relaxed">Description...</p>
</div>
```

---

### **3. Form Inputs**

#### **Text Input**
```tsx
<input
  type="text"
  className="
    w-full px-4 py-3
    border-2 border-gray-200 rounded-xl
    focus:border-[#0D7A5F] focus:ring-4 focus:ring-[#f0faf7]
    focus:outline-none
    transition-all duration-300
    placeholder:text-gray-400
  "
  placeholder="max@firma.de"
/>
```

#### **Checkbox**
```tsx
<label className="flex items-start cursor-pointer group">
  <input
    type="checkbox"
    className="
      mt-1 mr-3 w-5 h-5
      accent-[#0D7A5F]
      rounded
    "
  />
  <div>
    <div className="font-semibold text-[#1a1a1a] group-hover:text-[#0D7A5F]">
      Label
    </div>
    <div className="text-sm text-gray-500">Description</div>
  </div>
</label>
```

---

### **4. Badges**

#### **Status Badge**
```tsx
<span className="
  inline-flex items-center
  px-3 py-1
  bg-[#f0faf7] text-[#0D7A5F]
  text-sm font-semibold rounded-full
">
  Verfügbar
</span>
```

#### **Hot Badge**
```tsx
<span className="
  inline-flex items-center
  px-3 py-1
  bg-gradient-to-r from-red-500 to-orange-500
  text-white text-sm font-semibold rounded-full
">
  🔥 Nur noch 3 Termine
</span>
```

---

### **5. Progress Bars**

```tsx
<div className="w-full bg-gray-200 rounded-full h-2">
  <div
    className="bg-gradient-to-r from-[#2DD4A8] to-[#22a883] h-2 rounded-full transition-all duration-500"
    style={{ width: "60%" }}
  />
</div>
```

---

### **6. Alerts / Notifications**

#### **Success Alert**
```tsx
<div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
  <div className="flex items-center">
    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor">
      {/* Checkmark Icon */}
    </svg>
    <p className="text-green-800 font-semibold">Erfolgreich gespeichert!</p>
  </div>
</div>
```

#### **Error Alert**
```tsx
<div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
  <div className="flex items-center">
    <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor">
      {/* Error Icon */}
    </svg>
    <p className="text-red-800 font-semibold">Fehler: Bitte alle Felder ausfüllen</p>
  </div>
</div>
```

---

### **7. Loading States**

#### **Spinner**
```tsx
<div className="flex items-center justify-center">
  <div className="
    w-8 h-8 border-4 border-gray-200 border-t-[#0D7A5F]
    rounded-full animate-spin
  " />
</div>
```

#### **Skeleton**
```tsx
<div className="animate-pulse">
  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
  <div className="h-4 bg-gray-200 rounded w-1/2" />
</div>
```

---

## 🎭 Animations

### **Transitions**
```css
transition-all duration-300 ease-in-out  /* Standard */
transition-transform duration-500        /* Smooth Transforms */
transition-colors duration-200          /* Fast Color Changes */
```

### **Hover Effects**
```tsx
hover:scale-105              /* Slight Grow */
hover:-translate-y-1         /* Lift Up */
hover:shadow-2xl             /* Shadow Increase */
hover:brightness-110         /* Lighten */
```

### **Entrance Animations**
```tsx
className="
  opacity-0 translate-y-4
  animate-[fadeInUp_0.6s_ease-out_forwards]
"

/* CSS */
@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## 📱 Responsive Breakpoints

```css
/* Tailwind Breakpoints */
sm: 640px    /* Small devices */
md: 768px    /* Tablets */
lg: 1024px   /* Desktops */
xl: 1280px   /* Large Desktops */
2xl: 1536px  /* Extra Large */
```

### **Mobile-First Design Pattern**
```tsx
<div className="
  text-2xl            /* Mobile */
  md:text-3xl         /* Tablet */
  lg:text-4xl         /* Desktop */
">
  Headline
</div>
```

---

## 🖼️ Logo & Icons

### **Logo Usage**
- **Primary Logo**: `/images/logo.svg` (mit Schriftzug)
- **Logo-Mark**: `/images/logo-mark.svg` (nur Icon)
- **Favicon**: `/favicon.ico`

### **Logo Clear Space**
Mindestabstand: Logo-Höhe × 0.5 auf allen Seiten

### **Icon-System**
```tsx
// Icon-Größen
w-4 h-4   /* 16px - Inline Text */
w-5 h-5   /* 20px - Buttons */
w-6 h-6   /* 24px - Feature Icons */
w-8 h-8   /* 32px - Large Feature Icons */
w-12 h-12 /* 48px - Hero Icons */
```

---

## 🎨 Gradient-System

### **Primary Gradient**
```css
background: linear-gradient(135deg, #2DD4A8 0%, #22a883 100%);
```

### **Secondary Gradient (Subtle)**
```css
background: linear-gradient(180deg, #FFFFFF 0%, #F9FAF9 100%);
```

### **Accent Gradient**
```css
background: linear-gradient(135deg, #0D7A5F 0%, #0a5f4a 100%);
```

---

## 🔤 Text-Styles (Presets)

### **Heading 1 (Hero)**
```tsx
<h1 className="
  text-5xl md:text-6xl
  font-bold
  text-[#1a1a1a]
  leading-tight
  mb-6
  font-['Poppins']
">
  Headline
</h1>
```

### **Heading 2 (Section)**
```tsx
<h2 className="
  text-3xl md:text-4xl
  font-bold
  text-[#1a1a1a]
  leading-tight
  mb-4
  font-['Poppins']
">
  Section Title
</h2>
```

### **Body Text**
```tsx
<p className="
  text-base md:text-lg
  text-gray-600
  leading-relaxed
">
  Body text goes here...
</p>
```

### **Small Print**
```tsx
<p className="
  text-sm
  text-gray-500
  leading-normal
">
  Fine print text...
</p>
```

---

## ✅ Do's & Don'ts

### **✅ Do's**
- Verwende immer Brand-Farben (#0D7A5F für Primary)
- Halte dich an 8px-Grid für Spacing
- Nutze Poppins für Headlines
- Runde Ecken mit 12-20px
- Hover-States bei interaktiven Elementen
- Mobile-First-Approach

### **❌ Don'ts**
- Keine Random-Farben außerhalb der Palette
- Keine Spacing-Werte außerhalb des 8px-Grids
- Keine Comic Sans oder "lustige" Fonts
- Keine scharfen Ecken (border-radius: 0)
- Keine Hover-States ohne Transition
- Keine Desktop-Only-Designs

---

## 🚀 Component-Imports

```tsx
// Example: Button-Component
import { Button } from '@/components/ui/Button';

<Button variant="primary" size="lg">
  Jetzt anfragen
</Button>
```

**Variants:**
- `primary` - Main CTA (Gradient)
- `secondary` - Secondary CTA (Outlined)
- `ghost` - Tertiary CTA (No Background)

**Sizes:**
- `sm` - Small (px-4 py-2)
- `md` - Medium (px-6 py-3)
- `lg` - Large (px-8 py-4)

---

## 📊 Design-Tokens (CSS Variables)

```css
/* globals.css */
:root {
  /* Colors */
  --color-primary: #0D7A5F;
  --color-primary-dark: #0a5f4a;
  --color-primary-light: #f0faf7;

  /* Typography */
  --font-primary: 'Poppins', sans-serif;

  /* Spacing */
  --spacing-unit: 8px;

  /* Border-Radius */
  --radius-default: 12px;

  /* Shadows */
  --shadow-card: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

---

## 🎯 Accessibility

### **Color Contrast**
- Text auf Weiß: Mindestens 4.5:1 (WCAG AA)
- Large Text: Mindestens 3:1

### **Focus States**
```tsx
focus:ring-4 focus:ring-[#f0faf7] focus:outline-none
```

### **Alt-Text für Icons**
```tsx
<svg aria-label="Checkmark Icon" role="img">
  {/* ... */}
</svg>
```

---

**Status**: ✅ Design-System dokumentiert
**Usage**: Import components aus `/components/ui/` oder copy Tailwind-Classes direkt
