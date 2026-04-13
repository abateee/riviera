# Riviera Compagnie

Site vitrine local `Next.js` pour `Riviera Compagnie`, pensé pour Nice avec des routes SEO administrables par ville via `Sanity Studio`.

## Stack

- `Next.js 16` + `React 19` + `TypeScript`
- `Tailwind CSS 4`
- `Sanity Studio` intégré sur `/studio`
- formulaire de contact via route handler `Next.js`
- stockage des leads en Postgres compatible Vercel/Neon
- notifications email via `Resend`

## Routes publiques

- `/`
- `/services/[slug]`
- `/secteurs/[slug]`
- `/contact`
- `/merci`
- `/mentions-legales`
- `/politique-confidentialite`

## Démarrage

```bash
npm install
npm run dev
```

Le site fonctionne immédiatement avec un contenu local de fallback. Le back-office Sanity devient actif dès que les variables d’environnement sont renseignées.

## Variables d’environnement

Copier `.env.example` vers `.env.local` puis renseigner au minimum :

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `POSTGRES_URL`
- `RESEND_API_KEY`
- `LEAD_TO_EMAIL`

## Sanity

- Studio embarqué : `/studio`
- Singletons :
  - `siteSettings`
  - `homePage`
- Collections :
  - `service`
  - `testimonial`
  - `serviceArea`

Les pages SEO administrables sont limitées aux villes via `serviceArea`, publiées sous `/secteurs/[slug]`. Le slug `nice` est bloqué pour éviter un doublon avec la home.

## Leads

La route `POST /api/leads` :

- valide les données du formulaire
- crée automatiquement la table `leads` si elle n’existe pas
- enregistre la demande en base si `POSTGRES_URL` est défini
- envoie un email de notification si `Resend` est configuré

## SEO

- metadata par page
- `robots.ts`
- `sitemap.ts`
- JSON-LD `ProfessionalService`
- JSON-LD `FAQPage`
