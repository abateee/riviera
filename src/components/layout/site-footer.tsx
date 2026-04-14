import Image from "next/image";
import Link from "next/link";

import competenceOne from "@/competence1.jpg";
import competenceTwo from "@/competence2.png";

import type { Service, ServiceArea, SiteSettings } from "@/lib/content/types";

type SiteFooterProps = {
  settings: SiteSettings;
  services: Service[];
  serviceAreas: ServiceArea[];
};

const certifications = [
  {
    title: "Croix-Rouge française compétence",
    description: "Référence de formation et de compétences professionnelles.",
    image: competenceOne,
    imageAlt: "Certification Croix-Rouge française compétence",
  },
  {
    title: "Agrément Qualité",
    description: "Délivré par la Préfecture des Alpes-Maritimes.",
    image: competenceTwo,
    imageAlt: "Agrément Qualité délivré par la Préfecture des Alpes-Maritimes",
  },
];

export function SiteFooter({
  settings,
  services,
  serviceAreas,
}: SiteFooterProps) {
  return (
    <footer className="border-t border-slate-200 bg-brand-800 text-slate-200">
      <div className="mx-auto grid w-[min(1120px,calc(100%-1.5rem))] gap-10 py-14 md:grid-cols-[1.2fr,0.8fr,0.8fr]">
        <div>
          <p className="font-heading text-4xl text-white">{settings.title}</p>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
            {settings.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-300">
            <a
              href={settings.phoneHref}
              className="rounded-full border border-white/20 px-4 py-2 transition hover:border-brand-400 hover:text-white"
            >
              {settings.phoneDisplay}
            </a>
            <Link
              href="/contact"
              className="rounded-full border border-white/20 px-4 py-2 transition hover:border-brand-400 hover:text-white"
            >
              Nous contacter
            </Link>
          </div>

          <div className="mt-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">
              Certifications
            </p>
            <div className="mt-5 grid gap-3">
              {certifications.map((certification) => (
                <div
                  key={certification.title}
                  className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-24 shrink-0 overflow-hidden rounded-[1rem] bg-white p-2 shadow-[0_18px_40px_rgba(7,18,12,0.12)] sm:w-28">
                      <Image
                        src={certification.image}
                        alt={certification.imageAlt}
                        className="h-auto w-full object-contain"
                        sizes="(min-width: 640px) 112px, 96px"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {certification.title}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-slate-300">
                        {certification.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">
            Services
          </p>
          <ul className="mt-5 space-y-3 text-sm">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="transition hover:text-white"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">
            Zones desservies
          </p>
          <ul className="mt-5 space-y-3 text-sm">
            {serviceAreas.map((area) => (
              <li key={area.slug}>
                <Link
                  href={`/secteurs/${area.slug}`}
                  className="transition hover:text-white"
                >
                  {area.cityName}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/mentions-legales"
                className="transition hover:text-white"
              >
                Mentions légales
              </Link>
            </li>
            <li>
              <Link
                href="/politique-confidentialite"
                className="transition hover:text-white"
              >
                Politique de confidentialité
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
