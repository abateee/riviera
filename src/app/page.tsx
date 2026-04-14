import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Clock3,
  MapPin,
  PhoneCall,
  ShieldCheck,
  Star,
} from "lucide-react";

import { LeadForm } from "@/components/forms/lead-form";
import { JsonLd } from "@/components/seo/json-ld";
import { SectionHeading } from "@/components/sections/section-heading";
import {
  getHomePage,
  getServiceAreas,
  getServices,
  getSiteSettings,
  getTestimonials,
} from "@/lib/content";
import { getLeadStatus } from "@/lib/lead/status";
import {
  buildFaqJsonLd,
  buildLocalBusinessJsonLd,
  buildMetadata,
} from "@/lib/seo";

const heroStats = [
  { label: "Ville principale", value: "Nice" },
  { label: "Réponse", value: "Sous 24h" },
  { label: "Contact", value: "Téléphone direct" },
];

type HomePageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return buildMetadata({
    title: `${settings.title} à ${settings.city}`,
    description: settings.description,
    path: "/",
  });
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const [settings, homePage, services, serviceAreas, testimonials, resolvedSearch] =
    await Promise.all([
      getSiteSettings(),
      getHomePage(),
      getServices(),
      getServiceAreas(),
      getTestimonials(),
      searchParams,
    ]);
  const leadStatus = getLeadStatus(resolvedSearch);

  return (
    <>
      <JsonLd
        data={buildLocalBusinessJsonLd(settings, {
          path: "/",
          description: settings.description,
          areaServed: [settings.city, ...serviceAreas.map((area) => area.cityName)],
        })}
      />
      <JsonLd data={buildFaqJsonLd(homePage.faq)} />

      <section className="relative overflow-hidden pb-20 pt-14 sm:pb-24 sm:pt-20">
        <div className="section-shell grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-brand-700">
              {homePage.heroEyebrow}
            </div>
            <h1 className="mt-6 max-w-4xl font-heading text-5xl leading-[0.95] text-slate-950 sm:text-6xl lg:text-7xl">
              {homePage.heroTitle}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
              {homePage.heroSubtitle}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {homePage.heroBullets.map((bullet) => (
                <span
                  key={bullet}
                  className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/85 px-4 py-2 text-sm font-medium text-slate-700 shadow-[0_12px_30px_-22px_rgba(67,87,66,0.28)]"
                >
                  <ShieldCheck className="size-4 text-brand-600" />
                  {bullet}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href={settings.phoneHref}
                className="inline-flex items-center justify-center gap-3 rounded-full bg-brand-800 px-6 py-4 text-sm font-semibold text-white transition hover:bg-brand-700"
              >
                <PhoneCall className="size-4" />
                Appeler {settings.phoneDisplay}
              </a>
              <a
                href="#formulaire"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-slate-300 bg-white px-6 py-4 text-sm font-semibold text-slate-900 transition hover:border-brand-300 hover:bg-brand-50"
              >
                Demander un rappel
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>

          <div className="surface-card relative overflow-hidden rounded-[2rem] p-6 sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(130,157,127,0.22),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(228,215,196,0.52),transparent_34%)]" />
            <div className="relative">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">
                Une approche locale
              </p>
              <h2 className="mt-3 font-heading text-4xl text-slate-950">
                Une aide claire, humaine et facile à mettre en place.
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                {settings.socialProof}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {heroStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[1.5rem] border border-white/70 bg-white/90 p-5"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                      {stat.label}
                    </p>
                    <p className="mt-3 text-xl font-semibold text-slate-950">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-[1.5rem] bg-brand-800 p-6 text-slate-200">
                <div className="flex items-center gap-3 text-brand-200">
                  <Clock3 className="size-5" />
                  <p className="text-sm font-semibold uppercase tracking-[0.22em]">
                    Disponibilités
                  </p>
                </div>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                  {settings.openingHours.map((hour) => (
                    <li key={hour}>{hour}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 sm:pb-24">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Points de rassurance"
            title="Un cadre simple, humain et lisible pour les familles."
            description="Chaque accompagnement est pensé pour avancer au bon rythme, avec un contact direct et des réponses concrètes."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {homePage.reassurance.map((item) => (
              <article
                key={item._key ?? item.title}
                className="surface-card rounded-[2rem] p-6"
              >
                <div className="flex size-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                  <ShieldCheck className="size-5" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="bg-white/70 py-20 sm:py-24">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Services"
            title="Des interventions pensées pour le quotidien réel."
            description={homePage.serviceIntro}
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {services.map((service, index) => (
              <article
                key={service.slug}
                className="surface-card group rounded-[2rem] p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-sand-100 text-brand-700">
                    <span className="text-lg font-semibold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700"
                  >
                    Voir la page
                    <ArrowUpRight className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </div>
                <h3 className="mt-6 font-heading text-4xl text-slate-950">
                  {service.title}
                </h3>
                <p className="mt-4 text-base leading-8 text-slate-600">
                  {service.excerpt}
                </p>
                <ul className="mt-6 space-y-3">
                  {service.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-3 text-sm leading-7 text-slate-700"
                    >
                      <ShieldCheck className="mt-1 size-4 shrink-0 text-brand-600" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="secteurs" className="py-20 sm:py-24">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Zones desservies"
            title="Nice d'abord, puis les villes voisines selon les besoins."
            description={homePage.areasIntro}
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="surface-card rounded-[2rem] p-8">
              <div className="flex items-center gap-3 text-brand-700">
                <MapPin className="size-5" />
                <p className="text-sm font-semibold uppercase tracking-[0.22em]">
                  Ville principale
                </p>
              </div>
              <h3 className="mt-4 font-heading text-5xl text-slate-950">
                {settings.city}
              </h3>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
                Nice reste la base principale de Riviera Compagnie. Nous pouvons
                aussi étudier des demandes dans plusieurs villes proches lorsque
                la situation le permet.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {services.slice(0, 3).map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-800"
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className="grid gap-5">
              {serviceAreas.map((area) => (
                <article
                  key={area.slug}
                  className="surface-card rounded-[2rem] p-6"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-600">
                        Ville desservie
                      </p>
                      <h3 className="mt-3 text-2xl font-semibold text-slate-950">
                        {area.cityName}
                      </h3>
                    </div>
                    <Link
                      href={`/secteurs/${area.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700"
                    >
                      Ouvrir
                      <ArrowUpRight className="size-4" />
                    </Link>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    {area.intro}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {testimonials.length > 0 ? (
        <section className="bg-brand-800 py-20 text-white sm:py-24">
          <div className="section-shell">
            <SectionHeading
              eyebrow="Témoignages"
              title="Des retours d'expérience publiés avec accord."
              description="Une sélection de témoignages validés pour aider les familles à se projeter."
              tone="light"
            />
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <article
                  key={testimonial._id}
                  className="rounded-[2rem] border border-white/10 bg-white/5 p-7"
                >
                  <div className="flex items-center gap-1 text-brand-200">
                    {Array.from({ length: testimonial.rating }).map((_, index) => (
                      <Star key={index} className="size-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-5 text-base leading-8 text-slate-100">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="mt-6 text-sm text-slate-300">
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p>{testimonial.location}</p>
                    {testimonial.serviceLabel ? (
                      <p className="mt-2 text-brand-200">
                        {testimonial.serviceLabel}
                      </p>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="py-20 sm:py-24">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="FAQ"
              title="Les questions les plus courantes avant le premier échange."
              description="Des réponses simples pour comprendre comment nous intervenons et comment démarrer."
            />
          </div>
          <div className="space-y-4">
            {homePage.faq.map((item) => (
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

      <section id="formulaire" className="pb-24 sm:pb-28">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading
              eyebrow="Prise de contact"
              title="Le plus rapide reste de nous appeler."
              description={homePage.leadIntro}
            />
            <div className="mt-8 rounded-[2rem] bg-brand-800 p-8 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-200">
                Contact direct
              </p>
              <a
                href={settings.phoneHref}
                className="mt-4 inline-block font-heading text-4xl text-white"
              >
                {settings.phoneDisplay}
              </a>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                {settings.city} · {settings.region}
              </p>
            </div>
          </div>
          <LeadForm
            compact
            pagePath="/"
            settings={settings}
            services={services}
            status={leadStatus}
          />
        </div>
      </section>
    </>
  );
}
