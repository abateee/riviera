import Link from "next/link";
import { ArrowRight, PhoneCall } from "lucide-react";

import type { Service, SiteSettings } from "@/lib/content/types";
import type { LeadStatus } from "@/lib/lead/status";

type LeadFormProps = {
  pagePath: string;
  redirectTo?: string;
  settings: SiteSettings;
  services: Service[];
  status?: LeadStatus;
  compact?: boolean;
};

const callbackSlots = [
  "De 9h à 12h",
  "De 12h à 14h",
  "De 14h à 18h",
  "Après 18h",
];

const statusCopy: Record<
  LeadStatus,
  {
    tone: string;
    title: string;
    description: string;
  }
> = {
  ok: {
    tone: "border-emerald-200 bg-emerald-50 text-emerald-900",
    title: "Votre demande a bien été envoyée.",
    description:
      "Nous revenons vers vous dès que possible. Si votre besoin est urgent, appelez-nous directement.",
  },
  error: {
    tone: "border-amber-200 bg-amber-50 text-amber-950",
    title: "Certaines informations sont manquantes ou invalides.",
    description:
      "Vérifiez le formulaire, puis renvoyez votre demande. Le téléphone reste le moyen le plus rapide.",
  },
  unavailable: {
    tone: "border-rose-200 bg-rose-50 text-rose-950",
    title: "La demande n'a pas pu être transmise pour le moment.",
    description:
      "Réessayez dans quelques instants ou appelez-nous directement pour éviter toute perte d'information.",
  },
};

export function LeadForm({
  pagePath,
  redirectTo = "/merci",
  settings,
  services,
  status,
  compact = false,
}: LeadFormProps) {
  const notice = status ? statusCopy[status] : null;

  return (
    <form
      id="formulaire"
      action="/api/leads"
      method="post"
      className="grid scroll-mt-28 gap-4 rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_30px_90px_-45px_rgba(67,87,66,0.32)] backdrop-blur md:p-8"
    >
      <input type="hidden" name="pagePath" value={pagePath} />
      <input type="hidden" name="redirectTo" value={redirectTo} />
      <input
        type="text"
        name="hp"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
      />

      {notice ? (
        <div
          className={`rounded-[1.5rem] border px-4 py-4 text-sm leading-7 ${notice.tone}`}
          aria-live="polite"
        >
          <p className="font-semibold">{notice.title}</p>
          <p className="mt-1">{notice.description}</p>
        </div>
      ) : null}

      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-600">
            Demande de rappel
          </p>
          <h3 className="mt-2 font-heading text-3xl text-slate-950">
            Parler à Riviera Compagnie
          </h3>
          <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
            Sur demande, nous accompagnons aussi les personnes en situation de
            handicap. Tous nos intervenants sont diplômés d&apos;État. Indiquez-le
            simplement dans votre message.
          </p>
        </div>
        <a
          href={settings.phoneHref}
          className="hidden items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-900 transition hover:border-brand-300 hover:bg-brand-100 md:inline-flex"
        >
          <PhoneCall className="size-4" />
          {settings.phoneDisplay}
        </a>
      </div>

      <div className={`grid gap-4 ${compact ? "lg:grid-cols-2" : ""}`}>
        <label className="grid min-w-0 gap-2">
          <span className="text-sm font-medium text-slate-700">Nom</span>
          <input
            name="name"
            required
            autoComplete="name"
            className="min-h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-slate-900 outline-none transition focus:border-brand-500"
            placeholder="Votre nom"
          />
        </label>

        <label className="grid min-w-0 gap-2">
          <span className="text-sm font-medium text-slate-700">Téléphone</span>
          <input
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className="min-h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-slate-900 outline-none transition focus:border-brand-500"
            placeholder="06 00 00 00 00"
          />
        </label>

        <label className="grid min-w-0 gap-2">
          <span className="text-sm font-medium text-slate-700">E-mail</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            className="min-h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-slate-900 outline-none transition focus:border-brand-500"
            placeholder="Facultatif"
          />
        </label>

        <label className="grid min-w-0 gap-2">
          <span className="text-sm font-medium text-slate-700">
            Besoin principal
          </span>
          <select
            name="serviceInterest"
            className="min-h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-slate-900 outline-none transition focus:border-brand-500"
            defaultValue=""
          >
            <option value="">Choisir un service</option>
            {services.map((service) => (
              <option key={service.slug} value={service.title}>
                {service.title}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="grid min-w-0 gap-2">
        <span className="text-sm font-medium text-slate-700">
          Créneau de rappel souhaité
        </span>
        <select
          name="preferredCallbackSlot"
          className="min-h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-slate-900 outline-none transition focus:border-brand-500"
          defaultValue=""
        >
          <option value="">Choisir un créneau</option>
          {callbackSlots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>
      </label>

      <label className="grid min-w-0 gap-2">
        <span className="text-sm font-medium text-slate-700">Message</span>
        <textarea
          name="message"
          rows={compact ? 4 : 5}
          className="w-full rounded-[1.5rem] border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-brand-500"
          placeholder="Décrivez brièvement le contexte, la ville concernée et l'urgence éventuelle."
        />
      </label>

      <label className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
        <input
          name="consent"
          type="checkbox"
          required
          className="mt-1 size-4 rounded border-slate-300 text-brand-700"
        />
        <span>
          J&apos;accepte que mes informations soient utilisées pour être recontacté(e)
          au sujet de ma demande. Voir la{" "}
          <Link
            href="/politique-confidentialite"
            className="font-semibold text-brand-700"
          >
            politique de confidentialité
          </Link>
          .
        </span>
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-6 text-slate-600">
          Le téléphone reste le plus rapide :{" "}
          <a href={settings.phoneHref} className="font-semibold text-brand-700">
            {settings.phoneDisplay}
          </a>
        </p>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-800"
        >
          Envoyer la demande
          <ArrowRight className="size-4" />
        </button>
      </div>
    </form>
  );
}
