import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, MapPin, PhoneCall } from "lucide-react";
import { notFound } from "next/navigation";

import { LeadForm } from "@/components/forms/lead-form";
import { JsonLd } from "@/components/seo/json-ld";
import { RichText } from "@/components/sections/portable-text";
import { SectionHeading } from "@/components/sections/section-heading";
import {
  getServiceAreaBySlug,
  getServiceAreas,
  getServices,
  getSiteSettings,
} from "@/lib/content";
import { getLeadStatus } from "@/lib/lead/status";
import { buildFaqJsonLd, buildLocalBusinessJsonLd, buildMetadata } from "@/lib/seo";

type SectorPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateStaticParams() {
  const areas = await getServiceAreas();

  return areas.map((area) => ({
    slug: area.slug,
  }));
}

export async function generateMetadata({
  params,
}: SectorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const area = await getServiceAreaBySlug(slug);
  const settings = await getSiteSettings();

  if (!area) {
    return buildMetadata({
      title: `Secteur introuvable | ${settings.title}`,
      description: settings.description,
      path: `/secteurs/${slug}`,
      noindex: true,
    });
  }

  return buildMetadata({
    title: area.seoTitle ?? `${area.title} | ${settings.title}`,
    description: area.seoDescription ?? area.intro,
    path: `/secteurs/${area.slug}`,
    noindex: area.noindex,
  });
}

export default async function SectorPage({
  params,
  searchParams,
}: SectorPageProps) {
  const { slug } = await params;
  const [settings, services, serviceAreas, resolvedSearch] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getServiceAreas(),
    searchParams,
  ]);
  const area = serviceAreas.find((item) => item.slug === slug);
  const leadStatus = getLeadStatus(resolvedSearch);

  if (!area) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={buildLocalBusinessJsonLd(settings, {
          path: `/secteurs/${area.slug}`,
          description: area.seoDescription ?? area.intro,
          title: `${settings.title} à ${area.cityName}`,
          areaServed: [area.cityName, settings.city, ...area.nearbyCities],
        })}
      />
      <JsonLd data={buildFaqJsonLd(area.faq)} />

      <section className="pb-16 pt-14 sm:pb-20 sm:pt-20">
        <div className="section-shell grid gap-10 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-600">
              Ville desservie
            </p>
            <h1 className="mt-4 font-heading text-5xl leading-[0.96] text-slate-950 sm:text-6xl">
              {area.heroTitle}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              {area.intro}
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
              Sur demande, nous pouvons aussi étudier l&apos;accompagnement de
              personnes en situation de handicap dans ce secteur.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={settings.phoneHref}
                className="inline-flex items-center gap-3 rounded-full bg-brand-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
              >
                <PhoneCall className="size-4" />
                Appeler {settings.phoneDisplay}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-brand-300 hover:bg-brand-50"
              >
                Demander un rappel
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>

          <div className="surface-card rounded-[2rem] p-7">
            <div className="flex items-center gap-3 text-brand-700">
              <MapPin className="size-5" />
              <p className="text-sm font-semibold uppercase tracking-[0.22em]">
                Zone concernée
              </p>
            </div>
            <p className="mt-4 text-3xl font-semibold text-slate-950">
              {area.cityName}
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Cette page regroupe les informations utiles pour les familles de{" "}
              {area.cityName} et les communes voisines.
            </p>
            {area.nearbyCities.length > 0 ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {area.nearbyCities.map((city) => (
                  <span
                    key={city}
                    className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600"
                  >
                    {city}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="section-shell grid gap-10 lg:grid-cols-[1fr_0.92fr]">
          <div className="surface-card rounded-[2rem] p-8">
            <RichText value={area.mainContent} />
          </div>

          <LeadForm
            pagePath={`/secteurs/${area.slug}`}
            settings={settings}
            services={services}
            status={leadStatus}
          />
        </div>
      </section>

      <section className="bg-white/70 py-20">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.86fr_1.14fr]">
          <div>
            <SectionHeading
              eyebrow="FAQ locale"
              title={`Questions fréquentes pour ${area.cityName}`}
              description="Des réponses concrètes pour préparer un premier échange et vérifier rapidement la faisabilité."
            />
          </div>
          <div className="space-y-4">
            {area.faq.map((item) => (
              <details
                key={item._key ?? item.question}
                className="surface-card rounded-[1.75rem] p-6 open:bg-white"
              >
                <summary className="cursor-pointer list-none text-lg font-semibold text-slate-950">
                  {item.question}
                </summary>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
