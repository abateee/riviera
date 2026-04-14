import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, PhoneCall } from "lucide-react";

import { getSiteSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return buildMetadata({
    title: `Merci | ${settings.title}`,
    description: "Votre demande a bien été envoyée.",
    path: "/merci",
    noindex: true,
  });
}

export default async function ThankYouPage() {
  const settings = await getSiteSettings();

  return (
    <section className="pb-24 pt-20">
      <div className="section-shell">
        <div className="mx-auto max-w-3xl rounded-[2.5rem] bg-white p-10 text-center shadow-[0_30px_90px_-45px_rgba(67,87,66,0.28)] sm:p-14">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-brand-50 text-brand-700">
            <CheckCircle2 className="size-8" />
          </div>
          <h1 className="mt-6 font-heading text-5xl text-slate-950">
            Merci pour votre demande
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Votre message a bien été transmis. Si votre besoin est urgent, le
            plus rapide reste toujours de nous appeler.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={settings.phoneHref}
              className="inline-flex items-center gap-3 rounded-full bg-brand-800 px-6 py-4 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              <PhoneCall className="size-4" />
              {settings.phoneDisplay}
            </a>
            <Link
              href="/"
              className="inline-flex items-center rounded-full border border-slate-300 px-6 py-4 text-sm font-semibold text-slate-900 transition hover:border-brand-300 hover:bg-brand-50"
            >
              Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
