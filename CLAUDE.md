# musikfürfirmen.de – LLM CONTEXT & RULES

> Globale Coding-Regeln siehe: `~/CLAUDE.md`

## Projektüberblick

Website für **musikfürfirmen.de** – Livebands, DJs und Technik für Firmenevents.

## Repo & Hosting
- **GitHub**: github.com/NickHeymann/musikfuerfirmen
- **Branch**: main

## Stack
Next.js 16 | TypeScript | Tailwind CSS 4

## Projektstruktur
```
src/
├── app/              # Pages/Routes
├── components/       # React Components
│   ├── contact/      # Contact Modal (modular)
│   └── icons/        # Icon Components
├── config/           # Site Config (Single Source of Truth)
│   └── site.ts
├── data/             # Static Data
│   ├── faq.ts
│   ├── team.ts
│   ├── services.ts
│   └── jsonLd.ts
└── types/            # TypeScript Interfaces
    └── index.ts
```

## Quick Reference

| Ändern... | Datei |
|-----------|-------|
| Site Config (Name, Email, Phone) | `src/config/site.ts` |
| Navigation Links | `src/config/site.ts` |
| FAQ Daten | `src/data/faq.ts` |
| Team Daten | `src/data/team.ts` |
| Service Steps | `src/data/services.ts` |
| TypeScript Types | `src/types/index.ts` |
| Icons | `src/components/icons/index.tsx` |
| Contact Modal | `src/components/contact/` |

## Commands
```bash
npm run dev    # Development Server
npm run build  # Production Build
npm run lint   # ESLint
```

## Hosting & Infrastruktur

- **Hosting**: Hetzner CX32 (91.99.177.238)
- **Deployment**: Docker Compose + Traefik Reverse Proxy
- **SSL**: Let's Encrypt (automatisch via Traefik)
- **Domain**: musikfuerfirmen.de → TBD (aktuell nur GitHub Pages)

### Hetzner Server Architektur

```
/opt/
├── docker/                      # Zentrale Infrastruktur
│   ├── docker-compose.yml       # Traefik, Postgres, n8n
│   ├── .env                     # Secrets
│   └── traefik/                 # Reverse Proxy Config
│
└── apps/                        # Deployed Apps
    ├── _templates/              # Deployment Templates
    ├── musikfuerfirmen/         # ✅ LIVE (Next.js)
    └── kathrin-analytics/       # Referenz-Deployment
```

### Laufende Services

| Service | Status | URL |
|---------|--------|-----|
| Traefik | ✅ UP | Ports 80/443 |
| PostgreSQL | ✅ UP | postgres:5432 (intern) |
| n8n | ✅ UP | https://n8n.91.99.177.238.nip.io |
| **musikfürfirmen** | ✅ **LIVE** | https://musikfuerfirmen.91.99.177.238.nip.io |

### Deployment-Status

**AKTUELL (11. Dez 2025):**
- ✅ **Hetzner**: LIVE @ https://musikfuerfirmen.91.99.177.238.nip.io
  - Docker Container: `musikfuerfirmen` (Next.js Standalone)
  - SSL: Let's Encrypt via Traefik
  - Auto-Restart: `unless-stopped`
- ⚠️ GitHub Pages: Noch aktiv (veraltet)

**Performance-Metriken (11. Dez 2025):**
- ⚡ TTFB: **121ms** (EXZELLENT)
- ⚡ Total Load: **169ms** (SEHR SCHNELL)
- 📦 HTML Size: 60.7KB (unkomprimiert)
- ✅ Next.js Cache: HIT (funktioniert)
- ✅ SSL/HTTPS: Let's Encrypt (auto-renewal)

**TODO:**
- [ ] GitHub Pages deaktivieren
- [ ] Domain musikfuerfirmen.de DNS auf 91.99.177.238 zeigen
- [ ] docker-compose.yml: Traefik Host-Rule anpassen
- [ ] Optional: Traefik Compression Middleware (Gzip/Brotli)

### Secrets-Management

- **Hetzner**: `/opt/docker/.env` (zentrale Secrets)
- **App-spezifisch**: `/opt/apps/musikfuerfirmen/.env`
- **Lokal**: `.env` (in .gitignore)

## Safety-Regeln für Git-Operationen durch LLM

- Arbeite NIEMALS direkt auf dem Branch `main`, sondern immer auf Feature-/Fix-Branches.
- Führe KEIN `git reset --hard`, KEIN `git push --force` und KEIN Löschen von Branches/Tags aus.
- Vor größeren Refactorings:
  - Erstelle einen neuen Branch (z.B. `refactor/<beschreibung>`).
  - Setze einen Snapshot-Tag (z.B. `snapshot-YYYYMMDD-HHMM`).
  - Pushe den aktuellen Stand auf `origin`.
