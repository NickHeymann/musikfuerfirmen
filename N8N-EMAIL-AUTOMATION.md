# n8n Email-Automation Setup

## Übersicht

Automatisierte Email-Sequences für Lead-Nurturing nach PDF-Downloads.

**Server**: Hetzner (91.99.177.238)
**n8n URL**: https://n8n.91.99.177.238.nip.io
**Status**: ⚠️ Workflows müssen noch erstellt werden

---

## Email-Sequences (Geplant)

### **Sequence 1: Event-Planner-2026 Download**

**Trigger**: Lead lädt Event-Planner-2026 herunter

| Day | Email | Subject | Ziel | Open-Rate | Click-Rate |
|-----|-------|---------|------|-----------|------------|
| 0 | Welcome + PDF | "Dein Event-Planner 2026 (+ Bonus-Checkliste)" | PDF-Delivery + Engagement | 60-70% | 30-40% |
| 2 | Value Email #1 | "Die 3 größten Event-Fehler (und wie du sie vermeidest)" | Expertise zeigen | 40-50% | 15-20% |
| 5 | Case Study | "Wie Tech Solutions GmbH ihre beste Weihnachtsfeier ever geplant hat" | Social Proof | 35-45% | 10-15% |
| 8 | CTA Email | "Nur noch 3 Dezember 2026-Termine – Jetzt anfragen?" | Conversion | 30-40% | 20-30% |
| 12 | Re-Engagement | "Budget-Rechtfertigung: So überzeugst du deinen Chef" | Cross-Sell | 25-35% | 15-20% |

**Expected Conversion**: 8-12% (Lead → Anfrage)

---

### **Sequence 2: Budget-Rechtfertigung Download**

**Trigger**: Lead lädt Budget-Rechtfertigung herunter

| Day | Email | Subject | Ziel | Open-Rate | Click-Rate |
|-----|-------|---------|------|-----------|------------|
| 0 | Welcome + PDF | "Budget-Rechtfertigung + Chef-Pitch-Template (Copy-Paste-Ready)" | PDF-Delivery | 60-70% | 35-45% |
| 1 | Quick Win | "3 Sätze, die jeden Chef überzeugen" | Engagement | 50-60% | 20-25% |
| 4 | Success Story | "Wie Lisa 5.000€ Budget approved bekommen hat" | Social Proof | 40-50% | 15-20% |
| 7 | Urgency | "🔥 Nur noch 3 Dezember 2026-Termine – Jetzt Budget sichern?" | Conversion | 35-45% | 25-35% |
| 10 | Event-Planner Cross-Sell | "Kostenloser Event-Planner 2026 (für perfekte Events)" | Cross-Sell | 30-40% | 20-25% |

**Expected Conversion**: 12-18% (Lead → Anfrage) *(höher, weil Budget-Intent stärker)*

---

### **Sequence 3: Budget-Rechner Lead**

**Trigger**: Lead nutzt Budget-Rechner

| Day | Email | Subject | Ziel | Open-Rate | Click-Rate |
|-----|-------|---------|------|-----------|------------|
| 0 | Calculator Results + Offer | "Dein Event-Budget (2.500-3.500€) – Inklusive kostenlosem Angebot" | PDF-Delivery + CTA | 65-75% | 40-50% |
| 1 | FAQ Email | "Die 5 häufigsten Fragen zu Firmen-Events (beantwortet)" | Trust-Building | 45-55% | 15-20% |
| 3 | Scarcity | "Nur noch 3 Dezember 2026-Termine – Band anfragen?" | Conversion | 40-50% | 30-40% |
| 7 | Last-Chance | "Letzte Chance: Frühbucher-Rabatt (bis zu 15%)" | Conversion | 30-40% | 25-35% |

**Expected Conversion**: 15-22% (Lead → Anfrage) *(höchste CR, weil Budget-Interesse + konkrete Zahlen)*

---

## n8n Workflow-Architektur

### **Workflow 1: Lead-Capture → Email-Trigger**

```
[API Endpoint: /api/leads/capture]
    ↓
[n8n Webhook Trigger]
    ↓
[Data Extraction]
    ↓
[Lead-Score Check] → (Score ≥ 20?)
    ↓ YES
[Email Sequence Trigger]
    ↓
[Store Lead in PostgreSQL]
    ↓
[Slack Notification (Hot Leads)]
```

**Webhook URL**: `https://n8n.91.99.177.238.nip.io/webhook/lead-capture`

---

### **Workflow 2: Event-Planner-Sequence**

```
[Webhook Trigger] → (source = "event_planner_2026")
    ↓
[Day 0: Send Welcome Email + PDF]
    ↓
[Wait 2 Days]
    ↓
[Day 2: Send Value Email #1]
    ↓
[Wait 3 Days]
    ↓
[Day 5: Send Case Study]
    ↓
[Wait 3 Days]
    ↓
[Day 8: Send CTA Email]
    ↓
[Wait 4 Days]
    ↓
[Day 12: Cross-Sell Budget-Rechtfertigung]
```

---

### **Workflow 3: Budget-Rechtfertigung-Sequence**

*(Ähnlich wie Workflow 2, aber mit angepassten Timings und Content)*

---

### **Workflow 4: Budget-Rechner-Sequence**

*(Schnellere Cadence, weil Budget-Intent höher)*

---

## Email-Template-Struktur

### **Welcome Email (Day 0)**

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Poppins', sans-serif; color: #1a1a1a; }
    .header { background: linear-gradient(135deg, #2DD4A8 0%, #22a883 100%); padding: 40px; text-align: center; }
    .header h1 { color: white; font-size: 28px; margin: 0; }
    .content { padding: 40px 20px; max-width: 600px; margin: 0 auto; }
    .cta { background: #2DD4A8; color: white; padding: 16px 32px; border-radius: 50px; text-decoration: none; display: inline-block; font-weight: 600; }
    .footer { background: #f9faf9; padding: 20px; text-align: center; font-size: 14px; color: #6b7280; }
  </style>
</head>
<body>
  <div class="header">
    <h1>🎉 Dein Event-Planner 2026 ist da!</h1>
  </div>

  <div class="content">
    <p>Hi {{firstName}},</p>

    <p>Mega, dass du dir den Event-Planner 2026 holst! 🚀</p>

    <p><strong>Hier ist dein PDF:</strong></p>
    <p><a href="{{pdfDownloadLink}}" class="cta">Event-Planner 2026 downloaden</a></p>

    <p><strong>Was drin ist:</strong></p>
    <ul>
      <li>Top 10 Pain Points + Lösungen (aus 500+ Events)</li>
      <li>12-Monats-Timeline für Dezember 2026-Events</li>
      <li>70-20-10 Musik-Formel (für alle Altersgruppen)</li>
      <li>Copy-Paste-Templates (Band-Briefing, Chef-Pitch)</li>
    </ul>

    <p><strong>🎁 Bonus:</strong> In 2 Tagen schicke ich dir die "3 größten Event-Fehler" (die 2.000-5.000€ kosten können).</p>

    <p>Bis bald,<br>
    Nick<br>
    <em>Gründer, musikfürfirmen.de</em></p>

    <hr>

    <p style="font-size: 14px; color: #6b7280;">
      <strong>P.S.:</strong> Nur noch 3 Dezember 2026-Termine verfügbar. Falls ihr schon konkret plant, <a href="{{ctaLink}}">hier anfragen</a>.
    </p>
  </div>

  <div class="footer">
    <p>musikfürfirmen.de | Hamburg | <a href="{{unsubscribeLink}}">Abmelden</a></p>
  </div>
</body>
</html>
```

---

## n8n Nodes-Übersicht

### **Node 1: Webhook Trigger**
```json
{
  "name": "Lead Capture Webhook",
  "type": "n8n-nodes-base.webhook",
  "parameters": {
    "path": "lead-capture",
    "method": "POST",
    "responseMode": "lastNode"
  }
}
```

### **Node 2: Extract Lead Data**
```json
{
  "name": "Extract Lead Data",
  "type": "n8n-nodes-base.set",
  "parameters": {
    "values": {
      "email": "={{$json.email}}",
      "firstName": "={{$json.firstName}}",
      "source": "={{$json.source}}",
      "leadScore": "={{$json.leadScore}}"
    }
  }
}
```

### **Node 3: Send Welcome Email**
```json
{
  "name": "Send Welcome Email",
  "type": "n8n-nodes-base.emailSend",
  "parameters": {
    "fromEmail": "kontakt@musikfürfirmen.de",
    "toEmail": "={{$json.email}}",
    "subject": "Dein Event-Planner 2026 (+ Bonus-Checkliste)",
    "text": "Hi {{$json.firstName}}, hier ist dein Event-Planner 2026...",
    "html": "<!-- Template oben -->"
  }
}
```

### **Node 4: Wait 2 Days**
```json
{
  "name": "Wait 2 Days",
  "type": "n8n-nodes-base.wait",
  "parameters": {
    "amount": 2,
    "unit": "days"
  }
}
```

### **Node 5: PostgreSQL Insert**
```json
{
  "name": "Store Lead in DB",
  "type": "n8n-nodes-base.postgres",
  "parameters": {
    "operation": "insert",
    "table": "leads",
    "columns": "email,first_name,source,lead_score,created_at",
    "values": "={{$json.email}},={{$json.firstName}},={{$json.source}},={{$json.leadScore}},NOW()"
  }
}
```

---

## Integration mit Next.js API

### **API-Route Update: `/api/leads/capture/route.ts`**

```typescript
// Nach erfolgreichem Lead-Capture:

// Trigger n8n Webhook
const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL ||
  'https://n8n.91.99.177.238.nip.io/webhook/lead-capture';

await fetch(n8nWebhookUrl, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: data.email,
    firstName: data.firstName,
    companyName: data.companyName,
    source: data.source,
    leadScore: data.leadScore,
    calculatorData: data.calculatorData || null,
    timestamp: new Date().toISOString(),
  }),
});
```

**Environment Variable hinzufügen:**
```bash
# .env.production
N8N_WEBHOOK_URL=https://n8n.91.99.177.238.nip.io/webhook/lead-capture
```

---

## Metrics & Tracking

### **Email-Performance-KPIs**

| Metric | Target | Tracking |
|--------|--------|----------|
| Open Rate | 40-60% | n8n Analytics |
| Click Rate | 15-30% | UTM-Parameter + GA4 |
| Conversion Rate (Lead → Anfrage) | 10-18% | CRM-Tracking |
| Unsubscribe Rate | <2% | n8n Analytics |

### **UTM-Parameter für Links**

```
https://musikfuerfirmen.de/anfragen?utm_source=email&utm_medium=sequence&utm_campaign=event_planner_day8&utm_content=cta_button
```

---

## Spam-Prevention & Compliance

### **DSGVO-Checklist**

- [x] Double-Opt-In (bei Anmeldung)
- [x] Unsubscribe-Link in jeder Email
- [x] Datenschutzerklärung verlinkt
- [x] Email-Adressen verschlüsselt (AES-256)
- [x] Auftragsverarbeitungs-Vertrag (AVV) mit Email-Provider

### **Email-Provider Empfehlungen**

| Provider | Pro | Con | Preis |
|----------|-----|-----|-------|
| **SendGrid** | DSGVO-konform, n8n-Integration | Teuer ab 10k Emails/Monat | $15/mo (10k) |
| **Mailgun** | Developer-freundlich | Komplexes Pricing | $35/mo (50k) |
| **Postmark** | Hohe Deliverability | Nur Transactional | $10/mo (10k) |
| **Amazon SES** | Billig, skalierbar | Setup-Aufwand | $0.10/1k |

**Empfehlung**: SendGrid (für Start) oder Amazon SES (für Skalierung)

---

## Setup-Schritte (Hetzner n8n)

### **1. n8n Credentials Setup**

```bash
# SSH in Hetzner
ssh root@91.99.177.238

# n8n öffnen
https://n8n.91.99.177.238.nip.io

# Credentials hinzufügen:
# - SendGrid API Key
# - PostgreSQL Connection
# - Slack Webhook (optional)
```

### **2. Workflow Import**

1. Workflows aus `/n8n-workflows/` (erstellen)
2. n8n UI → "Import from File"
3. Credentials verknüpfen
4. Test-Run durchführen

### **3. Webhook-Test**

```bash
curl -X POST https://n8n.91.99.177.238.nip.io/webhook/lead-capture \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "firstName": "Max",
    "source": "event_planner_2026",
    "leadScore": 20
  }'
```

**Erwartetes Ergebnis**: Welcome-Email an test@example.com

---

## Monitoring & Alerts

### **Slack-Notifications (Optional)**

**Hot Leads (Score ≥ 60):**
```
🔥 HOT LEAD: Max Mustermann (Tech Solutions GmbH)
📧 max@firma.de
📊 Lead-Score: 75 (Hot)
📝 Source: budget_calculator
💰 Budget: 4.500€ (100 Gäste)
🔗 [View in CRM](#)
```

**n8n Node:**
```json
{
  "name": "Slack Hot Lead Alert",
  "type": "n8n-nodes-base.slack",
  "parameters": {
    "channel": "#leads",
    "text": "🔥 HOT LEAD: {{$json.firstName}} {{$json.lastName}}..."
  }
}
```

---

## Kosten-Schätzung

| Service | Preis/Monat | Leads/Monat | Cost per Lead |
|---------|-------------|-------------|---------------|
| SendGrid | $15 | 500 | $0.03 |
| n8n (self-hosted) | $0 (Hetzner inkl.) | ∞ | $0 |
| **Gesamt** | **$15** | **500** | **$0.03** |

**Bei 1.000 Leads/Monat**: $35/mo (SendGrid 50k Plan)

---

## Next Steps

1. **SendGrid Account erstellen** (15 Min.)
2. **n8n Workflows erstellen** (2-3h)
3. **Email-Templates schreiben** (2h)
4. **API-Integration testen** (30 Min.)
5. **Test-Sequences durchlaufen** (1h)
6. **Go Live** 🚀

**Geschätzter Aufwand**: 6-8h Setup + 2h Testing = **1 Arbeitstag**

---

**Status**: ⚠️ Wartet auf n8n-Workflow-Erstellung
**Priority**: High (direkt nach PDF-Erstellung)
**Expected Impact**: +200-400 Leads/Monat durch Nurturing
