# CRM-System Architektur
## Salesforce-Alternative (Eigenbau) für musikfürfirmen.de

---

## 🎯 System-Übersicht

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │ Website  │  │ Landing  │  │  Lead    │              │
│  │ (Public) │  │  Pages   │  │ Magnets  │              │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘              │
└───────┼─────────────┼─────────────┼────────────────────┘
        │             │             │
        └─────────────┴─────────────┘
                      │
        ┌─────────────▼─────────────┐
        │   API LAYER (Next.js)     │
        │  /api/leads/*             │
        │  /api/enrichment/*        │
        │  /api/scoring/*           │
        └─────────────┬─────────────┘
                      │
        ┌─────────────▼─────────────┐
        │   CORE SERVICES           │
        ├───────────────────────────┤
        │ • Lead Capture            │
        │ • Lead Scoring Engine     │
        │ • AI Enrichment           │
        │ • Email Automation        │
        │ • Analytics Engine        │
        └─────────────┬─────────────┘
                      │
        ┌─────────────▼─────────────┐
        │   DATABASE (PostgreSQL)   │
        │  + Redis (Caching)        │
        └───────────────────────────┘
                      │
        ┌─────────────▼─────────────┐
        │   ADMIN DASHBOARD         │
        │  /admin/leads             │
        │  /admin/campaigns         │
        └───────────────────────────┘
```

---

## 📊 Database Schema (PostgreSQL)

### **1. Core Tables**

#### **`leads` (Haupt-Tabelle)**
```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Contact Info (encrypted!)
  email VARCHAR(255) UNIQUE NOT NULL,
  email_hash VARCHAR(64) NOT NULL, -- SHA-256 für Deduplication
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(50),

  -- Company Info
  company_name VARCHAR(255),
  company_size VARCHAR(50), -- '1-10', '11-50', '51-200', '201-500', '500+'
  company_industry VARCHAR(100),
  company_domain VARCHAR(255), -- für Clearbit-Enrichment

  -- Event Details
  event_type VARCHAR(50), -- 'weihnachtsfeier', 'sommerfest', 'jubilaeum', etc.
  event_date DATE,
  guest_count INTEGER,
  budget_min INTEGER,
  budget_max INTEGER,
  location VARCHAR(255),

  -- Lead Status
  status VARCHAR(50) DEFAULT 'new', -- 'new', 'contacted', 'qualified', 'opportunity', 'won', 'lost'
  stage VARCHAR(50) DEFAULT 'cold', -- 'cold', 'warm', 'hot', 'burning'
  lead_score INTEGER DEFAULT 0, -- 0-100

  -- Attribution
  source VARCHAR(100), -- 'organic', 'google-ads', 'linkedin', 'direct', 'referral'
  medium VARCHAR(100), -- 'cpc', 'social', 'email', 'organic'
  campaign VARCHAR(255),
  referrer TEXT,
  landing_page TEXT,
  utm_source VARCHAR(255),
  utm_medium VARCHAR(255),
  utm_campaign VARCHAR(255),
  utm_content VARCHAR(255),
  utm_term VARCHAR(255),

  -- Enrichment Data (von AI/Clearbit)
  enriched BOOLEAN DEFAULT FALSE,
  enriched_at TIMESTAMP,
  linkedin_url VARCHAR(500),
  company_linkedin VARCHAR(500),
  company_employees_count INTEGER,
  company_revenue_range VARCHAR(50),
  decision_maker_role VARCHAR(100),

  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_activity_at TIMESTAMP,

  -- DSGVO
  consent_marketing BOOLEAN DEFAULT FALSE,
  consent_date TIMESTAMP,
  opted_out BOOLEAN DEFAULT FALSE,
  opted_out_date TIMESTAMP,

  -- Assigned Sales Rep
  assigned_to VARCHAR(100), -- 'jonas', 'nick'

  -- Notes
  notes TEXT,

  -- Indexes
  INDEX idx_email_hash (email_hash),
  INDEX idx_status (status),
  INDEX idx_stage (stage),
  INDEX idx_lead_score (lead_score DESC),
  INDEX idx_created_at (created_at DESC)
);
```

---

#### **`lead_activities` (Activity-Tracking)**
```sql
CREATE TABLE lead_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,

  activity_type VARCHAR(100) NOT NULL, -- 'page_view', 'form_submit', 'email_open', 'email_click', 'download', 'call', etc.
  activity_detail TEXT, -- JSON mit Details

  page_url TEXT,
  ip_address VARCHAR(50),
  user_agent TEXT,

  score_delta INTEGER DEFAULT 0, -- Wie viele Punkte diese Activity gibt

  created_at TIMESTAMP DEFAULT NOW(),

  INDEX idx_lead_id (lead_id),
  INDEX idx_activity_type (activity_type),
  INDEX idx_created_at (created_at DESC)
);
```

---

#### **`lead_magnets` (Downloads/Engagements)**
```sql
CREATE TABLE lead_magnets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,

  magnet_type VARCHAR(100) NOT NULL, -- 'budget_calculator', 'checklist_2025', 'quiz', '7_fehler_pdf', etc.
  magnet_name VARCHAR(255),

  -- Quiz-Results (wenn applicable)
  quiz_results JSONB, -- Stores quiz answers

  downloaded_at TIMESTAMP DEFAULT NOW(),

  INDEX idx_lead_id (lead_id),
  INDEX idx_magnet_type (magnet_type)
);
```

---

#### **`email_sequences` (Automation-Campaigns)**
```sql
CREATE TABLE email_sequences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  name VARCHAR(255) NOT NULL,
  trigger VARCHAR(100) NOT NULL, -- 'lead_magnet_download', 'calculator_used', 'cart_abandonment', etc.
  trigger_config JSONB, -- Trigger-spezifische Config

  active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE email_sequence_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sequence_id UUID REFERENCES email_sequences(id) ON DELETE CASCADE,

  step_number INTEGER NOT NULL,
  delay_hours INTEGER NOT NULL, -- Nach wie vielen Stunden senden (relativ zu Trigger)

  subject VARCHAR(500) NOT NULL,
  body_html TEXT NOT NULL,
  body_text TEXT NOT NULL,

  active BOOLEAN DEFAULT TRUE,

  INDEX idx_sequence_id (sequence_id)
);

CREATE TABLE email_sends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  sequence_id UUID REFERENCES email_sequences(id),
  step_id UUID REFERENCES email_sequence_steps(id),

  sent_at TIMESTAMP DEFAULT NOW(),
  opened_at TIMESTAMP,
  clicked_at TIMESTAMP,
  clicked_url TEXT,

  status VARCHAR(50) DEFAULT 'sent', -- 'sent', 'opened', 'clicked', 'bounced', 'complained'

  INDEX idx_lead_id (lead_id),
  INDEX idx_sequence_id (sequence_id),
  INDEX idx_sent_at (sent_at DESC)
);
```

---

#### **`companies` (Account-Level-Tracking für ABM)**
```sql
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  domain VARCHAR(255) UNIQUE NOT NULL, -- z.B. "tech-solutions.de"
  name VARCHAR(255) NOT NULL,

  -- Enrichment Data
  linkedin_url VARCHAR(500),
  employee_count INTEGER,
  revenue_range VARCHAR(50),
  industry VARCHAR(100),
  location VARCHAR(255),

  -- ABM-Targeting
  is_target_account BOOLEAN DEFAULT FALSE,
  account_tier VARCHAR(50), -- 'tier_1', 'tier_2', 'tier_3'

  enriched BOOLEAN DEFAULT FALSE,
  enriched_at TIMESTAMP,

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  INDEX idx_domain (domain),
  INDEX idx_is_target_account (is_target_account)
);

-- Many-to-Many: Leads belong to Companies
CREATE TABLE lead_companies (
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,

  PRIMARY KEY (lead_id, company_id)
);
```

---

#### **`lead_scores_history` (Score-Audit-Trail)**
```sql
CREATE TABLE lead_scores_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,

  old_score INTEGER NOT NULL,
  new_score INTEGER NOT NULL,
  delta INTEGER NOT NULL,

  reason VARCHAR(255), -- z.B. "Used Budget Calculator (+25)"

  created_at TIMESTAMP DEFAULT NOW(),

  INDEX idx_lead_id (lead_id),
  INDEX idx_created_at (created_at DESC)
);
```

---

### **2. Encryption Setup (DSGVO-konform)**

**Problem**: Namen/Emails müssen verschlüsselt gespeichert werden (DSGVO Art. 32)

**Lösung**: AES-256-Verschlüsselung mit Encryption-Key in `.env`

```typescript
// src/lib/encryption.ts
import crypto from 'crypto';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY!; // 32 Bytes (256 Bit)
const ALGORITHM = 'aes-256-gcm';

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY, 'hex'), iv);

  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  const authTag = cipher.getAuthTag();

  // Return: iv:authTag:encrypted
  return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
}

export function decrypt(encryptedText: string): string {
  const [ivHex, authTagHex, encrypted] = encryptedText.split(':');

  const iv = Buffer.from(ivHex, 'hex');
  const authTag = Buffer.from(authTagHex, 'hex');

  const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}

export function hash(text: string): string {
  return crypto.createHash('sha256').update(text).digest('hex');
}
```

**Usage**:
```typescript
// Beim Speichern
const encryptedEmail = encrypt(email);
const emailHash = hash(email.toLowerCase().trim());

await db.insert(leads).values({
  email: encryptedEmail,
  email_hash: emailHash, // für Deduplication
  // ...
});

// Beim Abrufen
const lead = await db.query.leads.findFirst({ where: eq(leads.email_hash, hash(email)) });
if (lead) {
  const decryptedEmail = decrypt(lead.email);
}
```

---

## 🤖 Lead Scoring Engine

### **Scoring-Logik (0-100 Punkte)**

```typescript
// src/lib/lead-scoring.ts

export interface ScoringRule {
  activity: string;
  points: number;
  description: string;
}

export const SCORING_RULES: ScoringRule[] = [
  // High-Intent Activities
  { activity: 'budget_calculator_used', points: 25, description: 'Budget Calculator verwendet' },
  { activity: 'pricing_page_visited', points: 20, description: 'Preise-Seite besucht' },
  { activity: 'phone_clicked', points: 30, description: 'Telefonnummer geklickt' },
  { activity: 'whatsapp_clicked', points: 30, description: 'WhatsApp-Button geklickt' },
  { activity: 'form_50_percent_filled', points: 35, description: 'Formular zu 50% ausgefüllt' },
  { activity: 'calendar_booking_started', points: 40, description: 'Kalender-Buchung gestartet' },

  // Medium-Intent Activities
  { activity: 'quiz_completed', points: 20, description: 'Event-Typ-Finder abgeschlossen' },
  { activity: 'case_study_viewed', points: 15, description: 'Case Study angeschaut' },
  { activity: 'about_us_visited', points: 15, description: 'Über-uns-Seite besucht' },
  { activity: 'testimonials_viewed', points: 12, description: 'Testimonials gelesen' },
  { activity: 'video_watched', points: 18, description: 'Video angeschaut (>50%)' },

  // Low-Intent Activities
  { activity: 'lead_magnet_downloaded', points: 10, description: 'Lead Magnet runtergeladen' },
  { activity: 'blog_post_read', points: 8, description: 'Blog-Artikel gelesen' },
  { activity: 'multiple_pages_viewed', points: 10, description: '3+ Seiten besucht' },
  { activity: 'email_opened', points: 5, description: 'Email geöffnet' },
  { activity: 'email_clicked', points: 10, description: 'Link in Email geklickt' },

  // Firmographic Signals (von Enrichment)
  { activity: 'company_size_large', points: 15, description: 'Firma >200 Mitarbeiter' },
  { activity: 'decision_maker_role', points: 20, description: 'Entscheider-Position (HR/CEO)' },
  { activity: 'linkedin_profile_premium', points: 10, description: 'LinkedIn Premium (Business-Signal)' },

  // Negative Signals (Decay)
  { activity: 'no_activity_7_days', points: -10, description: 'Keine Aktivität seit 7 Tagen' },
  { activity: 'no_activity_30_days', points: -25, description: 'Keine Aktivität seit 30 Tagen' },
  { activity: 'email_bounced', points: -50, description: 'Email bounced (ungültig)' },
];

export async function updateLeadScore(
  leadId: string,
  activity: string,
  db: Database
): Promise<number> {
  const rule = SCORING_RULES.find(r => r.activity === activity);
  if (!rule) return 0;

  // Get current lead
  const lead = await db.query.leads.findFirst({
    where: eq(leads.id, leadId),
  });

  if (!lead) throw new Error('Lead not found');

  const oldScore = lead.lead_score;
  const newScore = Math.max(0, Math.min(100, oldScore + rule.points)); // Clamp 0-100
  const delta = newScore - oldScore;

  // Update lead score
  await db.update(leads)
    .set({
      lead_score: newScore,
      updated_at: new Date(),
      last_activity_at: new Date(),
    })
    .where(eq(leads.id, leadId));

  // Log score change
  await db.insert(lead_scores_history).values({
    lead_id: leadId,
    old_score: oldScore,
    new_score: newScore,
    delta,
    reason: `${rule.description} (${delta >= 0 ? '+' : ''}${delta})`,
  });

  // Update stage based on score
  await updateLeadStage(leadId, newScore, db);

  return newScore;
}

async function updateLeadStage(leadId: string, score: number, db: Database) {
  let stage: string;

  if (score >= 81) stage = 'burning'; // Sofort anrufen!
  else if (score >= 61) stage = 'hot'; // Sales-Call buchen
  else if (score >= 31) stage = 'warm'; // Nurturing intensivieren
  else stage = 'cold'; // Standard-Nurturing

  await db.update(leads)
    .set({ stage })
    .where(eq(leads.id, leadId));
}
```

---

### **Automatic Scoring Triggers**

```typescript
// src/app/api/leads/activity/route.ts
import { updateLeadScore } from '@/lib/lead-scoring';

export async function POST(req: Request) {
  const { leadId, activity } = await req.json();

  // Update score
  const newScore = await updateLeadScore(leadId, activity, db);

  // Trigger notifications für Hot Leads
  if (newScore >= 81) {
    await sendSlackNotification(`🔥 BURNING HOT LEAD: ${leadId} (Score: ${newScore})`);
    await sendWhatsAppToSalesTeam(`Neuer Hot Lead! Jetzt anrufen: [Lead-Link]`);
  }

  return Response.json({ success: true, newScore });
}
```

---

## 🧠 AI-Enrichment (Firmen-Daten, LinkedIn, Claude)

### **1. Clearbit-Integration (Company Enrichment)**

```typescript
// src/lib/enrichment/clearbit.ts

interface ClearbitCompany {
  name: string;
  domain: string;
  employees: number;
  industry: string;
  linkedin: string;
  revenue: string;
}

export async function enrichCompanyViaClearbit(
  domain: string
): Promise<ClearbitCompany | null> {
  const response = await fetch(
    `https://company.clearbit.com/v2/companies/find?domain=${domain}`,
    {
      headers: {
        'Authorization': `Bearer ${process.env.CLEARBIT_API_KEY}`,
      },
    }
  );

  if (!response.ok) return null;

  const data = await response.json();

  return {
    name: data.name,
    domain: data.domain,
    employees: data.metrics?.employees || 0,
    industry: data.category?.industry || '',
    linkedin: data.linkedin?.handle ? `https://linkedin.com/company/${data.linkedin.handle}` : '',
    revenue: data.metrics?.estimatedAnnualRevenue || '',
  };
}
```

---

### **2. LinkedIn-Enrichment (Person-Level)**

**Problem**: LinkedIn API ist restricted für Scraping

**Lösung**: Proxy über ProxyCurl oder ScraperAPI

```typescript
// src/lib/enrichment/linkedin.ts

interface LinkedInProfile {
  fullName: string;
  headline: string;
  company: string;
  role: string;
  isPremium: boolean;
  profileUrl: string;
}

export async function enrichLinkedInProfile(
  email: string
): Promise<LinkedInProfile | null> {
  // ProxyCurl API
  const response = await fetch(
    `https://nubela.co/proxycurl/api/v2/linkedin/person/resolve/email`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PROXYCURL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    }
  );

  if (!response.ok) return null;

  const data = await response.json();

  return {
    fullName: `${data.first_name} ${data.last_name}`,
    headline: data.headline || '',
    company: data.experiences?.[0]?.company || '',
    role: data.experiences?.[0]?.title || '',
    isPremium: data.premium || false,
    profileUrl: data.linkedin_url || '',
  };
}
```

---

### **3. Claude AI Enrichment (Intent Detection & Lead Qualification)**

```typescript
// src/lib/enrichment/ai-analysis.ts
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

interface LeadAnalysis {
  intent_level: 'low' | 'medium' | 'high';
  buying_signals: string[];
  recommended_approach: string;
  qualification_score: number; // 0-100
  next_best_action: string;
}

export async function analyzeLeadWithAI(
  leadData: {
    activities: string[];
    company: string;
    role: string;
    pages_visited: string[];
    downloads: string[];
  }
): Promise<LeadAnalysis> {
  const prompt = `
Analyze this B2B lead for a corporate event band agency:

Lead Data:
- Company: ${leadData.company}
- Role: ${leadData.role}
- Activities: ${leadData.activities.join(', ')}
- Pages visited: ${leadData.pages_visited.join(', ')}
- Downloads: ${leadData.downloads.join(', ')}

Tasks:
1. Assess buying intent (low/medium/high)
2. Identify buying signals
3. Recommend sales approach
4. Score lead qualification (0-100)
5. Suggest next best action

Return JSON only.
`;

  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
  });

  const content = response.content[0];
  if (content.type !== 'text') throw new Error('Unexpected response');

  return JSON.parse(content.text);
}
```

**Usage**:
```typescript
// Nach Lead-Capture oder bei hohem Score
const analysis = await analyzeLeadWithAI({
  activities: ['budget_calculator_used', 'quiz_completed', 'case_study_viewed'],
  company: 'Tech Solutions GmbH',
  role: 'HR Manager',
  pages_visited: ['/preise', '/ueber-uns', '/referenzen'],
  downloads: ['checklist_2025', 'budget_calculator_pdf'],
});

// Output:
{
  intent_level: 'high',
  buying_signals: [
    'Used budget calculator (price-conscious, but committed)',
    'Viewed case studies (building trust)',
    'Visited pricing page multiple times (ready to buy)'
  ],
  recommended_approach: 'Direct sales call with pre-prepared event concept',
  qualification_score: 87,
  next_best_action: 'Send personalized email with event concept PDF, follow up with call in 24h'
}
```

---

## 📧 Email-Automation (Nurturing-Flows)

### **Sequenz-Setup**

```typescript
// src/lib/email/sequences.ts

export async function setupEmailSequences(db: Database) {
  // Sequenz #1: Nach Checkliste-Download
  const checklistSeq = await db.insert(email_sequences).values({
    name: 'Checkliste Download - Nurturing',
    trigger: 'lead_magnet_download',
    trigger_config: { magnet_type: 'checklist_2025' },
  }).returning();

  await db.insert(email_sequence_steps).values([
    {
      sequence_id: checklistSeq[0].id,
      step_number: 1,
      delay_hours: 0, // Sofort
      subject: 'Hier ist eure Checkliste 📋 (+ Bonus)',
      body_html: '...',
      body_text: '...',
    },
    {
      sequence_id: checklistSeq[0].id,
      step_number: 2,
      delay_hours: 72, // 3 Tage später
      subject: 'Schritt 1 erledigt? Hier ist Schritt 2',
      body_html: '...',
      body_text: '...',
    },
    {
      sequence_id: checklistSeq[0].id,
      step_number: 3,
      delay_hours: 168, // 7 Tage
      subject: 'Wie Tech Solutions GmbH ihr Event geplant hat',
      body_html: '...',
      body_text: '...',
    },
    {
      sequence_id: checklistSeq[0].id,
      step_number: 4,
      delay_hours: 336, // 14 Tage
      subject: 'Noch am Planen? Hier ist ein Angebot',
      body_html: '...',
      body_text: '...',
    },
  ]);

  // Sequenz #2: Nach Calculator-Nutzung (HOT!)
  const calcSeq = await db.insert(email_sequences).values({
    name: 'Budget Calculator - Hot Lead Follow-Up',
    trigger: 'budget_calculator_used',
  }).returning();

  await db.insert(email_sequence_steps).values([
    {
      sequence_id: calcSeq[0].id,
      step_number: 1,
      delay_hours: 0,
      subject: 'Euer Event-Angebot: {{budget}}€ für {{guests}} Gäste',
      body_html: '...',
      body_text: '...',
    },
    {
      sequence_id: calcSeq[0].id,
      step_number: 2,
      delay_hours: 48,
      subject: 'Fragen zum Angebot? Hier sind die Top 3',
      body_html: '...',
      body_text: '...',
    },
    {
      sequence_id: calcSeq[0].id,
      step_number: 3,
      delay_hours: 120, // 5 Tage
      subject: 'Update: Nur noch {{slots_left}} {{month}}-Slots',
      body_html: '...',
      body_text: '...',
    },
  ]);
}
```

---

### **Cron-Job für Email-Sends**

```typescript
// src/cron/email-sender.ts

export async function processEmailQueue() {
  // Find all leads that should receive emails
  const pendingSends = await db.query.leads.findMany({
    with: {
      lead_magnets: true,
      email_sends: true,
    },
  });

  for (const lead of pendingSends) {
    // Check if lead should receive next email in sequence
    const lastSend = lead.email_sends[lead.email_sends.length - 1];

    // Find applicable sequences
    const sequences = await findApplicableSequences(lead);

    for (const seq of sequences) {
      const nextStep = await getNextStep(seq, lastSend);

      if (nextStep && shouldSendNow(nextStep, lastSend)) {
        await sendEmail(lead, seq, nextStep);
      }
    }
  }
}

async function sendEmail(
  lead: Lead,
  sequence: EmailSequence,
  step: EmailSequenceStep
) {
  const decryptedEmail = decrypt(lead.email);

  // Personalize subject & body
  const personalizedSubject = personalize(step.subject, lead);
  const personalizedBody = personalize(step.body_html, lead);

  // Send via Resend/SendGrid/Postmark
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Jonas <jonas@musikfuerfirmen.de>',
      to: decryptedEmail,
      subject: personalizedSubject,
      html: personalizedBody,
      text: step.body_text,
      headers: {
        'List-Unsubscribe': `<https://musikfuerfirmen.de/unsubscribe?email=${encodeURIComponent(decryptedEmail)}>`,
      },
    }),
  });

  // Log send
  await db.insert(email_sends).values({
    lead_id: lead.id,
    sequence_id: sequence.id,
    step_id: step.id,
    sent_at: new Date(),
  });
}

function personalize(template: string, lead: Lead): string {
  return template
    .replace('{{first_name}}', lead.first_name || 'Hi')
    .replace('{{company}}', lead.company_name || 'euer Team')
    .replace('{{guests}}', String(lead.guest_count || '100'))
    .replace('{{budget}}', String(lead.budget_max || '4.500'))
    .replace('{{month}}', lead.event_date ? format(lead.event_date, 'MMMM', { locale: de }) : 'Dezember');
}
```

---

## 📊 Admin-Dashboard (Lead-Management)

### **Dashboard-Struktur**

```
/admin
├── /dashboard       → Overview (KPIs, Charts)
├── /leads           → Lead-Liste mit Filters
├── /leads/[id]      → Lead-Detail-View
├── /campaigns       → Email-Campaign-Management
├── /sequences       → Email-Sequenz-Editor
├── /analytics       → Funnel-Analytics
└── /settings        → API-Keys, Integrations
```

---

### **Lead-Liste mit Smart Filters**

```typescript
// src/app/admin/leads/page.tsx
'use client';

import { useState } from 'react';

export default function LeadsPage() {
  const [filters, setFilters] = useState({
    stage: 'all', // 'cold', 'warm', 'hot', 'burning'
    score: 'all', // '0-30', '31-60', '61-80', '81-100'
    source: 'all',
    days_since_activity: 'all', // '0-3', '4-7', '8-14', '15+'
  });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Leads</h1>

      {/* Filters */}
      <div className="bg-white rounded-lg p-6 mb-6 shadow">
        <div className="grid grid-cols-4 gap-4">
          <select
            value={filters.stage}
            onChange={(e) => setFilters({ ...filters, stage: e.target.value })}
            className="border rounded px-4 py-2"
          >
            <option value="all">Alle Stages</option>
            <option value="burning">🔥 Burning Hot (81-100)</option>
            <option value="hot">Hot (61-80)</option>
            <option value="warm">Warm (31-60)</option>
            <option value="cold">Cold (0-30)</option>
          </select>

          <select
            value={filters.source}
            onChange={(e) => setFilters({ ...filters, source: e.target.value })}
            className="border rounded px-4 py-2"
          >
            <option value="all">Alle Quellen</option>
            <option value="organic">Organic</option>
            <option value="google-ads">Google Ads</option>
            <option value="linkedin">LinkedIn</option>
            <option value="referral">Referral</option>
          </select>

          <select
            value={filters.days_since_activity}
            onChange={(e) => setFilters({ ...filters, days_since_activity: e.target.value })}
            className="border rounded px-4 py-2"
          >
            <option value="all">Letzte Aktivität</option>
            <option value="0-3">Heute bis 3 Tage</option>
            <option value="4-7">4-7 Tage</option>
            <option value="8-14">8-14 Tage</option>
            <option value="15+">15+ Tage (Stale)</option>
          </select>

          <button className="bg-[#0D7A5F] text-white px-6 py-2 rounded hover:bg-[#0a5f4a]">
            Filter anwenden
          </button>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Stage
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Firma
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Event
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Quelle
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Letzte Aktivität
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Lead rows... */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

---

### **Lead-Detail-View (Single-Lead)**

```typescript
// src/app/admin/leads/[id]/page.tsx

export default async function LeadDetailPage({ params }: { params: { id: string } }) {
  const lead = await getLeadWithActivities(params.id);

  return (
    <div className="p-8">
      <div className="grid grid-cols-3 gap-6">
        {/* Left: Lead Info */}
        <div className="col-span-2 space-y-6">
          <LeadInfoCard lead={lead} />
          <ActivityTimeline activities={lead.activities} />
          <EmailHistory emails={lead.email_sends} />
        </div>

        {/* Right: Actions & AI Insights */}
        <div className="space-y-6">
          <LeadScoreCard score={lead.lead_score} stage={lead.stage} />
          <AIInsightsCard leadId={lead.id} />
          <QuickActionsCard leadId={lead.id} />
          <NotesCard leadId={lead.id} notes={lead.notes} />
        </div>
      </div>
    </div>
  );
}

function LeadScoreCard({ score, stage }: { score: number; stage: string }) {
  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'burning': return 'bg-red-500';
      case 'hot': return 'bg-orange-500';
      case 'warm': return 'bg-yellow-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow">
      <h3 className="text-lg font-semibold mb-4">Lead Score</h3>

      <div className="text-center mb-4">
        <div className="text-5xl font-bold text-[#0D7A5F]">{score}</div>
        <div className="text-sm text-gray-500">von 100</div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
        <div
          className={`h-3 rounded-full ${getStageColor(stage)}`}
          style={{ width: `${score}%` }}
        />
      </div>

      <div className={`text-center py-2 rounded ${getStageColor(stage)} text-white font-semibold uppercase text-sm`}>
        {stage}
      </div>
    </div>
  );
}

function AIInsightsCard({ leadId }: { leadId: string }) {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeWithAI = async () => {
    setLoading(true);
    const res = await fetch(`/api/leads/${leadId}/ai-analysis`);
    const data = await res.json();
    setInsights(data);
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow">
      <h3 className="text-lg font-semibold mb-4">🤖 AI Insights</h3>

      {!insights && (
        <button
          onClick={analyzeWithAI}
          disabled={loading}
          className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600"
        >
          {loading ? 'Analysiere...' : 'Mit Claude analysieren'}
        </button>
      )}

      {insights && (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-sm text-gray-500">Intent Level</h4>
            <p className="text-lg font-semibold capitalize">{insights.intent_level}</p>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-gray-500">Buying Signals</h4>
            <ul className="list-disc list-inside text-sm space-y-1">
              {insights.buying_signals.map((signal: string, i: number) => (
                <li key={i}>{signal}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-gray-500">Recommended Approach</h4>
            <p className="text-sm">{insights.recommended_approach}</p>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-gray-500">Next Best Action</h4>
            <p className="text-sm font-semibold text-[#0D7A5F]">{insights.next_best_action}</p>
          </div>
        </div>
      )}
    </div>
  );
}
```

---

## 🚀 Deployment & Infrastructure

### **Tech Stack**

- **Frontend**: Next.js 15 (App Router)
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (via Supabase oder Hetzner)
- **Caching**: Redis (für Session-Storage, Lead-Score-Cache)
- **Email**: Resend.com (DSGVO-konform, EU-Server)
- **Hosting**: Hetzner (bereits vorhanden)
- **Cron**: Node-Cron oder Vercel Cron (für Email-Automation)

---

### **Environment Variables**

```env
# Database
DATABASE_URL=postgresql://...

# Encryption
ENCRYPTION_KEY=your-32-byte-hex-key

# Email
RESEND_API_KEY=re_...

# Enrichment APIs
CLEARBIT_API_KEY=sk_...
PROXYCURL_API_KEY=...

# AI
ANTHROPIC_API_KEY=sk-ant-...

# Analytics
NEXT_PUBLIC_GA_ID=G-...
```

---

## 📊 Expected Impact

### **Conversion Improvements**

| Metric | Before (ohne CRM) | After (mit CRM) | Delta |
|--------|-------------------|-----------------|-------|
| **Lead Capture Rate** | 8-12% | 15-22% | +75% |
| **Lead-to-SQL Rate** | 15-20% | 35-50% | +140% |
| **SQL-to-Customer** | 15-25% | 25-35% | +60% |
| **Overall Conversion** | 0.2-0.6% | 1.3-3.9% | +450% |

### **Efficiency Gains**

- **Lead-Response-Time**: 24-72h → <2h (via Automation)
- **Sales-Cycle-Length**: 45 Tage → 21 Tage (via Lead-Scoring)
- **Manual-Work**: 20h/Woche → 5h/Woche (via Automation)

### **Revenue Impact**

Assuming:
- 5.000 Website-Besucher/Monat
- 3% Conversion (mit CRM)
- 3.500€ Ø Order Value

**Revenue**: 5.000 × 3% × 3.500€ = **525.000€/Monat**

---

## ✅ Implementation Roadmap

### **Phase 1: MVP (Woche 1-2)**
- [x] Database-Schema aufsetzen
- [ ] Lead-Capture-API
- [ ] Basic Lead-Scoring
- [ ] Email-Sequenz #1 (Checkliste)
- [ ] Admin-Dashboard (Basic)

### **Phase 2: Automation (Woche 3-4)**
- [ ] Email-Automation-Engine
- [ ] Cron-Jobs für Email-Sends
- [ ] Lead-Stage-Updates (Auto)
- [ ] Slack/WhatsApp-Notifications für Hot Leads

### **Phase 3: AI & Enrichment (Woche 5-6)**
- [ ] Clearbit-Integration
- [ ] LinkedIn-Enrichment (via ProxyCurl)
- [ ] Claude-AI-Analysis
- [ ] Company-Level-Tracking (ABM)

### **Phase 4: Advanced Features (Woche 7-8)**
- [ ] A/B-Testing-Framework
- [ ] Predictive Lead Scoring (ML)
- [ ] Revenue Attribution
- [ ] Advanced Analytics-Dashboard
