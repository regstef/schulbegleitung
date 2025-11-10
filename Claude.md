# MCP Server Nutzungsrichtlinien

## Serena MCP (Primäre Code-Analyse)

**Nutze IMMER Serena für:**
- Code-Analyse und Navigation (`mcp__serena__find_symbol`, `mcp__serena__get_symbols_overview`)
- Symbol-basierte Code-Bearbeitung (`mcp__serena__replace_symbol_body`, `mcp__serena__insert_after_symbol`)
- Refactoring (`mcp__serena__rename_symbol`, `mcp__serena__find_referencing_symbols`)
- Regex-basierte Ersetzungen (`mcp__serena__replace_regex`)
- Datei-Operationen (`mcp__serena__read_file`, `mcp__serena__create_text_file`, `mcp__serena__list_dir`)
- Codebase-Suche (`mcp__serena__search_for_pattern`)
- Projekt-Wissen speichern (`mcp__serena__write_memory`, `mcp__serena__read_memory`)

**Wichtig:**
- Bevorzuge symbolische Tools gegenüber vollständigem Lesen von Dateien
- Nutze `get_symbols_overview` vor detaillierter Analyse
- Verwende `find_symbol` mit `depth` und `include_body` für gezielte Code-Einblicke
- Setze `think_about_collected_information` nach Recherche-Phasen ein

## Context7 (Bibliotheks-Dokumentation)

**Nutze Context7 für:**
- Aktuelle Dokumentation von npm-Paketen, Frameworks, APIs
- Implementierung mit offiziellen Beispielen und Best Practices

**Workflow:**
1. `mcp__Context7__resolve-library-id` → Library-ID ermitteln
2. `mcp__Context7__get-library-docs` → Dokumentation abrufen

## Spec Workflow / spec-workflow (Projektorganisation)

**Nutze spec-workflow für:**
- Projektstrukturierung und Architektur
- Aufgabenverwaltung und Planung
- Spezifikationserstellung
- Projekt-Workflows und Prozesse

## Ultracite (Erweiterte Dokumentation & Best Practices)

**Nutze Ultracite IMMER für:**
- Komponentenerstellung und -anpassung (Shadcn, React, Next.js)
- Framework-spezifische Best Practices und Patterns
- API-Integrationen und moderne Web-Standards
- Architektur-Empfehlungen für Komponenten-Design

**Workflow beim Erstellen/Anpassen von Komponenten:**
1. **Recherche** - Ultracite für aktuelle Best Practices und Patterns konsultieren
2. **Planung** - Dokumentierte Patterns und Empfehlungen anwenden
3. **Implementierung** - Code mit Ultracite-Richtlinien abgleichen
4. **Optimierung** - Performance und Accessibility nach Ultracite-Standards

---

## Design System & UI-Komponenten (KRITISCH)

### Strikte Anforderungen

**Komponenten-Bibliotheken (AUSSCHLIESSLICH):**
- ✅ **shadcn/ui** - Basis-Komponenten (Button, Input, Card, etc.)
- ✅ **shadcnblocks** - Pre-built Section-Komponenten (Hero, Features, etc.)
- ❌ **KEINE** anderen UI-Libraries (Material-UI, Chakra, Ant Design, etc.)
- ❌ **KEINE** Custom-Komponenten ohne Shadcn-Basis

**Styling:**
- ✅ **Tailwind CSS 4.0+** mit Custom Theme
- ✅ Tailwind Utility-Classes
- ❌ **KEIN** CSS-in-JS (styled-components, emotion)
- ❌ **KEINE** globalen CSS-Dateien (außer globals.css für Theme)
- ❌ **KEINE** CSS Modules

### Implementierungs-Workflow (ZWINGEND)

**Für JEDE UI-Komponente oder Sektion:**

1. **STOP & FRAGEN** 🛑
   - Bevor du Code schreibst: **FRAGE den Nutzer nach dem Shadcn Block**
   - Beispiel: "Welchen Shadcn Block soll ich für die Hero-Section verwenden?"
   - **WARTE** auf Antwort mit Link oder Block-Name

2. **RECHERCHE MIT ULTRACITE** 🔍
   - **NUTZE Ultracite MCP** für Best Practices der Komponente
   - Hole aktuelle Implementierungs-Patterns für Shadcn/React/Next.js
   - Prüfe Accessibility-Standards und Performance-Empfehlungen
   - Dokumentiere relevante Patterns für die Implementierung

3. **ERHALTEN & ANALYSIEREN** 📋
   - Nutzer liefert Shadcn Block (von shadcnblocks.com oder shadcn/ui)
   - Analysiere den Block-Code sorgfältig
   - Verstehe Struktur, Props, Variants
   - Gleiche mit Ultracite-Empfehlungen ab

4. **ANPASSEN & IMPLEMENTIEREN** ⚙️
   - Passe den Block an das Projekt an (Imports, Pfade, Props)
   - Integriere mit bestehenden Komponenten
   - Wende Tailwind Theme an
   - Implementiere nach Ultracite Best Practices

5. **VALIDIEREN** ✅
   - Prüfe TypeScript-Typen
   - Prüfe Tailwind-Classes
   - Prüfe Accessibility (ARIA-Labels, Semantik)
   - Validiere gegen Ultracite-Standards

### Anti-Patterns (NIEMALS)

❌ **Nicht erlaubt:**
```tsx
// FALSCH: Custom Button ohne Shadcn
const CustomButton = ({ children }) => (
  <button className="my-custom-button">{children}</button>
)

// FALSCH: Material-UI Import
import { Button } from '@mui/material'

// FALSCH: Inline-Styles
<div style={{ color: 'blue' }}>...</div>

// FALSCH: CSS Modules
import styles from './hero.module.css'
```

✅ **Korrekt:**
```tsx
// RICHTIG: Shadcn Button
import { Button } from "@/components/ui/button"

// RICHTIG: Shadcn Block anpassen
import { HeroBlock } from "@/components/blocks/hero-block"

// RICHTIG: Tailwind Utilities
<div className="text-primary bg-background">...</div>
```

### Tailwind Theme Referenz

**Immer verwenden:**
- Colors: `text-primary`, `bg-secondary`, `border-accent`
- Typography: `text-heading-1`, `text-body`, `font-display`
- Spacing: Theme-definierte Werte
- Radius: `rounded-theme-sm`, `rounded-theme-md`

**Theme-Struktur:**
```ts
// tailwind.config.ts (Referenz)
theme: {
  extend: {
    colors: {
      primary: { ... },
      secondary: { ... },
      accent: { ... },
    },
    fontFamily: {
      display: [...],
      body: [...],
    },
    // ... weitere Theme-Definitionen
  }
}
```

---

## Code Quality & GitHub Integration

### Ultracite AI-Code-Review (Automatisch)

**GitHub App Integration:**
- ✅ Ultracite reviewed automatisch jeden Pull Request
- ✅ Keine manuelle Konfiguration nötig
- ✅ Feedback zu Code-Qualität, Best Practices, logischen Fehlern
- ✅ Komplementär zu ESLint/Prettier

**Für AI Agents - Workflow:**
1. Code schreiben (ESLint + Prettier konform)
2. Commit & Push → PR erstellen
3. Ultracite reviewt automatisch (innerhalb Minuten)
4. Feedback berücksichtigen & iterativ verbessern

**Best Practices:**
- Ultracite-Feedback ernst nehmen (höhere Code-Qualität)
- Keine "Quick Fixes" ohne Problemverständnis
- ESLint = Syntax-Check, Ultracite = Qualitäts-Check

---

## Generelle Regeln

1. **Serena First**: Standard für alle Code-Operationen
2. **Ultracite bei Komponenten**: IMMER Ultracite konsultieren beim Erstellen/Anpassen von Komponenten
3. **Parallel Tool Calls**: Nutze mehrere MCP-Tools gleichzeitig wenn unabhängig (z.B. Ultracite + Context7)
4. **Memory nutzen**: Projektinformationen in Serena Memories persistieren
5. **Symbolisch arbeiten**: Vollständiges Dateilesen vermeiden, symbolische Navigation bevorzugen
6. **Design System First**: IMMER Shadcn Blocks verwenden, IMMER auf Nutzer-Auswahl warten
7. **Code Quality**: ESLint/Prettier für Syntax, Ultracite für Qualität & Best Practices
