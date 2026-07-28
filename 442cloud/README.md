# 442 Cloud — strona (rebuild)

Jednostronicowa (one-page) strona firmowa **442 Cloud** — Next.js 16 (App Router) +
React 19 + Tailwind CSS v4 + TypeScript. Profesjonalna, w pełni responsywna, z futbolowym
twistem (formacja 4-4-2, „game plan", „squad"). Zachowana oryginalna kolorystyka
(granat + zielony) i wszystkie grafiki.

---

## Wymagania

- **Node.js 18.18+** (zalecane 20 LTS lub nowsze)
- npm (lub yarn / pnpm / bun)
- Dostęp do internetu przy pierwszym `dev`/`build` — czcionki (Oxanium, Inter) pobiera
  automatycznie `next/font/google`.

## Uruchomienie (development)

```bash
npm install
npm run dev
```

Otwórz **http://localhost:3000**.

## Wersja produkcyjna

```bash
npm install
npm run build
npm start
```

`npm start` uruchamia zoptymalizowany build na porcie 3000.

## Lint

```bash
npm run lint
```

---

## Struktura projektu

```
442cloud/
├── public/
│   ├── crew/                 # zdjęcia zespołu (mateusz / kamil / michal .jpg)
│   └── slides/               # grafiki: first / flag / balls / contact .png
├── src/
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── globals.css       # design system: tokeny kolorów, tekstury boiska, animacje
│   │   ├── layout.tsx        # czcionki (Oxanium + Inter) + metadane SEO / OpenGraph
│   │   └── page.tsx          # cała strona (wszystkie sekcje)
│   └── components/
│       ├── Navbar.tsx        # sticky glass nav, pasek postępu, menu mobilne (client)
│       ├── Reveal.tsx        # animacje scroll-reveal (IntersectionObserver, client)
│       └── TacticBoard.tsx   # boisko SVG z formacją 4-4-2
├── next.config.ts
├── postcss.config.mjs
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## Sekcje strony

1. **Hero** — stadion (`first.png`), hasło „Engineering your digital victory", 2× CTA.
2. **Formation** — filozofia 4-4-2 + interaktywna tablica taktyczna (SVG) + flaga
   (`flag.png`) + karty: Defence / Midfield / Attack.
3. **Skillset** — kompetencje Agentforce (`balls.png` w tle) jako siatka kart.
4. **Game Plan** — 3 fazy: Kick-off → Tactics → Full time.
5. **Squad** — zespół z numerami na koszulkach.
6. **Contact** — CTA + e-mail (`contact.png` w tle).
7. **Footer** — logo, nawigacja, kontakt.

> Sekcja „Our History" / timeline została **usunięta** zgodnie z wymaganiem.

---

## Co zmienić / jak edytować

- **Teksty i dane** (skillset, kroki, zespół) — tablice na górze `src/app/page.tsx`
  (`SKILLS`, `LINES`, `STEPS`, `CREW`).
- **Kolory / czcionki / animacje** — sekcja `@theme` oraz reguły w `src/app/globals.css`.
- **Formacja na boisku** — współrzędne zawodników w `src/components/TacticBoard.tsx`.
- **E-mail kontaktowy** — `contact@442cloud.com` w `page.tsx` (sekcja Contact + footer).
- **SEO / tytuł / OpenGraph** — `metadata` w `src/app/layout.tsx`
  (pamiętaj o ustawieniu prawdziwej domeny w `metadataBase`).

## Deploy

Projekt jest gotowy pod **Vercel** (twórcy Next.js) — wystarczy podłączyć repo.
Działa też na dowolnym hostingu Node (`npm run build` + `npm start`) lub w kontenerze.

---

## Uwaga bezpieczeństwa

Wersja Next.js została podniesiona z `16.0.5` do **`16.2.12`** (łatka na
CVE-2025-66478). Warto regularnie aktualizować zależności: `npm outdated` / `npm update`.
