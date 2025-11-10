# Decari MVP – Content- und Funnel-Website für Schulbegleitung

### TL;DR

Decari bündelt hochwertige Informationen und einen klaren Funnel, um Eltern, Schulen und Kostenträger schnell zur passenden Schulbegleitung zu führen. Das MVP liefert SEO-optimierte Inhalte, geführte CTAs, ein kurzes Intake-Formular und sofortige Terminbuchung via cal.com, inklusive DSGVO-konformem Tracking. Zielgruppe sind primär Eltern/Erziehungsberechtigte, Lehrkräfte/Schulleitung sowie Sachbearbeiter im Jugendamt.

---

## Goals

### Business Goals

* 100 qualifizierte Leads pro Monat innerhalb von 90 Tagen nach Launch (Lead = abgeschicktes Kontaktformular oder bestätigte Terminbuchung).

* ≥35% Lead-zu-Termin-Rate im Funnel innerhalb von 60 Tagen.

* ≤30€ Cost-per-Lead über organischen und bezahlten Traffic-Kanäle im MVP.

* ≥3% Landing-Page-Conversion-Rate (Besuch zu Lead) nach A/B-Test-Zyklus 1.

* 80% der Inhalte auf Seite 1 bei relevanten Long-Tail-Suchanfragen nach 6 Monaten (SEO).

### User Goals

* Schnell verstehen, ob und wie Schulbegleitung hilft, welche Schritte nötig sind und welche Leistungen Decari bietet.

* In <5 Minuten eine Ersteinschätzung erhalten und einen Termin zur Erstberatung buchen.

* Transparente Informationen zu Kosten, Finanzierung (Jugendamt), Zuständigkeiten und Zeitplan.

* Klare Kontaktwege (Telefon, Formular, Termin) und verlässliche Rückmeldung innerhalb von 24 Stunden.

* Barrierearme, mobile-optimierte Nutzung mit einfacher Sprache und vertrauensbildenden Elementen.

### Non-Goals

* Kein vollwertiges Kundenportal oder Fallmanagement im MVP.

* Kein komplexes CMS mit Rollen/Rechten; Inhalte werden als Markdown gepflegt.

* Keine Mehrsprachigkeit im MVP (Deutsch-only).

---

## User Stories

* Elternteil (Mutter/Vater/Erziehungsberechtigte/r)

  * As a parent, I want to understand eligibility and steps for Schulbegleitung, so that I can make an informed decision quickly.

  * As a parent, I want to see financing options (Jugendamt) explained simply, so that I know the process and documents required.

  * As a parent, I want to book a consultation immediately online, so that I don’t have to wait for a call back.

  * As a parent, I want to read credible testimonials and FAQs, so that I feel safe and trust the service.

  * As a parent, I want to choose my preferred contact method (phone, form, booking), so that I can act in my comfort zone.

* Lehrkraft/Schulleitung/Schulsozialarbeit

  * As a teacher, I want a concise explainer about how in-class support works, so that I can advise parents accurately.

  * As a principal, I want printable info sheets, so that I can share the process with colleagues and parents.

  * As a school social worker, I want to directly refer families via a short referral form, so that the family gets help fast.

* Sachbearbeiter/in Jugendamt

  * As a caseworker, I want to verify service scope and regional coverage, so that I can approve a provider quickly.

  * As a caseworker, I want to request required documents securely, so that I can process the case efficiently.

* Interessent/in als Schulbegleiter/in

  * As a candidate, I want to understand role requirements and apply easily, so that I can join without friction.

  * As a candidate, I want to book a screening call, so that I can clarify my questions.

* Decari Admin/Content-Owner

  * As an admin, I want to publish and update content in Markdown, so that I can move fast without a heavy CMS.

  * As an admin, I want to view funnel analytics (traffic, CTR, conversion), so that I can iterate on messaging and UX.

  * As an admin, I want to receive structured lead data and appointments, so that intake can respond within SLA.

---

## Functional Requirements

* Content (Priority: High) -- Content Pages: SEO-optimierte Seiten für Leistungen, Prozess, Finanzierung, Regionen, Über uns. -- Blog/Resources (Markdown): Ratgeber-Artikel, FAQs, Checklisten, Glossar. -- Trust & Proof: Testimonials, Gütesiegel, Partnerlogos, rechtliche Seiten (Impressum, Datenschutz). -- SEO-Basics: Meta-Tags, strukturierte Daten, Sitemap, robots.txt, OG-Bilder.

* Funnel (Priority: High) -- Guided CTA: Primäre CTA “Ersteinschätzung starten” mit Kurz-Intake (3–6 Fragen). -- Standort-/Bedarfs-Abfrage: PLZ/Region, Art des Unterstützungsbedarfs, Schulform. -- Outcome Screen: Sofort-Feedback (Region verfügbar? Nächste Schritte), sekundäre CTAs (Anruf, E-Mail). -- Terminbuchung: cal.com-Widget für Erstberatung (15–30 Min), Double-Opt-In E-Mail-Bestätigung. -- A/B-Testing Hooks: Varianten für Headlines/CTAs/Sections.

* Kontakt (Priority: High) -- Kontaktformular: DSGVO-konform, Spam-Schutz, Pflichtfelder, Consent-Checkboxen. -- Click-to-Call/WhatsApp-Deep Link (optional MVP+), E-Mail-Link mit vorgefülltem Betreff. -- Admin-Benachrichtigungen: E-Mail/Slack via n8n bei neuen Leads/Terminen. -- Referral-Form (Kurz): Für Schulen zur direkten Weitergabe von Kontaktdaten (mit Einwilligung).

* Tracking (Priority: High) -- Consent Management: Opt-in Banner, granular (Analytics, Marketing, Embeds). -- PostHog: Pageviews, Events, Funnels, Heatmaps; cookieless fallback. -- Source Attribution: UTM-Parameter, First-touch/Last-touch Speicherung. -- Error & Uptime Monitoring: Basic logging, 404/500 Tracking.

* Performance & Accessibility (Priority: Medium) -- Core Web Vitals: Lazy-loading, Bildoptimierung, Prefetching. -- Responsive UI: Mobile-first via Tailwind, accessible components (shadcn/ui). -- Lesbarkeit: Einfache Sprache, große Touch-Ziele, hohe Farbkontraste.

* Admin & Ops (Priority: Medium) -- Content-Pflege via Markdown in Git. -- n8n-Flows: Lead-Verarbeitung, CRM/Sheet-Sync, E-Mail-Templates, Reminder. -- Feature Flags: Stufenweise Aktivierung von Experimenten.

---

## User Experience

**Entry Point & First-Time User Experience**

* Discovery: Organische Suche (SEO-Artikel, “Was ist Schulbegleitung?”, “Schulbegleitung beantragen Jugendamt”), Empfehlungen von Schulen, Social/Ads.

* First Impression: Klare Headline (“Schnell zur passenden Schulbegleitung”), kurzer Value-Block, Trust-Siegel, primärer CTA im Sichtfeld.

* Onboarding: Kein Account nötig. Optional kurzer 10–20 Sek. “Wie funktioniert’s?” Abschnitt.

**Core Experience**

* Step 1: Landing lesen und CTA klicken (“Ersteinschätzung starten”).

  * UI/UX: Above-the-fold CTA, sekundäre CTA “Termin direkt buchen”.

  * Validation: Klick-Tracking, Scroll-Depth; wenn Consent abgelehnt, nur essentielle Skripte.

  * Success: Modal/Wizard öffnet sich; klare Fortschrittsanzeige (z.B. 1/4).

* Step 2: Kurz-Intake (PLZ, Schulform, Unterstützungsbedarf, zeitlicher Rahmen, Kontaktpräferenz).

  * UX: 1 Frage pro Screen, Auto-Advance; maximal 6 Fragen.

  * Validation: Pflichtfelder, PLZ-Pattern, Fehlermeldungen inline, Barrierefreiheit (ARIA).

  * Success: Zusammenfassung mit “Weiter zu Beratungstermin” + Alternative “Rückruf wünschen”.

* Step 3: Ergebnisanzeige.

  * Inhalt: “Region verfügbar” + nächster Schritt; falls nicht verfügbar: Warteliste/Partnerempfehlung.

  * Trust: Kurzes Testimonial, Hinweis auf Finanzierung über Jugendamt.

  * Options: Termin buchen, sofort anrufen, PDF-Checkliste herunterladen (Lead magnet).

* Step 4: Terminbuchung (cal.com Embed).

  * UX: Wochenauswahl, Zeitslots, Bestätigung; Kalender-Invite automatisch.

  * Validation: Pflichtfelder (Name, E-Mail, Telefon optional), Datenschutz-Hinweise.

  * Success: Bestätigungsseite mit Danke, Zusammenfassung, E-Mail-Bestätigung, ICS-Datei.

* Step 5: Follow-up & Nurturing.

  * n8n triggert E-Mail mit: Checkliste, benötigte Unterlagen fürs Jugendamt, Ablauf bis Start.

  * Reminder 24h vor Termin; No-Show-Flow (Rebook-Link).

* Step 6: Kontaktweg Alternativen.

  * Kontaktformular: Für Nutzer, die keinen Termin buchen möchten; SLA-Hinweis “Antwort in 24h”.

  * Telefon/WhatsApp: Direktklick möglich; Öffnungszeiten sichtbar.

**Advanced Features & Edge Cases**

* Consent verweigert: Nur essentielle Skripte; cookieless PostHog; cal.com erst nach Klick mit Hinweis (“Externer Dienst”).

* Region nicht verfügbar: Warteliste, Partnervermittlung, Info-Mail; klare Erwartungssteuerung.

* Doppelte Leads: n8n dedupliziert anhand E-Mail/Telefon + 30-Tage-Window.

* Offline/Slow Network: Skeleton-Loader, Retry, Low-res Images, Form-State-Persistenz.

* cal.com Down: Fallback-Formular “Terminwunsch”; manuelle Buchung durch Intake.

* Accessibility: Vollständig mit Tastatur bedienbar; Fokus-Styles; Screenreader-Texte.

**UI/UX Highlights**

* Mobile-first, 16px+ Basis-Typo, hohe Kontraste (WCAG AA), ausreichende Zeilenlänge.

* Shadcn/UI-Komponenten für konsistente Inputs, Modals, Toaster.

* Vertrauensanker: Datenschutz-Hinweis, Impressum, Gütesiegel, echte Zitate mit Initialen/Ort.

* Struktur: Klare Hierarchie (H1-H3), Inhaltsverzeichnis für lange Ratgeber.

* Performance: Bildoptimierung, preconnect zu cal.com, Critical CSS.

* Klarer sekundärer Pfad: “Direkt anrufen” sichtbar, aber nicht dominierend.

---

## Narrative

Anna ist alleinerziehende Mutter. Ihr Sohn Leon hat Unterstützungsbedarf in der Schule, aber sie weiß nicht, wo sie anfangen soll. Eine Suche nach “Schulbegleitung beantragen Jugendamt” führt sie auf die Decari-Seite. Oben liest sie in einfachen Worten, wie Schulbegleitung funktioniert und wer Anspruch hat. Ein kurzer Abschnitt beantwortet ihre größte Sorge: “Wer bezahlt das?” Die nächsten Schritte sind transparent. Sie klickt auf “Ersteinschätzung starten”.

In weniger als zwei Minuten beantwortet Anna ein paar Fragen: PLZ, Schulform, Bedarf. Die Seite bestätigt: In ihrer Region ist Unterstützung verfügbar, und sie kann sofort einen Beratungstermin buchen. Anna wählt einen Slot am nächsten Tag. Sekunden später erhält sie eine E-Mail-Bestätigung mit einer Checkliste, welche Unterlagen das Jugendamt benötigt. Das beruhigt sie – endlich ein klarer Plan.

Am nächsten Tag spricht sie mit einer Beraterin, die Annas Lage versteht und den Antragsschritt erklärt. Leon bekommt zeitnah eine Schulbegleitung. Für Decari bedeutet das: ein qualifizierter Lead, eine terminierte Beratung und die Grundlage für eine langfristige Zusammenarbeit mit messbarem ROI. Für Anna: Entlastung, Orientierung und das gute Gefühl, die richtige Unterstützung gefunden zu haben.

---

## Success Metrics

* Funnel-Conversion (Landing → Lead): Ziel ≥3%; gemessen via PostHog Funnel.

* Lead-zu-Termin-Rate: Ziel ≥35%; gemessen via cal.com Webhooks + n8n.

* Time-to-First-Appointment: Median <48h; cal.com + n8n Zeiterfassung.

* Bounce Rate Landing: <50%; PostHog.

* Core Web Vitals: LCP <2,5s, CLS <0,1, INP <200ms; Lighthouse/Real User Monitoring.

* Consent Opt-in Rate: ≥60% für Analytics; CMP-Events.

### User-Centric Metrics

* NPS nach Ersttermin: ≥40; 1-Klick-Survey via E-Mail.

* Task Success: 80% der Nutzer finden innerhalb von 3 Klicks zum passenden CTA (PostHog Pfadanalyse).

* Termin-No-Show-Rate: <10% durch Reminder-Flows.

### Business Metrics

* Qualified Leads/Monat: ≥100.

* Cost-per-Lead: ≤30€.

* Abschlussquote nach Ersttermin: ≥25% (intern gemessen).

* Organischer Traffic: +50% in 90 Tagen durch SEO.

### Technical Metrics

* Uptime ≥99,9%/Monat.

* Fehlerquote (5xx) <0,5% der Requests.

* P95 Server Response <300ms, P95 TTFB <200ms (auf Vercel).

* JS-Bundle <150KB gzipped auf Landing.

### Tracking Plan

* page_view (inkl. page_type, referrer, utm\_\*).

* cta_click (cta_id, page_type, variant).

* intake_start, intake_step, intake_complete (answers_hash anonymisiert).

* lead_submit (source, channel, consent_status).

* booking_start, booking_complete (event_id aus cal.com).

* consent_given/withdrawn (categories).

* download_click (asset_id).

* phone_click, email_click, whatsapp_click.

* 404_view, error_occured (error_type).

---

## Technical Considerations

### Technical Needs

* Frontend: Next.js (SSR/SSG hybrid), App Router, Tailwind CSS, shadcn/ui + shadcnblocks für modulare Sections.

* Content: Markdown/MDX-Dateien im Repo; Frontmatter für SEO-Metadaten; Build-Time SSG für statische Inhalte.

* Funnel Wizard: Client-Komponenten mit Zustand (Zustand oder Context); Validierung mit Zod/Yup.

* Booking: cal.com Embed; Webhooks an Next.js API Routes für Events (created, rescheduled, canceled).

* Automation: n8n Workflows (Webhook → Lead normalisieren → Benachrichtigung → Sheets/CRM → E-Mail).

* Analytics: PostHog JS SDK mit serverseitiger Unterstützung; cookieless Fallback.

* SEO: Next.js Metadata API, Sitemap/robots, strukturierte Daten (JSON-LD), OG-Bilder generativ.

* Forms: Next.js API Routes, CSRF-Schutz, reCAPTCHA/hCaptcha, Rate Limiting.

* Emails: Transaktionsmails via Resend/Postmark; Vorlagen in n8n gepflegt.

### Integration Points

* cal.com: Widget + Webhooks (booking.created, booking.canceled) → n8n → Slack/E-Mail.

* PostHog: Client SDK, Server API für Events/Funnels; EU-Region bevorzugt.

* n8n: Webhooks für Form-Submit/Booking; Integrationen zu Slack, E-Mail, Google Sheets/Airtable.

* CMP/Consent: Leichtgewichtiges Consent-Modal; Event-Weitergabe an PostHog und Embed-Gates.

* Optional: Telefon/WhatsApp-Links, später CRM (HubSpot/Pipedrive) via n8n.

### Data Storage & Privacy

* Datentypen:

  * Lead: {name, email, phone?, region, school_type, need_type, notes?, source, consent_flags}.

  * Appointment Meta: {booking_id, time_slot, status, contact_reference}.

  * Content: Markdown mit Frontmatter {title, slug, description, keywords, og_image}.

* Speicherung:

  * Leads zunächst in n8n → Google Sheets/Airtable (MVP) oder leichtgewichtiges DB (SQLite/Prisma) falls nötig.

  * Events in PostHog; personenbezogene Daten minimieren/anonymisieren wo möglich.

* Datenschutz:

  * DSGVO: Einwilligung für Analytics/Embeds; AV-Verträge mit cal.com, PostHog, Email-Provider.

  * Datensparsamkeit, Zweckbindung, Löschkonzept (z.B. Leads inaktiv >12 Monate löschen).

  * Nutzerrechte: Auskunft/Löschung über Kontaktformular; Prozesse in n8n unterstützen.

### Scalability & Performance

* Erwartete Last: 5–10k Seitenaufrufe/Monat im MVP, Peaks bei Kampagnen.

* SSG für Content; Edge-Caching via Vercel; On-Demand Revalidation nach Content-Updates.

* Performance-Budget: LCP <2,5s; Images via Next/Image; kritische CSS inline; JS-Minimierung.

* Horizontal skalierbar durch serverlose Routen; n8n mit Warteschlangen für Burst-Verarbeitung.

### Potential Challenges

* Consent-abhängige Einbindungen (cal.com, Analytics) können UX stören → klare Hinweise + Click-to-Load.

* Datenqualität der Leads (Duplikate, fehlerhafte Eingaben) → n8n-Validierung, Deduplizierung.

* Organische SEO-Zeit bis Wirkung → Mix aus Evergreen-Content und gezielten Kampagnen.

* Abhängigkeit von Drittanbietern (cal.com, PostHog) → Fallbacks, Status-Checks, SLA-Monitoring.

* Rechtliche Anforderungen (Impressum/Datenschutz) → juristische Prüfung vor Launch.

---

## Milestones & Sequencing

### Project Estimate

* Small: 1–2 Wochen für Kern-MVP (Landing, Intake, Termin, Tracking).

* Medium: 2–4 Wochen inklusive Content-Bibliothek, A/B-Tests und Automations.

### Team Size & Composition

* Small Team (1–2 Personen)

  * Product/Design/Content (1): UX, Copy, IA, visuelle Komponenten, SEO.

  * Full-stack Engineer (1): Next.js, Integrationen, Tracking, Automationen.

* Optional Support (ad hoc): Rechtlicher Check (Freelance), Lektor/in.

### Suggested Phases

**Phase 1 – Discovery & IA (2–3 Tage)**

* Key Deliverables: Product (Seitenarchitektur, Wireframes, Copy-Skizzen), Eng (Tech-Plan, Tracking-Schema).

* Dependencies: Zugriff auf Brand-Guidelines, Positionierung, rechtliche Texte.

**Phase 2 – Build Core MVP (5–7 Tage)**

* Key Deliverables: Eng (Next.js Basis, Landing, Intake-Wizard, Kontaktformular, cal.com-Embed, Markdown-Content-Struktur, SEO-Basics), Design (UI-System mit shadcn/ui, Tailwind Theme).

* Dependencies: cal.com Account/Verfügbarkeiten, E-Mail-Provider, Domain/DNS.

**Phase 3 – Integrationen & Automationen (2–3 Tage)**

* Key Deliverables: Eng (PostHog Events/Funnel, Consent Manager, n8n Flows: Lead → Mail → Sheet/CRM → Slack, Webhooks), Product (Checklisten/Assets).

* Dependencies: n8n Host, PostHog Projekt, Slack/Email-Zugänge.

**Phase 4 – QA, A11y & Launch (2 Tage)**

* Key Deliverables: Eng (E2E-Tests kritischer Flows, Performance-Tuning, Fallbacks), Product (Inhaltsprüfung, rechtliche Review), Go-Live auf Vercel.

* Dependencies: Impressum/Datenschutz final, Cookie-Texte, Domain live.

**Phase 5 – Optimize & Scale (laufend, 1–2 Wochen post-Launch)**

* Key Deliverables: A/B-Tests Headlines/CTAs, SEO-Feinschliff (Schema, interne Verlinkung), Content-Erweiterungen (FAQs, Regionen), Reporting-Dashboards (PostHog, Sheets).

* Dependencies: Erste Nutzungsdaten, Hypothesen-Backlog, Feedback aus Intake-Gesprächen.