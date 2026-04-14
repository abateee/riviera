import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, MapPin, PhoneCall, ShieldCheck } from "lucide-react";
import { notFound } from "next/navigation";

import { LeadForm } from "@/components/forms/lead-form";
import { JsonLd } from "@/components/seo/json-ld";
import { RichText } from "@/components/sections/portable-text";
import { SectionHeading } from "@/components/sections/section-heading";
import {
  getServiceAreas,
  getServiceBySlug,
  getServices,
  getSiteSettings,
} from "@/lib/content";
import { getLeadStatus } from "@/lib/lead/status";
import { buildLocalBusinessJsonLd, buildMetadata } from "@/lib/seo";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateStaticParams() {
  const services = await getServices();

  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const [{ slug }, settings] = await Promise.all([params, getSiteSettings()]);
  const service = await getServiceBySlug(slug);

  if (!service) {
    return buildMetadata({
      title: `Service introuvable | ${settings.title}`,
      description: settings.description,
      path: `/services/${slug}`,
      noindex: true,
    });
  }

  return buildMetadata({
    title: service.seoTitle ?? `${service.title} | ${settings.title}`,
    description: service.seoDescription ?? service.excerpt,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({
  params,
  searchParams,
}: ServicePageProps) {
  const { slug } = await params;
  const [settings, services, serviceAreas, resolvedSearch] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getServiceAreas(),
    searchParams,
  ]);
  const service = services.find((item) => item.slug === slug);
  const leadStatus = getLeadStatus(resolvedSearch);

  if (!service) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={buildLocalBusinessJsonLd(settings, {
          path: `/services/${service.slug}`,
          description: service.seoDescription ?? service.excerpt,
          title: `${service.title} - ${settings.title}`,
          areaServed: [settings.city, ...serviceAreas.map((area) => area.cityName)],
        })}
      />

      <section className="pb-16 pt-14 sm:pb-20 sm:pt-20">
        <div className="section-shell grid gap-8 lg:grid-cols-[1.12fr_0.88fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-600">
              Service
            </p>
            <h1 className="mt-4 font-heading text-5xl leading-[0.96] text-slate-950 sm:text-6xl">
              {service.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              {service.excerpt}
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
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-600">
              Points clés
            </p>
            <ul className="mt-6 space-y-4">
              {service.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex gap-3 text-base leading-8 text-slate-700"
                >
                  <ShieldCheck className="mt-1 size-5 shrink-0 text-brand-600" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="section-shell grid gap-10 lg:grid-cols-[1fr_0.92fr]">
          <div className="surface-card rounded-[2rem] p-8">
            <RichText value={service.body} />
          </div>

          <div className="space-y-6">
            <div className="surface-card rounded-[2rem] p-7">
              <div className="flex items-center gap-3 text-brand-700">
                <MapPin className="size-5" />
                <p className="text-sm font-semibold uppercase tracking-[0.22em]">
                  Zone d&apos;intervention
                </p>
              </div>
              <p className="mt-4 text-2xl font-semibold text-slate-950">
                {settings.city}
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Ce service est proposé à Nice et peut aussi être étudié dans
                certaines villes voisines selon l&apos;organisation et la situation.
              </p>
              {serviceAreas.length > 0 ? (
                <div className="mt-6 flex flex-wrap gap-2">
                  {serviceAreas.slice(0, 4).map((area) => (
                    <span
                      key={area.slug}
                      className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600"
                    >
                      {area.cityName}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>

            <LeadForm
              pagePath={`/services/${service.slug}`}
              settings={settings}
              services={services}
              status={leadStatus}
            />
          </div>
        </div>
      </section>

      <section className="bg-white/70 py-20">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Autres services"
            title="Compléter l'accompagnement selon le contexte."
            description="Chaque besoin évolue avec le temps. Nous pouvons ajuster l'aide selon la situation et le rythme souhaité."
            
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {services
              .filter((item) => item.slug !== service.slug)
              .slice(0, 3)
              .map((item) => (
                <Link
                  key={item.slug}
                  href={`/services/${item.slug}`}
                  className="surface-card rounded-[1.75rem] p-6 transition hover:-translate-y-1"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-600">
                    Service
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold text-slate-950">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.excerpt}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
